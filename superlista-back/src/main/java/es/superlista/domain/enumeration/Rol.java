package es.superlista.domain.enumeration;

import es.superlista.exception.ProcesoException;

/**
 * Enumeración que representa los roles posibles de un usuario en la aplicación.
 * Define los tipos ADMIN y USER, cada uno con un identificador y una descripción.
 */
public enum Rol {

    /**
     * Rol de administrador (ADMIN).
     */
    ADMIN(0, "ADMIN"),
    /**
     * Rol de usuario estándar (USER).
     */
    USER(1, "USER");

    /**
     * Identificador numérico del rol.
     */
    private final int id;
    /**
     * Descripción textual del rol.
     */
    private final String descripcion;

    /**
     * Constructor del enum.
     *
     * @param id          identificador numérico
     * @param descripcion descripción textual del rol
     */
    Rol(int id, String descripcion) {
        this.id = id;
        this.descripcion = descripcion;
    }

    /**
     * Obtiene el rol correspondiente a partir de una cadena de texto.
     *
     * @param value cadena que representa el nombre del rol
     * @return el rol correspondiente si se encuentra
     * @throws ProcesoException si no se encuentra ningún rol válido para el valor proporcionado
     */
    public static Rol fromString(String value) {
        for (Rol tipo : Rol.values()) {
            if (tipo.name().equalsIgnoreCase(value)) {
                return tipo;
            }
        }
        throw new ProcesoException("No se encontró la categoría de rol para el valor: " + value);

    }
}
