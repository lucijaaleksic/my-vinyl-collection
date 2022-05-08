package hr.fer.progi.MyVinylCollection.rest.home.dto;

import hr.fer.progi.MyVinylCollection.domain.ExchangeAd;
import hr.fer.progi.MyVinylCollection.domain.SaleAd;

import java.util.List;

public class ExchangeHomeDTO {

    String username;
    ExchangeAd exchangeAd;

    public ExchangeHomeDTO(String username, ExchangeAd exchangeAd) {
        this.username = username;
        this.exchangeAd = exchangeAd;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public ExchangeAd getExchangeAd() {
        return exchangeAd;
    }

    public void setExchangeAd(ExchangeAd exchangeAd) {
        this.exchangeAd = exchangeAd;
    }
}
