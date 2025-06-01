package es.superlista.domain.dto;

import es.superlista.domain.enumeration.CategoriaIngrediente;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

/**
 * DTO (Data Transfer Object) simplificado que representa un ingrediente.
 * Contiene únicamente la información básica: identificador, nombre y categoría.
 * Este DTO se usa cuando no es necesario incluir las recetas asociadas.
 */
@Getter
@Setter
public class IngredienteSimpleDto implements Serializable {

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

}
