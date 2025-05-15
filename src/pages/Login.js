import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/Login.css';
import '../css/Mri.css';

function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p>Processing your request...</p>
    </div>
  );
}

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
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
            setIsLoading(false)
            console.error('Login failed:', data.detail);
            alert('Login failed: ' + data.detail);
            setUsername("");
            setPassword("");
            navigate('/login');
          }
        } catch (error) {
          console.error('Network Error :', error);
          navigate('/login');
        }
      };

    return(
        <div className="login">
         { isLoading ? <LoadingSpinner />:(
            <form onSubmit={handleLogin} className="login-form">
                <h1>MRI LOGIN</h1>
                <input 
                    type="text" 
                    placeholder="MRI Username" 
                    value={username}
                    className="login-username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    className="login-password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="login-button" disabled={isLoading}>Login</button>
                </form>
      )}
        </div>
    );
}

export default Login;