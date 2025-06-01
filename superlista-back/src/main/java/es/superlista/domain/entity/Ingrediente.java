package es.superlista.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import es.superlista.domain.enumeration.CategoriaIngrediente;
import es.superlista.utils.BBDD;
import es.superlista.utils.Numeros;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

/**
 * Entidad que representa un ingrediente dentro de la aplicación.
 * Contiene el identificador, el nombre, la categoría y las recetas en las que se utiliza.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = BBDD.Tablas.INGREDIENTE)
@Entity
public class Ingrediente {

    /**
     * Identificador único del ingrediente.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Nombre del ingrediente (único, máximo 50 caracteres).
     */
    @Size(max = Numeros.CINCUENTA)
    @Column(name = BBDD.Columnas.NOMBRE, unique = true)
    @NotNull
    private String nombre;

    /**
     * Categoría del ingrediente (por ejemplo, verduras, lácteos).
     */
    @Enumerated(EnumType.STRING)
    @NotNull(message = "La categoría no puede ser nula")
    @Column(name = BBDD.Columnas.CATEGORIA)
    private CategoriaIngrediente categoria;

    /**
     * Lista de recetas en las que se utiliza este ingrediente.
     * Se ignora en la serialización JSON para evitar recursión infinita.
     */
    @ManyToMany(mappedBy = "ingredientes") // Relación inversa
    @JsonIgnore
    private List<Receta> recetas;
}
