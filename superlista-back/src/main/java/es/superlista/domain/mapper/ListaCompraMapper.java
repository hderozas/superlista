package es.superlista.domain.mapper;

import es.superlista.domain.dto.ListaCompraDto;
import es.superlista.domain.entity.ListaCompra;
import org.mapstruct.*;

/**
 * Mapper MapStruct para convertir entre la entidad {@link ListaCompra} y su DTO {@link ListaCompraDto}.
 * Permite mapear datos entre las capas de persistencia y transferencia de la aplicación.
 */
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface ListaCompraMapper {
    /**
     * Convierte una entidad {@link ListaCompra} a su representación DTO.
     *
     * @param listaCompra entidad a convertir
     * @return el DTO resultante
     */
    ListaCompraDto toDto(ListaCompra listaCompra);
    /**
     * Convierte un DTO {@link ListaCompraDto} a su entidad correspondiente.
     *
     * @param listaCompraDto DTO a convertir
     * @return la entidad resultante
     */
    ListaCompra toEntity(ListaCompraDto listaCompraDto);

    /**
     * Realiza una actualización parcial de una entidad {@link ListaCompra}
     * usando solo los campos no nulos del DTO proporcionado.
     *
     * @param listaCompraDto DTO con los nuevos valores
     * @param listaCompra    entidad objetivo a actualizar
     * @return la entidad actualizada
     */
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    ListaCompra partialUpdate(ListaCompraDto listaCompraDto, @MappingTarget ListaCompra listaCompra);
}
