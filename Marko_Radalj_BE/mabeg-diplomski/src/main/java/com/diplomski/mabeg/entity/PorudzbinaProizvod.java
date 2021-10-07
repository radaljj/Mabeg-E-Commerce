package com.diplomski.mabeg.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name="porudzbine_proizvod")
@Getter
@Setter
public class PorudzbinaProizvod {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="image_url")
    private String imageUrl;

    @Column(name="unit_price")
    private BigDecimal cenaKomad;

    @Column(name="quantity")
    private int kolicina;

    @Column(name="proizvod_id", nullable=false)
    private Long proizvodId;

    @ManyToOne
    @JoinColumn(name = "order_id",nullable=false)
    private Porudzbina order;

}








