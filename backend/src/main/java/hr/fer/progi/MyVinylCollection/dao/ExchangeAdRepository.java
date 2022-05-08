package hr.fer.progi.MyVinylCollection.dao;

import hr.fer.progi.MyVinylCollection.domain.ExchangeAd;
import hr.fer.progi.MyVinylCollection.domain.SaleAd;
import hr.fer.progi.MyVinylCollection.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExchangeAdRepository extends JpaRepository<ExchangeAd, Long> {

    @Query("SELECT e FROM exchange_ad e WHERE e.isActive = true AND e.creator = :user")
    List<ExchangeAd> getActiveAds(@Param("user") User user);

    @Modifying
    @Query("UPDATE exchange_ad e SET e.isActive = false, e.newOwner = :newOwner, e.exchangedVinyl = :exchangedVinylId WHERE e.id = :adId")
    ExchangeAd exchangeOwners(@Param("adId") Long adId, @Param("newOwner") Long newOwner, @Param("exchangedVinylId") Long exchangedVinylId);

    List<ExchangeAd> findByCreatorNot(User user);
}
