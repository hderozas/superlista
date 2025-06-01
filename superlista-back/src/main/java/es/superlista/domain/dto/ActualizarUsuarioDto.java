package es.superlista.domain.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO (Data Transfer Object) utilizado para actualizar la información de un usuario existente.
 * Incluye datos personales, correo electrónico y, opcionalmente, contraseñas para actualización.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActualizarUsuarioDto {

    /**
     * Nombre de usuario (obligatorio, máximo 50 caracteres).
     */
    @NotBlank(message = "El nombre de usuario es obligatorio")
    @Size(max = 50)
    private String username;

    /**
     * Nombre real del usuario (obligatorio, máximo 50 caracteres).
     */
    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 50)
    private String nombre;

    /**
     * Apellidos del usuario (obligatorio, máximo 50 caracteres).
     */
    @NotBlank(message = "El apellido es obligatorio")
    @Size(max = 50)
    private String apellido;

    /**
     * Correo electrónico del usuario (obligatorio, debe tener formato válido).
     */
    @NotBlank(message = "El correo electrónico es obligatorio")
    @Email(message = "El correo electrónico no es válido")
    private String email;

    /**
     * Contraseña antigua (opcional, necesaria si se desea cambiar la contraseña).
     */
    private String passwordAntiguo;

    /**
     * Nueva contraseña (opcional, se establece si se proporciona la antigua).
     */
    private String passwordNuevo;
}
