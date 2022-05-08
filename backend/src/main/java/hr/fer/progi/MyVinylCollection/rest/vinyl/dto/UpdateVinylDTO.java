package hr.fer.progi.MyVinylCollection.rest.vinyl.dto;

import hr.fer.progi.MyVinylCollection.domain.Artist;
import hr.fer.progi.MyVinylCollection.domain.Genre;
import hr.fer.progi.MyVinylCollection.domain.Subgenre;

import java.time.LocalTime;

public class UpdateVinylDTO {

    private String album;
    private Artist artist;
    private int releaseYear;
    private Genre genre;
    private Subgenre subgenre;
    private int conditionEvaluation;
    private boolean isRare;
    private String description;
    private double priceKn;
    private String RPM;
    private double diameter;
    private String capacity;
    private String reproductionQuality;
    private int nmbOfAudioChannels;
    private LocalTime timeOfReproduction;

    public String getAlbum() {
        return album;
    }

    public void setAlbum(String album) {
        this.album = album;
    }

    public Artist getArtist() {
        return artist;
    }

    public void setArtist(Artist artist) {
        this.artist = artist;
    }

    public int getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(int releaseYear) {
        this.releaseYear = releaseYear;
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public Subgenre getSubgenre() {
        return subgenre;
    }

    public void setSubgenre(Subgenre subgenre) {
        this.subgenre = subgenre;
    }

    public int getConditionEvaluation() {
        return conditionEvaluation;
    }

    public void setConditionEvaluation(int conditionEvaluation) {
        this.conditionEvaluation = conditionEvaluation;
    }

    public boolean isRare() {
        return isRare;
    }

    public void setRare(boolean rare) {
        isRare = rare;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPriceKn() {
        return priceKn;
    }

    public void setPriceKn(double priceKn) {
        this.priceKn = priceKn;
    }

    public String getRPM() {
        return RPM;
    }

    public void setRPM(String RPM) {
        this.RPM = RPM;
    }

    public double getDiameter() {
        return diameter;
    }

    public void setDiameter(double diameter) {
        this.diameter = diameter;
    }

    public String getCapacity() {
        return capacity;
    }

    public void setCapacity(String capacity) {
        this.capacity = capacity;
    }

    public String getReproductionQuality() {
        return reproductionQuality;
    }

    public void setReproductionQuality(String reproductionQuality) {
        this.reproductionQuality = reproductionQuality;
    }

    public int getNmbOfAudioChannels() {
        return nmbOfAudioChannels;
    }

    public void setNmbOfAudioChannels(int nmbOfAudioChannels) {
        this.nmbOfAudioChannels = nmbOfAudioChannels;
    }

    public LocalTime getTimeOfReproduction() {
        return timeOfReproduction;
    }

    public void setTimeOfReproduction(LocalTime timeOfReproduction) {
        this.timeOfReproduction = timeOfReproduction;
    }
}
