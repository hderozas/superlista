package es.superlista.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO (Data Transfer Object) utilizado para generar una lista de la compra
 * a partir de un menú semanal existente.
 * Contiene únicamente el identificador del menú.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GenerarListaDto {

    /**
     * Identificador único del menú del cual se generará la lista de la compra.
     */
    private Long menuId;
}
