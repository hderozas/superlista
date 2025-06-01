package es.superlista.security.annotation;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.*;

/**
 * Anotación personalizada para restringir acceso solo a usuarios con el rol USER.
 * Al aplicarse a métodos o clases, asegura que únicamente los usuarios con permisos de usuario estándar
 * puedan ejecutar la operación.
 *
 * Equivale internamente a {@code @PreAuthorize("hasRole('USER')")}.
 */
@Target({ ElementType.METHOD, ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
@PreAuthorize("hasRole('USER')")
public @interface PermisoUser {
}
