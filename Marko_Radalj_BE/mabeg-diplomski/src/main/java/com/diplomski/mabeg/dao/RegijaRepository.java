package com.diplomski.mabeg.dao;

import com.diplomski.mabeg.entity.Regija;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "regije",path ="regije")
public interface RegijaRepository extends JpaRepository<Regija,Integer> {

    List<Regija> findByDrzavaKod(@Param("kod")String kod);
}
