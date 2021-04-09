import React, { useState } from "react";
import { auth } from "../../firebase";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const Register = () => {
  //moved the data such as message description and icon to  line 25 notification.open (testing purposes)

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: "http://localhost:3000/register/complete",
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);

    notification.open({
      message: "Registraton confirmed",
      description: `Email is sent to ${email}. Click the link to complete your registration `,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
    // save user email in local storage
    window.localStorage.setItem("emailForRegistration", email);
    // clear state
    setEmail("");
  };

  //need to find out how to pass the on submit to the notifcation
  //else this will trigger everytime you press 'register' button withou validating
  // that the data has been sent

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label id="nameInput" className="bmd-label-floating">
          Name
        </label>
        <input
          autoFocus
          type="text"
          className="form-control"
          id="nameInput"
        ></input>
        <span className="bmd-help">Please type in your name</span>
      </div>

      <div className="form-group">
        <label id="emailAddress" className="bmd-label-floating">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="emailAddress"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <span className="bmd-help">Please type in your email address</span>
      </div>
      <div className="form-group">
        <label id="passwordInput" className="bmd-label-floating">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="passwordInput"
        ></input>
        <span className="bmd-help">
          Please type in a strong password (Make use of captial letters and
          special characters $%@#)
        </span>
      </div>
      <div className="form-group">
        <label id="passwordRepeat" className="bmd-label-floating">
          Repeat Password
        </label>
        <input
          type="password"
          className="form-control"
          id="passwordRepeat"
        ></input>
        <span className="bmd-help">Please retype your password as above</span>
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
