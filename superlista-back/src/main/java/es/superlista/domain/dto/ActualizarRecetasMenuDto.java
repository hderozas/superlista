package es.superlista.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * DTO (Data Transfer Object) utilizado para actualizar las recetas de un menú específico.
 * Contiene el identificador del menú y la lista de días con sus respectivas comidas.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActualizarRecetasMenuDto {
    /**
     * Identificador único del menú que se desea actualizar.
     */
    private Long menuId;
    /**
     * Lista de días con sus correspondientes comidas (categorías y recetas).
     */
    private List<DiaComidaDto> diasComidas;
}
