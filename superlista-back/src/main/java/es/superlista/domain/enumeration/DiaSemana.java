package es.superlista.domain.enumeration;

import es.superlista.exception.ProcesoException;

/**
 * Enumeración que representa los días de la semana.
 * Incluye un identificador numérico y una descripción textual.
 */
public enum DiaSemana {

    /**
     * Lunes.
     */
    LUNES (0, "LUNES"),

    /**
     * Martes.
     */
    MARTES (1, "MARTES"),

    /**
     * Miércoles.
     */
    MIERCOLES (2, "MIERCOLES"),

    /**
     * Jueves.
     */
    JUEVES (3, "JUEVES"),

    /**
     * Viernes.
     */
    VIERNES (4, "VIERNES"),

    /**
     * Sábado.
     */
    SABADO (5, "SABADO"),

    /**
     * Domingo.
     */
    DOMINGO (6, "DOMINGO");

    /**
     * Identificador numérico del día.
     */
    private final int id;

    /**
     * Descripción textual del día.
     */
    private final String descripcion;

    /**
     * Constructor del enum.
     *
     * @param id          identificador numérico
     * @param descripcion descripción textual del día
     */
    DiaSemana(int id, String descripcion) {
        this.id = id;
        this.descripcion = descripcion;
    }

    /**
     * Obtiene el día de la semana correspondiente a partir de una cadena de texto.
     *
     * @param value cadena que representa el nombre del día
     * @return el día de la semana correspondiente si se encuentra
     * @throws ProcesoException si no se encuentra ningún día válido para el valor proporcionado
     */
    public static DiaSemana fromString (String value) {
        for (DiaSemana tipo : DiaSemana.values()) {
            if (tipo.name().equalsIgnoreCase(value)) {
                return tipo;
            }
        }
        throw new ProcesoException("No se encontró la categoría de día de la semana para el valor: " + value);
    }
}
