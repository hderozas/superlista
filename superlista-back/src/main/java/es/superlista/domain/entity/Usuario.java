package es.superlista.domain.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import es.superlista.domain.entity.menu_semanal.MenuSemanal;
import es.superlista.domain.enumeration.Rol;
import es.superlista.utils.BBDD;
import es.superlista.utils.Numeros;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Entidad que representa a un usuario dentro de la aplicación.
 * Incluye credenciales, datos personales, rol, fecha de creación
 * y las listas de compra y menús semanales asociados.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = BBDD.Tablas.USUARIO)
@Entity
public class Usuario {

    /**
     * Identificador único del usuario.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Nombre de usuario (username) utilizado para autenticación.
     */
    @Size(max = Numeros.CINCUENTA)
    @Column(name = BBDD.Columnas.USERNAME)
    private String username;

    /**
     * Contraseña del usuario (en formato cifrado).
     */
    @Size(max = Numeros.CIEN)
    @Column(name = BBDD.Columnas.PASSWORD)
    private String password;

    /**
     * Nombre personal del usuario.
     */
    @Size(max = Numeros.CINCUENTA)
    @Column(name = BBDD.Columnas.NOMBRE)
    private String nombre;

    /**
     * Apellido del usuario.
     */
    @Size(max = Numeros.CINCUENTA)
    @Column(name = BBDD.Columnas.APELLIDO)
    private String apellido;

    /**
     * Correo electrónico del usuario.
     */
    @Size(max = Numeros.CINCUENTA)
    @Column(name = BBDD.Columnas.EMAIL)
    private String email;

    /**
     * Rol asignado al usuario (por ejemplo, ADMIN, USER).
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Rol rol;

    /**
     * Fecha y hora de creación del usuario (generada automáticamente).
     */
    @CreationTimestamp
    @Column(name = BBDD.Columnas.FECHA_CREACION, nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    /**
     * Listas de la compra asociadas al usuario.
     */
    @OneToMany(
            mappedBy = "usuario",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    @JsonManagedReference("usuario-listas")
    private List<ListaCompra> listaCompras;

    /**
     * Menús semanales asociados al usuario.
     */
    @OneToMany(
            mappedBy = "usuario",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    @JsonManagedReference("usuario-menus")
    private List<MenuSemanal> menuSemanal;
}
