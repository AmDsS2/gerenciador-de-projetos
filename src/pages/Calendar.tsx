import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  type: 'meeting' | 'deadline' | 'task';
  description: string;
}

const initialEvents: Event[] = [
  {
    id: 1,
    title: 'Reunião de Planejamento',
    date: '2023-07-15',
    time: '10:00',
    type: 'meeting',
    description: 'Reunião semanal de planejamento do projeto',
  },
  {
    id: 2,
    title: 'Entrega do Protótipo',
    date: '2023-07-20',
    time: '14:00',
    type: 'deadline',
    description: 'Prazo para entrega do protótipo do novo design',
  },
  {
    id: 3,
    title: 'Revisão de Código',
    date: '2023-07-18',
    time: '15:30',
    type: 'task',
    description: 'Revisão do código do módulo de autenticação',
  },
];

const eventTypeColors = {
  meeting: 'bg-blue-100 text-blue-800',
  deadline: 'bg-red-100 text-red-800',
  task: 'bg-green-100 text-green-800',
};

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getEventsForDate = (date: string) => {
    return initialEvents.filter(event => event.date === date);
  };

  const renderCalendarDays = () => {
    const days = [];
    const totalDays = 42; // 6 rows of 7 days

    for (let i = 0; i < totalDays; i++) {
      const dayNumber = i - firstDayOfMonth + 1;
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber);
      const dateString = date.toISOString().split('T')[0];
      const isCurrentMonth = date.getMonth() === currentDate.getMonth();
      const events = getEventsForDate(dateString);

      days.push(
        <div
          key={i}
          className={`min-h-[100px] p-2 border border-gray-200 ${
            isCurrentMonth ? 'bg-white' : 'bg-gray-50'
          } ${selectedDate === dateString ? 'ring-2 ring-indigo-500' : ''}`}
          onClick={() => setSelectedDate(dateString)}
        >
          <div className="text-sm font-medium text-gray-900">{dayNumber}</div>
          <div className="mt-1 space-y-1">
            {events.map(event => (
              <div
                key={event.id}
                className={`text-xs px-2 py-1 rounded ${eventTypeColors[event.type]}`}
              >
                {event.time} - {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho do Calendário */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Calendário</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
          </button>
          <span className="text-lg font-medium">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <ChevronRightIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Grade do Calendário */}
      <div className="bg-white rounded-lg shadow">
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {weekDays.map(day => (
            <div
              key={day}
              className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-700"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {renderCalendarDays()}
        </div>
      </div>

      {/* Detalhes do Evento Selecionado */}
      {selectedDate && (
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Eventos para {new Date(selectedDate).toLocaleDateString('pt-BR')}
          </h2>
          <div className="space-y-4">
            {getEventsForDate(selectedDate).map(event => (
              <div key={event.id} className="border-l-4 border-indigo-500 pl-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${eventTypeColors[event.type]}`}>
                    {event.type === 'meeting' ? 'Reunião' : event.type === 'deadline' ? 'Prazo' : 'Tarefa'}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{event.description}</p>
                <p className="mt-1 text-sm text-gray-500">Horário: {event.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar; 