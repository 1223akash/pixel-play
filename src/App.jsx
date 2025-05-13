import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Cropper from "./pages/Cropper";
import Resizer from "./pages/Resizer";
import { Menu, X } from "lucide-react";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        {/* Header with Hamburger Menu */}
        <header className="bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-green-400">Project</h1>

          {/* Hamburger Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-6 text-lg font-semibold">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-green-400 border-b-2 border-green-400 pb-1"
                  : "text-white hover:text-green-400 transition"
              }
            >
              Resizer
            </NavLink>
            <NavLink
              to="/cropper"
              className={({ isActive }) =>
                isActive
                  ? "text-green-400 border-b-2 border-green-400 pb-1"
                  : "text-white hover:text-green-400 transition"
              }
            >
              Cropper
            </NavLink>
          </nav>
        </header>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden bg-gray-800 flex flex-col items-center py-4 gap-4 text-lg font-semibold border-b border-gray-700">
            <NavLink
              to="/"
              end
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-green-400"
                  : "text-white hover:text-green-400 transition"
              }
            >
              Resizer
            </NavLink>
            <NavLink
              to="/cropper"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-green-400"
                  : "text-white hover:text-green-400 transition"
              }
            >
              Cropper
            </NavLink>
          </nav>
        )}

        {/* Page Content */}
        <main className="flex justify-center items-center p-6">
          <Routes>
            <Route path="/" element={<Resizer />} />
            <Route path="/cropper" element={<Cropper />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;