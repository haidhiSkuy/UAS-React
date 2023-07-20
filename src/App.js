import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavbarComponent } from "./components";
import { Home, TambahMenu, Sukses, Invoice, Admin, Edit } from "./pages";

export default class App extends Component {

  
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tambahmenu" element={<TambahMenu />} />
            <Route path="/sukses" element={<Sukses />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/admin" element={<Admin />} />     
            <Route path="/edit" element={<Edit />}  />     
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}
