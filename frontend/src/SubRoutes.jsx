import React from "react";
import { Route } from "react-router-dom";
import DashboardWrap from "./pages/DashboardWrap";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import CollectionPage from "./pages/CollectionPage";
import AddVinylPage from "./pages/AddVinylPage";
import AdsPage from "./pages/AdsPage";
import UserPage from "./pages/UserPage";
import FriendsPage from "./pages/FriendsPage";
import SearchResultPage from "./pages/SearchResultPage";
import VinylInfoPage from "./pages/VinylInfoPage";
import InboxPage from "./pages/InboxPage";
import AdminPage from "./pages/AdminPage";

function SubRoutes() {
  return (
    <>
      <Route path="/dashboard/homepage">
        <DashboardWrap>
          <HomePage />
        </DashboardWrap>
      </Route>
      <Route path="/dashboard/profile">
        <DashboardWrap>
          <ProfilePage />
        </DashboardWrap>
      </Route>
      <Route path="/dashboard/collection">
        <DashboardWrap>
          <CollectionPage />
        </DashboardWrap>
      </Route>
      <Route path="/dashboard/ads">
        <DashboardWrap>
          <AdsPage />
        </DashboardWrap>
      </Route>
      <Route path="/dashboard/inbox">
        <DashboardWrap>
          <InboxPage />
        </DashboardWrap>
      </Route>
      <Route path="/dashboard/friends">
        <DashboardWrap>
          <FriendsPage />
        </DashboardWrap>
      </Route>
      <Route path="/dashboard/add-vinyl">
        <DashboardWrap>
          <AddVinylPage />
        </DashboardWrap>
      </Route>
      <Route path="/dashboard/users/:username">
        <DashboardWrap>
          <UserPage />
        </DashboardWrap>
      </Route>
      <Route path="/dashboard/search-result">
        <DashboardWrap>
          <SearchResultPage />
        </DashboardWrap>
      </Route>
      <Route path="/vinyl/info">
        <DashboardWrap>
          <VinylInfoPage />
        </DashboardWrap>
      </Route>
      <Route path="/dashboard/admin">
        <DashboardWrap>
          <AdminPage />
        </DashboardWrap>
      </Route>
    </>
  );
}

export default SubRoutes;
