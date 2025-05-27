import React, { useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Project {
  id: number;
  name: string;
  description: string;
  status: 'Em Progresso' | 'Concluído' | 'Atrasado' | 'Planejado';
  progress: number;
  deadline: string;
  team: string[];
}

const initialProjects: Project[] = [
  {
    id: 1,
    name: 'Website Redesign',
    description: 'Redesign completo do site corporativo com foco em UX',
    status: 'Em Progresso',
    progress: 65,
    deadline: '15/07/2023',
    team: ['Ana Silva', 'João Santos', 'Maria Oliveira'],
  },
  {
    id: 2,
    name: 'App Mobile',
    description: 'Desenvolvimento do aplicativo mobile para iOS e Android',
    status: 'Em Progresso',
    progress: 45,
    deadline: '30/07/2023',
    team: ['Pedro Costa', 'Carla Lima'],
  },
  {
    id: 3,
    name: 'Sistema de Pagamentos',
    description: 'Implementação do novo sistema de pagamentos',
    status: 'Atrasado',
    progress: 80,
    deadline: '10/08/2023',
    team: ['Lucas Mendes', 'Julia Alves'],
  },
];

const statusColors = {
  'Em Progresso': 'bg-blue-100 text-blue-800',
  'Concluído': 'bg-green-100 text-green-800',
  'Atrasado': 'bg-red-100 text-red-800',
  'Planejado': 'bg-yellow-100 text-yellow-800',
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Cabeçalho e Filtros */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-semibold text-gray-900">Projetos</h1>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Buscar projetos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="todos">Todos os Status</option>
            <option value="Em Progresso">Em Progresso</option>
            <option value="Concluído">Concluído</option>
            <option value="Atrasado">Atrasado</option>
            <option value="Planejado">Planejado</option>
          </select>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Novo Projeto
          </button>
        </div>
      </div>

      {/* Lista de Projetos */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredProjects.map((project) => (
            <li key={project.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">{project.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{project.description}</p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <span className={`px-2 py-1 text-xs rounded-full ${statusColors[project.status]}`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      Equipe: {project.team.join(', ')}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>Prazo: {project.deadline}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Progresso: {project.progress}%</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Projects; 