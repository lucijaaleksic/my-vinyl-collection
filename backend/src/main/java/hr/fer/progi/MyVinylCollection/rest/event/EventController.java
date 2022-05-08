package hr.fer.progi.MyVinylCollection.rest.event;

import hr.fer.progi.MyVinylCollection.domain.Event;
import hr.fer.progi.MyVinylCollection.domain.Location;
import hr.fer.progi.MyVinylCollection.rest.event.dto.EventDTO;
import hr.fer.progi.MyVinylCollection.service.EventService;
import liquibase.pro.packaged.E;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/event")
public class EventController {

    @Autowired
    private EventService eventService;

    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    @GetMapping("")
    public List<Event> listEvents() {
        return eventService.listAll();
    }

    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    @GetMapping("/sorted")
    public List<Event> listEventsByNewest(){
        return eventService.listSorted();
    }

    @Secured("ROLE_ADMIN")
    @PostMapping("/createEvent")
    public Event createEvent(@RequestBody EventDTO eventDTO) {
        Event event = new Event(eventDTO);
        return eventService.createEvent(event);
    }

    @Secured("ROLE_ADMIN")
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateEventInfo (@PathVariable("id") Long eventId, @RequestBody EventDTO eventDTO) {
        if(eventService.updateEventInfo(eventId, eventDTO))
            return new ResponseEntity<Object>(eventId, HttpStatus.OK);
        else
            return new ResponseEntity<Object>(eventId, HttpStatus.EXPECTATION_FAILED);
    }

    @Secured("ROLE_ADMIN")
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Object> deleteEvent(@PathVariable("id") Long eventId){
        if(eventService.deleteEvent(eventId)){
            return new ResponseEntity<Object>(eventId, HttpStatus.OK);
        }else{
            return new ResponseEntity<Object>(eventId, HttpStatus.EXPECTATION_FAILED);
        }
    }
}
