package es.superlista.domain.mapper;

import es.superlista.domain.dto.IngredienteSimpleDto;
import es.superlista.domain.entity.Ingrediente;
import org.mapstruct.*;

/**
 * Mapper MapStruct para convertir entre la entidad {@link Ingrediente} y su DTO simplificado {@link IngredienteSimpleDto}.
 * Permite mapear solo la información básica del ingrediente entre las capas de persistencia y transferencia.
 */
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface IngredienteSimpleMapper {

    /**
     * Convierte una entidad {@link Ingrediente} a su representación simplificada DTO.
     *
     * @param ingrediente entidad a convertir
     * @return el DTO simplificado resultante
     */
    IngredienteSimpleDto toDto(Ingrediente ingrediente);
    /**
     * Convierte un DTO simplificado {@link IngredienteSimpleDto} a su entidad correspondiente.
     *
     * @param ingredienteSimpleDto DTO a convertir
     * @return la entidad resultante
     */
    Ingrediente toEntity(IngredienteSimpleDto ingredienteSimpleDto);

    /**
     * Realiza una actualización parcial de una entidad {@link Ingrediente}
     * usando solo los campos no nulos del DTO simplificado proporcionado.
     *
     * @param ingredienteSimpleDto DTO con los nuevos valores
     * @param ingrediente          entidad objetivo a actualizar
     * @return la entidad actualizada
     */
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Ingrediente partialUpdate(IngredienteSimpleDto ingredienteSimpleDto, @MappingTarget Ingrediente ingrediente);
}
