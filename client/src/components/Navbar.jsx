import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };
  return (
    <nav className="border-b bg-white">
      <div className="max-w-3xl mx-auto p-4 flex items-center justify-between">
        <Link to="/" className="font-semibold">Fullstack MySQL App</Link>
        <div className="space-x-4">
          <Link to="/">Home</Link>
          {token ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={logout} className="px-3 py-1 rounded bg-gray-900 text-white">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}