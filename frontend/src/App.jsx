import { Routes, Route } from 'react-router-dom';
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
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/departments" element={<Services />} />
          <Route path="/services" element={<Services />} />
          <Route path="/medicines" element={<Medicines />} />
          <Route path="/appointments" element={<Appointment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
