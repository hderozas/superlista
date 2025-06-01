package es.superlista.domain.dto;

import es.superlista.domain.enumeration.CategoriaComida;
import es.superlista.domain.enumeration.DiaSemana;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * DTO (Data Transfer Object) utilizado para añadir una receta a un menú semanal.
 * Contiene la información necesaria sobre el menú, el día, la categoría de comida y la receta a asociar.
 */
@Data
public class AddRecetaDto {

    /**
     * Identificador único del menú al que se añadirá la receta.
     */
    @NotNull
    private Long menuId;

    /**
     * Día de la semana al que corresponde la receta.
     */
    @NotNull
    private DiaSemana dia;

    /**
     * Categoría de comida (por ejemplo, desayuno, comida, cena).
     */
    @NotNull
    private CategoriaComida categoria;

    /**
     * Identificador único de la receta que se desea añadir.
     */
    @NotNull
    private Long recetaId;
}
