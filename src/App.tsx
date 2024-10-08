// import Header from "./components/layout/Header";
// import Footer from "./components/layout/Footer";
import Layout from "./components/layout/Layout";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from "./pages";
import About from "./pages/About";
// import Temp from "./pages/Temp";
import HowToShip from "./pages/how_it_works/HowToShip";
import HowCalculateCost from "./pages/how_it_works/HowCalculateCost";
import ServicesHome from "./pages/services/ServicesHome";
import Checkout from "@/pages/calculate/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/howtoship" element={<HowToShip />} />
          <Route path="/howtocalculate" element={<HowCalculateCost />} />
          <Route path="/services" element={<ServicesHome />} />
          <Route path="/services-checkout/:enqid" element={<Checkout />} />
          {/* <Route path="/temp" element={<Temp />} /> */}
          {/* <Route path="/thank-you/:orderid" element={<Checkout />} /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
