package es.superlista.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

/**
 * DTO (Data Transfer Object) que representa una categoría de ingrediente.
 * Incluye información básica como el identificador, el nombre y la descripción.
 */
@Getter
@Setter
@AllArgsConstructor
public class CategoriaIngredienteDto implements Serializable {

    /**
     * Identificador único de la categoría.
     */
    private int id;

    /**
     * Nombre de la categoría.
     */
    private String nombre;

    /**
     * Descripción de la categoría.
     */
    private String descripcion;
}
