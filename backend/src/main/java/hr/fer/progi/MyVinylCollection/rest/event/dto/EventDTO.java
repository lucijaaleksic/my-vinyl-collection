package hr.fer.progi.MyVinylCollection.rest.event.dto;

import hr.fer.progi.MyVinylCollection.domain.Location;

public class EventDTO {
    private String title;

    private String description;

    private String social_network_link;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSocial_network_link() {
        return social_network_link;
    }

    public void setSocial_network_link(String social_network_link) {
        this.social_network_link = social_network_link;
    }

}
