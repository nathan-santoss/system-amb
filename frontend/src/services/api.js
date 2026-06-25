const URL_BASE = 'http://localhost:3000'

const api = async (endpoint, method = 'GET', data = null) => {
    const token =  localStorage.getItem('token')
    const headers = {
        'Content-Type': 'application/json'
    }
    if(token){
        headers['authorization'] = `Bearer ${token}`
    }
    const config = {
        method,
        headers
    }
    if (data){
        config.body = JSON.stringify(data)
    }
    const response = await fetch(`${URL_BASE}${endpoint}`, config)
    if (response.status === 403 || response.status === 401) {
        console.error("Acesso negado: Token inválido ou expirado.")
    }   

    return response
}

export default api