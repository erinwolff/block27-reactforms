import { useState } from "react";


export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  function refreshPage () {
    window.location.reload();
  }

  async function handleClick() {
    
    if(!token){
      setError(`Please submit a username & password`);
      return;
    }

    try {
      const authenticate = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const response = await authenticate.json();
      setSuccessMessage(`${response.message} Welcome ${response.data.username}!`);
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <>
      <h2>Authenticate</h2>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      <button onClick={handleClick}>Authenticate Token!</button>
      <br/>
      <br/>
      <button onClick={refreshPage}>Refresh page</button>
    </>
  );
}