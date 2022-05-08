package hr.fer.progi.MyVinylCollection.rest.ad;

import hr.fer.progi.MyVinylCollection.domain.*;
import hr.fer.progi.MyVinylCollection.rest.ad.dto.ActiveAdsDto;
import hr.fer.progi.MyVinylCollection.rest.ad.dto.ExchangeAdDTO;
import hr.fer.progi.MyVinylCollection.rest.ad.dto.SaleAdDTO;
import hr.fer.progi.MyVinylCollection.rest.security.UserSession;
import hr.fer.progi.MyVinylCollection.service.ExchangeAdService;
import hr.fer.progi.MyVinylCollection.service.SaleAdService;
import hr.fer.progi.MyVinylCollection.service.UserService;
import hr.fer.progi.MyVinylCollection.service.VinylService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Secured({"ROLE_ADMIN", "ROLE_USER"})
@RequestMapping("/ads")
public class AdController {

    @Autowired
    UserSession userSession;

    @Autowired
    private UserService userService;

    @Autowired
    private SaleAdService saleAdService;

    @Autowired
    private ExchangeAdService exchangeAdService;

    @Autowired
    private VinylService vinylService;

    @GetMapping("/active")
    public ActiveAdsDto getActiveAds(){
        List<SaleAd> saleAds = getSaleAds();
        List<ExchangeAd> exchangeAds = getExchangeAds();
        return new ActiveAdsDto(saleAds, exchangeAds);
    }

    @GetMapping("/sale_ads")
    public List<SaleAd> getSaleAds(){
        User user = userSession.getUser();
        return saleAdService.getActiveAds(user);
    }

    @GetMapping("/exchange_ads")
    public List<ExchangeAd> getExchangeAds(){
        User user = userSession.getUser();
        return exchangeAdService.getActiveAds(user);
    }

    @PostMapping("/sale_ads")
    public SaleAd createNewSaleAd(@RequestBody SaleAdDTO adDTO){
        User user = userSession.getUser();
        return saleAdService.newAd(new SaleAd(adDTO, user), user);
    }

    @PostMapping("/exchange_ads")
    public ExchangeAd createNewExchangeAd(@RequestBody ExchangeAdDTO adDTO){
        User user = userSession.getUser();
        return exchangeAdService.newAd(new ExchangeAd(adDTO, user));
    }

    @DeleteMapping("/sale_ads/{id}")
    public ResponseEntity<Object> deleteSaleAd(@PathVariable Long id){
        User user = userSession.getUser();
        if(saleAdService.deleteAd(id, user))
            return new ResponseEntity<Object>(id, HttpStatus.OK);
        return new ResponseEntity<Object>(id, HttpStatus.EXPECTATION_FAILED);
    }

    @DeleteMapping("/exchange_ads/{id}")
    public ResponseEntity<Object> deleteExchangeAd(@PathVariable Long id){
        User user = userSession.getUser();
        if(exchangeAdService.deleteAd(id, user))
            return new ResponseEntity<Object>(id, HttpStatus.OK);
        return new ResponseEntity<Object>(id, HttpStatus.EXPECTATION_FAILED);
    }

    @PutMapping("/exchange_ads/{id}/offer/{offeringId}")
    public ExchangeOffer askForExchange(@PathVariable("id") Long adId, @PathVariable("offeringId") Long offeringId) {
        User offeror = userSession.getUser();
       ExchangeAd ad = exchangeAdService.findById(adId);
       User adCreator = userService.findByUsername(ad.getCreator().getUsername());
       Vinyl offeringVinyl = vinylService.findById(offeringId);
       return exchangeAdService.askForExchange(new ExchangeOffer(offeringVinyl, ad.getVinyl(), offeror, ad), adCreator);
    }

    @PutMapping("/exchange_ads/exchange/{id}")
    public ResponseEntity<Object> exchangeVinyls(@PathVariable("id") Long offerId) {
        User user = userSession.getUser();
        ExchangeOffer offer = exchangeAdService.findOfferById(offerId);
        if(exchangeAdService.exchangeVinyls(offer, user))
            return new ResponseEntity<Object>("Vinlys have been succesfully exchanged!", HttpStatus.OK);
        return new ResponseEntity<Object>("Ad is inactive", HttpStatus.EXPECTATION_FAILED);
    }

    @PutMapping("/exchange_ads/decline/{id}")
    public ResponseEntity<Object> declineOffer(@PathVariable("id") Long offerId){
        User user = userSession.getUser();
        ExchangeOffer offer = exchangeAdService.findOfferById(offerId);
        exchangeAdService.declineOffer(offer, user);
        return new ResponseEntity<Object>("Offer declined!", HttpStatus.OK);
    }

    @PutMapping("/sale_ads/{id}/offer/")
    public PurchaseOffer showInterestToBuy(@PathVariable("id") Long adId) {
        User user = userSession.getUser();
        SaleAd ad = saleAdService.findById(adId);
        User adCreator = userService.findByUsername(ad.getCreator().getUsername());
        return saleAdService.showInterest(new PurchaseOffer(user, ad), adCreator);
    }


    @PutMapping("/sale_ads/sell/{id}")
    public ResponseEntity<Object> sellVinyl(@PathVariable Long id) {
        User seller = userSession.getUser();
        PurchaseOffer offer = saleAdService.findOfferById(id);
        if(saleAdService.sellVinyl(offer, seller))
            return new ResponseEntity<Object>(offer, HttpStatus.OK);
        return new ResponseEntity<Object>(offer, HttpStatus.EXPECTATION_FAILED);
    }

    @PutMapping("/sale_ads/decline/{id}")
    public ResponseEntity<Object> declinePurchaseOffer(@PathVariable("id") Long id){
        User user = userSession.getUser();
        PurchaseOffer offer = saleAdService.findOfferById(id);
        saleAdService.declineOffer(offer, user);
        return new ResponseEntity<Object>("Offer declined!", HttpStatus.OK);
    }


}
