package es.superlista.domain.repository;

import es.superlista.domain.entity.menu_semanal.DiaComida;
import es.superlista.domain.entity.menu_semanal.MenuSemanal;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repositorio JPA para la entidad {@link DiaComida}.
 * Proporciona operaciones CRUD y una operación personalizada para eliminar registros asociados a un menú semanal.
 */
public interface DiaComidaRepository extends JpaRepository<DiaComida, Long> {

    /**
     * Elimina todos los registros de {@link DiaComida} asociados a un {@link MenuSemanal} específico.
     *
     * @param menu el menú semanal cuyas entradas se deben eliminar
     */
    void deleteByMenuSemanal(MenuSemanal menu);
}
