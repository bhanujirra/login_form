import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/Login.css';
import '../css/Mri.css';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://127.0.0.1:8000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            console.log('Login successful:', data);
            navigate('/mri-auto'); // Navigate to the MRI page on successful login
            // You can navigate to a new page here if needed
          } else {
            console.error('Login failed:', data.message);
            navigate('/mri-auto');
          }
        } catch (error) {
          console.error('Error during login:', error);
          navigate('/mri-auto');
        }
      };

    return(
        <div className="login">
            <form onSubmit={handleLogin} className="login-form">
                <h1>Login</h1>
                <input 
                    type="text" 
                    placeholder="MRI Username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="login-button">Login</button>
                </form>
        </div>
    );
}

export default Login;