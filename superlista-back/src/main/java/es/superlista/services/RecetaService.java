package es.superlista.services;

import es.superlista.domain.dto.RecetaDto;
import jakarta.validation.Valid;

import java.util.List;

/**
 * Interfaz de servicio para gestionar operaciones relacionadas con recetas.
 * Define los métodos principales para alta, actualización, eliminación y consulta de recetas.
 */
public interface RecetaService {

    /**
     * Da de alta una nueva receta en el sistema.
     *
     * @param request DTO con los datos de la receta a registrar
     * @return true si la operación fue exitosa, false en caso contrario
     */
    Boolean altaReceta(RecetaDto request);

    /**
     * Actualiza los datos de una receta existente.
     *
     * @param request DTO con los datos actualizados de la receta
     * @return true si la operación fue exitosa, false en caso contrario
     */
    Boolean actualizarReceta(RecetaDto request);

    /**
     * Elimina una receta del sistema.
     *
     * @param request DTO identificando la receta a eliminar
     * @return true si la operación fue exitosa, false en caso contrario
     */
    Boolean eliminarReceta(RecetaDto request);

    /**
     * Busca recetas cuyo nombre coincida (parcial o totalmente) con el valor proporcionado.
     *
     * @param nombre nombre o fragmento a buscar
     * @return lista de DTOs de recetas coincidentes
     */
    List<RecetaDto> buscarRecetaPorNombre(@Valid String nombre);

    /**
     * Obtiene todas las recetas registradas en el sistema.
     *
     * @return lista completa de DTOs de recetas
     */
    List<RecetaDto> buscarTodasRecetas();
}
