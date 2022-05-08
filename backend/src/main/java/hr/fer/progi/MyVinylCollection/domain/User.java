package hr.fer.progi.MyVinylCollection.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import hr.fer.progi.MyVinylCollection.rest.user.dto.RegisterUserDTO;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.List;

@Entity(name="vinyl_user")
public class User {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private String surname;

    @Column(unique=true, nullable=false)
    private String username;

    private String password;

    @Email(message = "Email not in correct format")
    private String email;

    @Column(name="contact_email")
    private String contactEmail;

    @OneToOne
    @JoinColumn(name="location_id", nullable=false)
    private Location location;

    @Column(name="is_active")
    private boolean isActive;

    @LazyCollection(LazyCollectionOption.FALSE)
    @ManyToMany(cascade=CascadeType.ALL)
    private List<Genre> preferredGenres;

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Vinyl> vinyls;

    @LazyCollection(LazyCollectionOption.FALSE)
    @ManyToMany(cascade=CascadeType.ALL)
    private List<Artist> subcollections;

    @LazyCollection(LazyCollectionOption.FALSE)
    @ManyToMany(cascade=CascadeType.ALL)
    private List<Vinyl> favourites;

    @LazyCollection(LazyCollectionOption.FALSE)
    @ManyToMany(cascade=CascadeType.ALL)
    private List<User> friends;

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<SaleAd> saleAds;

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<ExchangeAd> exchangeAds;

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<ExchangeOffer> offers;

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<PurchaseOffer> purchaseOffers;

    @LazyCollection(LazyCollectionOption.FALSE)
    @ManyToMany(cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Vinyl> boughtVinyls;

    @LazyCollection(LazyCollectionOption.FALSE)
    @ManyToMany(cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Vinyl> soldVinyls;

    public User() {}

    public User(RegisterUserDTO user, List<Genre> userGenrePreference, Location location) {
        this.name = user.getName();
        this.surname = user.getSurname();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.contactEmail = user.getEmail();
        this.isActive = true;
        this.location = location;
        this.preferredGenres = userGenrePreference;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public List<Genre> getPreferredGenres() {
        return preferredGenres;
    }

    public void setPreferredGenres(List<Genre> preferredGenres) {
        this.preferredGenres = preferredGenres;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public List<Vinyl> getVinyls() {
        return vinyls;
    }

    public void setVinyls(List<Vinyl> vinyls) {
        this.vinyls = vinyls;
    }

    public List<Artist> getSubcollections() {
        return subcollections;
    }

    public void setSubcollections(List<Artist> subcollections) {
        this.subcollections = subcollections;
    }

    public List<Vinyl> getFavourites() {
        return favourites;
    }

    public void setFavourites(List<Vinyl> favourites) {
        this.favourites = favourites;
    }

    public List<SaleAd> getSaleAds() {
        return saleAds;
    }

    public void setSaleAds(List<SaleAd> saleAds) {
        this.saleAds = saleAds;
    }

    public List<ExchangeAd> getExchangeAds() {
        return exchangeAds;
    }

    public void setExchangeAds(List<ExchangeAd> exchangeAds) {
        this.exchangeAds = exchangeAds;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public List<User> getFriends() {
        return friends;
    }

    public void setFriends(List<User> friends) {
        this.friends = friends;
    }

    public List<ExchangeOffer> getOffers() {
        return offers;
    }

    public void setOffers(List<ExchangeOffer> offers) {
        this.offers = offers;
    }

    public List<PurchaseOffer> getPurchaseOffers() {
        return purchaseOffers;
    }

    public void setPurchaseOffers(List<PurchaseOffer> purchaseOffers) {
        this.purchaseOffers = purchaseOffers;
    }

    public List<Vinyl> getBoughtVinyls() {
        return boughtVinyls;
    }

    public void setBoughtVinyls(List<Vinyl> boughtVinyls) {
        this.boughtVinyls = boughtVinyls;
    }

    public List<Vinyl> getSoldVinyls() {
        return soldVinyls;
    }

    public void setSoldVinyls(List<Vinyl> soldVinyls) {
        this.soldVinyls = soldVinyls;
    }
}
