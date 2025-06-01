package es.superlista.security;

import es.superlista.domain.entity.Usuario;
import es.superlista.domain.repository.UsuarioRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Implementación personalizada del servicio {@link UserDetailsService} de Spring Security.
 * Se encarga de cargar los detalles del usuario desde la base de datos usando el repositorio {@link UsuarioRepository}.
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    /**
     * Constructor que inyecta el repositorio de usuarios.
     *
     * @param usuarioRepository repositorio para acceder a los usuarios en la base de datos
     */
    public CustomUserDetailsService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    /**
     * Carga los detalles del usuario por su nombre de usuario.
     *
     * @param username nombre de usuario
     * @return objeto {@link UserDetails} con la información del usuario autenticado
     * @throws UsernameNotFoundException si no se encuentra el usuario en la base de datos
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByUsernameIgnoreCase(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));

        return new CustomUserDetails(usuario);
    }
}
