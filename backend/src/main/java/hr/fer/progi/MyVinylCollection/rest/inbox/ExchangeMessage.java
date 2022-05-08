package hr.fer.progi.MyVinylCollection.rest.inbox;

import hr.fer.progi.MyVinylCollection.domain.ExchangeOffer;

public class ExchangeMessage {

    private String senderUsername;

    private ExchangeOffer offer;

    public ExchangeMessage(String senderUsername, ExchangeOffer offer) {
        this.senderUsername = senderUsername;
        this.offer = offer;
    }

    public String getSenderUsername() {
        return senderUsername;
    }

    public void setSenderUsername(String senderUsername) {
        this.senderUsername = senderUsername;
    }

    public ExchangeOffer getOffer() {
        return offer;
    }

    public void setOffer(ExchangeOffer offer) {
        this.offer = offer;
    }
}
