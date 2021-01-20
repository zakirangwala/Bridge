import React from "react";
import Registration_Form from "./Registration_Form.js";
import BridgePNG from "./assets/bridge.png";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <div className="is-preload">
        <div id="wrapper">
          <header id="header">
            <div className="logo-bridge">
              <img src={BridgePNG} />
            </div>
            <div className="content">
              <div className="inner">
                <h1>Bridge</h1>
                <p>Bridging the Gap between online and offline.</p>
                <p>By Zaki Rangwala, Alex Cai And Ayden Heal</p>
              </div>
            </div>
            <nav>
              {/* <ul>
                  <li>
                    <a href="#contact">Contact</a>
                  </li>
                </ul> */}
              {/* <button type="button">Register</button> */}
            </nav>
          </header>
          <div className="registration-form">
            <div id="main">
              {/* <article id="contact"> */}
              <h2 className="major">Register</h2>
              <Registration_Form />
              <ul className="icons">
                <li>
                  <a href="#" className="icon brands fa-twitter">
                    <span className="label">Twitter</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="icon brands fa-facebook-f">
                    <span className="label">Facebook</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="icon brands fa-instagram">
                    <span className="label">Instagram</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="icon brands fa-github">
                    <span className="label">GitHub</span>
                  </a>
                </li>
              </ul>
              {/* </article> */}
            </div>
          </div>
          <footer id="footer">
            <p className="copyright">&copy; Bridge 2021.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;
