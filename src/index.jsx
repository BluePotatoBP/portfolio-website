import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Navbar from './components/Navbar/Navbar.jsx';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Navbar />
    <div className='outputs'>
      <output>
        <a href='https://twitter.com/bluepotatobp' target="_blank" rel='noreferrer'>
          <error />
        </a>
        <span>Unexpected '$' at line 214:14</span>
      </output> {/* TODO: move the error css to a separate component */}
      <output>
        <a href='https://twitter.com/bluepotatobp' target="_blank" rel='noreferrer'>
          <warning />
        </a>
        <span>Unexpected '$' at line 214:14</span>
      </output> {/* TODO: move the error css to a separate component */}
      <output>
        <a href='https://twitter.com/bluepotatobp' target="_blank" rel='noreferrer'>
          <success />
        </a>
        <span>Code successfully executed.Code successfully executed.Code successfully executed.Code successfully executed.Code successfully executed.Code successfully executed.Code successfully executed.Code successfully executed.Code successfully executed.Code successfully executed.Code successfully executed.Code successfully executed.Code successfully executed.Code successfully executed.Code successfully executed.</span>
      </output>
    </div>
      <code>
        <pre>
          <span>Shit man how does this work?Shit man how does this work?Shit man how does this work?Shit man how does this work?Shit man how does this work?Shit man how does this work?</span>
          <span>Shit man how does this work?</span>
          <span>Shit man how does this work?</span>
          <span>Shit man how does this work?</span>
          <span>Shit man how does this work?</span>
          <span>Shit man how does this work?</span>
          <span>Shit man how does this work?</span>
          <span>Shit man how does this work?</span>
          <span>Shit man how does this work?</span>
          <span>Shit man how does this work?</span>
          <span>Shit man how does this work?</span>
          <span>Shit man how does this work?</span>
          <span>Shit man how does this work?</span>
          <span>Shit man how does this work?</span>
        </pre>
      </code>
  </React.StrictMode>
);
