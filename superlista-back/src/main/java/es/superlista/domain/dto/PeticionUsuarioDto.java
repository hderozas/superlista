package es.superlista.domain.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

/**
 * DTO (Data Transfer Object) utilizado para peticiones relacionadas con un usuario.
 * Contiene únicamente el correo electrónico del usuario.
 */
@Getter
@Setter
public class PeticionUsuarioDto implements Serializable {
    private static final long serialVersionUID = 5486605532260796484L;

    /**
     * Correo electrónico del usuario involucrado en la petición.
     */
    private String email;
}
