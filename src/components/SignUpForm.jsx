import { useState } from "react";

export default function SignUpForm({setToken}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const signup = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      const response = await signup.json();
      console.log(response);
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
        <label>
          Password: <input value={password} onChange={(e) => { setPassword(e.target.value); }} />
        </label>
        <button>Submit</button>



      </form>

    </>
  )
}