import React, {useState} from 'react';
import VinylCard from "./VinylCard";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import Button from "@mui/material/Button";
import authHeader from "../auth-header";
import {useHistory} from "react-router-dom";

function ExchangeOffer({sender, offer}) {
  const api = process.env.REACT_APP_API_URL;
  const history = useHistory();

  const [declined, setDeclined] = useState(false);

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    width: "100%"
  };

  const subcontainerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center"
  }

  const handleAccept = () => {
    fetch(api + `/ads/exchange_ads/exchange/${offer.id}`, {
      method: "PUT",
      headers: {
        Origin: origin,
        Authorization: authHeader(),
        "Content-Type": "application/json"
      },
    })
      .then(response => {
        if(response.ok){
          history.push("/dashboard/collection");
        } else {
          throw new Error(response.status);
        }
      }).catch(err => console.log(err));
  }

  const handleDecline = () => {
    fetch(api + `/ads/exchange_ads/decline/${offer.id}`, {
      method: "PUT",
      headers: {
        Origin: origin,
        Authorization: authHeader(),
        "Content-Type": "application/json"
      },
    })
      .then(response => {
        if(response.ok){
          setDeclined(true);
        } else {
          throw new Error(response.status);
        }
      }).catch(err => console.log(err));
  }



  return (
    <>
      {!declined &&
      <div>
        <h2>Offer from {sender}</h2>
        <div style={containerStyle}>
          <div style={subcontainerStyle}>
            <div>
              <VinylCard vinylData={offer.receivingVinyl}/>
            </div>
            <h4 style={{color: "#b66857", marginTop: "2rem", marginLeft: "2rem"}}>Your vinyl</h4>
          </div>
          <CompareArrowsIcon sx={{fontSize: 130, marginLeft: "1.2rem", marginTop: "4rem"}}/>
          <div style={subcontainerStyle}>
            <div>
              <VinylCard vinylData={offer.givingVinyl}/>
            </div>
            <h4 style={{color: "#b66857", marginTop: "2rem", marginLeft: "2rem"}}>{sender}'s vinyl</h4>
          </div>
          <div style={{...subcontainerStyle, marginLeft: "2rem"}}>
            <Button variant="contained" style={{backgroundColor:"green", marginBottom: "1rem"}} onClick={handleAccept}>
              Accept
            </Button>
            <Button variant="contained" style={{backgroundColor: "darkred"}} onClick={handleDecline}>
              Decline
            </Button>
          </div>
        </div>
      </div>}

    </>

  );
}

export default ExchangeOffer;