package hr.fer.progi.MyVinylCollection.rest.ad.dto;

import hr.fer.progi.MyVinylCollection.domain.ExchangeAd;
import hr.fer.progi.MyVinylCollection.domain.SaleAd;

import java.util.List;

public class ActiveAdsDto {

    private List<SaleAd> saleAds;

    private List<ExchangeAd> exchangeAds;

    public ActiveAdsDto(List<SaleAd> saleAds, List<ExchangeAd> exchangeAds) {
        this.saleAds = saleAds;
        this.exchangeAds = exchangeAds;
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
