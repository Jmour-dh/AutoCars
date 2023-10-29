import React, { Suspense } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
// import styles from "./App.module.scss";
import { Outlet } from "react-router-dom";
import AuthProvider from "./components/AuthProvider/AuthProvider";
function App() {
  return (
    <div>
      <AuthProvider>
        <Header />
        <Suspense>
          <Outlet />
        </Suspense>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
