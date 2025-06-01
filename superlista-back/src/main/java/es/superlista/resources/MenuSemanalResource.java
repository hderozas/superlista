package es.superlista.resources;

import es.superlista.domain.dto.*;
import es.superlista.security.CustomUserDetails;
import es.superlista.security.annotation.PermisoAdminOrUser;
import es.superlista.services.MenuSemanalService;
import es.superlista.utils.ResponseUtils;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para gestionar operaciones relacionadas con los menús semanales.
 * Permite crear, consultar, actualizar, eliminar menús y gestionar sus recetas.
 */
@PermisoAdminOrUser
@RestController
@RequestMapping("/menu")
@Tag(name = "MenuSemanal", description = "Operaciones para el manejo de menús semanales")
public class MenuSemanalResource {

    private final MenuSemanalService menuSemanalService;

    /**
     * Constructor que inyecta el servicio de menús semanales.
     *
     * @param menuSemanalService servicio encargado de la lógica de negocio de menús
     */
    public MenuSemanalResource(MenuSemanalService menuSemanalService) {
        this.menuSemanalService = menuSemanalService;
    }

    /**
     * Crea un nuevo menú semanal para el usuario autenticado.
     *
     * @param request     DTO con las categorías del menú
     * @param userDetails detalles del usuario autenticado
     * @return respuesta API con el menú creado
     */
    @PostMapping("/nuevo")
    public ResponseEntity<ApiRespuesta<MenuSemanalDto>> crearMenuSemanal(
            @Valid @RequestBody MenuSemanalCreateDto request,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        // 1) Saca el ID del usuario autenticado, no del DTO
        Long usuarioId = userDetails.getId();

        // 2) Llama al servicio pasando ese ID
        MenuSemanalDto dto = menuSemanalService.crearMenuSemanal(request, usuarioId);
        return ResponseEntity.ok(ResponseUtils.generarRespuesta(dto));
    }

    /**
     * Obtiene los detalles de un menú semanal específico del usuario autenticado.
     *
     * @param id          identificador del menú
     * @param userDetails detalles del usuario autenticado
     * @return respuesta API con el menú solicitado
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiRespuesta<MenuSemanalDto>> obtenerMenu(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails   // o tu CustomUserDetails
    ) {
        // Extrae el userId del principal; adapta según tu UserDetails
        Long usuarioId = ((CustomUserDetails)userDetails).getId();

        MenuSemanalDto dto = menuSemanalService.obtenerMenuSemanal(id, usuarioId);
        return ResponseEntity.ok(ResponseUtils.generarRespuesta(dto));
    }

    /**
     * Añade una receta a un menú semanal existente.
     *
     * @param req DTO con los datos de la receta y su posición en el menú
     * @return respuesta API indicando éxito o fallo
     */
    @PostMapping("/addreceta")
    public ResponseEntity<ApiRespuesta<Boolean>> addReceta(
            @Valid @RequestBody AddRecetaDto req) {
        return ResponseEntity
                .ok(ResponseUtils.generarRespuesta(menuSemanalService.agregarReceta(req.getMenuId(), req.getDia(), req.getCategoria(), req.getRecetaId())));
    }

    /**
     * Obtiene todos los menús semanales asociados al usuario autenticado.
     *
     * @param userDetails detalles del usuario autenticado
     * @return respuesta API con la lista de menús del usuario
     */
    @GetMapping("/mis-menus")
    public ResponseEntity<ApiRespuesta<List<MenuSemanalDto>>> obtenerMisMenus(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        Long usuarioId = userDetails.getId();
        return ResponseEntity.ok(
                ResponseUtils.generarRespuesta(menuSemanalService.obtenerMenusDeUsuario(usuarioId))
        );
    }

    /**
     * Actualiza las recetas asociadas a un menú semanal.
     *
     * @param dto DTO con las nuevas recetas por día y categoría
     * @return respuesta HTTP vacía con estado OK
     */
    @PutMapping("/recetas")
    public ResponseEntity<Void> actualizarRecetasMenu(@RequestBody ActualizarRecetasMenuDto dto) {
        menuSemanalService.actualizarRecetas(dto);
        return ResponseEntity.ok().build();
    }

    /**
     * Elimina un menú semanal específico.
     *
     * @param menuId identificador del menú a eliminar
     * @return respuesta HTTP vacía con estado NO_CONTENT
     */
    @DeleteMapping("/{menuId}")
    public ResponseEntity<?> eliminarMenu(@PathVariable Long menuId) {
        menuSemanalService.eliminarMenu(menuId);
        return ResponseEntity.noContent().build();
    }



}
