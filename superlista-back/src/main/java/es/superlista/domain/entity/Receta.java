package es.superlista.domain.entity;

import es.superlista.utils.BBDD;
import es.superlista.utils.Numeros;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

/**
 * Entidad que representa una receta en la aplicación.
 * Contiene el identificador, el nombre y la lista de ingredientes asociados.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = BBDD.Tablas.RECETA)
@Entity
public class Receta {

    /**
     * Identificador único de la receta.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Nombre de la receta (único, máximo 50 caracteres).
     */
    @Size(max = Numeros.CINCUENTA)
    @Column(name = BBDD.Columnas.NOMBRE, unique = true)
    private String nombre;

    /**
     * Lista de ingredientes utilizados en la receta.
     * Relación muchos a muchos con la entidad Ingrediente.
     */
    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(
            name = BBDD.Tablas.RECETA_INGREDIENTES, // Nombre de la tabla intermedia
            joinColumns = @JoinColumn(name = BBDD.Columnas.ID_RECETA), // FK de Receta
            inverseJoinColumns = @JoinColumn(name = BBDD.Columnas.ID_INGREDIENTE) // FK de Ingrediente
    )
    private List<Ingrediente> ingredientes;

}
