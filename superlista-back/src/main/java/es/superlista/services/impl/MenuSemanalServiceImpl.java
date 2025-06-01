package es.superlista.services.impl;

import es.superlista.domain.dto.*;
import es.superlista.domain.entity.Receta;
import es.superlista.domain.entity.menu_semanal.DiaComida;
import es.superlista.domain.entity.menu_semanal.MenuSemanal;
import es.superlista.domain.entity.Usuario;
import es.superlista.domain.enumeration.CategoriaComida;
import es.superlista.domain.enumeration.DiaSemana;
import es.superlista.domain.mapper.MenuSemanalMapper;
import es.superlista.domain.repository.DiaComidaRepository;
import es.superlista.domain.repository.MenuSemanalRepository;
import es.superlista.domain.repository.RecetaRepository;
import es.superlista.domain.repository.UsuarioRepository;
import es.superlista.exception.ProcesoException;
import es.superlista.services.MenuSemanalService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementación del servicio {@link MenuSemanalService}.
 * Gestiona las operaciones de negocio relacionadas con los menús semanales,
 * incluyendo su creación, actualización, eliminación, asignación de recetas y consultas.
 */
@Service
@Transactional
public class MenuSemanalServiceImpl implements MenuSemanalService {

    private final MenuSemanalRepository menuSemanalRepository;
    private final UsuarioRepository usuarioRepository;
    private final MenuSemanalMapper menuSemanalMapper;
    private final RecetaRepository recetaRepository;
    private final DiaComidaRepository diaComidaRepository;

    /**
     * Constructor que inyecta los repositorios y el mapper necesarios.
     *
     * @param menuSemanalRepository repositorio de menús semanales
     * @param usuarioRepository     repositorio de usuarios
     * @param menuSemanalMapper     mapper para convertir entre entidad y DTO
     * @param recetaRepository      repositorio de recetas
     * @param diaComidaRepository   repositorio de celdas DíaComida
     */
    public MenuSemanalServiceImpl(MenuSemanalRepository menuSemanalRepository,
                                  UsuarioRepository usuarioRepository,
                                  MenuSemanalMapper menuSemanalMapper,
                                  RecetaRepository recetaRepository, DiaComidaRepository diaComidaRepository) {
        this.menuSemanalRepository = menuSemanalRepository;
        this.usuarioRepository = usuarioRepository;
        this.menuSemanalMapper = menuSemanalMapper;
        this.recetaRepository = recetaRepository;
        this.diaComidaRepository = diaComidaRepository;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public MenuSemanalDto crearMenuSemanal(MenuSemanalCreateDto request, Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ProcesoException("Usuario no encontrado con id: " + usuarioId));

        // 1) Creamos el menú y lo persistimos para obtener su ID
        MenuSemanal menu = new MenuSemanal();
        menu.setUsuario(usuario);
        try {
            menu = menuSemanalRepository.save(menu);
        } catch (Exception e) {
            throw new ProcesoException("No se pudo crear el menú semanal", e);
        }

        // 2) Elegir las categorías que crea el usuario, o todas si no indicó
        List<CategoriaComida> categorias = request.getCategorias();
        if (categorias == null || categorias.isEmpty()) {
            categorias = Arrays.asList(CategoriaComida.values());
        }

        // 3) Generar los días
        List<DiaComida> dias = new ArrayList<>();
        for (DiaSemana dia : DiaSemana.values()) {
            for (CategoriaComida categoria : categorias) {
                DiaComida celda = new DiaComida();
                celda.setDia(dia);
                celda.setCategoria(categoria);
                celda.setMenuSemanal(menu);
                celda.setRecetas(new ArrayList<>());
                dias.add(celda);
            }
        }
        // 3) Se lo asignamos al menú y volvemos a guardar
        menu.setDiasComidas(dias);
        try {
            return menuSemanalMapper.toDto(menuSemanalRepository.save(menu));

        } catch (Exception e) {
            throw new ProcesoException("No se pudo guardar el menú en la base de datos", e);
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional(readOnly = true)
    public MenuSemanalDto obtenerMenuSemanal(Long menuId, Long usuarioId) {
        MenuSemanal menu = menuSemanalRepository.findByIdAndUsuarioId(menuId, usuarioId)
                .orElseThrow(() -> new ProcesoException(
                        "Menú no encontrado o no tienes permiso para verlo"));

        return menuSemanalMapper.toDto(menu);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional
    public boolean agregarReceta(Long menuId,
                                 DiaSemana dia,
                                 CategoriaComida categoria,
                                 Long recetaId) {

        MenuSemanal menu = menuSemanalRepository.findById(menuId)
                .orElseThrow(() -> new ProcesoException(
                        "Menú no encontrado con id: " + menuId));

        DiaComida celda = menu.getDiasComidas().stream()
                .filter(d -> d.getDia() == dia && d.getCategoria() == categoria)
                .findFirst()
                .orElseThrow(() -> new ProcesoException(
                        "No existe celda para día " + dia +
                                " y categoría " + categoria));

        Receta receta = recetaRepository.findById(recetaId)
                .orElseThrow(() -> new ProcesoException(
                        "Receta no encontrada con id: " + recetaId));

        try {
            celda.getRecetas().add(receta);
            return true;
        } catch (Exception e) {
            throw new ProcesoException("Hubo un error al guardar la receta en el menú", e);
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<MenuSemanalDto> obtenerMenusDeUsuario(Long usuarioId) {
        List<MenuSemanal> menus = menuSemanalRepository.findByUsuarioId(usuarioId);
        return menus.stream()
                .map(menuSemanalMapper::toDto)
                .collect(Collectors.toList());
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional
    public void actualizarRecetas(ActualizarRecetasMenuDto dto) {
        Long menuId = dto.getMenuId();

        MenuSemanal menu = menuSemanalRepository.findById(menuId)
                .orElseThrow(() -> new RuntimeException("Menú no encontrado"));

        // 1. Eliminar todas las recetas actuales del menú
        diaComidaRepository.deleteByMenuSemanal(menu);

        // 2. Insertar las nuevas recetas
        for (DiaComidaDto diaDto : dto.getDiasComidas()) {
            DiaComida entidad = new DiaComida();
            entidad.setDia(diaDto.getDia());
            entidad.setCategoria(diaDto.getCategoria());
            entidad.setMenuSemanal(menu); // Asignamos el objeto, no el id
            entidad.setRecetas(
                    diaDto.getRecetas().stream()
                            .map(r -> recetaRepository.findById(r.getId())
                                    .orElseThrow(() -> new RuntimeException("Receta no encontrada")))
                            .toList()
            );
            diaComidaRepository.save(entidad);
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional
    public void eliminarMenu(Long menuId) {
        menuSemanalRepository.deleteById(menuId);
    }
}

