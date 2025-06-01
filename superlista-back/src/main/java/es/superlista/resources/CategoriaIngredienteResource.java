package es.superlista.resources;

import es.superlista.domain.dto.CategoriaIngredienteDto;
import es.superlista.domain.enumeration.CategoriaIngrediente;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Arrays;

/**
 * Controlador REST para exponer las categorías de ingredientes disponibles en la aplicación.
 * Permite obtener la lista de categorías predefinidas desde el backend.
 */
@RestController
@RequestMapping("/categorias-ingredientes")
@Tag(name = "Categoria Ingrediente", description = "Obtiene la lista de categorias de ingredientes")
public class CategoriaIngredienteResource {

    /**
     * Endpoint GET para listar todas las categorías de ingredientes disponibles.
     *
     * @return lista de objetos {@link CategoriaIngredienteDto} representando cada categoría
     */
    @GetMapping
    public List<CategoriaIngredienteDto> listarCategorias() {
        return Arrays.stream(CategoriaIngrediente.values())
                .map(cat -> new CategoriaIngredienteDto(
                        cat.getId(),
                        cat.getNombre(),
                        cat.getDescripcion()
                ))
                .collect(Collectors.toList());
    }
}
