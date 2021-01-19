import React from "react";

const Registration_Form = () => {
  return (
    <div>
      <form method="post" action="#">
        <div className="fields">
          <div className="field half">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" placeholder="John Doe" />
          </div>
          <div className="field half">
            <label for="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="johndoe@gmail.com"
            />
          </div>
          <div className="field half">
            <label for="phone">Phone Number</label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="+19126472134"
            />
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
    </div>
  );
};

export default Registration_Form;
