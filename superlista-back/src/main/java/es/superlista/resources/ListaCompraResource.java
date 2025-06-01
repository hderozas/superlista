package es.superlista.resources;

import es.superlista.domain.dto.*;
import es.superlista.security.CustomUserDetails;
import es.superlista.security.annotation.PermisoAdminOrUser;
import es.superlista.services.ListaCompraService;
import es.superlista.utils.ResponseUtils;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para gestionar las listas de la compra del usuario.
 * Permite generar listas, añadir y quitar ingredientes, eliminar listas completas y consultar las listas del usuario.
 */
@PermisoAdminOrUser
@RestController
@RequestMapping("/listacompra")
public class ListaCompraResource {

    private final ListaCompraService listaService;

    /**
     * Constructor que inyecta el servicio de listas de compra.
     *
     * @param listaService servicio encargado de la lógica de negocio de listas de compra
     */
    public ListaCompraResource(ListaCompraService listaService) {
        this.listaService = listaService;
    }

    /**
     * Genera una nueva lista de la compra a partir de un menú semanal.
     *
     * @param request      datos del menú para generar la lista
     * @param userDetails  detalles del usuario autenticado
     * @return respuesta API con la lista generada
     */
    @PostMapping("/generar")
    public ResponseEntity<ApiRespuesta<ListaCompraDto>> generarLista(
            @Valid @RequestBody GenerarListaDto request,
            @AuthenticationPrincipal UserDetails userDetails) {

        Long usuarioId = ((CustomUserDetails)userDetails).getId();
        ListaCompraDto dto = listaService.generarListaCompra(request.getMenuId(), usuarioId);
        return ResponseEntity.ok(ResponseUtils.generarRespuesta(dto));
    }

    /**
     * Añade ingredientes a una lista de la compra.
     *
     * @param request     datos con los IDs de ingredientes a añadir
     * @param userDetails detalles del usuario autenticado
     * @return respuesta API con la lista actualizada
     */
    @PostMapping("/items/anadir")
    public ResponseEntity<ApiRespuesta<ListaCompraDto>> anadirItems(
            @Valid @RequestBody ModificarItemsDto request,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long usuarioId = userDetails.getId();
        ListaCompraDto dto = listaService.addItems(
                request.getListaCompraId(),
                usuarioId,
                request.getIngredienteIds());
        return ResponseEntity.ok(ResponseUtils.generarRespuesta(dto));
    }

    /**
     * Quita ingredientes de una lista de la compra.
     *
     * @param request     datos con los IDs de ingredientes a quitar
     * @param userDetails detalles del usuario autenticado
     * @return respuesta API con la lista actualizada
     */
    @PostMapping("/items/quitar")
    public ResponseEntity<ApiRespuesta<ListaCompraDto>> quitarItems(
            @Valid @RequestBody ModificarItemsDto request,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long usuarioId = userDetails.getId();
        ListaCompraDto dto = listaService.removeItems(
                request.getListaCompraId(),
                usuarioId,
                request.getIngredienteIds());
        return ResponseEntity.ok(ResponseUtils.generarRespuesta(dto));
    }

    /**
     * Elimina una lista de la compra completa.
     *
     * @param request     datos con el ID de la lista a eliminar
     * @param userDetails detalles del usuario autenticado
     * @return respuesta API indicando éxito o fallo
     */
    @PostMapping("/eliminar")
    public ResponseEntity<ApiRespuesta<Void>> eliminarLista(
            @Valid @RequestBody EliminarListaDto request,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        listaService.eliminarLista(request.getListaCompraId(), userDetails.getId());
        return ResponseEntity.ok(ResponseUtils.generarRespuesta(null));
    }

    /**
     * Obtiene todas las listas de la compra asociadas al usuario autenticado.
     *
     * @param userDetails detalles del usuario autenticado
     * @return respuesta API con la lista de todas las listas de compra del usuario
     */
    @GetMapping("/mislistas")
    public ResponseEntity<ApiRespuesta<List<ListaCompraDto>>> obtenerMisListas(
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        List<ListaCompraDto> listas = listaService.obtenerListasDelUsuario(userDetails.getId());
        return ResponseEntity.ok(ResponseUtils.generarRespuesta(listas));
    }
}

