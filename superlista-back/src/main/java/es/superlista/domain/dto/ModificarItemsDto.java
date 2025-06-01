package es.superlista.domain.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * DTO (Data Transfer Object) utilizado para modificar los ingredientes de una lista de la compra.
 * Contiene el identificador de la lista y la lista de identificadores de ingredientes a actualizar.
 */
@Getter @Setter
public class ModificarItemsDto {

    /**
     * Identificador único de la lista de la compra que se desea modificar.
     */
    @NotNull(message = "El id de la lista es obligatorio")
    private Long listaCompraId;

    /**
     * Lista de identificadores de ingredientes que se desean añadir o quitar de la lista.
     */
    @NotEmpty(message = "La lista de IDs de ingredientes no puede estar vacía")
    private List<Long> ingredienteIds;
}
