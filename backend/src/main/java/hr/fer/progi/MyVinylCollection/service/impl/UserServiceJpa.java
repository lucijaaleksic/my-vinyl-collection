package hr.fer.progi.MyVinylCollection.service.impl;

import hr.fer.progi.MyVinylCollection.dao.LocationRepository;
import hr.fer.progi.MyVinylCollection.dao.UserRepository;
import hr.fer.progi.MyVinylCollection.domain.Genre;
import hr.fer.progi.MyVinylCollection.domain.Location;
import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.domain.Vinyl;
import hr.fer.progi.MyVinylCollection.mapper.MapStructMapper;
import hr.fer.progi.MyVinylCollection.rest.user.dto.LoginUserDTO;
import hr.fer.progi.MyVinylCollection.rest.user.dto.RegisterUserDTO;
import hr.fer.progi.MyVinylCollection.rest.user.dto.UpdateUserDTO;
import hr.fer.progi.MyVinylCollection.rest.user.dto.UserProfileDTO;
import hr.fer.progi.MyVinylCollection.service.RequestDeniedException;
import hr.fer.progi.MyVinylCollection.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceJpa implements UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private LocationRepository locationRepo;

    @Autowired
    private MapStructMapper mapstructMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<User> listAll() {
        return userRepo.findAll();
    }

    @Override
    public User findByUsername(String username) {
        return userRepo.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException("No user with username: "+username)
        );
    }

    @Override
    public boolean checkUsernameUnique(RegisterUserDTO user) {
        return userRepo.countByUsername(user.getUsername()) == 0;
    }

    @Override
    public User registerUser(RegisterUserDTO user, List<Genre> userGenrePreference, Location location) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(new User(user, userGenrePreference, location));
    }

    @Override
    public boolean checkUsernameExists(LoginUserDTO user) {
        if(userRepo.countByUsername(user.getUsername()) == 0) {
            return false;
        }
        return true;
    }

    @Override
    public boolean checkPassword(LoginUserDTO user) {
        return passwordEncoder.matches(user.getPassword(),
                userRepo.findByUsername(user.getUsername()).orElseThrow(
                        () -> new UsernameNotFoundException("No user with username: "+user.getUsername())).getPassword());
    }

    @Override
    public String getUserContactEmail(Long userId) {
        if(userRepo.findById(userId).isEmpty())
            throw new RequestDeniedException("No user with id:" + userId);

        return userRepo.getById(userId).getContactEmail();
    }


    @Override
    public boolean updateUserStatus(String username) {
        User user = userRepo.findByUsername(username).orElseThrow(
                () -> new RequestDeniedException("No user with username:" + username));
        user.setActive(!user.isActive());
        userRepo.save(user);
        return user.isActive();
    }

    @Override
    public UpdateUserDTO getUserInfo(String username) {
        User user = userRepo.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException("No user with username: "+username)
        );
        if(user == null) {
            throw new RequestDeniedException("No user with username:" + username);
        } else {
            return mapstructMapper.userToUpdateUserDTO(user);
        }
    }

    @Override
    public boolean updateUserInfo(UpdateUserDTO updatedUser) {
        User user = userRepo.findByUsername(updatedUser.getUsername()).orElseThrow(
                () -> new UsernameNotFoundException("No user with username: "+ updatedUser.getUsername())
        );
        if(updatedUser.getLocation() != null) {
            locationRepo.save(updatedUser.getLocation());
        }
        if(updatedUser.getPassword() != null) {
            updatedUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }
        mapstructMapper.updateUserDTOToUser(updatedUser, user);
        if(user == null) {
            throw new RequestDeniedException("No user with username:" + updatedUser.getUsername());
        } else {
            userRepo.save(user);
            return true;
        }

    }

    @Override
    public void addFavourite(User user, Vinyl vinyl) {
        user.getFavourites().add(vinyl);
        userRepo.save(user);
    }

    @Override
    public void removeFavourite(User user, Vinyl vinyl) {
        user.getFavourites().remove(vinyl);
        userRepo.save(user);
    }

    @Override
    public void addFriend(User currentUser, User newFriend) {
        currentUser.getFriends().add(newFriend);
        userRepo.save(currentUser);
    }

    @Override
    public void removeFriend(User currentUser, User friend) {
        currentUser.getFriends().remove(friend);
        userRepo.save(currentUser);
    }

    @Override
    public List<String> searchByRegex(String regex) {
        return userRepo.searchByRegex(regex).stream().map(u -> u.getUsername()).collect(Collectors.toList());
    }

    @Override
    public UserProfileDTO getUserProfile(User user) {
        return mapstructMapper.userToUserProfileDTO(user);
    }

}
