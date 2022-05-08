package hr.fer.progi.MyVinylCollection.dao;

import hr.fer.progi.MyVinylCollection.domain.PurchaseOffer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseOfferRepository extends JpaRepository<PurchaseOffer, Long> {
}
