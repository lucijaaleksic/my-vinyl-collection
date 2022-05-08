package hr.fer.progi.MyVinylCollection.service;

import hr.fer.progi.MyVinylCollection.domain.*;

import java.util.List;

public interface SaleAdService {

    List<SaleAd> getActiveAds(User user);
    SaleAd newAd(SaleAd saleAd, User creator);
    boolean deleteAd(Long id, User owner);
    boolean sellVinyl(PurchaseOffer offer, User seller);
    SaleAd findById(Long id);
    PurchaseOffer showInterest(PurchaseOffer offer,  User adCreator);
    PurchaseOffer findOfferById(Long id);
    void declineOffer(PurchaseOffer offer, User user);
}
