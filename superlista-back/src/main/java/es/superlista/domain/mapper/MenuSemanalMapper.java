package es.superlista.domain.mapper;

import es.superlista.domain.dto.MenuSemanalDto;
import es.superlista.domain.entity.menu_semanal.MenuSemanal;
import org.mapstruct.*;

/**
 * Mapper MapStruct para convertir entre la entidad {@link MenuSemanal} y su DTO {@link MenuSemanalDto}.
 * Permite mapear datos entre las capas de persistencia y transferencia, incluyendo relaciones con usuario e ítems.
 */
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING, uses = DiaComidaMapper.class)
public interface MenuSemanalMapper {

    /**
     * Convierte una entidad {@link MenuSemanal} a su representación DTO.
     * Mapea el identificador del usuario propietario al campo {@code usuarioId}.
     *
     * @param menuSemanal entidad a convertir
     * @return el DTO resultante
     */
    @Mapping(source = "usuario.id", target = "usuarioId")
    MenuSemanalDto toDto(MenuSemanal menuSemanal);

    /**
     * Convierte un DTO {@link MenuSemanalDto} a su entidad correspondiente.
     *
     * @param menuSemanalDto DTO a convertir
     * @return la entidad resultante
     */
    MenuSemanal toEntity(MenuSemanalDto menuSemanalDto);

    /**
     * Realiza una actualización parcial de una entidad {@link MenuSemanal}
     * usando solo los campos no nulos del DTO proporcionado.
     *
     * @param menuSemanalDto DTO con los nuevos valores
     * @param menuSemanal    entidad objetivo a actualizar
     * @return la entidad actualizada
     */
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    MenuSemanal partialUpdate(MenuSemanalDto menuSemanalDto, @MappingTarget MenuSemanal menuSemanal);

}
