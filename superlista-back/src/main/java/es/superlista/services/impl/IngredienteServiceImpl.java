package es.superlista.services.impl;

import es.superlista.domain.dto.IngredienteDto;
import es.superlista.domain.entity.Ingrediente;
import es.superlista.domain.entity.Receta;
import es.superlista.domain.enumeration.CategoriaIngrediente;
import es.superlista.domain.mapper.IngredienteMapper;
import es.superlista.domain.repository.IngredienteRepository;
import es.superlista.domain.repository.RecetaRepository;
import es.superlista.exception.ProcesoException;
import es.superlista.services.IngredienteService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementación del servicio {@link IngredienteService}.
 * Gestiona las operaciones de negocio relacionadas con los ingredientes, incluyendo alta, actualización,
 * eliminación y consultas por categoría o listado completo.
 */
@Service
@Transactional
public class IngredienteServiceImpl implements IngredienteService {

    private final IngredienteRepository ingredienteRepository;
    private final IngredienteMapper ingredienteMapper;
    private final RecetaRepository recetaRepository;

    /**
     * Constructor que inyecta los repositorios y el mapper necesarios.
     *
     * @param ingredienteRepository repositorio de ingredientes
     * @param ingredienteMapper     mapper para convertir entre entidad y DTO
     * @param recetaRepository      repositorio de recetas
     */
    public IngredienteServiceImpl(IngredienteRepository ingredienteRepository, IngredienteMapper ingredienteMapper, RecetaRepository recetaRepository) {
        this.ingredienteRepository = ingredienteRepository;
        this.ingredienteMapper = ingredienteMapper;
        this.recetaRepository = recetaRepository;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Boolean altaIngrediente(IngredienteDto request) {
        if (ingredienteRepository.existsByNombreEqualsIgnoreCase(request.getNombre())) {
            throw new ProcesoException("Ya hay un ingrediente con el mismo nombre registrado.");
        }

        try {
            Ingrediente ingrediente = ingredienteMapper.toEntity(request);

            if (request.getRecetas() != null && !request.getRecetas().isEmpty()) {
                List<Receta> listaRecetas = request.getRecetas().stream()
                        .map(rdto -> recetaRepository.findById(rdto.getId())
                                .orElseThrow(() -> new ProcesoException(
                                        "No se encontró la receta con id " + rdto.getId())))
                        .collect(Collectors.toList());

                // 1) poblas la colección inversa…
                ingrediente.setRecetas(listaRecetas);
                // 2) …y para cada receta, añades el ingrediente al lado propietario:
                listaRecetas.forEach(r -> r.getIngredientes().add(ingrediente));
            }

            ingredienteRepository.save(ingrediente);
            return true;

        } catch (ProcesoException pe) {
            throw pe;
        } catch (Exception e) {
            throw new ProcesoException("Hubo un error al guardar el nuevo ingrediente.", e);
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional
    public Boolean actualizarIngrediente(IngredienteDto request) {
        Ingrediente ingrediente = ingredienteRepository.findById(request.getId())
                .orElseThrow(() -> new ProcesoException("No se puede editar un ingrediente que no existe"));

        try {
            ingrediente.setNombre(request.getNombre());
            ingrediente.setCategoria(request.getCategoria());

            if (request.getRecetas() != null) {
                List<Receta> recetasActualizadas = request.getRecetas().stream()
                        .map(recetaDto -> recetaRepository.findById(recetaDto.getId())
                                .orElseThrow(() -> new ProcesoException(
                                        "No se encontró la receta con id " + recetaDto.getId()))
                        )
                        .collect(Collectors.toList());

                ingrediente.setRecetas(recetasActualizadas);

                // ⚡ IMPORTANTE: actualizar también el lado propietario (Receta -> Ingredientes)
                for (Receta receta : recetasActualizadas) {
                    if (receta.getIngredientes() == null) {
                        receta.setIngredientes(new ArrayList<>());
                    }
                    // Solo añadir si no está ya
                    if (receta.getIngredientes().stream().noneMatch(i -> i.getId().equals(ingrediente.getId()))) {
                        receta.getIngredientes().add(ingrediente);
                    }
                }
            }

            ingredienteRepository.save(ingrediente);
            return true;

        } catch (ProcesoException pe) {
            throw pe;
        } catch (Exception e) {
            throw new ProcesoException("Hubo un error al actualizar el ingrediente.", e);
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Boolean eliminarIngrediente(IngredienteDto request) {
        if (ingredienteRepository.existsById(request.getId())) {
            try {
                ingredienteRepository.deleteById(request.getId());
            } catch (Exception e) {
                throw new ProcesoException("Hubo un error al eliminar el ingrediente.");
            }
            return true;
        } else {
            throw new ProcesoException("El ingrediente no se pudo eliminar porque no existe.");
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<IngredienteDto> obtenerIngredientePorCategoria(String categoria) {
        return ingredienteRepository.findByCategoriaEquals(CategoriaIngrediente.valueOf(categoria.toUpperCase()))
                .stream()
                .map(ingredienteMapper::toDto)
                .collect(Collectors.toList());
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<IngredienteDto> obtenerTodosIngredientes() {
        return ingredienteRepository.findAll()
                .stream()
                .map(ingredienteMapper::toDto)
                .collect(Collectors.toList());
    }
}
