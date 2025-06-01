package es.superlista.resources;

import es.superlista.domain.dto.ApiRespuesta;
import es.superlista.domain.dto.RecetaDto;
import es.superlista.security.annotation.PermisoAdmin;
import es.superlista.security.annotation.PermisoAdminOrUser;
import es.superlista.services.RecetaService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static es.superlista.utils.ResponseUtils.generarRespuesta;


/**
 * Controlador REST para gestionar operaciones relacionadas con recetas.
 * Permite crear, actualizar, eliminar y consultar recetas.
 */
@PermisoAdminOrUser
@RestController
@RequestMapping("/receta")
@Tag(name = "Receta", description = "Operaciones relacionadas con el manejo de recetas")

public class RecetaResource {

    private final RecetaService recetaService;

    /**
     * Constructor que inyecta el servicio de recetas.
     *
     * @param recetaService servicio encargado de la lógica de negocio de recetas
     */
    public RecetaResource(RecetaService recetaService) {
        this.recetaService = recetaService;
    }

    /**
     * Endpoint POST para dar de alta una nueva receta.
     *
     * @param request DTO de la receta a registrar
     * @return respuesta API indicando éxito o fallo
     */
    @Transactional
    @PostMapping("/nuevo")
    public ResponseEntity<ApiRespuesta<Boolean>> altaReceta (
            @RequestBody RecetaDto request) {
        return ResponseEntity.ok().body(generarRespuesta(this.recetaService.altaReceta(request)));
    }

    /**
     * Endpoint POST para actualizar una receta existente.
     *
     * @param request DTO de la receta con los datos actualizados
     * @return respuesta API indicando éxito o fallo
     */
    @Transactional
    @PostMapping("/actualizar")
    public ResponseEntity<ApiRespuesta<Boolean>> actualizarReceta (
            @RequestBody RecetaDto request) {
        return ResponseEntity.ok().body(generarRespuesta(this.recetaService.actualizarReceta(request)));
    }

    /**
     * Endpoint POST (solo para administradores) para eliminar una receta.
     *
     * @param request DTO de la receta a eliminar
     * @return respuesta API indicando éxito o fallo
     */
    @PermisoAdmin
    @Transactional
    @PostMapping("/eliminar")
    public ResponseEntity<ApiRespuesta<Boolean>> eliminarReceta (
            @RequestBody RecetaDto request) {
        return ResponseEntity.ok().body(generarRespuesta(this.recetaService.eliminarReceta(request)));
    }

    /**
     * Endpoint GET para buscar recetas por nombre (parcial o completo).
     *
     * @param nombre nombre o fragmento a buscar
     * @return lista de recetas coincidentes
     */
    @GetMapping("/{nombre}")
    public ResponseEntity<ApiRespuesta<List<RecetaDto>>> buscarRecetaPorNombre (
            @Valid @PathVariable String nombre) {
        return ResponseEntity.ok().body(generarRespuesta(this.recetaService.buscarRecetaPorNombre(nombre)));
    }

    /**
     * Endpoint GET para obtener todas las recetas registradas.
     *
     * @return lista completa de recetas
     */
    @GetMapping
    public ResponseEntity<ApiRespuesta<List<RecetaDto>>> buscarTodasRecetas () {
        return ResponseEntity.ok().body(generarRespuesta(this.recetaService.buscarTodasRecetas()));
    }


}
