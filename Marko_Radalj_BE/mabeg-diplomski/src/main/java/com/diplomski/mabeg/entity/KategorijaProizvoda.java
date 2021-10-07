package com.diplomski.mabeg.entity;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="kategorija_proizvoda")
@Getter
@Setter
public class KategorijaProizvoda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    private String imeKategorije;

    @OneToMany(cascade = CascadeType.ALL,mappedBy ="kategorija")
    private Set<Proizvod>proizvodi;


}
