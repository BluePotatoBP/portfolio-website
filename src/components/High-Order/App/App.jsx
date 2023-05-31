import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css"

import Home from "../Home/Home";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import Contact from "../Contact/Contact";
import Project from "../Project/Project";
import NotFound from "../NotFound/NotFound";

const App = () => {
    return (
        <div className="app-container">
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<div className="app-content"><Home /></div>} />
                    <Route path="/home" element={<div className="app-content"><Home /></div>} />
                    <Route path="/contact" element={<div className="app-content"><Contact /></div>} />
                    <Route path="/projects/:project" element={<div className="app-content"><Project /></div>} />
                    <Route path='*' element={<div className="app-content"><NotFound /></div>} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    )
}

export default App;