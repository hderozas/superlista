package es.superlista.domain.mapper;

import es.superlista.domain.dto.RecetaDto;
import es.superlista.domain.entity.Receta;
import org.mapstruct.*;

/**
 * Mapper MapStruct para convertir entre la entidad {@link Receta} y su DTO {@link RecetaDto}.
 * Permite mapear datos entre las capas de persistencia y transferencia de la aplicación.
 */
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface RecetaMapper {

    /**
     * Convierte una entidad {@link Receta} a su representación DTO.
     *
     * @param receta entidad a convertir
     * @return el DTO resultante
     */
    RecetaDto toDto(Receta receta);
    /**
     * Convierte un DTO {@link RecetaDto} a su entidad correspondiente.
     *
     * @param recetaDto DTO a convertir
     * @return la entidad resultante
     */
    Receta toEntity(RecetaDto recetaDto);

    /**
     * Realiza una actualización parcial de una entidad {@link Receta}
     * usando solo los campos no nulos del DTO proporcionado.
     *
     * @param recetaDto DTO con los nuevos valores
     * @param receta    entidad objetivo a actualizar
     * @return la entidad actualizada
     */
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Receta partialUpdate(RecetaDto recetaDto, @MappingTarget Receta receta);
}
