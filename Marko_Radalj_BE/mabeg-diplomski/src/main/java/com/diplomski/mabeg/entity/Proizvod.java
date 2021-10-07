package com.diplomski.mabeg.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name="proizvod")
@Data// biblioteka za automatske getere i setere-- LAMBOK
public class Proizvod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @ManyToOne
    @JoinColumn(name="category_id",nullable = false)
    private KategorijaProizvoda kategorija;

    @Column(name="sku")
    private String sku;

    @Column(name="ime_proizvoda")
    private String imeProizvoda;

    @Column(name="opis_proizvoda")
    private String opisProizvoda;

    @Column(name="cena_proizvoda")
    private BigDecimal cenaProizvoda;

    @Column(name="kolicina_na_stanju")
    private int kolicinaNaStanju;

    @Column(name="slika_url")
    private String slikaUrl;

    @Column(name="datum_napravljen")
    @CreationTimestamp
    private Date datumNapravljen;

    @Column(name="datum_izmenjen")
    @UpdateTimestamp
    private Date datumIzmenjen;

    @Column(name="na_stanju_proizvod")
    private boolean naStanju;





}
