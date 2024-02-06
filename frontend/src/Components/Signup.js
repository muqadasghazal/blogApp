import React , {useState} from 'react';
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ userName: "", email: "" , password:"" });

  const handleOnChange = async (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  const handleOnSubmit = async ()=>{
    const url = "http://localhost:3020/api/auth/createUser";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userName:credentials.userName,
          email: credentials.email,
          password: credentials.password,
        }), // what we are giving in body so that it gets store in database
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonResponse = await response.json();
      navigate("/login");
      props.showAlert("Success" , "Please Log in using email and password you set")
    } catch (error) {
      console.error(error);
    }
  };
  return (
    
    <div className="d-flex justify-content-center">
      <div className="card p-4" style={{ maxWidth: '400px' }}>
        <h2 className="mb-4">SignUp</h2>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            <b>User Name:</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="userName"
            name="userName"
            placeholder="Write your name here"
            value={credentials.userName}
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            <b>Email</b>
          </label>
          <input
            value={credentials.email}
            name="email"
            type="email"
            className="form-control"
            id="email"
            placeholder="Write your email here"
            onChange={handleOnChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            <b>Password</b>
          </label>
          <input value={credentials.password} type="password" className="form-control" id="password" name="password" onChange={handleOnChange} />
        </div>
        <button className="btn btn-primary" onClick={handleOnSubmit}>SignUp</button>
      </div>
    </div>
  )
}

export default Signup
