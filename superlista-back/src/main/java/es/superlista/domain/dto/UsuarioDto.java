package es.superlista.domain.dto;

import es.superlista.domain.enumeration.Rol;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO (Data Transfer Object) que representa a un usuario dentro de la aplicación.
 * Incluye información personal, credenciales, rol, fecha de creación,
 * y las listas de compra y menús semanales asociados.
 */
@Getter
@Setter
public class UsuarioDto implements Serializable {
    
    private static final long serialVersionUID = -2222621554900739028L;

    /**
     * Identificador único del usuario.
     */
    private Long id;

    /**
     * Nombre de usuario (username) utilizado para autenticación.
     */
    private String username;

    /**
     * Contraseña del usuario.
     */
    private String password;

    /**
     * Nombre personal del usuario.
     */
    private String nombre;

    /**
     * Apellido del usuario.
     */
    private String apellido;

    /**
     * Correo electrónico del usuario.
     */
    private String email;

    /**
     * Rol asignado al usuario (por ejemplo, ADMIN, USER).
     */
    private Rol rol;

    /**
     * Fecha y hora de creación del usuario.
     */
    private LocalDateTime fechaCreacion;

    /**
     * Listas de la compra asociadas al usuario.
     */
    private List<ListaCompraDto> listaCompras;

    /**
     * Menús semanales asociados al usuario.
     */
    private List<MenuSemanalDto> menuSemanal;
}
