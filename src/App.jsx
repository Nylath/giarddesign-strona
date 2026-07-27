import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import Offer from "./components/Offer"
import About from "./components/About";
import Realizations from "./components/Realizations";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />

      <main id="top">
        <Intro />
        <Offer />
        <About />
        <Realizations />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default App;