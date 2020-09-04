import React, { useReducer, useState, useContext } from "react";
import { login } from "../../api/auth";
import { toast } from "react-toastify";
import { UserContext } from "../../contexts/UserContext";
import open from "./images/open.svg";
import close from "./images/close.svg";
import styles from "./Form.module.css";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};
const reducer = (state, { field, value }) => ({ ...state, [field]: value });

export default function Login({ history }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setLoggedInUser, setFollowing } = useContext(UserContext);

  // handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { user, following } = await login(state);
      setLoggedInUser(user);
      setFollowing(following);
      return history.push("/timeline");
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
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles["form-heading"]}>Welcome back user :)</p>
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
          Login
        </button>
      </form>
      <Link to="/signup">
        <span className={styles.span}>New user? Create an account</span>
      </Link>
    </div>
  );
}
