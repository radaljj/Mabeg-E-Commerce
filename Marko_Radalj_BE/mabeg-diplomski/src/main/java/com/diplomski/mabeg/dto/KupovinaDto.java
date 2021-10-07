package com.diplomski.mabeg.dto;
import com.diplomski.mabeg.entity.Adresa;
import com.diplomski.mabeg.entity.Kupac;
import com.diplomski.mabeg.entity.Porudzbina;
import com.diplomski.mabeg.entity.PorudzbinaProizvod;
import lombok.Data;

import java.util.Set;

@Data
public class KupovinaDto {

    private Kupac customer;
    private Adresa shippingAdresa;
    private Adresa billingAdresa;
    private Porudzbina order;
    private Set<PorudzbinaProizvod> orderItems;

}
