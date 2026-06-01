import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

function App() {
  const [estaLogado, setEstaLogado] = useState(false)

  function mudarTelaParaDashboard() {
    setEstaLogado(true)
  }

  function renderizarTela() {
    if (estaLogado === true) {
      return <Dashboard />
    } else {
      return <Login onLoginSuccess={mudarTelaParaDashboard} />
    }
  }

  return (
    <div>
      {renderizarTela()}
    </div>
  )
}

export default App