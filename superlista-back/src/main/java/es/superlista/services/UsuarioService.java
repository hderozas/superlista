package es.superlista.services;

import es.superlista.domain.dto.ActualizarUsuarioDto;
import es.superlista.domain.dto.UsuarioDto;
import jakarta.validation.Valid;

/**
 * Interfaz de servicio para gestionar operaciones relacionadas con usuarios.
 * Define los métodos principales para obtener, registrar y actualizar usuarios.
 */
public interface UsuarioService {

    /**
     * Obtiene los datos de un usuario por su identificador.
     *
     * @param id identificador del usuario
     * @return DTO con los datos del usuario encontrado
     */
    UsuarioDto obtenerUsuarioPorId(Long id);

    /**
     * Da de alta un nuevo usuario en el sistema.
     *
     * @param usuarioDto DTO con los datos del usuario a registrar
     * @return true si la operación fue exitosa, false en caso contrario
     */
    Boolean altaUsuario(@Valid UsuarioDto usuarioDto);

    /**
     * Actualiza los datos de un usuario existente.
     *
     * @param actualizarUsuarioDto DTO con los datos actualizados del usuario
     * @return true si la operación fue exitosa, false en caso contrario
     */
    Boolean actualizarUsuario(@Valid ActualizarUsuarioDto actualizarUsuarioDto);
}
