package hr.fer.progi.MyVinylCollection.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import hr.fer.progi.MyVinylCollection.rest.vinyl.dto.AddVinylDTO;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;


import static hr.fer.progi.MyVinylCollection.util.CurrencyUtil.convertToEuro;

@Entity(name="vinyl")
public class Vinyl {

    @Id
    @GeneratedValue
    private Long id;

    private String album;

    @ManyToOne
    @JoinColumn(name="artist_id", nullable=false)
    private Artist artist;

    private int releaseYear;

    @ManyToOne
    @JoinColumn(name="genre_id", nullable=false)
    private Genre genre;

    @ManyToOne
    @JoinColumn(name="subgenre_id")
    private Subgenre subgenre;

    @ManyToOne
    @JsonBackReference
    private User owner;

    private int conditionEvaluation;

    private boolean isRare;

    private String description;

    private double priceKn;

    private String RPM;

    private double diameter;

    private String capacity;

    private String reproductionQuality;

    private int nmbOfAudioChannels;

    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime timeOfReproduction;

    public Vinyl() {

    }

    public Vinyl(AddVinylDTO dto, Artist artist, Genre genre, Subgenre subgenre) {
        this.album = dto.getAlbum();
        this.artist = artist;
        this.releaseYear = dto.getReleaseYear();
        this.genre = genre;
        this.subgenre = subgenre;
        this.priceKn = dto.getPriceKn();
        this.capacity = dto.getCapacity();
        this.conditionEvaluation = dto.getConditionEvaluation();
        this.description = dto.getDescription();
        this.diameter = dto.getDiameter();
        this.isRare = dto.isRare();
        this.nmbOfAudioChannels = dto.getNmbOfAudioChannels();
        this.reproductionQuality = dto.getReproductionQuality();
        this.RPM = dto.getRPM();
        this.timeOfReproduction = dto.getTimeOfReproduction();
    }

    private String getPrice() {
        return new StringBuilder().append(priceKn).append(" HRK").append("(").append(convertToEuro(priceKn)).append(" EUR").append(")").toString();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

}
