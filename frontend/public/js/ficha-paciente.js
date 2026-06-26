function abrirModal() {
    document.getElementById('modal-backdrop').classList.remove('hidden');
    lucide.createIcons();
}

function fecharModal() {
    document.getElementById('modal-backdrop').classList.add('hidden');
    document.getElementById('descricao_alergia').value = '';
}

async function carregarAlergias(matricula, token) {
    try {
        const resposta = await fetch(`http://localhost:3000/alergias?funcionario_matricula=${matricula}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (resposta.ok) {
            const dadosBrutos = await resposta.json();
            const alergias = Array.isArray(dadosBrutos) ? dadosBrutos : (dadosBrutos.alergias || dadosBrutos.dados || []);
            const lista = document.getElementById('lista-alergias');

            if (alergias.length === 0) {
                lista.innerHTML = `<li class="flex items-center gap-2 text-slate-500"><i data-lucide="info" class="w-4 h-4"></i> Nenhuma cadastrada.</li>`;
                lucide.createIcons();
                return;
            }

            lista.innerHTML = alergias.map(alergia => {
                const id = alergia.id_alergia || alergia.id;
                return `
                <li class="flex justify-between items-center bg-white px-3 py-1.5 rounded-lg border border-red-100 text-red-700 font-medium group transition-all hover:shadow-sm">
                    <div class="flex items-center gap-2">
                        <i data-lucide="alert-circle" class="w-4 h-4 shrink-0"></i>
                        <span>${alergia.descricao_alergia || alergia.descricao || allergy.nome}</span>
                    </div>
                    <button onclick="excluirAlergia(${id})" class="text-red-300 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity p-1" title="Remover alergia">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                </li>
                `;
            }).join('');
            lucide.createIcons();
        }
    } catch (erro) {
        console.error(erro);
    }
}

window.excluirAlergia = async function (idAlergia) {
    if (!confirm("Tem certeza que deseja remover esta alergia do prontuário?")) return;

    const token = localStorage.getItem('token');
    const params = new URLSearchParams(window.location.search);
    const matricula = params.get('matricula');

    try {
        const resposta = await fetch(`http://localhost:3000/alergias/${idAlergia}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (resposta.ok) {
            carregarAlergias(matricula, token);
        } else {
            alert("Erro ao remover a alergia no servidor.");
        }
    } catch (erro) {
        console.error(erro);
        alert("Falha na conexão ao tentar remover a alergia.");
    }
}

document.getElementById('formAlergia').addEventListener('submit', async (e) => {
    e.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const matricula = params.get('matricula');
    const token = localStorage.getItem('token');
    const descricao = document.getElementById('descricao_alergia').value;

    try {
        const resposta = await fetch('http://localhost:3000/alergias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                funcionario_matricula: matricula,
                descricao_alergia: descricao
            })
        });

        if (resposta.ok) {
            fecharModal();
            carregarAlergias(matricula, token);
        } else {
            alert("Erro ao salvar alergia.");
        }
    } catch (erro) {
        console.error(erro);
        alert("Erro de conexão ao salvar alergia.");
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const matricula = params.get('matricula');

    if (!matricula) {
        alert("Nenhum paciente selecionado!");
        window.location.href = '/consultar-paciente';
        return;
    }

    const token = localStorage.getItem('token');

    try {
        const resposta = await fetch(`http://localhost:3000/funcionarios/${matricula}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (resposta.ok) {
            const paciente = await resposta.json();

            document.getElementById('info-nome').textContent = paciente.nome || 'Não informado';
            document.getElementById('info-matricula').textContent = `Matrícula: ${paciente.matricula}`;
            document.getElementById('info-cargo').textContent = paciente.cargo || 'Não informado';
            document.getElementById('info-setor').textContent = paciente.setor || 'Não informado';
            document.getElementById('info-supervisor').textContent = paciente.supervisor || 'Não informado';

            carregarAlergias(matricula, token);
        } else {
            alert("Erro ao buscar dados do paciente.");
        }
    } catch (erro) {
        console.error(erro);
        alert("Falha na conexão com o servidor.");
    }
});

document.getElementById('formTriagem').addEventListener('submit', async (e) => {
    e.preventDefault();

    const params = new URLSearchParams(window.location.search);

    const dadosTriagem = {
        funcionario_matricula: params.get('matricula'),
        pressao_arterial: document.getElementById('pressao').value,
        temperatura: document.getElementById('temperatura').value,
        queixa_principal: document.getElementById('queixa').value,
        gravidade: document.getElementById('gravidade').value,
        acao_tomada: document.getElementById('acao').value
    };

    try {
        const resposta = await fetch('http://localhost:3000/atendimentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(dadosTriagem)
        });

        if (resposta.ok) {
            alert("Triagem salva com sucesso!");
            window.location.href = '/dashboard';
        } else {
            const erro = await resposta.json();
            alert("Erro ao salvar: " + (erro.erro || "Verifique os campos."));
        }
    } catch (erro) {
        console.error(erro);
        alert("Falha na conexão com o servidor ao tentar salvar.");
    }
});