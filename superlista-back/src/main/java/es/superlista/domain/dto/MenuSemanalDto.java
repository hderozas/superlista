package es.superlista.domain.dto;

import lombok.Data;

import java.util.List;

/**
 * DTO (Data Transfer Object) que representa un menú semanal completo.
 * Incluye el identificador del menú, el usuario propietario y la lista de días con sus respectivas comidas.
 */
@Data
public class MenuSemanalDto {
    /**
     * Identificador único del menú semanal.
     */
    private Long id;

    /**
     * Identificador del usuario propietario del menú.
     */
    private Long usuarioId;

    /**
     * Lista de días con sus respectivas categorías de comida y recetas.
     */
    private List<DiaComidaDto> diasComidas;
}
