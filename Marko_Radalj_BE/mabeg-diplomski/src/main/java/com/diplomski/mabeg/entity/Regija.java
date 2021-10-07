package com.diplomski.mabeg.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="regija")
@Data
public class Regija {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    public int id;

    @ManyToOne
    @JoinColumn(name="drzava_id")
    private Drzava drzava;

    @Column(name="ime_regije")
    private String imeRegije;
}
