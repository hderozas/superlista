package es.superlista.domain.enumeration;

import es.superlista.exception.ProcesoException;
import lombok.Getter;

/**
 * Enumeración que representa las distintas categorías posibles para los ingredientes.
 * Incluye un identificador numérico, un nombre y una descripción más detallada.
 */
@Getter
public enum CategoriaIngrediente {

    /**
     * Categoría: Verduras.
     */
    VERDURAS (0, "VERDURAS","VERDURAS"),
    /**
     * Categoría: Frutas.
     */
    FRUTAS (1, "FRUTAS", "FRUTAS"),
    /**
     * Categoría: Carne.
     */
    CARNE (2, "CARNE", "CARNE"),
    /**
     * Categoría: Pescado.
     */
    PESCADO (3,"PESCADO", "PESCADO"),
    /**
     * Categoría: Legumbres.
     */
    LEGUMBRES (4, "LEGUMBRES", "LEGUMBRES"),
    /**
     * Categoría: Lácteos.
     */
    LACTEOS (5, "LACTEOS", "LÁCTEOS"),
    /**
     * Categoría: Cereales.
     */
    CEREALES (6, "CEREALES", "CEREALES"),
    /**
     * Categoría: Frutos secos.
     */
    FRUTOS_SECOS (7, "FRUTOS_SECOS", "FRUTOS SECOS"),
    /**
     * Categoría: Grasas y/o aceites.
     */
    GRASAS_ACEITES (8, "GRASAS_ACEITES", "GRASAS Y/O ACEITES"),
    /**
     * Categoría: Especias y condimentos.
     */
    ESPECIAS (9, "ESPECIAS","ESPECIAS Y CONDIMENTOS"),
    /**
     * Categoría: Conservas.
     */
    CONSERVAS (10, "CONSERVAS", "CONSERVAS"),
    /**
     * Categoría: Congelados.
     */
    CONGELADOS (11, "CONGELADOS","PRODUCTOS CONGELADOS"),
    /**
     * Categoría: Otros.
     */
    OTROS (12, "OTROS", "OTROS");

    /**
     * Identificador numérico de la categoría.
     */
    private final int id;
    /**
     * Nombre corto de la categoría.
     */
    private final String nombre;
    /**
     * Descripción más detallada de la categoría.
     */
    private final String descripcion;

    /**
     * Constructor del enum CategoriaIngrediente.
     *
     * @param id          identificador numérico
     * @param nombre      nombre corto de la categoría
     * @param descripcion descripción detallada
     */
    CategoriaIngrediente(int id, String nombre, String descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

    /**
     * Obtiene la categoría de ingrediente correspondiente a partir de una cadena de texto.
     *
     * @param value cadena que representa el nombre del enum
     * @return la categoría correspondiente si se encuentra
     * @throws ProcesoException si no se encuentra ninguna categoría válida para el valor proporcionado
     */
    public static CategoriaIngrediente fromString (String value) {
        for (CategoriaIngrediente tipo : CategoriaIngrediente.values()) {
            if (tipo.name().equalsIgnoreCase(value)) {
                return tipo;
            }
        }
        throw new ProcesoException("No se enconctró la categoría de ingrediente para el valor: " + value);
    }
}
