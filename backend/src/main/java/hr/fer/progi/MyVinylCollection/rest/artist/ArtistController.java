package hr.fer.progi.MyVinylCollection.rest.artist;

import hr.fer.progi.MyVinylCollection.domain.Artist;
import hr.fer.progi.MyVinylCollection.service.ArtistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Secured({"ROLE_ADMIN", "ROLE_USER"})
@RequestMapping("/artists")
public class ArtistController {

    @Autowired
    private ArtistService artistService;

    @GetMapping("")
    public List<Artist> listArtists() { return artistService.listAll(); }

    @GetMapping("/getById")
    public Artist getArtistsById(@RequestBody Long artistId) {
        return artistService.findById(artistId);
    }


}