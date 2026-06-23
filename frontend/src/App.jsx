import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

function App() {
  const [estaLogado, setEstaLogado] = useState(false)

  function mudarTelaParaDashboard() { // função para informar (true) que o usuário está logado
    setEstaLogado(true)
  }

  function renderizarTela() {
    if (estaLogado === true) {
      return <Dashboard />
    } else {
      return <Login onLoginSuccess={mudarTelaParaDashboard} /> //chamando a função criada
    }
  }

  return (
    <div>
      {renderizarTela()}
    </div>
  )
}

export default App