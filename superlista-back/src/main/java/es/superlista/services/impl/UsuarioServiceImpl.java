package es.superlista.services.impl;

import es.superlista.domain.dto.ActualizarUsuarioDto;
import es.superlista.domain.dto.UsuarioDto;
import es.superlista.domain.entity.Usuario;
import es.superlista.domain.enumeration.Rol;
import es.superlista.domain.mapper.UsuarioMapper;
import es.superlista.domain.repository.UsuarioRepository;
import es.superlista.exception.ProcesoException;
import es.superlista.services.UsuarioService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Implementación del servicio {@link UsuarioService}.
 * Gestiona las operaciones de negocio relacionadas con usuarios, incluyendo su registro, consulta
 * y actualización de datos y contraseñas.
 */
@Service
@Transactional
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final UsuarioMapper usuarioMapper;
    private final PasswordEncoder passwordEncoder;

    /**
     * Constructor que inyecta los repositorios, mappers y servicios necesarios.
     *
     * @param usuarioRepository repositorio de usuarios
     * @param usuarioMapper     mapper para convertir entre entidad y DTO
     * @param passwordEncoder   encoder para cifrar contraseñas
     */
    public UsuarioServiceImpl(UsuarioRepository usuarioRepository, UsuarioMapper usuarioMapper, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.usuarioMapper = usuarioMapper;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public UsuarioDto obtenerUsuarioPorId(Long id) {
        return usuarioRepository.findById(id).map(usuarioMapper::toDto)
                .orElseThrow(() -> new ProcesoException("No se ha encontrado el usuario por el mail indicado."));
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Boolean altaUsuario(UsuarioDto usuarioDto) {
        // Verifica si ya existe un usuario con el correo
        if (usuarioRepository.existsByEmailIgnoreCase(usuarioDto.getEmail())) {
            throw new ProcesoException("Ya existe un usuario con el correo: " + usuarioDto.getEmail());
        }
        // Verifica si ya existe un usuario con el mismo nombre de usuario
        if (usuarioRepository.existsByUsernameIgnoreCase(usuarioDto.getUsername())) {
            throw new ProcesoException("El nombre de usuario ya se encuentra en uso.");
        }
        try {
            usuarioDto.setRol(Rol.USER);
            // Convierte el DTO a entidad
            Usuario usuario = usuarioMapper.toEntity(usuarioDto);
            // Opcional: aquí podrías, por ejemplo, cifrar la contraseña antes de guardarla
            usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
            // Persiste el usuario y lo convierte a DTO para la respuesta
            usuarioRepository.save(usuario);
            return true;
        } catch (Exception e) {
            throw new ProcesoException("Hubo un error al registrar el usuario.", e);
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional
    public Boolean actualizarUsuario(ActualizarUsuarioDto dto) {
        // Buscar usuario por username
        Usuario usuario = usuarioRepository.findByUsernameIgnoreCase(dto.getUsername())
                .orElseThrow(() -> new ProcesoException("Usuario no encontrado"));

        // Actualizar datos básicos
        usuario.setNombre(dto.getNombre());
        usuario.setApellido(dto.getApellido());
        usuario.setEmail(dto.getEmail());

        // Si se quiere cambiar la contraseña
        if (dto.getPasswordAntiguo() != null && dto.getPasswordNuevo() != null &&
                !dto.getPasswordAntiguo().isBlank() && !dto.getPasswordNuevo().isBlank()) {

            // Comprobar que la contraseña antigua coincide
            if (!passwordEncoder.matches(dto.getPasswordAntiguo(), usuario.getPassword())) {
                throw new ProcesoException("La contraseña antigua no es correcta");
            }

            // Establecer la nueva contraseña
            usuario.setPassword(passwordEncoder.encode(dto.getPasswordNuevo()));
        }

        // Guardar cambios
        usuarioRepository.save(usuario);

        return true;
    }
}
