package hr.fer.progi.MyVinylCollection.rest.user.dto;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import hr.fer.progi.MyVinylCollection.domain.*;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.List;

public class UserProfileDTO {

    private String name;

    private String surname;

    private String username;

    private String contactEmail;

    private Location location;

    private List<Vinyl> vinyls;

    private List<User> friends;

    private List<SaleAd> saleAds;

    private List<ExchangeAd> exchangeAds;

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

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public List<Vinyl> getVinyls() {
        return vinyls;
    }

    public void setVinyls(List<Vinyl> vinyls) {
        this.vinyls = vinyls;
    }

    public List<User> getFriends() {
        return friends;
    }

    public void setFriends(List<User> friends) {
        this.friends = friends;
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
}
