package com.diplomski.mabeg.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="kupac")
@Getter
@Setter
public class Kupac {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="first_name")
    private String ime;

    @Column(name="last_name")
    private String prezime;

    @Column(name="email")
    private String email;

    @Column(name="ime_firme")
    private String imeFirme;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private Set<Porudzbina> orders = new HashSet<>();

    public void add(Porudzbina order) {

        if (order != null) {

            if (orders == null) {
                orders = new HashSet<>();
            }

            orders.add(order);
            order.setCustomer(this);
        }
    }

}









