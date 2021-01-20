import React, { useState } from "react";
import firebase from "firebase";
import { db } from "./firebase";

const Registration_Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [verification, setVerification] = useState("");
  const [status, setStatus] = useState("");
  const [state, setState] = useState("");
  const [docId, setDocId] = useState("123");

  const verify = () => {
    if (state === "checking") {
      return (
        <div className="field half">
          <label for="code">*Verification Code</label>
          <input
            type="text"
            name="code"
            id="code"
            placeholder="Verification Code"
            value={verification}
            onChange={(e) => setVerification(e.target.value)}
            required
          />
        </div>
      );
    } else if (state === "Approved") {
      return <p>Approved</p>;
    } else if (state === "Error") {
      return <p>Error</p>;
    } else {
      return null;
    }
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setNumber("");
  };

  const submitForm = (e) => {
    if (state === "checking") {
      setStatus("Verified");
      e.preventDefault();
      db.collection("users")
        .doc(docId)
        .set({
          status: status,
          fullname: name,
          email: email,
          number: number,
          code: verification,
        })
        .then(function () {
          setState("Approved");
        })
        .catch(function (error) {
          setState("Error");
        });
    } else {
      e.preventDefault();
      setStatus("Not Verified");
      db.collection("users")
        .add({
          status: status,
          fullname: name,
          email: email,
          number: number,
          code: verification,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(function (docRef) {
          setDocId(docRef.id);
          setState("checking");
        })
        .catch(function (error) {
          setState("Error");
        });
    }
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
              placeholder="Full Name"
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
              placeholder="Email"
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
              placeholder="Phone Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>
          {verify()}
        </div>
        <div className="buttons_react">
          <ul className="actions">
            <li>
              <input type="submit" value="Send Form" className="primary" />
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
