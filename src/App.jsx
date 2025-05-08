import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cropper from "./pages/Cropper";
import Resizer from "./pages/Resizer";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <header className="mb-4 flex justify-center gap-4 text-lg font-semibold">
          <Link to="/">Resizer</Link>
          <Link to="/cropper">Cropper</Link>
        </header>

        <Routes>
          <Route path="/" element={<Resizer />} />
          <Route path="/cropper" element={<Cropper />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
