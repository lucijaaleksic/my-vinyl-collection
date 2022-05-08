package hr.fer.progi.MyVinylCollection.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import hr.fer.progi.MyVinylCollection.rest.ad.dto.ExchangeAdDTO;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;

@Entity(name="exchange_ad")
public class ExchangeAd {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name="is_active")
    private boolean isActive;

    @ManyToOne
    @JoinColumn(name="vinyl_id", nullable=false)
    @LazyCollection(LazyCollectionOption.FALSE)
    private Vinyl vinyl;

    @LazyCollection(LazyCollectionOption.FALSE)
    @ManyToOne
    @JoinColumn(name="creator_id", nullable=false)
    @JsonBackReference
    private User creator;

    @OneToOne(cascade = CascadeType.ALL)
    @LazyCollection(LazyCollectionOption.FALSE)
    @JoinColumn(name = "exchanged_vinyl_id")
    private Vinyl exchangedVinyl;

    @ManyToOne(cascade = CascadeType.ALL)
    @LazyCollection(LazyCollectionOption.FALSE)
    @JoinColumn(name = "new_owner_id")
    private User newOwner;

    public ExchangeAd() {
    }

    public ExchangeAd(ExchangeAdDTO adDTO, User creator){
        this.isActive = true;
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

    public Vinyl getExchangedVinyl() {
        return exchangedVinyl;
    }

    public void setExchangedVinyl(Vinyl exchangedVinyl) {
        this.exchangedVinyl = exchangedVinyl;
    }

    public User getNewOwner() {
        return newOwner;
    }

    public void setNewOwner(User newOwner) {
        this.newOwner = newOwner;
    }
}
