import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import ConsultarPaciente from './pages/ConsultarPaciente'
import FichaPaciente from './pages/FichaPaciente'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota inicial de Login */}
        <Route path="/" element={<Login />} />

        {/* Rota do Painel Geral */}
        <Route path='/dashboard' element={<Dashboard />} />

        {/* Rota para consultar pacientes */}
        <Route path='/consultar-paciente' element={<ConsultarPaciente />} />

        {/* Rota dinâmica do prontuário (recebe a matrícula na URL) */}
        <Route path='/ficha-paciente/:matricula' element={<FichaPaciente />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App