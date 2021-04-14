import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { notification, Button } from "antd";
import { CloseCircleTwoTone, RocketTwoTone } from "@ant-design/icons";
import { useSelector } from "react-redux";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    if (user && user.token) history.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // password,name and email validation

    if (!name) {
      notification.error({
        description: "Your name  is required!",
      });
      return;
    }
    if (!email) {
      notification.error({
        description: "Email is required!",
      });
      return;
    }
    if (!password) {
      notification.error({
        description: " Password is required!",
      });
      return;
    }

    if (password.length <= 6) {
      notification.error({
        description:
          "Password is too short! needs to be atleast 6 characters long",
      });
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        //remove user email from local storage
        window.localStorage.removeItem("emailForRegistration");
        // get user id token
        let user = auth.currentUser;
        await user.updateProfile({
          displayName: name,
          // photoURL: "https://example.com/jane-q-user/profile.jpg",
        });
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // redux store
        console.log(`user ${user} the token result is - ${idTokenResult}`);

        // success notification
        notification.success({
          message: "Registration Complete!",
          description: "You have sucessfully comppleted the registration",
          icon: <RocketTwoTone twoToneColor="#8A2BE2" />,
        });
        // redirect
        history.push("/");
      }
    } catch (error) {
      notification.error({
        description: error.message,
        icon: <CloseCircleTwoTone twoToneColor="#FF1919" />,
      });
    }
  };

  const CompleteRegisterForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label id="emailAddress" className="bmd-label-floating">
          Email address
        </label>
        <input
          disabled
          type="email"
          className="form-control "
          id="emailAddress"
          value={email}
        ></input>
        <span className="bmd-help">Please type in your email address</span>
      </div>

      <div className="form-group">
        <label id="nameInput" className="bmd-label-floating">
          Name
        </label>
        <input
          autoFocus
          type="text"
          className="form-control"
          id="nameInput"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <span className="bmd-help">Please type in your name</span>
      </div>
      <div className="form-group">
        <label id="passwordInput" className="bmd-label-floating">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="passwordInput"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <span className="bmd-help">
          Please type in a strong password (Make use of captial letters and
          special characters $%@#)
        </span>
      </div>
      {/* <div className="form-group">
        <label id="passwordRepeat" className="bmd-label-floating">
          Repeat Password
        </label>
        <input
          type="password"
          className="form-control"
          id="passwordRepeat"
        ></input>
        <span className="bmd-help">Please retype your password as above</span>
      </div> */}
      <Button type="submit" primary block size="large">
        Submit
      </Button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4> Complete Registration</h4>
          {CompleteRegisterForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
