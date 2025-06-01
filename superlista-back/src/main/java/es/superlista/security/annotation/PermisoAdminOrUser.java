package es.superlista.security.annotation;


import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.*;

/**
 * Anotación personalizada para permitir acceso a usuarios con rol ADMIN o USER.
 * Al aplicarse a métodos o clases, garantiza que la operación solo pueda ser ejecutada
 * por usuarios autenticados que tengan uno de estos dos roles.
 *
 * Equivale internamente a {@code @PreAuthorize("hasAnyRole('ADMIN', 'USER')")}.
 */
@Target({ ElementType.METHOD, ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
public @interface PermisoAdminOrUser {
}
