package es.superlista.domain.dto;

import lombok.Builder;
import lombok.Data;
import java.io.Serializable;
import java.util.List;

/**
 * DTO (Data Transfer Object) que representa una lista de la compra.
 * Contiene el identificador de la lista, el usuario propietario y los ingredientes incluidos.
 */
@Data
@Builder
public class ListaCompraDto implements Serializable {
    private static final long serialVersionUID = 2566672399711568451L;

    /**
     * Identificador único de la lista de la compra.
     */
    private Long id;

    /**
     * Identificador del usuario propietario de la lista.
     */
    private Long usuarioId;

    /**
     * Lista de ingredientes incluidos en la lista de la compra.
     */
    private List<IngredienteSimpleDto> items;

}
