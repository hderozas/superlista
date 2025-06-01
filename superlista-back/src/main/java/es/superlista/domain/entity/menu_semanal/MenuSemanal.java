package es.superlista.domain.entity.menu_semanal;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import es.superlista.domain.entity.Usuario;
import es.superlista.utils.BBDD;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * Entidad que representa un menú semanal.
 * Contiene la lista de días con sus respectivas comidas y la relación con el usuario propietario.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = BBDD.Tablas.MENU_SEMANAL)
@Entity
public class MenuSemanal {

    /**
     * Identificador único del menú semanal.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Lista de días con sus respectivas comidas que componen el menú semanal.
     */
    @OneToMany(mappedBy = "menuSemanal", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<DiaComida> diasComidas;

    /**
     * Usuario propietario del menú semanal.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;


}
