import React from "react";
import Button from "@mui/material/Button";
import authHeader from "../auth-header";
import AdCard from "../components/AdCard";
import {
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { getCurrentUser, IsMobile } from "../util/utils";
import VinylComponent from "../components/VinylComponent";

function AdsPage() {
  const api = process.env.REACT_APP_API_URL;
  const origin = process.env.REACT_APP_URL;

  const [ads, setAds] = React.useState();
  const [saleAds, setSaleAds] = React.useState();
  const [exchangeAds, setExchangeAds] = React.useState();

  const username = getCurrentUser();

  React.useEffect(() => {
    fetch(api + "/ads/active", {
      method: "GET",
      headers: {
        Authorization: authHeader(),
        Origin: origin,
        "Content-Type": "application/json",
      },
    }).then((r) =>
      r.json().then((data) => {
        setAds(data);
      })
    );
  }, []);

  React.useEffect(() => {
    if (ads !== undefined) {
      setSaleAds(ads.saleAds);
      setExchangeAds(ads.exchangeAds);
    }
  }, [ads]);

  const [open, setOpen] = React.useState(false);

  function removeAd(id) {
    let removeAd = saleAds.filter((ad) => ad.vinyl.id === id);
    if (removeAd.length === 0)
      removeAd = exchangeAds.filter((ad) => ad.vinyl.id === id);
    console.log(removeAd);
    setSaleAds(saleAds.filter((ad) => ad.vinyl.id !== id));
    setExchangeAds(exchangeAds.filter((ad) => ad.vinyl.id !== id));
    fetch(api + `/ads/sale_ads/${removeAd[0].id}`, {
      method: "DELETE",
      headers: {
        Authorization: authHeader(),
        Origin: origin,
        "Content-Type": "application/json",
      },
    }).then((r) => r.json().then((data) => console.log(data)));
    fetch(api + `/ads/exchange_ads/${removeAd[0].id}`, {
      method: "DELETE",
      headers: {
        Authorization: authHeader(),
        Origin: origin,
        "Content-Type": "application/json",
      },
    }).then((r) => r.json().then((data) => console.log(data)));
  }

  return (
    <>
      <div>
        <h1> Ads</h1>
        {ads && saleAds && exchangeAds ? (
          <div style={{ display: "flex" }}>
            <div>
              <AddNewSaleAd setOpen={setOpen} open={open} setAds={setAds} />
            </div>
            <div
              style={{
                display: "flex",
                maxWidth: window.innerWidth * 0.68,
                height: "20rem",
                overflow: "scroll",
              }}
            >
              {saleAds &&
                saleAds.map((ad) => (
                  <AdCard
                    username={username}
                    price={ad.price}
                    name={ad.vinyl.album}
                    id={ad.vinyl.id}
                    isSale
                    ad={ad}
                    removeAd={removeAd}
                  />
                ))}
              {exchangeAds &&
                exchangeAds.map((ad) => (
                  <AdCard
                    username={username}
                    ad={ad}
                    name={ad.vinyl.album}
                    id={ad && ad.vinyl.id}
                    removeAd={removeAd}
                  />
                ))}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

function AddNewSaleAd({ setOpen, open, setAds }) {
  const api = process.env.REACT_APP_API_URL;
  const origin = process.env.REACT_APP_URL;

  const [vinyls, setVinyls] = React.useState();
  const [vinyl, setVinyl] = React.useState({});
  const [price, setPrice] = React.useState();
  const [type, setType] = React.useState("sale");

  React.useEffect(() => {
    fetch(api + "/vinyls/collection/ad", {
      method: "GET",
      headers: {
        Authorization: authHeader(),
        Origin: origin,
        "Content-Type": "application/json",
      },
    }).then((r) => r.json().then((data) => setVinyls(data)));
  }, []);

  function postSaleAd() {
    setOpen(false);
    fetch(api + `/ads/${type}_ads`, {
      method: "POST",
      headers: {
        Authorization: authHeader(),
        "Content-Type": "application/json",
        Origin: origin,
      },
      body: JSON.stringify({
        price: price,
        vinyl,
      }),
    }).then((r) =>
      r.json().then(() => {
        fetch(api + "/ads/active", {
          method: "GET",
          headers: {
            Authorization: authHeader(),
            Origin: origin,
            "Content-Type": "application/json",
          },
        }).then((r) =>
          r.json().then((data) => {
            setAds(data);
            console.log(data);
          })
        );
      })
    );
  }
  const cardDimension = IsMobile() ? 100 : 200;

  const cardStyle = {
    background: "#D59A88",
    width: cardDimension,
    minHeight: cardDimension,
    height: "12rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "1rem",
    flexDirection: "column",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    position: "relative",
    justifySelf: "center",
    cursor: "pointer",
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setVinyl(value);
  };

  return (
    <>
      <Card style={cardStyle} onClick={() => setOpen(true)}>
        <AddIcon style={{ width: "100px", height: "100px" }} />
        <h2>Add new ad</h2>
      </Card>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Ad</DialogTitle>
        <DialogContent>
          {vinyls ? (
            <FormControl fullWidth>
              <ToggleButtonGroup value={type} fullWidth>
                <ToggleButton value="sale" onClick={() => setType("sale")}>
                  Sale
                </ToggleButton>
                <ToggleButton
                  value="exchange"
                  onClick={() => setType("exchange")}
                >
                  Exchange
                </ToggleButton>
              </ToggleButtonGroup>
              <Select
                style={{ marginTop: "1rem" }}
                value={vinyl}
                onChange={handleChange}
                fullWidth
                displayEmpty
              >
                {vinyls.map((v) => (
                  <MenuItem style={{ height: "3rem" }} value={v}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <VinylComponent size={20} />
                      <p style={{ marginLeft: "10px" }}>{v.album}</p>
                    </div>
                  </MenuItem>
                ))}
              </Select>
              {type === "sale" && (
                <TextField
                  label="Price"
                  style={{ marginTop: "10px" }}
                  onChange={(e) => setPrice(e.target.value)}
                />
              )}
              <TextField
                label="Price"
                style={{
                  height: "20px",
                  visibility: "hidden",
                }}
              />
              <Button variant="contained" onClick={postSaleAd}>
                OK
              </Button>
            </FormControl>
          ) : (
            <p>Loading...</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AdsPage;
