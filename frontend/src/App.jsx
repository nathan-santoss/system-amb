import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

function App() {
  const [estaLogado, setEstaLogado] = useState(false)

  // 1. A CRIAÇÃO DA FUNÇÃO:
  // Aqui nós criamos a função de forma clara. 
  // O que ela faz por dentro? Apenas uma coisa: muda a memória para "true".
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