import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import Portfolio from "./pages/Portfolio/Portfolio";
import Education from "./pages/Education/Education";
import Contact from "./pages/Contact/Contact";
import Weddings from "./pages/Weddings/Weddings";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/education" element={<Education />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services/weddings" element={<Weddings />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
