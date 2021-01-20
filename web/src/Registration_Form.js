import React, { useState } from "react";
import { db } from "./firebase";

const Registration_Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const clearForm = () => {
    setName("");
    setEmail("");
    setNumber("");
  };

  const submitForm = (e) => {
    e.preventDefault();
    db.collection("users").add({
      fullname: name,
      email: email,
      number: number,
    });
    clearForm();
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <div className="fields">
          <div className="field half">
            <label for="name">*Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="field half">
            <label for="email">*Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="johndoe@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="field half">
            <label for="phone">*Phone Number</label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="+19126472134"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="buttons_react">
          <ul className="actions">
            <li>
              <input
                type="submit"
                value="Send Form"
                className="primary"
              />
            </li>
            <li>
              <input type="reset" value="Reset" onClick={clearForm} />
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default Registration_Form;
