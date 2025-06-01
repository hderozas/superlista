package es.superlista.domain.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

/**
 * Clase de petición (request) que representa un objeto con un solo campo de nombre.
 * Utilizado para operaciones que requieren recibir un nombre como entrada.
 */
@Getter
@Setter
public class NombreRequest implements Serializable {
    private static final long serialVersionUID = 5486605532260796484L;

    /**
     * Nombre proporcionado en la petición.
     * Este campo es obligatorio y no puede estar en blanco.
     */
    @NotBlank
    private String nombre;

}
