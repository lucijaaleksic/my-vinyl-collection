package hr.fer.progi.MyVinylCollection.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import hr.fer.progi.MyVinylCollection.rest.ad.dto.SaleAdDTO;

import javax.persistence.*;

@Entity(name="sale_ad")
public class SaleAd {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name="is_active")
    private boolean isActive;

    private double price;

    @ManyToOne
    @JoinColumn(name="vinyl_id", nullable=false)
    private Vinyl vinyl;

    @ManyToOne
    @JoinColumn(name="creator_id", nullable=false)
    @JsonBackReference
    private User creator;


    public SaleAd() {
    }

    public SaleAd(SaleAdDTO adDTO, User creator) {
        this.isActive = true;
        this.price = adDTO.getPrice();
        this.creator = creator;
        this.vinyl = adDTO.getVinyl();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Vinyl getVinyl() {
        return vinyl;
    }

    public void setVinyl(Vinyl vinyl) {
        this.vinyl = vinyl;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User owner) {
        this.creator = owner;
    }
}
