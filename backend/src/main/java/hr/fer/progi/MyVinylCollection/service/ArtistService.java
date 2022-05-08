package hr.fer.progi.MyVinylCollection.service;

import hr.fer.progi.MyVinylCollection.domain.Artist;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ArtistService {

    List<Artist> listAll();
    Artist findById(Long artistId);

}

