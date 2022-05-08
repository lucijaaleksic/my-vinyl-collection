import React from 'react';
import authHeader from "../auth-header";
import VinylCard from "./VinylCard";

function HomePageVinyls({vinyls}) {
  const api = process.env.REACT_APP_API_URL;
  const [favVinyls, setFavVinyls] = React.useState([]);

  React.useEffect(() => {
    fetch(api + "/users/favourites", {
      method: "GET",
      headers: {
        Authorization: authHeader(),
        Origin: origin,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      .then((favVinlys) => {
        setFavVinyls(favVinlys);
      })
      .catch((err) => console.log(err));
  }, []);

  const containerGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "2rem"
  };

  return (
    <div style={containerGridStyle}>
      {vinyls.map(vinyl => <VinylCard vinylData={vinyl} favVinyls={favVinyls} updateFunction={setFavVinyls} hasHeart/>)}
    </div>
  );
}

export default HomePageVinyls;