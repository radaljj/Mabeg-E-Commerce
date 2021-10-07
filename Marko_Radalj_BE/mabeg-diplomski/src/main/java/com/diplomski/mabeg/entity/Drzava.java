package com.diplomski.mabeg.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="drzava")
@Getter
@Setter
public class Drzava {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="kod")
    private String kod;

    @Column(name="ime_drzave")
    private String imeDrzave;

    @OneToMany(mappedBy = "drzava")
    @JsonIgnore
    private List<Regija> regije;
}
