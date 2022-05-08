package hr.fer.progi.MyVinylCollection.rest.vinyl.dto;

import java.time.LocalTime;

public class AddVinylDTO {

    private String album;

    private Long artistId;

    private int releaseYear;

    private Long genreId;

    private Long subgenreId;

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

    public Long getArtistId() {
        return artistId;
    }

    public void setArtistId(Long artistId) {
        this.artistId = artistId;
    }

    public int getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(int releaseYear) {
        this.releaseYear = releaseYear;
    }

    public Long getGenreId() {
        return genreId;
    }

    public void setGenreId(Long genreId) {
        this.genreId = genreId;
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

    public Long getSubgenreId() {
        return subgenreId;
    }

    public void setSubgenreId(Long subgenreId) {
        this.subgenreId = subgenreId;
    }
}
