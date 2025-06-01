package es.superlista.domain.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import es.superlista.utils.BBDD;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * Entidad que representa una lista de la compra.
 * Contiene el identificador de la lista, el usuario propietario y los ingredientes incluidos.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = BBDD.Tablas.LISTACOMPRA)
@Entity
public class ListaCompra {

    /**
     * Identificador único de la lista de la compra.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Usuario propietario de la lista de la compra.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonBackReference
    private Usuario usuario;

    /**
     * Lista de ingredientes incluidos en esta lista de la compra.
     */
    @ManyToMany
    @JoinTable(
            name = "lista_compra_ingredientes",
            joinColumns = @JoinColumn(name = "lista_compra_id"),
            inverseJoinColumns = @JoinColumn(name = "ingrediente_id")
    )
    private List<Ingrediente> items;
}
