package es.superlista.services.impl;

import es.superlista.domain.dto.IngredienteDto;
import es.superlista.domain.dto.IngredienteSimpleDto;
import es.superlista.domain.dto.RecetaDto;
import es.superlista.domain.entity.Ingrediente;
import es.superlista.domain.entity.Receta;
import es.superlista.domain.mapper.IngredienteMapper;
import es.superlista.domain.mapper.IngredienteSimpleMapper;
import es.superlista.domain.mapper.RecetaMapper;
import es.superlista.domain.repository.IngredienteRepository;
import es.superlista.domain.repository.RecetaRepository;
import es.superlista.exception.ProcesoException;
import es.superlista.services.RecetaService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementación del servicio {@link RecetaService}.
 * Gestiona las operaciones de negocio relacionadas con recetas, incluyendo alta, actualización,
 * eliminación y consultas, así como la gestión de ingredientes asociados.
 */
@Service
@Transactional
public class RecetaServiceImpl implements RecetaService {

    private final RecetaRepository recetaRepository;
    private final RecetaMapper recetaMapper;
    private final IngredienteRepository ingredienteRepository;
    private final IngredienteSimpleMapper ingredienteSimpleMapper;

    /**
     * Constructor que inyecta los repositorios y mappers necesarios.
     *
     * @param recetaRepository         repositorio de recetas
     * @param recetaMapper             mapper de recetas
     * @param ingredienteRepository    repositorio de ingredientes
     * @param ingredienteSimpleMapper  mapper de ingredientes simples
     */
    public RecetaServiceImpl(RecetaRepository recetaRepository, RecetaMapper recetaMapper, IngredienteRepository ingredienteRepository, IngredienteSimpleMapper ingredienteSimpleMapper) {
        this.recetaRepository = recetaRepository;
        this.recetaMapper = recetaMapper;
        this.ingredienteRepository = ingredienteRepository;
        this.ingredienteSimpleMapper = ingredienteSimpleMapper;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional
    public Boolean altaReceta(RecetaDto recetaDto) {
        // Mapear el DTO a entidad
        Receta receta = recetaMapper.toEntity(recetaDto);

        // Lista para almacenar los ingredientes que se asociarán a la receta
        List<Ingrediente> ingredientesAsociados = new ArrayList<>();

        // Recorrer los ingredientes del DTO
        for (IngredienteSimpleDto ingDto : recetaDto.getIngredientes()) {
            Ingrediente ingrediente;

            // Si se ha proporcionado un ID, intentar buscarlo
            if (ingDto.getId() != null) {
                ingrediente = ingredienteRepository.findById(ingDto.getId()).orElse(null);
                if (ingrediente == null) {
                    // Si el ID no existe, intentamos buscarlo por nombre
                    ingrediente = ingredienteRepository.findByNombreIgnoreCase(ingDto.getNombre()).orElse(null);
                    // Si tampoco se encuentra por nombre, se crea uno nuevo
                    if (ingrediente == null) {
                        ingrediente = ingredienteSimpleMapper.toEntity(ingDto);
                        ingrediente = ingredienteRepository.save(ingrediente);
                    }
                }
            } else {
                // Si no se ha proporcionado el ID, buscar por nombre
                ingrediente = ingredienteRepository.findByNombreIgnoreCase(ingDto.getNombre()).orElse(null);
                if (ingrediente == null) {
                    // Si el ingrediente no existe, crearlo
                    ingrediente = ingredienteSimpleMapper.toEntity(ingDto);
                    ingrediente = ingredienteRepository.save(ingrediente);
                }
            }
            ingredientesAsociados.add(ingrediente);
        }

        // Asignar la lista de ingredientes gestionados a la receta
        receta.setIngredientes(ingredientesAsociados);

        // Guardar la receta con ingredientes asociados (que ya están gestionados)
        recetaRepository.save(receta);
        return true;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional
    public Boolean actualizarReceta(RecetaDto request) {
        recetaRepository.save(recetaMapper.toEntity(request));
        return true;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Boolean eliminarReceta(RecetaDto request) {
        if (recetaRepository.existsById(request.getId())) {
            try {
                recetaRepository.deleteByIdEquals(request.getId());
            } catch (Exception e) {
                throw new ProcesoException("Hubo un error al eliminar la receta.", e);
            }
        } else {
            throw new ProcesoException("No se pudo eliminar la receta porque no existe.");
        }
        return true;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<RecetaDto> buscarRecetaPorNombre(String nombre) {
        return recetaRepository.findByNombreContainsIgnoreCase(nombre).stream().map(recetaMapper::toDto).collect(Collectors.toList());
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<RecetaDto> buscarTodasRecetas() {
        return recetaRepository.findAll().stream().map(recetaMapper::toDto).collect(Collectors.toList());
    }

    /**
     * Función auxiliar para actualizar los ingredientes asociados a una receta.
     *
     * @param receta            entidad receta a actualizar
     * @param ingredientesDtos  lista de DTOs de ingredientes a asignar
     */
    private void actualizarIngredientes(Receta receta, List<IngredienteDto> ingredientesDtos) {
        // Convertir DTOs a IDs
        List<Long> ingredientesIds = ingredientesDtos.stream()
                .map(IngredienteDto::getId)
                .collect(Collectors.toList());

        // Obtener los ingredientes desde la base de datos
        List<Ingrediente> nuevosIngredientes = ingredienteRepository.findAllById(ingredientesIds);

        // Verificar que todos los ingredientes existen
        if (nuevosIngredientes.size() != ingredientesDtos.size()) {
            throw new EntityNotFoundException("Algunos ingredientes no existen");
        }

        // Actualizar la relación
        receta.getIngredientes().clear(); // Elimina las relaciones antiguas
        receta.getIngredientes().addAll(nuevosIngredientes); // Establece las nuevas relaciones
    }
}
