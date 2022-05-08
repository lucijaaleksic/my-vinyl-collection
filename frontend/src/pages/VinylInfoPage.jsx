import React from "react";

import Chip from "@mui/material/Chip";

import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import VinylInfoHeader from "../components/VinylInfoHeader";
import { getCurrentUser, IsMobile } from "../util/utils";
import authHeader from "../auth-header";
import { useLocation } from "react-router-dom";

const infoStyle = {
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  justifyContent: "flex-start",
  maxWidth: "100%",
};

function VinylInfo() {
  const api = process.env.REACT_APP_API_URL;

  const location = useLocation();
  const id = location.state.id;

  const [vinyl, setVinyl] = React.useState();

  React.useEffect(() => {
    fetch(api + `/vinyls/${id}`, {
      method: "GET",
      headers: {
        Authorization: authHeader(),
      },
    }).then((r) =>
      r.json().then((result) => {
        setVinyl(result);
      })
    );
  }, []);

  return (
    <div style={infoStyle}>
      <VinylInfoHeader vinyl={vinyl && vinyl} id={id}/>
      {vinyl ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto auto",
            margin: "2rem",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "1rem",
              margin: "2rem",
              marginTop: 0,
              border: "rgb(164,164,164) solid 0.3px",
              borderRadius: "5px",
            }}
          >
            <div
              style={{
                borderBottom: "rgb(164,164,164) solid 0.3px",
              }}
            >
              <h2>Album</h2>
              <p>{vinyl.album}</p>
            </div>

            <div
              style={{
                borderBottom: "rgb(164,164,164) solid 0.3px",
              }}
            >
              <h2>Artist</h2>
              <p>{vinyl.artist.name}</p>
            </div>

            <div
              style={{
                borderBottom: "rgb(164,164,164) solid 0.3px",
              }}
            >
              <h2>Release year</h2>
              <p>{vinyl.releaseYear}</p>
            </div>

            <div
              style={{
                borderBottom: "rgb(164,164,164) solid 0.3px",
              }}
            >
              <h2>Genre</h2>
              <p>{vinyl.genre.name}</p>
            </div>
            <div>
              <h2>Subgenre</h2>
              {/*<p>{vinyl.subgenre}</p>*/}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "1rem",
              margin: "2rem",
              marginTop: 0,
              border: "rgb(164,164,164) solid 0.3px",
              borderRadius: "5px",
            }}
          >
            <div
              style={{
                borderBottom: "rgb(164,164,164) solid 0.3px",
              }}
            >
              <h2>Condition</h2>
              <p>{vinyl.conditionEvaluation}</p>
            </div>

            <div>
              <h2>Rarity</h2>
              {vinyl.rare === true ? (
                <Chip icon={<CheckCircleIcon />} label="Rare" color="success" />
              ) : (
                <Chip icon={<CancelIcon />} label="Not Rare" color="error" />
              )}
            </div>

            <div
              style={{
                borderBottom: "rgb(164,164,164) solid 0.3px",
              }}
            >
              <h2>Description</h2>
              <p>{vinyl.description}</p>
            </div>

            <div>
              <h2>Price (KN)</h2>
              <p>{vinyl.priceKn}</p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "1rem",
              margin: "2rem",
              marginTop: 0,
              border: "rgb(164,164,164) solid 0.3px",
              borderRadius: "5px",
            }}
          >
            <div
              style={{
                borderBottom: "rgb(164,164,164) solid 0.3px",
              }}
            >
              <h2>RPM</h2>
              <p>{vinyl.rpm}</p>
            </div>

            <div
              style={{
                borderBottom: "rgb(164,164,164) solid 0.3px",
              }}
            >
              <h2>Diameter</h2>
              <p>{vinyl.diameter}</p>
            </div>

            <div
              style={{
                borderBottom: "rgb(164,164,164) solid 0.3px",
              }}
            >
              <h2>Capacity</h2>
              <p>{vinyl.capacity}</p>
            </div>

            <div
              style={{
                borderBottom: "rgb(164,164,164) solid 0.3px",
              }}
            >
              <h2>Reproduction quality</h2>
              <p>{vinyl.reproductionQuality}</p>
            </div>

            <div
              style={{
                borderBottom: "rgb(164,164,164) solid 0.3px",
              }}
            >
              <h2>Num of audio channels</h2>
              <p>{vinyl.nmbOfAudioChannels}</p>
            </div>

            <div>
              <h2>Time of reproduction</h2>
              <p>{vinyl.timeOfReproduction}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}

export default VinylInfo;
