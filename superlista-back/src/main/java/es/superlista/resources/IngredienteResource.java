package es.superlista.resources;

import es.superlista.domain.dto.ApiRespuesta;
import es.superlista.domain.dto.IngredienteDto;
import es.superlista.security.annotation.PermisoAdminOrUser;
import es.superlista.services.IngredienteService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static es.superlista.utils.ResponseUtils.generarRespuesta;

/**
 * Controlador REST para gestionar operaciones relacionadas con ingredientes.
 * Incluye alta, actualización, eliminación y consultas por categoría o listado completo.
 */
@PermisoAdminOrUser
@RestController
@RequestMapping("/ingrediente")
@Tag(name = "Ingrediente", description = "Operaciones relacionadas con el manejo de ingredientes")
public class IngredienteResource {

    private final IngredienteService ingredienteService;

    /**
     * Constructor que inyecta el servicio de ingredientes.
     *
     * @param ingredienteService servicio para manejar lógica de negocio relacionada con ingredientes
     */
    public IngredienteResource(IngredienteService ingredienteService) {
        this.ingredienteService = ingredienteService;
    }

    /**
     * Endpoint POST para dar de alta un nuevo ingrediente.
     *
     * @param request DTO del ingrediente a registrar
     * @return respuesta API indicando éxito o fallo
     */
    @Transactional
    @PostMapping("/nuevo")
    public ResponseEntity<ApiRespuesta<Boolean>> altaIngrediente (
            @RequestBody IngredienteDto request) {
        return ResponseEntity.ok().body(generarRespuesta(this.ingredienteService.altaIngrediente(request)));
    }

    /**
     * Endpoint POST para actualizar un ingrediente existente.
     *
     * @param request DTO del ingrediente con los datos actualizados
     * @return respuesta API indicando éxito o fallo
     */
    @Transactional
    @PostMapping("/actualizar")
    public ResponseEntity<ApiRespuesta<Boolean>> actualizarIngrediente (
            @RequestBody IngredienteDto request) {
        return ResponseEntity.ok().body(generarRespuesta(this.ingredienteService.actualizarIngrediente(request)));
    }

    /**
     * Endpoint POST para eliminar un ingrediente.
     *
     * @param request DTO del ingrediente a eliminar
     * @return respuesta API indicando éxito o fallo
     */
    @Transactional
    @PostMapping("/eliminar")
    public ResponseEntity<ApiRespuesta<Boolean>> eliminarIngrediente (
            @RequestBody IngredienteDto request) {
        return ResponseEntity.ok().body(generarRespuesta(this.ingredienteService.eliminarIngrediente(request)));
    }

    /**
     * Endpoint GET para obtener ingredientes de una categoría específica.
     *
     * @param categoria nombre de la categoría
     * @return lista de ingredientes pertenecientes a esa categoría
     */
    @GetMapping("/{categoria}")
    public ResponseEntity<ApiRespuesta<List<IngredienteDto>>> obtenerIngredientePorCategoria (
            @PathVariable String categoria) {
        return ResponseEntity.ok().body(generarRespuesta(this.ingredienteService.obtenerIngredientePorCategoria(categoria)));
    }

    /**
     * Endpoint GET para obtener todos los ingredientes registrados.
     *
     * @return lista completa de ingredientes
     */
    @GetMapping("/todos")
    public ResponseEntity<ApiRespuesta<List<IngredienteDto>>> obtenerTodosIngredientes () {
        return ResponseEntity.ok().body(generarRespuesta(this.ingredienteService.obtenerTodosIngredientes()));
    }

}
