import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import ConsultarPaciente from './pages/ConsultarPaciente'
import FichaPaciente from './pages/FichaPaciente'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/consultar-paciente" element={<ConsultarPaciente />} />
        <Route path="/ficha-paciente/:matricula" element={<FichaPaciente />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App