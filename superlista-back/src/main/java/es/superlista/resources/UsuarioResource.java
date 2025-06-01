package es.superlista.resources;

import es.superlista.domain.dto.ActualizarUsuarioDto;
import es.superlista.domain.dto.ApiRespuesta;
import es.superlista.domain.dto.UsuarioDto;
import es.superlista.security.CustomUserDetails;
import es.superlista.security.annotation.PermisoAdminOrUser;
import es.superlista.services.UsuarioService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static es.superlista.utils.ResponseUtils.generarRespuesta;

/**
 * Controlador REST para gestionar operaciones relacionadas con los usuarios.
 * Permite registrar nuevos usuarios, actualizar información y consultar datos del usuario autenticado.
 */
@PermisoAdminOrUser
@RestController
@RequestMapping("/usuarios")
@Tag(name = "Usuarios", description = "Operaciones relacionadas con el manejo de usuarios")
public class UsuarioResource {
    private final UsuarioService usuarioService;

    /**
     * Constructor que inyecta el servicio de usuarios.
     *
     * @param usuarioService servicio encargado de la lógica de negocio de usuarios
     */
    public UsuarioResource(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    /**
     * Obtiene los datos del usuario autenticado.
     *
     * @param userDetails detalles del usuario autenticado
     * @return respuesta API con los datos del usuario
     */
    @PostMapping
    public ResponseEntity<ApiRespuesta<UsuarioDto>> obtenerUsuarioPorEmail (
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok().body(generarRespuesta(this.usuarioService.obtenerUsuarioPorId(userDetails.getId())));
    }

    /**
     * Da de alta un nuevo usuario en el sistema.
     *
     * @param usuarioDto DTO con los datos del nuevo usuario
     * @return respuesta API indicando éxito o fallo
     */
    @PostMapping("/nuevo")
    public ResponseEntity<ApiRespuesta<Boolean>> altaUsuario(
            @Valid @RequestBody UsuarioDto usuarioDto) {
        return ResponseEntity.ok().body(generarRespuesta(usuarioService.altaUsuario(usuarioDto)));
    }

    /**
     * Actualiza los datos del usuario autenticado.
     *
     * @param userDetails detalles del usuario autenticado
     * @param usuarioDto  DTO con los datos actualizados
     * @return respuesta API indicando éxito o fallo
     */
    @PostMapping("/actualizar")
    public ResponseEntity<ApiRespuesta<Boolean>> actualizarUsuario(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody ActualizarUsuarioDto usuarioDto) {
        return ResponseEntity.ok().body(generarRespuesta(usuarioService.actualizarUsuario(usuarioDto)));
    }
}
