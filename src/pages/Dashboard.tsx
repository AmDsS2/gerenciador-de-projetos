import React from 'react';
import {
  ChartBarIcon,
  ClockIcon,
  UserGroupIcon,
  FolderIcon,
} from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Projetos Ativos',
    value: '12',
    icon: FolderIcon,
    color: 'bg-blue-100 text-blue-600',
    progress: 75,
  },
  {
    name: 'Tarefas Pendentes',
    value: '24',
    icon: ClockIcon,
    color: 'bg-yellow-100 text-yellow-600',
    progress: 40,
  },
  {
    name: 'Membros da Equipe',
    value: '8',
    icon: UserGroupIcon,
    color: 'bg-green-100 text-green-600',
    progress: 85,
  },
  {
    name: 'Prazos Hoje',
    value: '3',
    icon: ChartBarIcon,
    color: 'bg-red-100 text-red-600',
    progress: 30,
  },
];

const recentProjects = [
  {
    id: 1,
    name: 'Website Redesign',
    description: 'Redesign completo do site corporativo com foco em UX',
    status: 'Em Progresso',
    progress: 65,
    deadline: '15/07/2023',
  },
  {
    id: 2,
    name: 'App Mobile',
    description: 'Desenvolvimento do aplicativo mobile para iOS e Android',
    status: 'Em Progresso',
    progress: 45,
    deadline: '30/07/2023',
  },
  {
    id: 3,
    name: 'Sistema de Pagamentos',
    description: 'Implementação do novo sistema de pagamentos',
    status: 'Em Progresso',
    progress: 80,
    deadline: '10/08/2023',
  },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    stat.color.split(' ')[1]
                  }`}
                  style={{ width: `${stat.progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{stat.progress}% concluído</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lista de Projetos Recentes */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-semibold text-gray-800">Projetos Recentes</h2>
          <button className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700">
            <i className="fas fa-plus mr-1"></i> Novo Projeto
          </button>
        </div>
        <div className="divide-y divide-gray-200">
          {recentProjects.map((project) => (
            <div key={project.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">{project.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                  {project.status}
                </span>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Progresso: {project.progress}%</span>
                  <span>Prazo: {project.deadline}</span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 