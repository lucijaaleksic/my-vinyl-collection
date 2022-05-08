package hr.fer.progi.MyVinylCollection.rest.ad.dto;

import hr.fer.progi.MyVinylCollection.domain.Vinyl;

public class SaleAdDTO {

    private double price;

    private Vinyl vinyl;

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
}
