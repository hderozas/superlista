package es.superlista.domain.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

/**
 * Clase genérica que representa una respuesta estandarizada de la API.
 * Envuelve los datos devueltos junto con un estado que indica si la operación fue exitosa o produjo un error.
 *
 * @param <T> el tipo de datos que se incluye en la respuesta
 */
@Data
@JsonInclude(JsonInclude.Include.NON_ABSENT)
@JsonIgnoreProperties(ignoreUnknown = true)
@Builder
@AllArgsConstructor
@Schema(description = "Respuestas estandarizadas de la api")
public final class ApiRespuesta<T> {

    /**
     * Datos devueltos en la respuesta (pueden ser de cualquier tipo).
     */
    private T data;
    /**
     * Estado de la respuesta (éxito o error).
     */
    private Estado estado;

    /**
     * Enum que define los posibles estados de la respuesta de la API.
     */
    public enum Estado {
        /**
         * Indica que la operación fue exitosa.
         */
        EXITO("exito"),
        /**
         * Indica que la operación produjo un error.
         */
        ERROR("error");

        /**
         * Valor textual asociado al estado.
         */
        private final String valor;

        /**
         * Constructor del enum Estado.
         *
         * @param estado el valor textual del estado
         */
        Estado(String estado) {
            this.valor = estado;
        }

        /**
         * Obtiene el valor textual del estado para su serialización en JSON.
         *
         * @return el valor como texto
         */
        @JsonValue
        public String getValue() {return valor;}
    }

}
