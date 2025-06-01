package es.superlista.domain.enumeration;

import es.superlista.exception.ProcesoException;

/**
 * Enumeración que representa las distintas categorías de comida
 * que pueden formar parte de un menú diario.
 */
public enum CategoriaComida {

    /**
     * Desayuno.
     */
    DESAYUNO (0, "DESAYUNO"),
    /**
     * Almuerzo (media mañana).
     */
    ALMUERZO (1, "ALMUERZO"),
    /**
     * Comida (almuerzo principal).
     */
    COMIDA (2, "COMIDA"),
    /**
     * Merienda.
     */
    MERIENDA (3, "MERIENDA"),
    /**
     * Cena.
     */
    CENA (4, "CENA");

    /**
     * Identificador numérico de la categoría.
     */
    private final int id;
    /**
     * Descripción textual de la categoría.
     */
    private final String descripcion;

    /**
     * Constructor del enum.
     *
     * @param id          identificador numérico
     * @param descripcion descripción textual
     */
    CategoriaComida(int id, String descripcion) {
        this.id = id;
        this.descripcion = descripcion;
    }

    /**
     * Obtiene la categoría de comida correspondiente a partir de una cadena de texto.
     *
     * @param value cadena que representa el nombre de la categoría
     * @return la categoría correspondiente si se encuentra
     * @throws ProcesoException si no se encuentra ninguna categoría válida para el valor proporcionado
     */
    public static CategoriaComida fromString (String value) {
        for (CategoriaComida tipo : CategoriaComida.values()) {
            if (tipo.name().equalsIgnoreCase(value)) {
                return tipo;
            }
        }
        throw new ProcesoException("No se enconctró la categoría de comida para el valor: " + value);
    }
}
