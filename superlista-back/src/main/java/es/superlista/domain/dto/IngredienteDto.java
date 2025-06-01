package es.superlista.domain.dto;

import es.superlista.domain.enumeration.CategoriaIngrediente;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

/**
 * DTO (Data Transfer Object) que representa un ingrediente en la aplicación.
 * Incluye su identificador, nombre, categoría y las recetas asociadas en las que se utiliza.
 */
@Getter
@Setter
public class IngredienteDto implements Serializable {
    private static final long serialVersionUID = 600600814295297212L;

    /**
     * Identificador único del ingrediente.
     */
    private Long id;

    /**
     * Nombre del ingrediente.
     */
    private String nombre;

    /**
     * Categoría a la que pertenece el ingrediente (por ejemplo, verduras, lácteos).
     */
    private CategoriaIngrediente categoria;

    /**
     * Lista de recetas en las que se utiliza este ingrediente.
     */
    private List<RecetaDto> recetas;
}
