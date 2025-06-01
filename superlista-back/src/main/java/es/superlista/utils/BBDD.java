package es.superlista.utils;

/**
 * Clase de utilidades que centraliza los nombres de tablas y columnas utilizados
 * en las entidades JPA del proyecto. Esto permite mantener consistencia y evitar
 * errores por nombres hardcodeados en los mapeos de base de datos.
 */
public class BBDD {
    /**
     * Clase interna que define los nombres de las tablas en la base de datos.
     */
    public class Tablas {
        public static final String INGREDIENTE = "INGREDIENTE";
        public static final String RECETA = "RECETA";
        public static final String RECETA_INGREDIENTES = "RECETA_INGREDIENTES";
        public static final String DIA_COMIDA = "DIA_COMIDA";
        public static final String DIA_COMIDA_RECETAS = "DIA_COMIDA_RECETAS";
        public static final String MENU_SEMANAL = "MENU_SEMANAL";
        public static final String USUARIO = "USUARIO";
        public static final String LISTACOMPRA = "LISTA_COMPRA";
    }

    /**
     * Clase interna que define los nombres de las columnas en las tablas de la base de datos.
     */
    public class Columnas {
        public static final String NOMBRE = "NOMBRE";
        public static final String CATEGORIA = "CATEGORIA";
        public static final String ID = "ID";

        public static final String ID_RECETA = "ID_RECETA";
        public static final String ID_INGREDIENTE = "ID_INGREDIENTE";
        public static final String DIA = "DIA";
        public static final String USERNAME = "USERNAME";

        public static final String PASSWORD = "PASSWORD";
        public static final String APELLIDO = "APELLIDO";
        public static final String FECHA_CREACION = "FECHA_CREACION";
        public static final String EMAIL = "EMAIL";
    }
}
