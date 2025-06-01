package es.superlista.resources;

import es.superlista.domain.dto.ApiRespuesta;
import es.superlista.security.dto.LoginRequest;
import es.superlista.security.dto.LoginResponse;
import es.superlista.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

/**
 * Controlador REST para gestionar las operaciones de autenticación de usuarios.
 * Expone el endpoint de inicio de sesión (login) y gestiona la generación de tokens JWT.
 */
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    /**
     * Constructor que inyecta el {@link AuthenticationManager} y el utilitario {@link JwtUtil}.
     *
     * @param authenticationManager componente para gestionar la autenticación
     * @param jwtUtil               utilitario para generar tokens JWT
     */
    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    /**
     * Endpoint POST para realizar el login del usuario.
     * Autentica las credenciales y, si son válidas, devuelve un token JWT.
     *
     * @param loginRequest objeto con las credenciales del usuario
     * @return respuesta API con el token JWT en caso de éxito
     */
    @PostMapping("/login")
    public ResponseEntity<ApiRespuesta<LoginResponse>> login(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(), loginRequest.getPassword()
                    )
            );
            String token = jwtUtil.generateToken(authentication.getName());
            System.out.println("=== TOKEN GENERADO ===\n" + token);
            LoginResponse loginResponse = new LoginResponse(token);
            return ResponseEntity.ok(
                    ApiRespuesta.<LoginResponse>builder()
                            .estado(ApiRespuesta.Estado.EXITO)
                            .data(loginResponse)
                            .build()
            );
        } catch (AuthenticationException ex) {
            throw new RuntimeException("Credenciales inválidas", ex);
        }
    }
}
