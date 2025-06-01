package es.superlista.security.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * DTO que representa la solicitud de inicio de sesión (login).
 * Contiene las credenciales que el usuario envía para autenticarse.
 */
@Data
public class LoginRequest {
    /**
     * Nombre de usuario (username) del usuario que intenta iniciar sesión.
     * Este campo es obligatorio.
     */
    @NotBlank(message = "El nombre de usuario es obligatorio")
    private String username;

    /**
     * Contraseña del usuario.
     * Este campo es obligatorio.
     */
    @NotBlank(message = "La contraseña es obligatoria")
    private String password;
}