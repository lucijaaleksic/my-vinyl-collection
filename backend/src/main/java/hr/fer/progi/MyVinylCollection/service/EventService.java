package hr.fer.progi.MyVinylCollection.service;

import hr.fer.progi.MyVinylCollection.domain.Event;
import hr.fer.progi.MyVinylCollection.domain.Location;
import hr.fer.progi.MyVinylCollection.rest.event.dto.EventDTO;

import java.time.LocalDate;
import java.util.List;

public interface EventService {

    Event createEvent(Event event);
    List<Event> listAll();
    List<Event> listSorted();
    boolean deleteEvent(long eventId);
    boolean updateEventInfo(long eventId, EventDTO eventDTO);
}
