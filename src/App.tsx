import React from "react";
import "./App.css";
import Sidebar from "./components/SideMenu/SideBar";
import { useLocation } from "react-router-dom";
import { FooterPublicRoutes } from "./components/Footer/footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { DataStore } from "./pages/Store/DataStore";
import {DataUsers} from './pages/User/DataUser';
import { DataServiceItem } from "./pages/ServiceItem/ServiceItem";
import { ManageStore } from "./pages/Store/ManageStore";
import { ManageUser } from "./pages/User/ManageUser";
import { ManageServiceItem } from "./pages/ServiceItem/ManageServiceItem";
import { Login } from "./pages/login/login";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div
      style={{
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
    width: "100%",
    overflowX: "hidden",
  }}
    >
      {isLoginPage ? (
        // Full page khusus login (tanpa sidebar & navbar)
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        // Layout utama untuk halaman lain
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: "100vh", width: "100%", }}>
            {/* <AppNavBar /> */}
         
            <main style={{ padding: 20, flex: 1, overflowY: "auto", backgroundColor: "#fbfbfbfc", }}>
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route
                  path="/master-data/data-store"
                  element={<DataStore />}
                />
                <Route path="manage-store" element={<ManageStore />} />
                <Route path="/master-data/data-user" element={<DataUsers />} />
                <Route path="manage-user" element={<ManageUser />} />
                <Route path="/service-item" element={<DataServiceItem />}/>
                <Route path="manage-service-item" element={<ManageServiceItem />}/>
              </Routes>
            </main>
           <FooterPublicRoutes />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
