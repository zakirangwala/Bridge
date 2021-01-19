import React from "react";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="is-preload">
          <div id="wrapper">
            <header id="header">
              <div className="logo">
                <span className="icon fa-gem"></span>
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
                <form method="post" action="#">
                  <div className="fields">
                    <div className="field half">
                      <label for="name">Name</label>
                      <input type="text" name="name" id="name" placeholder="John Doe"/>
                    </div>
                    <div className="field half">
                      <label for="email">Email</label>
                      <input type="text" name="email" id="email" placeholder="johndoe@gmail.com"/>
                    </div>
                    <div className="field half">
                      <label for="phone">Phone Number</label>
                      <input type="text" name="phone" id="phone" placeholder="+19126472134"/>
                    </div>
                  </div>
                  <div className="buttons_react">
                    <ul className="actions">
                      <li>
                        <input type="submit" value="Send Message" className="primary" />
                      </li>
                      <li>
                        <input type="reset" value="Reset" />
                      </li>
                    </ul>
                  </div>
                </form>
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
  }
}

export default App;
