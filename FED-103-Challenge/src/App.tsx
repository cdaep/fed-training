import React from 'react';
import './App.css';
import Button from './component/button';

function App() {
  return (
    <div>
      <div className="container d-flex-inline">
        <div className="logo">
          <img src="/logo.svg" alt="logo" />
        </div>
      </div>

      {/* Image Containers */}
      <div className="image-container">
        <img src="/hero-desktop.jpg" className="hero-desktop" alt="hero-desktop" />
        <img src="/hero-mobile.jpg" className="hero-mobile" alt="hero-mobile" />
      </div>

      <div className="container clear-fix">
        <div className="content">
          <h1>
            <span className="text-pink">We're</span><span>Coming</span><span>Soon</span>
          </h1>
          <p>
            Hello fellow shoppers! We're currently building our new fashion store. 
            Add your email below to stay up-to-date with announcements and our launch deals.
          </p>

          <form action="#" method="post">
            <div className="form-group">
              <input type="email" name="email" id="email" placeholder="Email Address" />
              <img src="/icon-error.svg" className="icon-error" alt="icon-error" />
              <Button/>
            </div>
            <p className="text-message"></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
