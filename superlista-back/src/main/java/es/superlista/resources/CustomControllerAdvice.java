package es.superlista.resources;

import es.superlista.domain.dto.ApiRespuesta;
import es.superlista.exception.ProcesoException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Controlador de excepciones globales para manejarlas de forma centralizada.
 * Intercepta errores comunes, registra trazas y devuelve respuestas API estandarizadas.
 */
@RestControllerAdvice
public class CustomControllerAdvice {

    /**
     * Logger para registrar trazas de error y diagnóstico.
     */
    private static final Logger logger = LoggerFactory.getLogger(CustomControllerAdvice.class);

    /**
     * Maneja las excepciones personalizadas {@link ProcesoException}.
     *
     * @param ex excepción capturada
     * @return respuesta API con mensaje de error y estado BAD_REQUEST (400)
     */
    @ExceptionHandler(ProcesoException.class)
    public ResponseEntity<ApiRespuesta<String>> handleProcesoException(ProcesoException ex) {
        logger.error("ProcesoException capturada: ", ex);

        ApiRespuesta<String> response = ApiRespuesta.<String>builder()
                .data(ex.getMessage())
                .estado(ApiRespuesta.Estado.ERROR)
                .build();
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    /**
     * Maneja errores de validación, como fallos en anotaciones.
     *
     * @param ex excepción de validación capturada
     * @return respuesta API con los mensajes de error de los campos y estado BAD_REQUEST (400)
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiRespuesta<String>> handleValidationException(MethodArgumentNotValidException ex) {
        logger.error("Excepción de validación capturada: ", ex);

        StringBuilder mensajes = new StringBuilder("Errores de validación: ");
        ex.getBindingResult().getFieldErrors().forEach(error ->
                mensajes.append(error.getField())
                        .append(" ")
                        .append(error.getDefaultMessage())
                        .append("; ")
        );

        ApiRespuesta<String> response = ApiRespuesta.<String>builder()
                .data(mensajes.toString())
                .estado(ApiRespuesta.Estado.ERROR)
                .build();
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    /**
     * Maneja cualquier otra excepción no controlada en la aplicación.
     *
     * @param ex excepción inesperada capturada
     * @return respuesta API genérica con estado INTERNAL_SERVER_ERROR (500)
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiRespuesta<String>> handleGeneralException(Exception ex) {
        logger.error("Excepción inesperada: ", ex);

        ApiRespuesta<String> response = ApiRespuesta.<String>builder()
                .data("Ocurrió un error interno en el servidor")
                .estado(ApiRespuesta.Estado.ERROR)
                .build();
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
