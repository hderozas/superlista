package es.superlista.exception;

/**
 * Excepción personalizada para la aplicación SúperLista.
 * Se utiliza para indicar errores específicos durante los procesos de negocio.
 */
public class ProcesoException extends RuntimeException {


    private static final long serialVerionUID = 1L;

    /**
     * Crea una nueva excepción con un mensaje específico.
     *
     * @param message mensaje descriptivo del error
     */
    public ProcesoException(String message) {
        super(message);
    }

    /**
     * Crea una nueva excepción con un mensaje específico y una causa subyacente.
     *
     * @param mensaje mensaje descriptivo del error
     * @param causa   causa original del error
     */
    public ProcesoException (String mensaje, Throwable causa) { super(mensaje, causa);}

    /**
     * Crea una nueva excepción basada únicamente en una causa subyacente.
     *
     * @param causa causa original del error
     */
    public ProcesoException (Throwable causa) {super(causa);}
}
