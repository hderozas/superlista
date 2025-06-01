package es.superlista.domain.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;


/**
 * DTO (Data Transfer Object) que representa una receta.
 * Contiene el identificador, el nombre de la receta y la lista de ingredientes asociados.
 */
@Getter
@Setter
public class RecetaDto implements Serializable {

    private static final long serialVersionUID = 2566672399711568451L;

    /**
     * Identificador único de la receta.
     */
    private Long id;

    /**
     * Nombre de la receta.
     */
    private String nombre;

    /**
     * Lista de ingredientes incluidos en la receta.
     */
    private List<IngredienteSimpleDto> ingredientes;

}
