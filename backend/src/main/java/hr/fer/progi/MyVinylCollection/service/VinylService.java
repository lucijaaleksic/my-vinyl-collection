package hr.fer.progi.MyVinylCollection.service;

import hr.fer.progi.MyVinylCollection.domain.Artist;
import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.domain.Vinyl;
import hr.fer.progi.MyVinylCollection.rest.vinyl.dto.UpdateVinylDTO;

public interface VinylService {

    Vinyl findById(Long id);
    Vinyl addVinyl(Vinyl vinyl, User user);
    UpdateVinylDTO getVinylInfo(long vinylId);
    boolean updateVinylInfo(long vinylId, UpdateVinylDTO updatedVinyl);
    boolean deleteVinyl(long vinylId);
    void createSubcollection(Artist artist, User user);
    void deleteSubcollection(Artist artist, User user);
}
