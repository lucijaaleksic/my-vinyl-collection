package hr.fer.progi.MyVinylCollection.service.impl;

import hr.fer.progi.MyVinylCollection.dao.ExchangeAdRepository;
import hr.fer.progi.MyVinylCollection.dao.SaleAdRepository;
import hr.fer.progi.MyVinylCollection.dao.VinylRepository;
import hr.fer.progi.MyVinylCollection.domain.*;
import hr.fer.progi.MyVinylCollection.rest.home.dto.ExchangeHomeDTO;
import hr.fer.progi.MyVinylCollection.rest.home.dto.SaleHomeDTO;
import hr.fer.progi.MyVinylCollection.service.HomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HomeServiceJpa implements HomeService {

    @Autowired
    private VinylRepository vinylRepo;

    @Autowired
    private SaleAdRepository saleAdRepo;

    @Autowired
    private ExchangeAdRepository exchangeAdRepo;

    @Override
    public List<Vinyl> getVinyls(User user) {
        List<Genre> genres = user.getPreferredGenres();
        return vinylRepo.findByOwnerNot(user).stream().filter(v -> genres.contains(v.getGenre()) && !v.getOwner().getId().equals(user.getId())).collect(Collectors.toList());
    }

    @Override
    public List<SaleHomeDTO> getSaleAds(User user) {
        List<Genre> genres = user.getPreferredGenres();
        List<SaleAd> ads = saleAdRepo.findByCreatorNot(user).stream().filter(v -> genres.contains(v.getVinyl().getGenre()) && !v.getCreator().getId().equals(user.getId())).collect(Collectors.toList());
        return ads.stream().map(ad -> new SaleHomeDTO(ad.getCreator().getUsername(), ad)).collect(Collectors.toList());
    }

    @Override
    public List<ExchangeHomeDTO> getExchangeAds(User user) {
        List<Genre> genres = user.getPreferredGenres();
        List<ExchangeAd> ads = exchangeAdRepo.findByCreatorNot(user).stream().filter(v -> genres.contains(v.getVinyl().getGenre()) && !v.getCreator().getId().equals(user.getId())).collect(Collectors.toList());
        return ads.stream().map(ad -> new ExchangeHomeDTO(ad.getCreator().getUsername(), ad)).collect(Collectors.toList());
    }

    @Override
    public List<Vinyl> getAllVinyls() {
        return vinylRepo.findAll();
    }

    @Override
    public List<SaleHomeDTO> getAllSaleAds() {
        List<SaleAd> ads = saleAdRepo.findAll();
        return ads.stream().map(ad -> new SaleHomeDTO(ad.getCreator().getUsername(), ad)).collect(Collectors.toList());
    }

    @Override
    public List<ExchangeHomeDTO> getAllExchangeAds() {
        List<ExchangeAd> ads = exchangeAdRepo.findAll();
        return ads.stream().map(ad -> new ExchangeHomeDTO(ad.getCreator().getUsername(), ad)).collect(Collectors.toList());
    }
}
