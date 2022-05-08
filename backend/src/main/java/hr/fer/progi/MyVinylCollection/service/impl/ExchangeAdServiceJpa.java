package hr.fer.progi.MyVinylCollection.service.impl;

import hr.fer.progi.MyVinylCollection.dao.ExchangeAdRepository;
import hr.fer.progi.MyVinylCollection.dao.ExchangeOfferRepository;
import hr.fer.progi.MyVinylCollection.dao.UserRepository;
import hr.fer.progi.MyVinylCollection.dao.VinylRepository;
import hr.fer.progi.MyVinylCollection.domain.ExchangeAd;
import hr.fer.progi.MyVinylCollection.domain.ExchangeOffer;
import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.domain.Vinyl;
import hr.fer.progi.MyVinylCollection.service.ExchangeAdService;
import hr.fer.progi.MyVinylCollection.service.RequestDeniedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExchangeAdServiceJpa implements ExchangeAdService {

    @Autowired
    private ExchangeAdRepository exchangeAdRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private VinylRepository vinylRepo;

    @Autowired
    private ExchangeOfferRepository exchangeOfferRepo;

    @Override
    public List<ExchangeAd> getActiveAds(User user) {
        return exchangeAdRepo.getActiveAds(user);
    }

    @Override
    public ExchangeAd newAd(ExchangeAd newAd) {
        newAd.getCreator().getExchangeAds().add(newAd);
        exchangeAdRepo.save(newAd);
        userRepo.save(newAd.getCreator());
        return newAd;
    }

    @Override
    public boolean deleteAd(Long id, User owner) {
        owner.getExchangeAds().remove(exchangeAdRepo.findById(id).orElseThrow(
                () -> new RequestDeniedException("You are not owner of this ad.")));
        exchangeAdRepo.deleteById(id);
        userRepo.save(owner);
        return true;
    }

    @Override
    public boolean exchangeVinyls(ExchangeOffer offer, User user) {
        //Boilerplate code that makes you cry, but it works at least! :)
        if(offer.getAd().isActive()) {
            offer.getGivingVinyl().setOwner(user);
            offer.getReceivingVinyl().setOwner(offer.getOfferor());
            vinylRepo.save(offer.getGivingVinyl());
            vinylRepo.save(offer.getReceivingVinyl());
            ExchangeAd ad = offer.getAd();
            ad.setActive(false);
            ad.setExchangedVinyl(offer.getGivingVinyl());
            ad.setNewOwner(offer.getOfferor());
            exchangeAdRepo.save(ad);
            user.getOffers().remove(offer);
            List<Vinyl> userCollection = user.getVinyls();
            List<Vinyl> offerorCollection = offer.getOfferor().getVinyls();
            userCollection.remove(offer.getReceivingVinyl());
            offerorCollection.remove(offer.getGivingVinyl());
            offer.getOfferor().setVinyls(offerorCollection);
            user.setVinyls(userCollection);
            userRepo.save(user);
            userRepo.save(offer.getOfferor());
            userCollection.add(offer.getGivingVinyl());
            user.getBoughtVinyls().add(offer.getGivingVinyl());
            user.getSoldVinyls().add(offer.getReceivingVinyl());
            offer.getOfferor().getBoughtVinyls().add(offer.getGivingVinyl());
            offer.getOfferor().getSoldVinyls().add(offer.getReceivingVinyl());
            offerorCollection.add(offer.getReceivingVinyl());
            user.getOffers().remove(offer);
            userRepo.save(user);
            userRepo.save(offer.getOfferor());
            return true;
        } else {
            user.getOffers().remove(offer);
            userRepo.save(user);
            return false;
        }
    }

    @Override
    public ExchangeOffer askForExchange(ExchangeOffer exchangeOffer, User adCreator) {
        exchangeOfferRepo.save(exchangeOffer);
        adCreator.getOffers().add(exchangeOffer);
        userRepo.save(adCreator);
        return exchangeOffer;
    }

    @Override
    public void declineOffer(ExchangeOffer offer, User user) {
        user.getOffers().remove(offer);
        userRepo.save(user);
    }

    @Override
    public ExchangeAd findById(Long id) {
        return exchangeAdRepo.findById(id).orElseThrow(
                () -> new RequestDeniedException("No ad with id " + id)
        );
    }

    @Override
    public ExchangeOffer findOfferById(Long id) {
        return exchangeOfferRepo.findById(id).orElseThrow(
                () -> new RequestDeniedException("No offer with id " + id)
        );
    }

}
