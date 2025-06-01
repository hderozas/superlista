package es.superlista.security.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

/**
 * DTO que representa la respuesta tras un inicio de sesión exitoso.
 * Contiene el token JWT generado para el usuario autenticado.
 */
@Data
@AllArgsConstructor
public class LoginResponse implements Serializable {
    private static final long serialVersionUID = -6230235014309547614L;
    /**
     * El token que se envía en la response
     */
    private String token;
}
