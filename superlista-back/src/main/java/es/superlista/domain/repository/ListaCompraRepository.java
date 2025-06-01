package es.superlista.domain.repository;

import es.superlista.domain.entity.ListaCompra;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Repositorio JPA para la entidad {@link ListaCompra}.
 * Proporciona operaciones CRUD y consultas personalizadas sobre las listas de compra.
 */
public interface ListaCompraRepository extends JpaRepository<ListaCompra, Long> {

    /**
     * Obtiene todas las listas de compra asociadas a un usuario específico.
     *
     * @param usuarioId identificador del usuario
     * @return lista de {@link ListaCompra} pertenecientes al usuario
     */
    List<ListaCompra> findAllByUsuarioId(Long usuarioId);
}
