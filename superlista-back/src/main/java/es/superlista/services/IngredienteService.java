package es.superlista.services;

import es.superlista.domain.dto.IngredienteDto;

import java.util.List;

/**
 * Interfaz de servicio para gestionar operaciones relacionadas con ingredientes.
 * Define los métodos principales para alta, actualización, eliminación y consulta de ingredientes.
 */
public interface IngredienteService {

    /**
     * Da de alta un nuevo ingrediente en el sistema.
     *
     * @param request DTO con los datos del ingrediente a registrar
     * @return true si la operación fue exitosa, false en caso contrario
     */
    Boolean altaIngrediente(IngredienteDto request);

    /**
     * Actualiza los datos de un ingrediente existente.
     *
     * @param request DTO con los datos actualizados del ingrediente
     * @return true si la operación fue exitosa, false en caso contrario
     */
    Boolean actualizarIngrediente(IngredienteDto request);

    /**
     * Elimina un ingrediente del sistema.
     *
     * @param request DTO identificando el ingrediente a eliminar
     * @return true si la operación fue exitosa, false en caso contrario
     */
    Boolean eliminarIngrediente(IngredienteDto request);

    /**
     * Obtiene todos los ingredientes pertenecientes a una categoría específica.
     *
     * @param categoria nombre de la categoría
     * @return lista de ingredientes encontrados
     */
    List<IngredienteDto> obtenerIngredientePorCategoria(String categoria);

    /**
     * Obtiene todos los ingredientes registrados en el sistema.
     *
     * @return lista completa de ingredientes
     */
    List<IngredienteDto> obtenerTodosIngredientes();
}
