import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Doctors from './pages/Doctors';
import Services from './pages/Services';
import About from './pages/About';
import Medicines from './pages/Medicines';
import Appointment from './pages/Appointment';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem('hospitalx_user');
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {
        localStorage.removeItem('hospitalx_user');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('hospitalx_user');
    setUser(null);
    navigate('/');
  };

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Navbar user={user} onLogout={handleLogout} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login onLoginSuccess={setUser} />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/departments" element={<Services />} />
          <Route path="/services" element={<Services />} />
          <Route path="/medicines" element={<Medicines />} />
          <Route path="/appointments" element={<Appointment user={user} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminDashboard user={user} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
