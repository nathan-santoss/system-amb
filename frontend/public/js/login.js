const BASE_URL = "https://nexa-logos.onrender.com";

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const resposta = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            localStorage.setItem('token', dados.token);
            window.location.href = '/dashboard';
        } else {
            alert('Acesso negado: ' + (dados.erro || 'Credenciais inválidas.'));
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
        alert('Erro ao conectar com o servidor. Verifique se o Back-end está rodando.');
    }
});