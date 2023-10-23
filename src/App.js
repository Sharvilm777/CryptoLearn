import "./App.css";
import Coins from "./Components/Coins";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Coin from "./Components/Coin";
import News from "./Components/News";
import Portfolio from "./Components/Portfolio";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
const theme = createTheme({
  typography: {
    fontFamily: ["Quicksand"],
  },
});
function App() {
  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coins" element={<Coins />} />
            <Route path="/coinById/:uuid" element={<Coin />} />
            <Route path="/news" element={<News />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
