package com.diplomski.mabeg.config;

import com.diplomski.mabeg.entity.Drzava;
import com.diplomski.mabeg.entity.KategorijaProizvoda;
import com.diplomski.mabeg.entity.Proizvod;
import com.diplomski.mabeg.entity.Regija;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    public MyDataRestConfig(EntityManager theEntityManager){
        entityManager=theEntityManager;

    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {





        HttpMethod []unsupportedActions={HttpMethod.PUT,HttpMethod.DELETE,HttpMethod.POST};
    // da bih ogranicio pristup, ogranicavam pristup metodama u ovom nizu klasa Proizvod

        disableHttpMethods(Proizvod.class,config, unsupportedActions);
        disableHttpMethods(KategorijaProizvoda.class,config, unsupportedActions);
        disableHttpMethods(Drzava.class,config, unsupportedActions);
        disableHttpMethods(Regija.class,config, unsupportedActions);

        // expozivanje ID-a
        //metoda za ubacivanje ID-a u rest poziv
        exposeId(config);
    }



    private void exposeId(RepositoryRestConfiguration config) {
// uzmi id
// uzmi listu svih entiteta pomocu entety managera
        Set<EntityType<?>> entities=entityManager.getMetamodel().getEntities();
        List<Class> entityClasses=new ArrayList<>();

        for(EntityType entityType:entities){
            entityClasses.add(entityType.getJavaType());
        }


        //expose entity id za listu entiteta

        Class[]domainTypes=entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);

    }

    private void disableHttpMethods(Class theClass,RepositoryRestConfiguration config, HttpMethod[] unsupportedActions) {
        config.getExposureConfiguration().
                forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedActions));
    }
}
