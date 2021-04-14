import React, { useState } from "react";
import { Button, notification } from "antd"; //
import {
  MailOutlined,
  GoogleOutlined,
  CloseCircleTwoTone,
} from "@ant-design/icons";
import { auth, googleAuthProvider } from "../../firebase";
import { useDispatch } from "react-redux";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      history.push("/");
    } catch (error) {
      notification.error({
        description: error.message,
        icon: <CloseCircleTwoTone twoToneColor="#FF1919" />,
      });
      setLoading(false);
    }
  };
  const googleLogin = async () => {
    setLoading(true);
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
        history.push("/");
      })

      .catch((error) =>
        notification.error({
          description: error.message,
          icon: <CloseCircleTwoTone twoToneColor="#FF1919" />,
        })
      );
    setLoading(false);
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label id="emailAddress" className="bmd-label-floating">
          Your Email address
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
      <div className="form-group">
        <label id="userPassword" className="bmd-label-floating">
          Your Password
        </label>
        <input
          type="password"
          className="form-control"
          id="userPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <span className="bmd-help">Please type in your Password</span>
      </div>
      <div className="mb-3">
        <Button
          icon={<MailOutlined />}
          onClick={handleSubmit}
          type="primary"
          block
          size="large"
          disabled={!email || password.length < 6}
        >
          Login with Email/Password
        </Button>
      </div>
      <div>
        <Button
          icon={<GoogleOutlined />}
          onClick={googleLogin}
          type="danger"
          block
          size="large"
        >
          Login with Google
        </Button>
      </div>
      <div className="float-right">
        <Button danger type="link">
          Forgot password?
        </Button>
      </div>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? <h4>Loading...</h4> : <h4>Login</h4>}
          {loginForm()}
        </div>
      </div>
    </div>
  );
};

export default Login;
