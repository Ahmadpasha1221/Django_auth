import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import benzlogo from '../images/benzlogo.jpg';
import audi1 from '../images/audi1.jpg';
import lambo1 from '../images/lambo1.jpg';
import './login.css'; // Import your CSS file

const LoginPage = ({ setName }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  // const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            email: email,
            password: password,
        });

        localStorage.setItem('jwt', response.data.jwt);
        localStorage.setItem('refresh_token', response.data.refresh);
        console.log('Login Successful');
        navigate('/');
        // Set the user name after successful login
        setName(response.data.name); 

        navigate('/');
    } catch (error) {
        console.error('Login Error:', error);
        setErrors(['Invalid email or password']);
    }
};

  return (
    <div id="container">
      <div className="left">
      <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={audi1} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={lambo1} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={benzlogo} class="d-block w-100" alt="..."/>
    </div>
  </div>
</div>
      </div>
      <div className="right">
        <form onSubmit={handleSubmit}>
          <h2>Welcome!</h2>
          <p>Sign in to continue to View Call Logs.</p>
          <h2>Sign In</h2>
          <div className="form-wrapper">
            <div>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {errors.length > 0 && (
              <div className="error">
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
            <button type="submit" className="btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
