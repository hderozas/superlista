package es.superlista.security;

import es.superlista.domain.entity.Usuario;
import lombok.Getter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.List;

/**
 * Implementación personalizada de {@link User} de Spring Security.
 * Permite incorporar información adicional del usuario, como su ID único.
 */
@Getter
public class CustomUserDetails extends User {

    /**
     * Identificador único del usuario en la base de datos.
     */
    private final Long id;

    /**
     * Construye un objeto {@code CustomUserDetails} a partir de la entidad {@link Usuario}.
     *
     * @param usuario entidad de usuario desde la base de datos
     */
    public CustomUserDetails(Usuario usuario) {
        super(
                usuario.getUsername(),
                usuario.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_" + usuario.getRol().name()))
        );
        this.id = usuario.getId();
    }
}
