package es.superlista.services;


import es.superlista.domain.dto.ActualizarRecetasMenuDto;
import es.superlista.domain.dto.MenuSemanalCreateDto;
import es.superlista.domain.dto.MenuSemanalDto;
import es.superlista.domain.enumeration.CategoriaComida;
import es.superlista.domain.enumeration.DiaSemana;
import jakarta.validation.constraints.NotNull;

import java.util.List;

/**
 * Interfaz de servicio para gestionar operaciones relacionadas con los menús semanales.
 * Define los métodos principales para crear, consultar, actualizar, eliminar y asignar recetas a los menús.
 */
public interface MenuSemanalService {

    /**
     * Crea un nuevo menú semanal para el usuario indicado.
     *
     * @param request    DTO con las categorías del menú
     * @param usuarioID  identificador del usuario propietario
     * @return DTO del menú semanal creado
     */
    MenuSemanalDto crearMenuSemanal(MenuSemanalCreateDto request, Long usuarioID);

    /**
     * Obtiene un menú semanal específico del usuario.
     *
     * @param menuId     identificador del menú
     * @param usuarioId  identificador del usuario propietario
     * @return DTO del menú semanal encontrado
     */
    MenuSemanalDto obtenerMenuSemanal(Long menuId, Long usuarioId);

    /**
     * Agrega una receta a un día y categoría específicos dentro de un menú semanal.
     *
     * @param menuId    identificador del menú
     * @param dia       día de la semana
     * @param categoria categoría de comida (desayuno, comida, cena, etc.)
     * @param recetaId  identificador de la receta a agregar
     * @return true si la operación fue exitosa, false en caso contrario
     */
    boolean agregarReceta(@NotNull Long menuId, @NotNull DiaSemana dia, @NotNull CategoriaComida categoria, @NotNull Long recetaId);

    /**
     * Obtiene todos los menús semanales asociados a un usuario específico.
     *
     * @param usuarioId identificador del usuario
     * @return lista de DTOs de menús semanales del usuario
     */
    List<MenuSemanalDto> obtenerMenusDeUsuario(Long usuarioId);

    /**
     * Actualiza las recetas asociadas a un menú semanal.
     *
     * @param dto DTO con las nuevas recetas a asignar
     */
    void actualizarRecetas(ActualizarRecetasMenuDto dto);

    /**
     * Elimina un menú semanal del sistema.
     *
     * @param menuId identificador del menú a eliminar
     */
    void eliminarMenu(Long menuId);
}
