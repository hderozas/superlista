package es.superlista.domain.entity.menu_semanal;

import com.fasterxml.jackson.annotation.JsonBackReference;
import es.superlista.domain.entity.Receta;
import es.superlista.domain.enumeration.CategoriaComida;
import es.superlista.domain.enumeration.DiaSemana;
import es.superlista.utils.BBDD;
import es.superlista.utils.Numeros;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * Entidad que representa un bloque de comidas para un día específico dentro de un menú semanal.
 * Contiene información sobre el día, la categoría de comida (desayuno, comida, cena), las recetas asignadas,
 * y la relación con el menú semanal al que pertenece.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = BBDD.Tablas.DIA_COMIDA)
@Entity
public class DiaComida {

    /**
     * Identificador único del día-comida.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Día de la semana (por ejemplo, lunes, martes).
     */
    @Enumerated(EnumType.STRING)
    @Column(name = BBDD.Columnas.DIA, length = Numeros.VEINTE, nullable = false)
    private DiaSemana dia;

    /**
     * Categoría de comida (desayuno, comida, cena, etc.).
     */
    @Enumerated(EnumType.STRING)
    @Column(name = BBDD.Columnas.CATEGORIA, length = Numeros.VEINTE, nullable = false)
    private CategoriaComida categoria;

    /**
     * Lista de recetas asignadas para este día y categoría.
     */
    @ManyToMany
    @JoinTable(
            name = BBDD.Tablas.DIA_COMIDA_RECETAS,
            joinColumns = @JoinColumn(name = "dia_comida_id"),
            inverseJoinColumns = @JoinColumn(name = "receta_id")
    )
    private List<Receta> recetas;

    /**
     * Menú semanal al que pertenece este bloque de día-comida.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_semanal_id", nullable = false)
    @JsonBackReference
    private MenuSemanal menuSemanal;
}
