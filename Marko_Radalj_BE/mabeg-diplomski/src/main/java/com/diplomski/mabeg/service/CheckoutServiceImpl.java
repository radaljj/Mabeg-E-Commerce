package com.diplomski.mabeg.service;

import com.diplomski.mabeg.dao.CustomerRepository;
import com.diplomski.mabeg.dto.KupovinaDto;
import com.diplomski.mabeg.dto.PotvrdaKupovine;
import com.diplomski.mabeg.entity.Kupac;
import com.diplomski.mabeg.entity.Porudzbina;
import com.diplomski.mabeg.entity.PorudzbinaProizvod;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private CustomerRepository customerRepository;

    public CheckoutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PotvrdaKupovine placeOrder(KupovinaDto purchase) {

        // retrieve the order info from dto
        Porudzbina order = purchase.getOrder();

        // generate tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        // populate order with orderItems
        Set<PorudzbinaProizvod> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        // populate order with billingAddress and billingAdresa
        order.setBillingAdresa(purchase.getBillingAdresa());
        order.setShippingAdresa(purchase.getShippingAdresa());

        // populate customer with order
        Kupac customer = purchase.getCustomer();
        customer.add(order);

        // save to the database
        customerRepository.save(customer);

        // return a response
        return new PotvrdaKupovine(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {


        return UUID.randomUUID().toString();
    }
}









