package es.superlista.domain.repository;

import es.superlista.domain.entity.Ingrediente;
import es.superlista.domain.enumeration.CategoriaIngrediente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Repositorio JPA para la entidad {@link Ingrediente}.
 * Proporciona operaciones CRUD y consultas personalizadas sobre los ingredientes.
 */
public interface IngredienteRepository extends JpaRepository<Ingrediente, Long> {

    /**
     * Actualiza el nombre y la categoría de un ingrediente específico por su ID.
     *
     * @param nombre    nuevo nombre del ingrediente
     * @param categoria nueva categoría del ingrediente
     * @param id        identificador del ingrediente a actualizar
     */
    @Transactional
    @Modifying
    @Query("update Ingrediente i set i.nombre = ?1, i.categoria = ?2 where i.id = ?3")
    void updateIngrediente(String nombre, CategoriaIngrediente categoria, Long id);

    /**
     * Busca todos los ingredientes que pertenecen a una categoría específica.
     *
     * @param categoria categoría a filtrar
     * @return lista de ingredientes encontrados
     */
    List<Ingrediente> findByCategoriaEquals(CategoriaIngrediente categoria);

    /**
     * Busca un ingrediente por su nombre, ignorando mayúsculas y minúsculas.
     *
     * @param nombre nombre del ingrediente
     * @return ingrediente encontrado (si existe)
     */
    Optional<Ingrediente> findByNombreIgnoreCase(String nombre);

    /**
     * Verifica si existe un ingrediente con el nombre exacto (ignorando mayúsculas/minúsculas).
     *
     * @param nombre nombre a comprobar
     * @return true si existe, false en caso contrario
     */
    boolean existsByNombreEqualsIgnoreCase(String nombre);
}
