package hr.fer.progi.MyVinylCollection.rest.vinyl;


import hr.fer.progi.MyVinylCollection.domain.*;
import hr.fer.progi.MyVinylCollection.rest.security.UserSession;
import hr.fer.progi.MyVinylCollection.rest.security.VinylUserDetails;
import hr.fer.progi.MyVinylCollection.rest.user.dto.RegisterUserDTO;
import hr.fer.progi.MyVinylCollection.rest.vinyl.dto.AddVinylDTO;
import hr.fer.progi.MyVinylCollection.service.*;
import hr.fer.progi.MyVinylCollection.rest.vinyl.dto.UpdateVinylDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@Secured({"ROLE_ADMIN", "ROLE_USER"})
@RequestMapping("/vinyls")
public class VinylController {

    @Autowired
    private VinylService vinylService;

    @Autowired
    private UserService userService;

    @Autowired
    private ArtistService artistService;

    @Autowired
    private GenreService genreService;

    @Autowired
    UserSession userSession;

    @GetMapping("/collection")
    public List<Vinyl> getVinylCollection() {
        User user = userService.findByUsername(userSession.getUsername());
        return user.getVinyls();
    }

    @GetMapping("/collection/ad")
    public List<Vinyl> getVinylCollectionForAd() {
        User user = userService.findByUsername(userSession.getUsername());
        return user.getVinyls().stream().filter(v -> isVinylAvailable(user, v)).collect(Collectors.toList());
    }

    private boolean isVinylAvailable(User user, Vinyl vinyl) {
        return user.getSaleAds().stream().noneMatch(ad -> ad.getVinyl().getId().equals(vinyl.getId()) && ad.isActive())
                && user.getExchangeAds().stream().noneMatch(ad -> ad.getVinyl().getId().equals(vinyl.getId()) && ad.isActive());
    }


    @PostMapping("")
    public Vinyl addVinyl(@RequestBody AddVinylDTO vinylDto) {
        User user = userService.findByUsername(userSession.getUsername());
        Artist artist = artistService.findById(vinylDto.getArtistId());
        Genre genre = genreService.getGenreById(vinylDto.getGenreId());
        Subgenre subgenre = null;
        if(vinylDto.getSubgenreId()!=null) {
           subgenre = genreService.getSubgenreById(vinylDto.getSubgenreId());
        }
        Vinyl vinyl = new Vinyl(vinylDto, artist, genre, subgenre);
        return vinylService.addVinyl(vinyl, user);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Object> deleteVinyl(@PathVariable Long id){
        if(vinylService.deleteVinyl(id)){
            return new ResponseEntity<Object>(id, HttpStatus.OK);
        }else{
            return new ResponseEntity<Object>(id, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateVinylInfo(@PathVariable Long id,
                                              @RequestBody UpdateVinylDTO updatedVinyl){
        if(vinylService.updateVinylInfo(id, updatedVinyl)){
            return new ResponseEntity<Object>(id, HttpStatus.OK);
        }else{
            return new ResponseEntity<Object>(id, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @PutMapping("/subcollection/{id}")
    public ResponseEntity<Object> createSubcollection(@PathVariable("id") Long artistId) {
        User user = userService.findByUsername(userSession.getUsername());
        Artist artist = artistService.findById(artistId);
        vinylService.createSubcollection(artist, user);
        return new ResponseEntity<Object>(user, HttpStatus.OK);

    }

    @GetMapping("subcollection")
    public List<Subcollection> getUserSubcollections() {
        User user = userService.findByUsername(userSession.getUsername());
        List<Vinyl> collection = user.getVinyls();
        List<Subcollection> subcollections = new ArrayList();
        user.getSubcollections().forEach( s -> {
            List<Vinyl> subcollectionItems =  collection.stream().filter(v -> v.getArtist().getName()
                    .equals(s.getName())).collect(Collectors.toList());
            subcollections.add(new Subcollection(s.getName(), subcollectionItems));
        });
        return subcollections;
    }

    @DeleteMapping("/subcollection/{id}")
    public ResponseEntity<Object> deleteSubcollection(@PathVariable("id") Long artistId) {
        User user = userService.findByUsername(userSession.getUsername());
        Artist artist = artistService.findById(artistId);
        vinylService.deleteSubcollection(artist, user);
        return new ResponseEntity<Object>(user, HttpStatus.OK);
    }

    @GetMapping("/bought_vinyls")
    public List<Vinyl> getBoughtVinyls(){
        User user = userSession.getUser();
        return user.getBoughtVinyls();
    }


    @GetMapping("/sold_vinyls")
    public List<Vinyl> getSoldVinyls(){
        User user = userSession.getUser();
        return user.getSoldVinyls();
    }

    @GetMapping("/owner/{id}")
    public String getVinylOwner(@PathVariable Long id){
        try{
            Vinyl vinyl = vinylService.findById(id);
            return vinyl.getOwner().getUsername();
        }catch(RequestDeniedException e){
            throw new IllegalArgumentException(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public UpdateVinylDTO getVinylInfo(@PathVariable Long id){
        try{
            return vinylService.getVinylInfo(id);
        }catch(RequestDeniedException e){
            throw new IllegalArgumentException(e.getMessage());
        }
    }




}
