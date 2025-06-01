package es.superlista.domain.mapper;

import es.superlista.domain.dto.IngredienteDto;
import es.superlista.domain.entity.Ingrediente;
import org.mapstruct.*;

/**
 * Mapper MapStruct para convertir entre la entidad {@link Ingrediente} y su DTO {@link IngredienteDto}.
 * Permite mapear datos entre las capas de persistencia y transferencia de la aplicación.
 */
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface IngredienteMapper {

    /**
     * Convierte una entidad {@link Ingrediente} a su representación DTO.
     *
     * @param ingrediente entidad a convertir
     * @return el DTO resultante
     */
    IngredienteDto toDto(Ingrediente ingrediente);
    /**
     * Convierte un DTO {@link IngredienteDto} a su entidad correspondiente.
     *
     * @param ingredienteDto DTO a convertir
     * @return la entidad resultante
     */
    Ingrediente toEntity(IngredienteDto ingredienteDto);

    /**
     * Realiza una actualización parcial de una entidad {@link Ingrediente}
     * usando solo los campos no nulos del DTO proporcionado.
     *
     * @param ingredienteDto DTO con los nuevos valores
     * @param ingrediente    entidad objetivo a actualizar
     * @return la entidad actualizada
     */
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Ingrediente partialUpdate(IngredienteDto ingredienteDto, @MappingTarget Ingrediente ingrediente);
}
