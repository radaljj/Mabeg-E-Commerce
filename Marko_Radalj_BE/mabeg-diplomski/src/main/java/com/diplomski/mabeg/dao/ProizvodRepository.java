package com.diplomski.mabeg.dao;
import org.springframework.web.bind.annotation.RequestParam;
import com.diplomski.mabeg.entity.Proizvod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "proizvodi",path ="proizvodi")
public interface ProizvodRepository extends JpaRepository<Proizvod,Long> {

    Page<Proizvod> findByKategorija_Id(@RequestParam("id") Long id, Pageable pageable);

    Page<Proizvod> findByImeProizvodaContaining(@RequestParam("imeProizvoda") String imeProizvoda, Pageable pageable);


}
