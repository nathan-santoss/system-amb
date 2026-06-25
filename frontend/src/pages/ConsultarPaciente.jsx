import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import {
    Search,
    UserPlus,
    FolderOpen,
    MapPin,
    User,
    ShieldAlert
} from 'lucide-react';

export default function ConsultarPaciente() {

    const navigate = useNavigate();

    const [pesquisa, setPesquisa] = useState('');
    const [pacientes, setPacientes] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');

    const buscarPacientes = useCallback(async () => {

        setCarregando(true);
        setErro('');

        try {

            const token = localStorage.getItem('token');

            let url = 'http://localhost:3000/funcionarios';

            if (pesquisa) {
                url = `http://localhost:3000/funcionarios?busca=${pesquisa}`;
            }

            const resposta = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!resposta.ok) {
                throw new Error('Não foi possível carregar os dados.');
            }

            const dados = await resposta.json();

            setPacientes(dados);

        } catch (err) {

            setErro(
                'Erro ao conectar com a API. Certifique-se de que o servidor está rodando.'
            );

            console.error(err);

        } finally {
            setCarregando(false);
        }
    }, [pesquisa]); // 'pesquisa' é uma dependência para que a função seja recriada quando o valor de pesquisa mudar

    useEffect(() => {
        async function carregarPacientes() {
            await buscarPacientes();
        }
        carregarPacientes();
    }, [buscarPacientes]); // 'buscarPacientes' agora é uma dependência estável graças ao useCallback

    function handleSearch(e) {
        e.preventDefault();
        buscarPacientes();
    }
    let mensagemErro = null;

    if (erro) {
        mensagemErro = (
            <div className="bg-red-50 border border-red-200 text-vermelhoAlerta p-4 rounded-xl text-sm flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                <span>{erro}</span>
            </div>
        );
    }

    let conteudoTabela

    if (carregando) {

        conteudoTabela = (
            <div className="p-12 text-center text-slate-500 font-medium text-sm">
                <div className="w-8 h-8 border-4 border-azulEscuro border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                Buscando na base Nexa Logos...
            </div>
        );

    } else if (pacientes.length > 0) {

        conteudoTabela = (
            <div className="overflow-x-auto">

                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 text-slate-400 uppercase text-[10px] tracking-wider font-bold border-b border-slate-100">
                            <th className="py-3 px-6">
                                Paciente / Matrícula
                            </th>

                            <th className="py-3 px-6">
                                Cargo / Setor
                            </th>

                            <th className="py-3 px-6 text-center">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">

                        {pacientes.map((paciente) => {

                            let tipoSanguineo = 'N/I';

                            if (paciente.tipo_sanguineo) {
                                tipoSanguineo = paciente.tipo_sanguineo;
                            }

                            return (
                                <tr
                                    key={paciente.matricula}
                                    className="hover:bg-slate-50/40 transition-colors"
                                >
                                    <td className="py-4 px-6">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-800">
                                                {paciente.nome}
                                            </span>

                                            <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">

                                                <span>
                                                    Matrícula:
                                                    <strong className="text-slate-600 font-mono">
                                                        {' '}{paciente.matricula}
                                                    </strong>
                                                </span>

                                                <span>•</span>

                                                <span className="bg-blue-50 text-azulEscuro font-bold px-1.5 py-0.5 rounded text-[10px]">
                                                    Sangue: {tipoSanguineo}
                                                </span>

                                            </div>

                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-slate-700">
                                                {paciente.cargo}
                                            </span>

                                            <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                                                <MapPin className="w-3 h-3" />
                                                {paciente.setor}
                                            </span>

                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <button
                                            onClick={() => {
                                                navigate(
                                                    `/ficha-paciente/${paciente.matricula}`
                                                );
                                            }}
                                            className="bg-azulEscuro hover:bg-blue-800 text-white py-2 px-4 rounded-xl font-bold text-xs transition-all shadow-sm inline-flex items-center gap-2"
                                        >
                                            <FolderOpen className="w-4 h-4" />
                                            <span>
                                                Abrir Prontuário
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}

                    </tbody>

                </table>

            </div >
        );

    } else {

        conteudoTabela = (
            <div className="p-12 text-center max-w-sm mx-auto flex flex-col items-center">

                <div className="bg-slate-100 p-4 rounded-full text-slate-400 mb-4">
                    <User className="w-8 h-8" />
                </div>

                <h4 className="font-bold text-slate-700 text-base">
                    Nenhum paciente localizado
                </h4>

                <p className="text-xs text-slate-400 mt-1">
                    Verifique os dados digitados ou realize um novo registo
                    caso este funcionário esteja acessando o ambulatório
                    pela primeira vez.
                </p>

            </div>
        );
    }

    return (
        <DashboardLayout
            titulo="Consultar Paciente"
            subtitulo="Registos Clínicos"
        >

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <form
                        onSubmit={handleSearch}
                        className="flex-1 relative max-w-lg"
                    >

                        <input
                            type="text"
                            placeholder="Pesquise por nome, CPF ou matrícula..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-azulEscuro focus:ring-2 focus:ring-azulEscuro/20 transition-all"
                            value={pesquisa}
                            onChange={(e) => {
                                setPesquisa(e.target.value);
                            }}
                        />
                        <span className="absolute left-3 top-3 text-slate-400">
                            <Search className="w-5 h-5" />
                        </span>
                    </form>
                    <button className="bg-azulEscuro hover:bg-blue-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-blue-900/10 transition-all flex items-center justify-center gap-2 flex-shrink-0">
                        <UserPlus className="w-4 h-4" />
                        <span>
                            Cadastrar Funcionário
                        </span>

                    </button>

                </div>
                {mensagemErro}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    {conteudoTabela}
                </div>

            </div>

        </DashboardLayout>
    );
}