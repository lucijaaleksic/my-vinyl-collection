package hr.fer.progi.MyVinylCollection.rest.ad.dto;

import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.domain.Vinyl;

public class ExchangeAdDTO {

    private Vinyl vinyl;

    public Vinyl getVinyl() {
        return vinyl;
    }

    public void setVinyl(Vinyl vinyl) {
        this.vinyl = vinyl;
    }
}
