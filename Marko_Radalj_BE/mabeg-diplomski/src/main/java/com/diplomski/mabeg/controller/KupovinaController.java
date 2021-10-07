package com.diplomski.mabeg.controller;


import com.diplomski.mabeg.dto.KupovinaDto;
import com.diplomski.mabeg.dto.PotvrdaKupovine;
import com.diplomski.mabeg.service.CheckoutService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api")
public class KupovinaController {

    private CheckoutService checkoutService;

    public KupovinaController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/kupovina")
    public PotvrdaKupovine placeOrder(@RequestBody KupovinaDto purchase) {

        PotvrdaKupovine purchaseResponse = checkoutService.placeOrder(purchase);

        return purchaseResponse;
    }

}









