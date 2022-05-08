package hr.fer.progi.MyVinylCollection.domain;

import java.util.List;

public class Subcollection {

    private String name;

    private List<Vinyl> items;

    public Subcollection(String name, List<Vinyl> subcollectionItems) {
        this.name = name;
        this.items = subcollectionItems;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Vinyl> getItems() {
        return items;
    }

    public void setItems(List<Vinyl> items) {
        this.items = items;
    }
}
