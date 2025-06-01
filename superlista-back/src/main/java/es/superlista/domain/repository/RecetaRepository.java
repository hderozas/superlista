package es.superlista.domain.repository;

import es.superlista.domain.entity.Ingrediente;
import es.superlista.domain.entity.Receta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Repositorio JPA para la entidad {@link Receta}.
 * Proporciona operaciones CRUD y consultas personalizadas sobre las recetas.
 */
public interface RecetaRepository extends JpaRepository<Receta, Long> {

    /**
     * Actualiza el nombre y los ingredientes de una receta específica por su ID.
     *
     * @param nombre      nuevo nombre de la receta
     * @param ingredientes nuevo ingrediente asociado (nota: revisar si debería ser lista)
     * @param id          identificador de la receta a actualizar
     */
    @Transactional
    @Modifying
    @Query("update Receta r set r.nombre = ?1, r.ingredientes = ?2 where r.id = ?3")
    void updateNombreAndIngredientesByIdEquals(String nombre, Ingrediente ingredientes, Long id);

    /**
     * Elimina una receta por su ID.
     *
     * @param id identificador de la receta a eliminar
     */
    void deleteByIdEquals(Long id);

    /**
     * Busca recetas cuyo nombre contenga un texto específico, ignorando mayúsculas y minúsculas.
     *
     * @param nombre texto a buscar en el nombre
     * @return lista de recetas coincidentes
     */
    List<Receta> findByNombreContainsIgnoreCase(String nombre);
}
