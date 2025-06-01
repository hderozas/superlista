package es.superlista.domain.repository;

import es.superlista.domain.entity.menu_semanal.MenuSemanal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * Repositorio JPA para la entidad {@link MenuSemanal}.
 * Proporciona operaciones CRUD y consultas personalizadas sobre los menús semanales.
 */
public interface MenuSemanalRepository extends JpaRepository<MenuSemanal, Long> {

    /**
     * Busca un menú semanal por su ID y el ID del usuario propietario.
     *
     * @param id        identificador del menú semanal
     * @param usuarioId identificador del usuario propietario
     * @return menú semanal encontrado (si existe)
     */
    Optional<MenuSemanal> findByIdAndUsuarioId(Long id, Long usuarioId);

    /**
     * Obtiene todos los menús semanales asociados a un usuario específico.
     *
     * @param usuarioId identificador del usuario
     * @return lista de menús semanales del usuario
     */
    List<MenuSemanal> findByUsuarioId(Long usuarioId);
}
