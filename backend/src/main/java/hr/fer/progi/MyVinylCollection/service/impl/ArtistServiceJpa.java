package hr.fer.progi.MyVinylCollection.service.impl;

import hr.fer.progi.MyVinylCollection.dao.ArtistRepository;
import hr.fer.progi.MyVinylCollection.domain.Artist;
import hr.fer.progi.MyVinylCollection.service.ArtistService;
import hr.fer.progi.MyVinylCollection.service.RequestDeniedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class ArtistServiceJpa implements ArtistService {

    @Autowired
    private ArtistRepository artistRepo;

    @Override
    public List<Artist> listAll() {
        return artistRepo.findAll();
    }

    @Override
    public Artist findById(Long artistId) {
        return artistRepo.findById(artistId).orElseThrow(
                () -> new RequestDeniedException("No artist with id " + artistId)
        );

    }
}
