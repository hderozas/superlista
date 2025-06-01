package es.superlista.domain.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * DTO (Data Transfer Object) utilizado para solicitar la eliminación de una lista de la compra.
 * Contiene únicamente el identificador de la lista que se desea eliminar.
 */
@Data
public class EliminarListaDto {

    /**
     * Identificador único de la lista de la compra que se desea eliminar.
     */
    @NotNull
    private Long listaCompraId;
}
