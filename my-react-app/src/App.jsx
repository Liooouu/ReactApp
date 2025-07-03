import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserName({ username, setUsername }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function Password({ password, setPassword }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-1">Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  async function handleLogin() {
  try {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    alert(data.message);

    if (data.success) {
      navigate('/dashboard'); // ✅ redirect after successful login
    }
  } catch (err) {
    alert('Login failed');
  }
}

  async function handleRegister() {
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      alert(data.message);

      if (data.success) {
        // Go back to login form
        setIsRegistering(false);
        setUsername('');
        setPassword('');
      }
    } catch (err) {
      alert('Registration failed');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isRegistering ? 'Register' : 'Login'}
        </h2>

        <UserName username={username} setUsername={setUsername} />
        <Password password={password} setPassword={setPassword} />

        {!isRegistering ? (
          <>
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Login
            </button>
            <button
              onClick={() => setIsRegistering(true)}
              className="w-full mt-3 text-blue-600 underline"
            >
              Don’t have an account? Register
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleRegister}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Register
            </button>
            <button
              onClick={() => setIsRegistering(false)}
              className="w-full mt-3 text-gray-600 underline"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );

}
