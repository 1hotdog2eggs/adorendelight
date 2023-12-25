
import router from "next/router";
import { useState } from 'react';
import LoginHook from '../../hook/auth/login-hook';


export const Login = () => {
  const [server_error, setServerError] = useState({})

  const [email, password, loading, onChangeEmail, onChangePassword, onSubmit, isPress] = LoginHook();




  return (
    <>
      {/* <!-- BEGIN LOGIN --> */}
      <div className="login">
        <div className="wrapper">
          <div
            className="login-form js-img"
            style={{ backgroundImage: `url('/assets/img/login-form__bg.png')` }}
          >
            <form onSubmit={onSubmit} >
              <div className="box-field">
                <input
                  value={email}
                  onChange={onChangeEmail}
                  type="text"
                  className="form-control"
                  placeholder="Enter your Email "
                  name='email'
                />
              </div>
              {/* {server_error.email ? <p style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{server_error.email[0]}</p> : ""} */}
              <div className="box-field">
                <input
                  value={password}
                  onChange={onChangePassword}
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  name='password'
                />
              </div>
              {/* {server_error.password ? <p style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{server_error.password[0]}</p> : ""} */}

              <button className="btn" type="submit">
                login
              </button>
              <div className="login-form__bottom">
                <span>
                  No account?{" "}
                  <a onClick={() => router.push("/registration")}>
                    Register now
                  </a>
                </span>
                {/* //<a href="#">Lost your password?</a> */}
              </div>
              {/* {server_error.non_field_errors ? <lable style={{ fontSize: 16, color: 'red', paddingTop: 20 }} severity='error'>{server_error.non_field_errors[0]}</lable> : ''} */}
            </form>
          </div>

        </div>
        <img
          className="promo-video__decor js-img"
          src="/assets/img/promo-video__decor.jpg"
          alt=""
        />
      </div>
      {/* <!-- LOGIN EOF   --> */}
    </>
  );
};
