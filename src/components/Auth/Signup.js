import React, { useReducer, useState } from "react";
import { signup } from "../../api/auth";
import { toast } from "react-toastify";
import open from "./images/open.svg";
import close from "./images/close.svg";
import styles from "./Form.module.css";
import { Link } from "react-router-dom";

const initialState = {
  fullname: "",
  username: "",
  email: "",
  password: "",
};
const reducer = (state, { field, value }) => ({ ...state, [field]: value });

export default function Login({ history }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // handle form submission
  async function handleSubmit(e) {
    console.log("submit");
    e.preventDefault();
    setLoading(true);
    try {
      if (await signup(state)) {
        toast.success("Signed up successfully");
        history.push("/login");
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  }

  // handle input change
  function handleChange(e) {
    dispatch({ field: e.target.name, value: e.target.value });
  }

  return (
    <div className={styles["form-container"]}>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
        style={{ height: "25em" }}
      >
        <p className={styles["form-heading"]}>Create an account</p>
        <input
          type="text"
          name="fullname"
          placeholder="fullname"
          value={state.fullname}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          placeholder="username"
          value={state.username}
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          value={state.email}
          required
          onChange={handleChange}
        />
        <div className={styles["password-container"]}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="password"
            value={state.password}
            required
            onChange={handleChange}
          />
          <img
            className={styles.eye}
            src={showPassword ? open : close}
            alt="eye"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        <button
          className={`btn ${loading && "spinner"}`}
          type="submit"
          disabled={loading ? true : false}
        >
          Signup
        </button>
      </form>
      <Link to="/login">
        <span className={styles.span}>Have an account? Login</span>
      </Link>
    </div>
  );
}
