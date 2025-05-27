import React, { useState } from 'react';
import {
  ChartBarIcon,
  ClockIcon,
  UserGroupIcon,
  FolderIcon,
} from '@heroicons/react/24/outline';

interface ReportData {
  id: number;
  title: string;
  value: string;
  change: number;
  icon: any;
  color: string;
}

const initialReports: ReportData[] = [
  {
    id: 1,
    title: 'Projetos Concluídos',
    value: '24',
    change: 12,
    icon: FolderIcon,
    color: 'bg-green-100 text-green-600',
  },
  {
    id: 2,
    title: 'Tarefas Pendentes',
    value: '45',
    change: -8,
    icon: ClockIcon,
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    id: 3,
    title: 'Membros Ativos',
    value: '12',
    change: 3,
    icon: UserGroupIcon,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 4,
    title: 'Taxa de Conclusão',
    value: '85%',
    change: 5,
    icon: ChartBarIcon,
    color: 'bg-purple-100 text-purple-600',
  },
];

const projectProgress = [
  { name: 'Website Redesign', progress: 75 },
  { name: 'App Mobile', progress: 45 },
  { name: 'Sistema de Pagamentos', progress: 80 },
  { name: 'Redesign do Logo', progress: 90 },
  { name: 'Documentação API', progress: 60 },
];

const Reports: React.FC = () => {
  const [timeRange, setTimeRange] = useState('week');

  return (
    <div className="space-y-6">
      {/* Cabeçalho e Filtros */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-semibold text-gray-900">Relatórios</h1>
        <div className="flex space-x-4">
          <select
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="week">Última Semana</option>
            <option value="month">Último Mês</option>
            <option value="quarter">Último Trimestre</option>
            <option value="year">Último Ano</option>
          </select>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {initialReports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{report.title}</p>
                <p className="text-2xl font-bold text-gray-800">{report.value}</p>
              </div>
              <div className={`p-3 rounded-full ${report.color}`}>
                <report.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-2">
              <span
                className={`text-sm font-medium ${
                  report.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {report.change >= 0 ? '+' : ''}{report.change}%
              </span>
              <span className="text-sm text-gray-500 ml-2">vs período anterior</span>
            </div>
          </div>
        ))}
      </div>

      {/* Progresso dos Projetos */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Progresso dos Projetos</h2>
        <div className="space-y-4">
          {projectProgress.map((project) => (
            <div key={project.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{project.name}</span>
                <span className="text-sm text-gray-500">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Tarefas por Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Tarefas por Status</h2>
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-500">Gráfico de pizza será renderizado aqui</p>
          </div>
        </div>

        {/* Gráfico de Produtividade */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Produtividade da Equipe</h2>
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-500">Gráfico de barras será renderizado aqui</p>
          </div>
        </div>
      </div>

      {/* Tabela de Atividades Recentes */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Atividades Recentes</h2>
        </div>
        <div className="border-t border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Atividade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Responsável
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Atualização do design do site
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Ana Silva
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  15/07/2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Concluído
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Implementação do módulo de pagamentos
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  João Santos
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  14/07/2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Em Progresso
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports; 