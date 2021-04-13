import React, { useState } from "react";
import { auth } from "../../firebase";
import { notification } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";

const Register = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);

    notification.success({
      message: "Registraton confirmed",
      description: `Email is sent to ${email}. Click the link to complete your registration `,
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
    });

    // save user email in local storage
    window.localStorage.setItem("emailForRegistration", email);
    // clear state
    setEmail("");
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label id="emailAddress" className="bmd-label-floating">
          Email address
        </label>
        <input
          autoFocus
          type="email"
          className="form-control"
          id="emailAddress"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <span className="bmd-help">Please type in your email address</span>
      </div>
      <button type="submit" className="btn btn-raised">
        Register
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
