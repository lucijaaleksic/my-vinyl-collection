import React from "react";

import { Tab, Tabs } from "@mui/material";

import AdminEvents from "./AdminEvents";
import AdminUsers from "./AdminUsers";

function AdminPage() {
  const [tab, setTab] = React.useState("Users");
  return (
    <div style={{ width: "100%" }}>
      <Tabs style={{ marginBottom: "3rem" }} value={tab} centered>
        <Tab label="Users" value="Users" onClick={() => setTab("Users")} />
        <Tab label="Events" value="Events" onClick={() => setTab("Events")} />
      </Tabs>
      {tab === "Users" ? <AdminUsers /> : <AdminEvents />}
    </div>
  );
}

export default AdminPage;
