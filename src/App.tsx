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
import { ManageStore } from "./pages/Store/ManageStore";
import { Login } from "./pages/login/login";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div>
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
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            {/* <AppNavBar /> */}
         
            <main style={{ padding: 20, flex: 1, overflowY: "auto" }}>
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route
                  path="/master-data/data-store"
                  element={<DataStore />}
                />
                <Route path="manage-store" element={<ManageStore />} />
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
