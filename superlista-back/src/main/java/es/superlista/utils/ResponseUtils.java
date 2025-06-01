package es.superlista.utils;

import es.superlista.domain.dto.ApiRespuesta;

/**
 * Clase de utilidades para generar respuestas estandarizadas de la API.
 * Permite construir objetos {@link ApiRespuesta} exitosos de forma sencilla,
 * asegurando un formato consistente en las respuestas del backend.
 */
public class ResponseUtils {

    public ResponseUtils() {
        //Constructor
    }

    /**
     * Genera una respuesta estándar exitosa con los datos proporcionados.
     *
     * @param data objeto de datos que se incluirá en la respuesta
     * @param <T>  tipo genérico del objeto de datos
     * @return objeto {@link ApiRespuesta} marcando estado EXITO y conteniendo los datos
     */
    public static <T> ApiRespuesta<T> generarRespuesta(T data) {
        return ApiRespuesta.<T>builder()
                .estado(ApiRespuesta.Estado.EXITO)
                .data(data)
                .build();

    }
}

