package hr.fer.progi.MyVinylCollection.service;

import hr.fer.progi.MyVinylCollection.domain.Genre;
import hr.fer.progi.MyVinylCollection.domain.Location;
import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.domain.Vinyl;
import hr.fer.progi.MyVinylCollection.rest.user.dto.LoginUserDTO;
import hr.fer.progi.MyVinylCollection.rest.user.dto.RegisterUserDTO;
import hr.fer.progi.MyVinylCollection.rest.user.dto.UpdateUserDTO;
import hr.fer.progi.MyVinylCollection.rest.user.dto.UserProfileDTO;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<User> listAll();
    User findByUsername(String username);
    boolean checkUsernameUnique(RegisterUserDTO user);
    User registerUser(RegisterUserDTO user, List<Genre> userGenrePreference, Location location);
    boolean checkUsernameExists(LoginUserDTO user);
    boolean checkPassword(LoginUserDTO user);
    String getUserContactEmail(Long userId);
    boolean updateUserStatus(String username);
    UpdateUserDTO getUserInfo(String username);
    boolean updateUserInfo(UpdateUserDTO updatedUser);
    void addFavourite(User user, Vinyl vinyl);
    void removeFavourite(User user, Vinyl vinyl);
    void addFriend(User currentUser, User newFriend);
    void removeFriend(User currentUser, User friend);
    List<String> searchByRegex(String regex);
    UserProfileDTO getUserProfile(User user);

}
