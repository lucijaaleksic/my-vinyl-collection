package hr.fer.progi.MyVinylCollection.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;

@Entity(name="purchase_offer")
public class PurchaseOffer {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name="buyer_id")
    @JsonBackReference
    private User buyer;

    @ManyToOne
    @JoinColumn(name="ad_id")
    private SaleAd ad;

    public PurchaseOffer(User buyer, SaleAd ad) {
        this.buyer = buyer;
        this.ad = ad;
    }

    public PurchaseOffer() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getBuyer() {
        return buyer;
    }

    public void setBuyer(User buyer) {
        this.buyer = buyer;
    }

    public SaleAd getAd() {
        return ad;
    }

    public void setAd(SaleAd ad) {
        this.ad = ad;
    }
}
