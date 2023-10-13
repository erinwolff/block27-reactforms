import { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (username.length < 5 || username.length === 0 || password.length === 0 || password.length < 8) {
      setError("Username must be at least 5 characters and password must be at least 8 characters");
      return;
    }

    try {
      const signup = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const response = await signup.json();
      setToken(response.token);
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username: <input value={username} onChange={(e) => { setUsername(e.target.value); }} />
        </label>
        <br />
        <h6>*Username must contain at least 5 characters.</h6>
        <label>
          Password: <input value={password} onChange={(e) => { setPassword(e.target.value); }} />
        </label>
        <br />
        <h6>*Password must contain at least 8 characters.</h6>
        <button>Submit</button>
        <br/>
      </form>

    </>
  )
}