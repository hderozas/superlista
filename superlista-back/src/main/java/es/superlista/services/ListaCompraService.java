package es.superlista.services;

import es.superlista.domain.dto.ListaCompraDto;

import java.util.List;

/**
 * Interfaz de servicio para gestionar operaciones relacionadas con las listas de compra.
 * Define los métodos principales para generar, modificar, eliminar y consultar listas.
 */
public interface ListaCompraService {

    /**
     * Genera una nueva lista de la compra a partir de un menú semanal.
     *
     * @param menuId    identificador del menú semanal
     * @param usuarioId identificador del usuario propietario
     * @return DTO de la lista de compra generada
     */
    ListaCompraDto generarListaCompra(Long menuId, Long usuarioId);

    /**
     * Añade ingredientes a una lista de compra existente.
     *
     * @param listaId        identificador de la lista de compra
     * @param usuarioId      identificador del usuario propietario
     * @param ingredienteIds lista de identificadores de ingredientes a añadir
     * @return DTO de la lista de compra actualizada
     */
    ListaCompraDto addItems(Long listaId, Long usuarioId, List<Long> ingredienteIds);

    /**
     * Quita ingredientes de una lista de compra existente.
     *
     * @param listaId        identificador de la lista de compra
     * @param usuarioId      identificador del usuario propietario
     * @param ingredienteIds lista de identificadores de ingredientes a quitar
     * @return DTO de la lista de compra actualizada
     */
    ListaCompraDto removeItems(Long listaId, Long usuarioId, List<Long> ingredienteIds);

    /**
     * Elimina una lista de compra del sistema.
     *
     * @param listaCompraId identificador de la lista a eliminar
     * @param usuarioId     identificador del usuario propietario
     */
    void eliminarLista(Long listaCompraId, Long usuarioId);

    /**
     * Obtiene todas las listas de compra asociadas a un usuario específico.
     *
     * @param id identificador del usuario
     * @return lista de DTOs de listas de compra del usuario
     */
    List<ListaCompraDto> obtenerListasDelUsuario(Long id);
}
