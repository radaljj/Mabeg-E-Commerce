package com.diplomski.mabeg.service;


import com.diplomski.mabeg.dto.KupovinaDto;
import com.diplomski.mabeg.dto.PotvrdaKupovine;

public interface CheckoutService {

    PotvrdaKupovine placeOrder(KupovinaDto purchase);
}
