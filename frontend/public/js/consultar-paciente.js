document.getElementById('formBusca').addEventListener('submit', async (e) => {
    e.preventDefault();

    const termo = document.getElementById('inputBusca').value;
    const tabela = document.getElementById('tabelaPacientes');

    // Mostra que está a carregar
    tabela.innerHTML = `<tr><td colspan="4" class="py-8 text-center text-slate-500"><i data-lucide="loader-2" class="w-6 h-6 animate-spin mx-auto"></i></td></tr>`;
    lucide.createIcons();

    try {
        const token = localStorage.getItem('token');

        // No teu Back-end já deixámos a rota pronta para buscar funcionários
        const url = termo ? `http://localhost:3000/funcionarios?busca=${termo}` : `http://localhost:3000/funcionarios`;

        const resposta = await fetch(url, {
            headers: { 'Authorization': `Bearer ${token}` } // Apresenta o token
        });

        // Se o token estiver expirado, enviar para o login
        if (resposta.status === 401 || resposta.status === 403) {
            alert("A sua sessão expirou. Por favor, faça login novamente.");
            fazerLogout();
            return;
        }

        const dados = await resposta.json();

        // Se não encontrar ninguém
        if (dados.length === 0) {
            tabela.innerHTML = `<tr><td colspan="4" class="py-8 text-center text-vermelhoAlerta font-medium">Nenhum paciente encontrado com esse termo.</td></tr>`;
            return;
        }

        // Se encontrar, desenha a tabela
        tabela.innerHTML = dados.map(paciente => `
            <tr class="hover:bg-slate-50 transition-colors">
                <td class="py-4 px-6 font-medium text-slate-700">${paciente.matricula}</td>
                <td class="py-4 px-6 font-bold text-azulEscuro">${paciente.nome}</td>
                <td class="py-4 px-6 text-sm text-slate-500">
                    ${paciente.cargo}<br>
                    <span class="text-xs text-slate-400 flex items-center gap-1 mt-1">
                        <i data-lucide="map-pin" class="w-3 h-3"></i> ${paciente.setor}
                    </span>
                </td>
                <td class="py-4 px-6 text-center">
                    <a href="/ficha-paciente?matricula=${paciente.matricula}" 
                       class="inline-flex items-center gap-2 bg-vermelhoAlerta hover:bg-red-800 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-all text-sm">
                        <i data-lucide="folder-open" class="w-4 h-4"></i> Abrir Prontuário
                    </a>
                </td>
            </tr>
        `).join('');

        lucide.createIcons(); // Recarrega os ícones nos novos botões desenhados

    } catch (erro) {
        console.error("Erro:", erro);
        tabela.innerHTML = `<tr><td colspan="4" class="py-8 text-center text-red-500">Erro ao comunicar com o servidor.</td></tr>`;
    }
});