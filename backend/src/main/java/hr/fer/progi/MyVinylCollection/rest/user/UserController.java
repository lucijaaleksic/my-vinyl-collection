package hr.fer.progi.MyVinylCollection.rest.user;

import com.maxmind.geoip2.exception.GeoIp2Exception;
import hr.fer.progi.MyVinylCollection.domain.*;
import hr.fer.progi.MyVinylCollection.rest.inbox.ExchangeMessage;
import hr.fer.progi.MyVinylCollection.rest.inbox.PurchaseMessage;
import hr.fer.progi.MyVinylCollection.rest.security.UserSession;
import hr.fer.progi.MyVinylCollection.rest.security.VinylUserDetails;
import hr.fer.progi.MyVinylCollection.rest.security.jwt.JwtResponse;
import hr.fer.progi.MyVinylCollection.rest.security.jwt.JwtUtils;
import hr.fer.progi.MyVinylCollection.rest.user.dto.LoginUserDTO;
import hr.fer.progi.MyVinylCollection.rest.user.dto.RegisterUserDTO;
import hr.fer.progi.MyVinylCollection.rest.user.dto.UpdateUserDTO;
import hr.fer.progi.MyVinylCollection.rest.user.dto.UserProfileDTO;
import hr.fer.progi.MyVinylCollection.service.GenreService;
import hr.fer.progi.MyVinylCollection.service.RequestDeniedException;
import hr.fer.progi.MyVinylCollection.service.UserService;
import hr.fer.progi.MyVinylCollection.service.VinylService;
import hr.fer.progi.MyVinylCollection.service.impl.LocationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private VinylService vinylService;

    @Autowired
    private GenreService genreService;

    @Autowired
    private LocationServiceImpl locationService;


    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    UserSession userSession;

    @GetMapping("")
    public List<User> listUsers() {
        return userService.listAll();
    }

    @PostMapping("/auth/register")
    public User registerUser(@RequestBody RegisterUserDTO user) throws IOException, GeoIp2Exception {
        if (userService.checkUsernameUnique(user)) {
            List<Genre> userGenrePreference = genreService.getGenresById(user.getPreferredGenres());
            return userService.registerUser(user, userGenrePreference, getLocationFromIp(user.getIp()));
        } else {
            throw new IllegalArgumentException("Username already exists.");
        }
    }

    private Location getLocationFromIp(String ip) throws IOException, GeoIp2Exception {
        Location location = locationService.getLocation(ip);
        locationService.saveLocation(location);
        return location;
    }

    private ResponseEntity<Object> authenticateUser(LoginUserDTO user) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        VinylUserDetails userDetails = (VinylUserDetails) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.user.getId(),
                userDetails.getUsername(),
                userDetails.user.getEmail(),
                roles));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<Object> loginUser(@RequestBody LoginUserDTO user) {
        if (userService.checkUsernameExists(user) && userService.checkPassword(user)) {
            return authenticateUser(user);
        } else {
            throw new IllegalArgumentException("Invalid username/password.");
        }
    }

    @GetMapping("/contact_email/{id}")
    public String getUserContactEmail(@PathVariable("id") Long userId){
        try{
            return userService.getUserContactEmail(userId);
        }catch(RequestDeniedException e){
            throw new IllegalArgumentException(e.getMessage());
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/status/{username}")
    public ResponseEntity<Object> updateUserStatus(@PathVariable("username") String username){
        try{
            if(userService.updateUserStatus(username)){
                return new ResponseEntity<Object>("User unblocked!", HttpStatus.OK);
            }else{
                return new ResponseEntity<Object>("User blocked!", HttpStatus.OK);
            }
        }catch(RequestDeniedException e){
            throw new IllegalArgumentException(e.getMessage());
        }
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/info")
    public UpdateUserDTO getUserInfo(){
        try{
            return userService.getUserInfo(userSession.getUsername());
        }catch(RequestDeniedException e){
            throw new IllegalArgumentException(e.getMessage());
        }

    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PutMapping("/info")
    public ResponseEntity<Object> updateUserInfo(@RequestBody UpdateUserDTO updatedUser) {
        try {
            if (userService.updateUserInfo(updatedUser)) {
                return new ResponseEntity<Object>(userSession.getUsername(), HttpStatus.OK);
            } else {
                return new ResponseEntity<Object>(userSession.getUsername(), HttpStatus.EXPECTATION_FAILED);
            }
        } catch (RequestDeniedException e) {
            throw new IllegalArgumentException(e.getMessage());
        }
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/favourites")
    public List<Vinyl> getFavourites() {
        User user = userService.findByUsername(userSession.getUsername());
        return user.getFavourites();
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PutMapping("/favourites/{id}")
    public ResponseEntity<Object> manageFavourites(@PathVariable("id") Long vinylId) {
        try {
            User user = userService.findByUsername(userSession.getUsername());
            Vinyl vinyl = vinylService.findById(vinylId);
            if(user.getFavourites().contains(vinyl)) {
                userService.removeFavourite(user, vinyl);
                return new ResponseEntity<Object>("Vinyl removed from favourites!", HttpStatus.OK);
            } else {
                userService.addFavourite(user, vinyl);
                return new ResponseEntity<Object>("Vinyl added to favourites!", HttpStatus.OK);
            }
        } catch (RequestDeniedException e) {
            throw new IllegalArgumentException(e.getMessage());
        }
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PutMapping("friends/{username}")
    public ResponseEntity<Object> manageFriends(@PathVariable("username") String username) {
        try {
            User currentUser = userService.findByUsername(userSession.getUsername());
            User friend = userService.findByUsername(username);
            if(currentUser.getFriends().contains(friend)) {
                userService.removeFriend(currentUser, friend);
                return new ResponseEntity<Object>("User removed from friends!", HttpStatus.OK);
            } else {
                userService.addFriend(currentUser, friend);
                return new ResponseEntity<Object>("User added to friends!", HttpStatus.OK);
            }
        } catch (RequestDeniedException e) {
            throw new IllegalArgumentException(e.getMessage());
        }
    }

    @GetMapping("/friends")
    public List<User> getFriends() {
        return userSession.getUser().getFriends();
    }

    @GetMapping("/offers")
    public List<ExchangeMessage> getOffers() {
        return userSession.getUser().getOffers()
                .stream().map(o -> new ExchangeMessage(o.getOfferor().getUsername(), o)).collect(Collectors.toList());
    }

    @GetMapping("/purchaseOffers")
    public List<PurchaseMessage> getPurchaseOffers() {
        return userSession.getUser().getPurchaseOffers()
                .stream().map(o -> new PurchaseMessage(o.getBuyer().getUsername(), o)).collect(Collectors.toList());
    }

    @GetMapping("/search/{regex}")
    public List<String> searchUsersByRegex(@PathVariable String regex) {
        return userService.searchByRegex(regex);
    }

    @GetMapping("/profile/{username}")
    public UserProfileDTO getUserProfile(@PathVariable String username) {
        return userService.getUserProfile(userService.findByUsername(username));
    }




}
