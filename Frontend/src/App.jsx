import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Usuarios from "./pages/Usuarios";
import Header from "./components/Header";
import { CssBaseline } from "@mui/material";


export default function App () {
  return(
    <BrowserRouter>
    <CssBaseline />
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usuarios" element={<Usuarios />} />
      </Routes>
    </BrowserRouter>
  )
}