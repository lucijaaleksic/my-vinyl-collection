package hr.fer.progi.MyVinylCollection.rest.security;

import hr.fer.progi.MyVinylCollection.domain.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

import static org.springframework.security.core.authority.AuthorityUtils.NO_AUTHORITIES;
import static org.springframework.security.core.authority.AuthorityUtils.commaSeparatedStringToAuthorityList;

public class VinylUserDetails implements UserDetails {

    public User user;

    public VinylUserDetails(User user) {
        this.user = user;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if ("admin".equals(user.getUsername())) {
            return commaSeparatedStringToAuthorityList("ROLE_ADMIN");
        } else {
            if(isEnabled()) {
                return commaSeparatedStringToAuthorityList("ROLE_USER");
            } else {
                return commaSeparatedStringToAuthorityList("ROLE_BLOCKED_USER");
            }
        }
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return user.isActive();
    }
}
