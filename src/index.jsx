import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import App from './components/App/App.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Projects from './components/routes/projects/projects.jsx';
import Project from './components/routes/project/project.jsx';

import NotFound from './components/routes/not-found/not-found.jsx';
import Home from './components/routes/home/home';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} >
          <Route path="/home" element={<Home />} />
          <Route path="/projects" element={<Projects />} >
            <Route index element={
              <main style={{ padding: "1rem" }}>
                <p>Select a project</p>
              </main>
            } />
            <Route path=":project" element={<Project />} />
          </ Route>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);

/* 
<div className='outputs'>
      <output>
        <a href='https://twitter.com/bluepotatobp' target="_blank" rel='noreferrer'>
          <error />
        </a>
        <span>Unexpected '$' at line 214:14</span>
      </output>
      <output>
        <a href='https://twitter.com/bluepotatobp' target="_blank" rel='noreferrer'>
          <warning />
        </a>
        <span>Unexpected '$' at line 214:14</span>
      </output>
      <output>
        <a href='https://twitter.com/bluepotatobp' target="_blank" rel='noreferrer'>
          <success />
        </a>
        <span>Code successfully executed. Code successfully executed. Code successfully executed. Code successfully executed. Code successfully executed. Code successfully executed. Code successfully executed. Code successfully executed. Code successfully executed. Code successfully executed. Code successfully executed. Code successfully executed. Code successfully executed. Code successfully executed. Code successfully executed.</span>
      </output>
    </div>
      <code>
        <pre>
          <span>Codeblocks!</span>
          <span>They work...</span>
          <span>...Sometimes...</span>
          <span>...And sometimes...</span>
          <span>They don't.</span>
        </pre>
      </code>
      <code>
        <pre>
          <span>{"function showcase() {"}</span>
          <span>{"  for (let i = 0; i < array.length; i++) {"}</span>
          <span>{"    console.log(array[i]);"}</span>
          <span>{"  }"}</span>
          <span>{"}"}</span>
        </pre>
      </code>
*/