package es.superlista.domain.mapper;

import es.superlista.domain.dto.DiaComidaDto;
import es.superlista.domain.entity.menu_semanal.DiaComida;
import org.mapstruct.*;

/**
 * Mapper MapStruct para convertir entre la entidad {@link DiaComida} y su DTO {@link DiaComidaDto}.
 * Se encarga de mapear datos entre las capas de persistencia y transferencia de la aplicación.
 */
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING, uses = RecetaMapper.class)
public interface DiaComidaMapper {

    /**
     * Convierte una entidad {@link DiaComida} a su representación DTO.
     *
     * @param diaComida entidad a convertir
     * @return el DTO resultante
     */
    DiaComidaDto toDto(DiaComida diaComida);
    /**
     * Convierte un DTO {@link DiaComidaDto} a su entidad correspondiente.
     *
     * @param diaComidaDto DTO a convertir
     * @return la entidad resultante
     */
    DiaComida toEntity(DiaComidaDto diaComidaDto);

    /**
     * Realiza una actualización parcial de una entidad {@link DiaComida}
     * usando solo los campos no nulos del DTO proporcionado.
     *
     * @param diaComidaDto DTO con los nuevos valores
     * @param diaComida    entidad objetivo a actualizar
     * @return la entidad actualizada
     */
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    DiaComida partialUpdate(DiaComidaDto diaComidaDto, @MappingTarget DiaComida diaComida);

}
