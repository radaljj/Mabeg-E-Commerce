package com.diplomski.mabeg.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="adresa")
@Getter
@Setter
public class Adresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="street")
    private String ulica;

    @Column(name="city")
    private String grad;

    @Column(name="state")
    private String imeRegije;

    @Column(name="country")
    private String imeDrzave;

    @Column(name="zip_code")
    private String postanskiBroj;

    @OneToOne
    @PrimaryKeyJoinColumn
    private Porudzbina order;
}





