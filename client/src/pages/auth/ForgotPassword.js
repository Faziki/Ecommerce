import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { notification } from "antd";
import { useSelector } from "react-redux";
import { CloseCircleTwoTone, CheckCircleTwoTone } from "@ant-design/icons";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        notification.success({
          message: "Registraton confirmed",
          description: `Reset password link is sent to ${email} please check your inbox.  `,
          icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
        });
      })
      .catch((error) => {
        setLoading(false);
        notification.error({
          description: error.message,
          icon: <CloseCircleTwoTone twoToneColor="#FF1919" />,
        });
      });
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? <h4>loading ...</h4> : <h4>Forgot Password</h4>}
          <form onSubmit={handleSubmit}>
            <div className="form-group ">
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
              <span className="bmd-help ">
                Please type in your email address to reset password
              </span>
            </div>
            <button disabled={!email} className="btn btn-raised">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
