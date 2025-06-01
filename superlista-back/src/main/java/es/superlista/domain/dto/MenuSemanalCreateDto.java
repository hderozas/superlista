package es.superlista.domain.dto;

import es.superlista.domain.enumeration.CategoriaComida;
import lombok.Data;

import java.util.List;

/**
 * DTO (Data Transfer Object) utilizado para crear un nuevo menú semanal.
 * Contiene la lista de categorías de comida que formarán parte del menú.
 */
@Data
public class MenuSemanalCreateDto {

    /**
     * Lista de categorías de comida (por ejemplo, desayuno, comida, cena) que se incluirán en el menú semanal.
     */
    private List<CategoriaComida> categorias;
}
