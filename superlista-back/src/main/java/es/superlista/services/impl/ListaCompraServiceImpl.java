package es.superlista.services.impl;

import es.superlista.domain.dto.ListaCompraDto;
import es.superlista.domain.entity.Ingrediente;
import es.superlista.domain.entity.ListaCompra;
import es.superlista.domain.entity.Receta;
import es.superlista.domain.entity.menu_semanal.DiaComida;
import es.superlista.domain.entity.menu_semanal.MenuSemanal;
import es.superlista.domain.mapper.IngredienteMapper;
import es.superlista.domain.mapper.IngredienteSimpleMapper;
import es.superlista.domain.repository.IngredienteRepository;
import es.superlista.domain.repository.ListaCompraRepository;
import es.superlista.domain.repository.MenuSemanalRepository;
import es.superlista.domain.repository.UsuarioRepository;
import es.superlista.exception.ProcesoException;
import es.superlista.services.ListaCompraService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Implementación del servicio {@link ListaCompraService}.
 * Gestiona las operaciones de negocio relacionadas con las listas de compra, como generar listas,
 * añadir o quitar ingredientes, eliminar listas y consultar las listas de un usuario.
 */
@Service
public class ListaCompraServiceImpl implements ListaCompraService {
    private final MenuSemanalRepository menuSemanalRepository;
    private final ListaCompraRepository listaCompraRepository;
    private final UsuarioRepository usuarioRepository;
    private final IngredienteRepository ingredienteRepository;
    private final IngredienteSimpleMapper ingredienteSimpleMapper;

    /**
     * Constructor que inyecta los repositorios y mappers necesarios.
     *
     * @param menuSemanalRepository    repositorio de menús semanales
     * @param listaCompraRepository    repositorio de listas de compra
     * @param usuarioRepository        repositorio de usuarios
     * @param ingredienteRepository    repositorio de ingredientes
     * @param ingredienteSimpleMapper  mapper para convertir Ingrediente a IngredienteSimpleDto
     */
    public ListaCompraServiceImpl(MenuSemanalRepository menuSemanalRepository, ListaCompraRepository listaCompraRepository, UsuarioRepository usuarioRepository, IngredienteRepository ingredienteRepository, IngredienteSimpleMapper ingredienteSimpleMapper) {
        this.menuSemanalRepository = menuSemanalRepository;
        this.listaCompraRepository = listaCompraRepository;
        this.usuarioRepository = usuarioRepository;
        this.ingredienteRepository = ingredienteRepository;
        this.ingredienteSimpleMapper = ingredienteSimpleMapper;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ListaCompraDto generarListaCompra(Long menuId, Long usuarioId) {
        // 1. Comprobar que el menú existe y pertenece al usuario
        MenuSemanal menu = menuSemanalRepository.findById(menuId)
                .orElseThrow(() -> new ProcesoException("Menú no encontrado: " + menuId));
        if (!menu.getUsuario().getId().equals(usuarioId)) {
            throw new ProcesoException("No tienes permiso para ver este menú.");
        }

        // 2. Recorrer todos los DiasComida → Recetas → Ingredientes
        Set<Ingrediente> conjunto = new HashSet<>();
        for (DiaComida dia : menu.getDiasComidas()) {
            if (dia.getRecetas() == null) continue;
            for (Receta receta : dia.getRecetas()) {
                conjunto.addAll(receta.getIngredientes());
            }
        }

        // 3. Crear y guardar la ListaCompra
        ListaCompra lista = new ListaCompra();
        lista.setUsuario(menu.getUsuario());
        lista.setItems(new ArrayList<>(conjunto));
        try {
            lista = listaCompraRepository.save(lista);
        } catch (Exception e) {
            throw new ProcesoException("Error al generar la lista de la compra", e);
        }

        // 4. Mapear a DTO y devolver
        return ListaCompraDto.builder()
                .id(lista.getId())
                .usuarioId(usuarioId)
                .items(lista.getItems()
                        .stream()
                        .map(ingredienteSimpleMapper::toDto)
                        .toList())
                .build();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ListaCompraDto addItems(Long listaId, Long usuarioId, List<Long> ingredienteIds) {
        ListaCompra lista = listaCompraRepository.findById(listaId)
                .orElseThrow(() -> new ProcesoException("Lista no encontrada: " + listaId));
        if (!lista.getUsuario().getId().equals(usuarioId)) {
            throw new ProcesoException("No tienes permiso para modificar esta lista.");
        }

        // Carga todos los ingredientes que se pidieron
        List<Ingrediente> nuevos = ingredienteRepository.findAllById(ingredienteIds);
        List<Ingrediente> items = lista.getItems();
        // Sólo añadimos los que no estuvieran ya
        for (Ingrediente ing : nuevos) {
            if (!items.contains(ing)) {
                items.add(ing);
            }
        }
        lista.setItems(items);

        try {
            lista = listaCompraRepository.save(lista);
        } catch (Exception e) {
            throw new ProcesoException("Error al añadir ingredientes.", e);
        }
        return mapToDto(lista, usuarioId);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ListaCompraDto removeItems(Long listaId, Long usuarioId, List<Long> ingredienteIds) {
        ListaCompra lista = listaCompraRepository.findById(listaId)
                .orElseThrow(() -> new ProcesoException("Lista no encontrada: " + listaId));
        if (!lista.getUsuario().getId().equals(usuarioId)) {
            throw new ProcesoException("No tienes permiso para modificar esta lista.");
        }

        // Eliminamos por ID
        List<Ingrediente> items = lista.getItems();
        items.removeIf(ing -> ingredienteIds.contains(ing.getId()));
        lista.setItems(items);

        try {
            lista = listaCompraRepository.save(lista);
        } catch (Exception e) {
            throw new ProcesoException("Error al quitar ingredientes.", e);
        }
        return mapToDto(lista, usuarioId);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void eliminarLista(Long listaCompraId, Long usuarioId) {
        ListaCompra lista = listaCompraRepository.findById(listaCompraId)
                .orElseThrow(() -> new ProcesoException("Lista no encontrada: " + listaCompraId));

        if (!lista.getUsuario().getId().equals(usuarioId)) {
            throw new ProcesoException("No tienes permiso para eliminar esta lista.");
        }

        try {
            listaCompraRepository.delete(lista);
        } catch (Exception e) {
            throw new ProcesoException("Error al eliminar la lista de la compra.", e);
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<ListaCompraDto> obtenerListasDelUsuario(Long usuarioId) {
        List<ListaCompra> listas = listaCompraRepository.findAllByUsuarioId(usuarioId);

        return listas.stream()
                .map(lista -> ListaCompraDto.builder()
                        .id(lista.getId())
                        .usuarioId(usuarioId)
                        .items(lista.getItems().stream()
                                .map(ingredienteSimpleMapper::toDto)
                                .toList())
                        .build())
                .toList();
    }

    /**
     * Función auxiliar para mapear una entidad ListaCompra a su DTO.
     *
     * @param lista      entidad ListaCompra
     * @param usuarioId  identificador del usuario propietario
     * @return DTO de ListaCompra
     */
    private ListaCompraDto mapToDto(ListaCompra lista, Long usuarioId) {
        return ListaCompraDto.builder()
                .id(lista.getId())
                .usuarioId(usuarioId)
                .items(lista.getItems()
                        .stream()
                        .map(ingredienteSimpleMapper::toDto)
                        .toList())
                .build();
    }
}
