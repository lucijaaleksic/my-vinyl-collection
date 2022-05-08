import React     from "react";

import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import {Typography} from "@mui/material";
import {ThemeContext} from "../util/utils";

function LocationMap({lat, lng, setLat, setLng, editing}) {
    const { theme } = React.useContext(ThemeContext);
    const outline = theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.38)";


    return (
        <>
            <Typography
                style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    color: outline,
                    marginTop: "1rem",
                    paddingLeft: "13px"
                }}
            >Location</Typography>
        <MapContainer
            center={[lat, lng]}
            style={{
                width: "100%",
                height: 300,
                margin: "auto",
                borderRadius: "5px",
                border: `1px ${outline} solid`,
                zIndex: 0
            }}
            zoom={13}
            scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DraggableMarker lat={lat} lng={lng} draggable={editing}
                setLat={setLat} setLng={setLng}
            />
        </MapContainer>
        </>
    )
}

function DraggableMarker({lat, lng, setLat, setLng, draggable}) {
    const [position, setPosition] = React.useState({
        lat: lat,
        lng: lng})
    const markerRef = React.useRef(null)
    const eventHandlers = React.useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    setPosition(marker.getLatLng())
                    setLat(marker.getLatLng().lat)
                    setLng(marker.getLatLng().lng)
                }
            },
        }),
        [],
    )
    return (
        <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}>
        </Marker>
    )
}

export default LocationMap