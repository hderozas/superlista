package es.superlista.security.annotation;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.*;

/**
 * Anotación personalizada para restringir acceso solo a usuarios con el rol ADMIN.
 * Al aplicarse a métodos o clases, asegura que únicamente usuarios con permisos de administrador
 * puedan ejecutar la operación.
 *
 * Equivale internamente a {@code @PreAuthorize("hasRole('ADMIN')")}.
 */
@Target({ ElementType.METHOD, ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
@PreAuthorize("hasRole('ADMIN')")
public @interface PermisoAdmin {
}
