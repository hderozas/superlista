package es.superlista.domain.mapper;

import es.superlista.domain.dto.UsuarioDto;
import es.superlista.domain.entity.Usuario;
import org.mapstruct.*;

/**
 * Mapper MapStruct para convertir entre la entidad {@link Usuario} y su DTO {@link UsuarioDto}.
 * Permite mapear datos entre las capas de persistencia y transferencia de la aplicación.
 */
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface UsuarioMapper {

    /**
     * Convierte una entidad {@link Usuario} a su representación DTO.
     *
     * @param usuario entidad a convertir
     * @return el DTO resultante
     */
    UsuarioDto toDto(Usuario usuario);

    /**
     * Convierte un DTO {@link UsuarioDto} a su entidad correspondiente.
     *
     * @param usuarioDto DTO a convertir
     * @return la entidad resultante
     */
    Usuario toEntity(UsuarioDto usuarioDto);

    /**
     * Realiza una actualización parcial de una entidad {@link Usuario}
     * usando solo los campos no nulos del DTO proporcionado.
     *
     * @param usuarioDto DTO con los nuevos valores
     * @param usuario    entidad objetivo a actualizar
     * @return la entidad actualizada
     */
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Usuario partialUpdate(UsuarioDto usuarioDto, @MappingTarget Usuario usuario);

}
