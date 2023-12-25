import { SocialLogin } from "components/shared/SocialLogin/SocialLogin";
import router from "next/router";
import { useState } from 'react';
import { useRegisterUserMutation } from '../../services/userAuthApi'
import { storeToken } from '../../services/LocalStorageService';

export const Registration = () => {

  const [server_error, setServerError] = useState([])
  const [registerUser, { isLoading }] = useRegisterUserMutation()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const actualData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      passwordConfirm: data.get('passwordConfirm'),
      phone: data.get('phone'),
    }
    const res = await registerUser(actualData)

    if (res.error) {
      // console.log(typeof (res.error.data.errors))
      // console.log("error", res.error)
      // console.log("errors", res.error.data.errors)
      setServerError(res.error.data.errors)
    }

    if (res.data) {
      console.log(typeof (res.data))
      console.log(res.data)
      storeToken(res.data.token)
      router.push("/")
    }
  }
  return (
    <>
      {/* <!-- BEGIN REGISTRATION --> */}
      <div className="login registration">
        <div className="wrapper">
          <div
            className="login-form js-img"
            style={{
              backgroundImage: `url('/assets/img/registration-form__bg.png')`,
            }}
          >
            <form onSubmit={handleSubmit}>
              <h3>Register Now</h3>
              <div
                className="box-field "
                style={{ width: "100% !important" }}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your first Name"
                  name="firstName"
                />
                {
                  server_error.some(field => field.hasOwnProperty("firstName")) ? (
                    <p style={{ fontSize: 16, color: "red", paddingLeft: 10 }}>
                      {server_error.filter(x => x.path == "firstName")[0].msg}
                    </p>
                  ) : (
                    ""
                  )}
              </div>
              <div className="box-field" style={{ width: "100% !important" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your last name"
                  name="lastName"
                />
              </div>
              {server_error.lastName ? (
                <p style={{ fontSize: 16, color: "red", paddingLeft: 10 }}>
                  {server_error.lastName}
                </p>
              ) : (
                ""
              )}
              <div className="box-field" style={{ width: "100% !important" }}>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  name="email"
                />
              </div>
              {server_error.email ? (
                <p style={{ fontSize: 16, color: "red", paddingLeft: 10 }}>
                  {server_error.email}
                </p>
              ) : (
                ""
              )}
              <div className="box-field " style={{ width: "100% !important" }}>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  name="password"
                />
              </div>
              {server_error.password ? (
                <p style={{ fontSize: 16, color: "red", paddingLeft: 10 }}>
                  {server_error.password[0]}
                </p>
              ) : (
                ""
              )}
              <div className="box-field " style={{ width: "100% !important" }}>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm your password"
                  name="passwordConfirm"
                />
              </div>
              {server_error.passwordConfirm ? (
                <p style={{ fontSize: 16, color: "red", paddingLeft: 10 }}>
                  {server_error.passwordConfirm}
                </p>
              ) : (
                ""
              )}
              <div className="box-field " style={{ width: "100% !important" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your phone number"
                  name="phone"
                />
              </div>
              {server_error.phone ? (
                <p style={{ fontSize: 16, color: "red", paddingLeft: 10 }}>
                  {server_error.phone}
                </p>
              ) : (
                ""
              )}


              <button className="btn" type="submit">
                Registration
              </button>
              <div className="login-form__bottom">
                <span>
                  Already have an account?{" "}
                  <a onClick={() => router.push("/login")}>Log in</a>
                </span>
              </div>
            </form>
          </div>
        </div>
        <img
          className="promo-video__decor js-img"
          src="/assets/img/promo-video__decor.jpg"
          alt=""
        />
      </div>
      {/* <!-- REGISTRATION EOF   -->  */}
    </>
  );
};

