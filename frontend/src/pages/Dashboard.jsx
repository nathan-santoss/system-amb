// src/pages/Dashboard.jsx
import { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Activity, Plus, MousePointerClick, HeartPulse, ClipboardList, UserCheck, CalendarCheck, ListVideo, BarChart3, Clock, Gauge, Thermometer, X } from 'lucide-react';

export default function Dashboard() {
    const [isObservationModalOpen, setIsObservationModalOpen] = useState(false);
    let observationModalContent = null;
    if (isObservationModalOpen) {
        observationModalContent = (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
                    <div className="p-6 border-b border-red-100 bg-red-50 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-lg shadow-sm border border-red-100">
                                <Activity className="w-5 h-5 text-vermelhoAlerta animate-pulse" />
                            </div>
                            <div>
                                <h3 className="font-bold text-vermelhoAlerta text-lg">Pacientes em Observação</h3>
                            </div>
                        </div>
                        <button onClick={() => setIsObservationModalOpen(false)} className="text-slate-400 hover:text-slate-600 hover:bg-red-100 p-2 rounded-lg transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-6 overflow-y-auto bg-slate-50/50 space-y-4">
                        <div className="border border-red-200 bg-white rounded-xl p-5 shadow-sm relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-vermelhoAlerta"></div>
                            <div className="pl-2 space-y-3">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-slate-800 text-base">Carlos Eduardo Souza</h4>
                                    <span className="text-xs font-bold text-vermelhoAlerta flex items-center gap-1 bg-red-50 px-2 py-1 rounded-md border border-red-100">
                                        <Clock className="w-3 h-3" /> Triado às 08:30
                                    </span>
                                </div>
                                <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100">
                                    <span className="bg-red-50 text-vermelhoAlerta text-xs font-bold px-3 py-1.5 rounded-md border border-red-100 flex items-center gap-1.5">
                                        <Gauge className="w-3.5 h-3.5" /> PA: 150/100
                                    </span>
                                    <span className="bg-amber-50 text-amber-600 text-xs font-bold px-3 py-1.5 rounded-md border border-amber-200 flex items-center gap-1.5">
                                        <Thermometer className="w-3.5 h-3.5" /> Temp: 38.2°C
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 flex gap-3 justify-end border-t border-red-100">
                                <button onClick={() => setIsObservationModalOpen(false)} className="text-xs bg-emerald-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-emerald-700 transition-all">
                                    Concluir e Liberar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <DashboardLayout titulo="Painel Geral" subtitulo="Visão do Plantão">
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
                <div className="bg-gradient-to-r from-azulEscuro to-blue-800 rounded-2xl p-6 text-white shadow-lg shadow-blue-900/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-blue-700">
                    <div>
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Activity className="w-6 h-6 text-blue-300" />
                            Ambulatório Ativo
                        </h3>
                        <p className="text-sm text-blue-100 mt-1 font-medium">O monitoramento clínico está a correr. Inicie um novo atendimento rapidamente.</p>
                    </div>
                    <button className="bg-white text-azulEscuro hover:bg-slate-50 px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all flex items-center gap-2 flex-shrink-0 transform hover:scale-105">
                        <Plus className="w-4 h-4 border-2 border-azulEscuro rounded-full flex items-center justify-center p-0.5" />
                        <span>Nova Triagem Rápida</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    <div onClick={() => setIsObservationModalOpen(true)} className="bg-white rounded-2xl p-5 border border-red-100 shadow-sm hover:shadow-lg hover:border-red-300 transition-all group cursor-pointer relative overflow-hidden transform hover:-translate-y-1">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-vermelhoAlerta"></div>
                        <div className="flex items-start justify-between">
                            <div>
                                <span className="text-xs font-bold text-vermelhoAlerta uppercase tracking-wider">Em Observação</span>
                                <h4 className="text-4xl font-black text-vermelhoAlerta mt-2 animate-pulse">2</h4>
                                <p className="text-[10px] text-red-500 mt-2 font-bold uppercase flex items-center gap-1">
                                    <MousePointerClick className="w-3 h-3" /> Clicar para visualizar
                                </p>
                            </div>
                            <div className="bg-red-50 p-3 rounded-xl text-vermelhoAlerta group-hover:scale-110 transition-transform">
                                <HeartPulse className="w-6 h-6" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm transition-all relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-slate-400"></div>
                        <div className="flex items-start justify-between">
                            <div>
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Fichas do Dia</span>
                                <h4 className="text-4xl font-black text-slate-800 mt-2">18</h4>
                            </div>
                            <div className="bg-slate-100 p-3 rounded-xl text-slate-500"><ClipboardList className="w-6 h-6" /></div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm transition-all relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                        <div className="flex items-start justify-between">
                            <div>
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Atendidos Hoje</span>
                                <h4 className="text-4xl font-black text-slate-800 mt-2">15</h4>
                            </div>
                            <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600"><UserCheck className="w-6 h-6" /></div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm transition-all relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-azulEscuro"></div>
                        <div className="flex items-start justify-between">
                            <div>
                                <span className="text-xs font-bold text-azulEscuro uppercase tracking-wider">Atendidos no Mês</span>
                                <h4 className="text-4xl font-black text-slate-800 mt-2">342</h4>
                            </div>
                            <div className="bg-blue-50 p-3 rounded-xl text-azulEscuro"><CalendarCheck className="w-6 h-6" /></div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div className="flex items-center gap-2">
                                <div className="bg-blue-100 p-1.5 rounded-lg">
                                    <ListVideo className="w-4 h-4 text-azulEscuro" />
                                </div>
                                <h3 className="font-bold text-slate-800">Últimos Atendimentos</h3>
                            </div>
                        </div>
                        <div className="p-0 overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 text-slate-400 uppercase text-[10px] tracking-wider font-bold border-b border-slate-100">
                                        <th className="py-3 px-6">Horário</th>
                                        <th className="py-3 px-6">Paciente</th>
                                        <th className="py-3 px-6">Estado</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 text-sm">
                                    <tr className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4 px-6 font-mono text-xs font-semibold text-slate-500">10:45</td>
                                        <td className="py-4 px-6 font-bold text-slate-800">Amanda Rezende Cruz</td>
                                        <td className="py-4 px-6">
                                            <span className="bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">A aguardar</span>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4 px-6 font-mono text-xs font-semibold text-slate-500">10:15</td>
                                        <td className="py-4 px-6 font-bold text-slate-800">Mariana de Oliveira</td>
                                        <td className="py-4 px-6">
                                            <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Concluído</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
                                <BarChart3 className="w-4 h-4 text-azulEscuro" />
                                Por Núcleo
                            </h3>
                        </div>
                        <div className="p-6 space-y-6 flex-1 flex flex-col justify-center">
                            <div>
                                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                                    <span>Núcleo Operacional</span><span className="text-vermelhoAlerta">58%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div className="bg-vermelhoAlerta h-2 rounded-full" style={{ width: '58%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                                    <span>Núcleo de Manutenção</span><span className="text-orange-500">27%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '27%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {observationModalContent}
        </DashboardLayout>
    );
}