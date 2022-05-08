import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab, LinearProgress, Alert, Paper } from "@mui/material";
import authHeader from "../auth-header";
import HomePageAds from "../components/HomePageAds";
import HomePageVinyls from "../components/HomePageVinyls";
import HomePageEvents from "../components/HomePageEvents";

function HomePage() {
  const api = process.env.REACT_APP_API_URL;
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [saleAds, setSaleAds] = useState([]);
  const [exchangeAds, setExchangeAds] = useState([]);
  const [vinyls, setVinyls] = useState([]);

  const requestOptionsGet = {
    method: "GET",
    headers: {
      origin: origin,
      Authorization: authHeader(),
    },
  };

  function getSaleAds() {
    return fetch(api + "/home/sale_ads", requestOptionsGet)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      .then((data) => {
        setSaleAds(data);
        setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        setErrorMessage(true);
        console.log(err);
      });
  }

  function getExchangeAds() {
    return fetch(api + "/home/exchange_ads", requestOptionsGet)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      .then((data) => {
        setExchangeAds(data);
        setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        setErrorMessage(true);
        console.log(err);
      });
  }

  function getVinyls() {
    return fetch(api + "/home/vinyls", requestOptionsGet)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      .then((data) => {
        setVinyls(data);
        setLoading(false);
      })
      .catch((err) => {
        setErrorMessage(true);
        console.log(err);
      });
  }

  useEffect(() => {
    Promise.all([getExchangeAds(), getSaleAds(), getVinyls()]).then(() => {
      setLoading(false);
    });
  }, []);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        style={{ marginBottom: "3rem" }}
        value={tabIndex}
        onChange={handleChange}
        centered
      >
        <Tab label="Vinyls" />
        <Tab label="Ads" />
        <Tab label="Events" />
      </Tabs>

      <>
        {loading ? (
          <LinearProgress style={{ marginTop: "1rem" }} />
        ) : (
          <>
            {errorMessage ? (
              <Alert variant="outlined" severity="error">
                Error occurred while communicating with the server.
              </Alert>
            ) : (
              <>
                {tabIndex == 0 && <HomePageVinyls vinyls={vinyls} />}
                {tabIndex == 1 && (
                  <HomePageAds saleAds={saleAds} exchangeAds={exchangeAds} />
                )}
                {tabIndex == 2 && <HomePageEvents />}
              </>
            )}
          </>
        )}
      </>
    </Box>
  );
}

export default HomePage;
