package com.diplomski.mabeg.dao;

import com.diplomski.mabeg.entity.Drzava;
import com.diplomski.mabeg.entity.Proizvod;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;


@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "drzave",path ="drzave")
public interface DrzavaRepository  extends JpaRepository<Drzava,Integer> {


}
