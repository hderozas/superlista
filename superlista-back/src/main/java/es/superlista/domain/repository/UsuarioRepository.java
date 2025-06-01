package es.superlista.domain.repository;

import es.superlista.domain.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Repositorio JPA para la entidad {@link Usuario}.
 * Proporciona operaciones CRUD y consultas personalizadas sobre los usuarios.
 */
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    /**
     * Busca un usuario por su correo electrónico, ignorando mayúsculas y minúsculas, usando coincidencia parcial.
     *
     * @param email correo electrónico a buscar
     * @return usuario encontrado (si existe)
     */
    Optional<Usuario> findByEmailLikeIgnoreCase(String email);

    /**
     * Verifica si existe un usuario con un correo electrónico exacto, ignorando mayúsculas y minúsculas.
     *
     * @param email correo electrónico a verificar
     * @return true si existe, false en caso contrario
     */
    boolean existsByEmailIgnoreCase(String email);


    /**
     * Verifica si existe un usuario con un nombre de usuario exacto, ignorando mayúsculas y minúsculas.
     *
     * @param username nombre de usuario a verificar
     * @return true si existe, false en caso contrario
     */
    boolean existsByUsernameIgnoreCase(String username);

    /**
     * Busca un usuario por su nombre de usuario, ignorando mayúsculas y minúsculas.
     *
     * @param username nombre de usuario a buscar
     * @return usuario encontrado (si existe)
     */
    Optional<Usuario> findByUsernameIgnoreCase(String username);
}
