package com.diplomski.mabeg.dao;

import com.diplomski.mabeg.entity.Kupac;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Kupac, Long> {
}
