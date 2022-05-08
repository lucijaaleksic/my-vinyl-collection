package hr.fer.progi.MyVinylCollection.rest.inbox;

import hr.fer.progi.MyVinylCollection.domain.ExchangeOffer;
import hr.fer.progi.MyVinylCollection.domain.PurchaseOffer;

public class PurchaseMessage {

    private String senderUsername;

    private PurchaseOffer offer;

    public PurchaseMessage(String senderUsername, PurchaseOffer offer) {
        this.senderUsername = senderUsername;
        this.offer = offer;
    }

    public String getSenderUsername() {
        return senderUsername;
    }

    public void setSenderUsername(String senderUsername) {
        this.senderUsername = senderUsername;
    }

    public PurchaseOffer getOffer() {
        return offer;
    }

    public void setOffer(PurchaseOffer offer) {
        this.offer = offer;
    }
}
