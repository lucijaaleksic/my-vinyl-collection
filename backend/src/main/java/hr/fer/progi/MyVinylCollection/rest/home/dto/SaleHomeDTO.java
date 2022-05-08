package hr.fer.progi.MyVinylCollection.rest.home.dto;

import hr.fer.progi.MyVinylCollection.domain.SaleAd;

import java.util.List;

public class SaleHomeDTO {

    String username;
    SaleAd saleAd;

    public SaleHomeDTO(String username, SaleAd saleAd) {
        this.username = username;
        this.saleAd = saleAd;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public SaleAd getSaleAd() {
        return saleAd;
    }

    public void setSaleAd(SaleAd saleAd) {
        this.saleAd = saleAd;
    }
}
