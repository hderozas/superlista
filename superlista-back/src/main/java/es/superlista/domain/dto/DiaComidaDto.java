package es.superlista.domain.dto;

import es.superlista.domain.enumeration.CategoriaComida;
import es.superlista.domain.enumeration.DiaSemana;
import java.util.List;
import lombok.Data;


/**
 * DTO (Data Transfer Object) que representa un día de comida dentro de un menú semanal.
 * Incluye el identificador del día, el día de la semana, la categoría de comida (desayuno, comida, cena, etc.)
 * y la lista de recetas asignadas.
 */
@Data
public class DiaComidaDto {

    /**
     * Identificador único del registro del día de comida.
     */
    private Long id;

    /**
     * Día de la semana al que corresponde (por ejemplo, lunes, martes).
     */
    private DiaSemana dia;

    /**
     * Categoría de comida (desayuno, comida, cena, etc.).
     */
    private CategoriaComida categoria;

    /**
     * Lista de recetas asignadas a este día y categoría.
     */
    private List<RecetaDto> recetas;
}

