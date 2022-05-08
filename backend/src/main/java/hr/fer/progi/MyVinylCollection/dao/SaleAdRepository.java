package hr.fer.progi.MyVinylCollection.dao;

import hr.fer.progi.MyVinylCollection.domain.SaleAd;
import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.domain.Vinyl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SaleAdRepository extends JpaRepository<SaleAd, Long> {

    @Query("SELECT s FROM sale_ad s WHERE s.isActive = true AND s.creator = :user")
    List<SaleAd> getActiveAds(@Param("user") User user);

    @Modifying
    @Query("UPDATE sale_ad s SET s.isActive = false WHERE s =: ad")
    void setSaleAdInactive(@Param("ad") SaleAd ad);

    List<SaleAd> findByCreatorNot(User user);
}
