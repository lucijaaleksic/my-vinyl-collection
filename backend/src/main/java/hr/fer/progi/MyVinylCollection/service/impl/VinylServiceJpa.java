package hr.fer.progi.MyVinylCollection.service.impl;

import hr.fer.progi.MyVinylCollection.dao.UserRepository;
import hr.fer.progi.MyVinylCollection.dao.VinylRepository;
import hr.fer.progi.MyVinylCollection.domain.Artist;
import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.domain.Vinyl;
import hr.fer.progi.MyVinylCollection.mapper.MapStructMapper;
import hr.fer.progi.MyVinylCollection.rest.vinyl.dto.UpdateVinylDTO;
import hr.fer.progi.MyVinylCollection.service.RequestDeniedException;
import hr.fer.progi.MyVinylCollection.service.VinylService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VinylServiceJpa implements VinylService {

    @Autowired
    private VinylRepository vinylRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private MapStructMapper mapstructMapper;

    @Override
    public Vinyl findById(Long id) {
        return vinylRepo.findById(id).orElseThrow(
                () -> new RequestDeniedException("No vinyl with id " + id)
        );
    }

    @Override
    public Vinyl addVinyl(Vinyl vinyl, User user) {
        vinyl.setOwner(user);
        user.getVinyls().add(vinyl);
        return vinylRepo.save(vinyl);
    }

    @Override
    public UpdateVinylDTO getVinylInfo(long vinylId) {
        Vinyl vinyl = findById(vinylId);
        return mapstructMapper.vinylToUpdateVinylDTO(vinyl);
    }

    @Override
    public boolean updateVinylInfo(long vinylId, UpdateVinylDTO updatedVinyl) {
        Vinyl vinyl = findById(vinylId);
        mapstructMapper.updateVinylDTOToVinyl(updatedVinyl, vinyl);
        vinylRepo.save(vinyl);
        return true;
    }

    @Override
    public boolean deleteVinyl(long vinylId) {
        User owner = findById(vinylId).getOwner();
        owner.getVinyls().remove(findById(vinylId));
        vinylRepo.deleteById(vinylId);
        return true;

    }

    @Override
    public void createSubcollection(Artist artist, User user) {
        if(user.getSubcollections().contains(artist)) {
            throw new RequestDeniedException(String.format("Subcollection %s already exists!", artist.getName()));
        } else {
            user.getSubcollections().add(artist);
            userRepo.save(user);
        }

    }

    @Override
    public void deleteSubcollection(Artist artist, User user) {
        if(user.getSubcollections().contains(artist)) {
            user.getSubcollections().remove(artist);
            userRepo.save(user);
        } else {
            throw new RequestDeniedException(String.format("Subcollection %s doesnt exist!", artist.getName()));
        }

    }

}
