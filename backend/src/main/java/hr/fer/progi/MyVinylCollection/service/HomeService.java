package hr.fer.progi.MyVinylCollection.service;

import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.domain.Vinyl;
import hr.fer.progi.MyVinylCollection.rest.home.dto.ExchangeHomeDTO;
import hr.fer.progi.MyVinylCollection.rest.home.dto.SaleHomeDTO;

import java.util.List;

public interface HomeService {

    List<Vinyl> getVinyls(User user);
    List<SaleHomeDTO> getSaleAds(User user);
    List<ExchangeHomeDTO> getExchangeAds(User user);
    List<Vinyl> getAllVinyls();
    List<SaleHomeDTO> getAllSaleAds();
    List<ExchangeHomeDTO> getAllExchangeAds();


}
