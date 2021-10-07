package com.diplomski.mabeg.dao;

import com.diplomski.mabeg.entity.KategorijaProizvoda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "proizvodKategorija",path ="proizvod-kategorija")
public interface KategorijaProizvodaRepository extends JpaRepository<KategorijaProizvoda,Long> {
}
