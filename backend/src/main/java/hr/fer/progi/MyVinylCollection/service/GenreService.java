package hr.fer.progi.MyVinylCollection.service;

import hr.fer.progi.MyVinylCollection.domain.Genre;
import hr.fer.progi.MyVinylCollection.domain.Subgenre;

import java.util.List;

public interface GenreService {

    List<Genre> listAll();
    Genre getGenreById(Long genreId);
    List<Genre> getGenresById(List<Long> genreIds);
    Subgenre getSubgenreById(Long subgenreId);
}
