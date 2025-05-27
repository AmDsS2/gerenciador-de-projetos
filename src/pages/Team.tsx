import React, { useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  projects: string[];
}

const initialTeam: TeamMember[] = [
  {
    id: 1,
    name: 'Ana Silva',
    role: 'Gerente de Projetos',
    email: 'ana.silva@empresa.com',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    status: 'online',
    projects: ['Website Redesign', 'App Mobile'],
  },
  {
    id: 2,
    name: 'João Santos',
    role: 'Desenvolvedor Frontend',
    email: 'joao.santos@empresa.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    status: 'away',
    projects: ['Website Redesign'],
  },
  {
    id: 3,
    name: 'Maria Oliveira',
    role: 'Designer UX/UI',
    email: 'maria.oliveira@empresa.com',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    status: 'offline',
    projects: ['App Mobile', 'Sistema de Pagamentos'],
  },
];

const statusColors = {
  online: 'bg-green-400',
  offline: 'bg-gray-400',
  away: 'bg-yellow-400',
};

const Team: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const filteredTeam = initialTeam.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Cabeçalho e Filtros */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-semibold text-gray-900">Equipe</h1>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Buscar membros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Adicionar Membro
          </button>
        </div>
      </div>

      {/* Lista de Membros */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTeam.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
            onClick={() => setSelectedMember(member)}
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  className="h-12 w-12 rounded-full"
                  src={member.avatar}
                  alt={member.name}
                />
                <span
                  className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white ${statusColors[member.status]}`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {member.name}
                </p>
                <p className="text-sm text-gray-500 truncate">{member.role}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">{member.email}</p>
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-900">Projetos:</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {member.projects.map((project) => (
                    <span
                      key={project}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {project}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Detalhes do Membro */}
      {selectedMember && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center space-x-4">
                <img
                  className="h-16 w-16 rounded-full"
                  src={selectedMember.avatar}
                  alt={selectedMember.name}
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {selectedMember.name}
                  </h3>
                  <p className="text-sm text-gray-500">{selectedMember.role}</p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900">Informações de Contato</h4>
                <p className="mt-1 text-sm text-gray-500">{selectedMember.email}</p>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900">Projetos Ativos</h4>
                <div className="mt-2 space-y-2">
                  {selectedMember.projects.map((project) => (
                    <div
                      key={project}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                    >
                      <span className="text-sm text-gray-900">{project}</span>
                      <button className="text-sm text-indigo-600 hover:text-indigo-500">
                        Ver detalhes
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => setSelectedMember(null)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team; 