import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css"

import Home from "../Home/Home";
import NavBar from "../NavBar/NavBar";
import Projects from "../Projects/Projects";
import Contact from "../Contact/Contact";
import Project from "../Project/Project";
import NotFound from "../NotFound/NotFound";

const App = () => {
    return (
        <div className="app-container">
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:project" element={<Project />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
                {/* <Footer /> */}
            </BrowserRouter>
        </div>
    )
}

export default App;