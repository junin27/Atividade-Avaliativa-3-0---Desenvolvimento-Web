import { useState, useEffect, useMemo, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Header from '../../components/Header';
import Button from '../../components/Button';
import EmptyState from '../../components/EmptyState';
import { 
  NewTaskIcon, 
  SearchIcon, 
  CancelIcon, 
  CreateTaskIcon 
} from '../../components/Icons';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import { 
  filterTasks, 
  calculateTaskStats,
  loadTasks,
  saveTasks,
  createTask,
  updateTask,
  deleteTask
} from './taskUtils';

/**
 * Componente TasksPage - COM ESTADO
 * 
 * Demonstra os conceitos de:
 * - Lista: renderização de múltiplos itens (tasks)
 * - Formulário: criação e edição de tarefas
 * - Componente com estado: gerencia toda a aplicação
 * 
 * @returns {JSX.Element} Página principal de tarefas
 */
function TasksPage() {
  const { user } = useAuth(); // useContext: acesso ao contexto de autenticação

  // useState: controle do estado das tarefas
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  // useRef: referência para o campo de busca
  const searchInputRef = useRef(null);

  // Funções auxiliares para reduzir complexidade cognitiva
  const getEmptyStateTitle = (searchTerm, filter) => {
    if (searchTerm) {
      return 'Nenhuma tarefa encontrada';
    }
    
    switch (filter) {
      case 'completed':
        return 'Nenhuma tarefa concluída';
      case 'pending':
        return 'Nenhuma tarefa pendente';
      default:
        return 'Nenhuma tarefa criada';
    }
  };

  const getEmptyStateDescription = (searchTerm, tasks) => {
    if (searchTerm) {
      return `Nenhuma tarefa corresponde à busca "${searchTerm}"`;
    }
    
    if (tasks.length === 0) {
      return 'Comece criando sua primeira tarefa!';
    }
    
    return 'Altere o filtro para ver outras tarefas.';
  };

  // useEffect: carrega tarefas do localStorage na inicialização
  useEffect(() => {
    const savedTasks = loadTasks(user.id);
    setTasks(savedTasks);
    
    // Define título da página dinamicamente
    document.title = 'To-Do App';
    
    return () => {
      document.title = 'To-Do App';
    };
  }, [user.id]);

  // useEffect: salva tarefas no localStorage quando houver mudanças
  useEffect(() => {
    if (tasks.length > 0 || tasks.length === 0) {
      saveTasks(user.id, tasks);
    }
  }, [tasks, user.id]);

  // useMemo: otimização de performance para lista filtrada
  const filteredTasks = useMemo(() => {
    return filterTasks(tasks, filter, searchTerm);
  }, [tasks, filter, searchTerm]);

  // useMemo: cálculos de estatísticas otimizados
  const taskStats = useMemo(() => {
    return calculateTaskStats(tasks);
  }, [tasks]);

  /**
   * Manipuladores de eventos (event handlers)
   */
  
  // Manipulador para adicionar nova tarefa
  const handleAddTask = (taskData) => {
    const newTask = createTask(taskData.title, taskData.description);
    setTasks(prevTasks => [...prevTasks, newTask]);
    setIsFormVisible(false);
  };

  // Manipulador para alternar conclusão de tarefa
  const handleToggleTask = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? updateTask(task, { completed: !task.completed }) : task
      )
    );
  };

  // Manipulador para editar tarefa
  const handleEditTask = (taskId, updatedData) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? updateTask(task, updatedData) : task
      )
    );
  };

  // Manipulador para excluir tarefa
  const handleDeleteTask = (taskId) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      setTasks(prevTasks => deleteTask(prevTasks, taskId));
    }
  };

  // Manipulador para mudança de filtro
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Manipulador para busca de tarefas
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Manipulador para focar no campo de busca
  const handleFocusSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Manipulador para limpar busca
  const handleClearSearch = () => {
    setSearchTerm('');
    handleFocusSearch();
  };

  return (
    <>
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cabeçalho da página com estatísticas */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Minhas Tarefas
          </h1>
          
          {/* Estatísticas das tarefas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">Total</h3>
              <p className="text-2xl font-bold text-blue-600">{taskStats.total}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">Concluídas</h3>
              <p className="text-2xl font-bold text-green-600">{taskStats.completed}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-800">Pendentes</h3>
              <p className="text-2xl font-bold text-yellow-600">{taskStats.pending}</p>
            </div>
          </div>
          
          {/* Barra de ações */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => setIsFormVisible(!isFormVisible)}
                variant="primary"
                className="flex items-center space-x-2"
              >
                {isFormVisible ? (
                  <>
                    <CancelIcon className="w-4 h-4" />
                    <span>Cancelar</span>
                  </>
                ) : (
                  <>
                    <NewTaskIcon className="w-4 h-4" />
                    <span>Nova Tarefa</span>
                  </>
                )}
              </Button>
              
              <Button
                onClick={handleFocusSearch}
                variant="outline"
                className="sm:hidden flex items-center space-x-2"
              >
                <SearchIcon className="w-4 h-4" />
                <span>Buscar</span>
              </Button>
            </div>
            
            {/* Campo de busca estilizado */}
            <div className="w-full sm:w-auto">
              <div className="search-input-container">
                <SearchIcon className="search-icon w-5 h-5 text-muted-foreground" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Buscar tarefas..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="input w-full sm:w-64"
                  style={{ paddingLeft: '2.5rem', paddingRight: searchTerm ? '2.5rem' : '1rem' }}
                  aria-label="Buscar tarefas"
                />
                {searchTerm && (
                  <button
                    onClick={handleClearSearch}
                    className="search-clear-button p-1 hover:bg-secondary rounded-md transition-colors duration-200"
                    aria-label="Limpar busca"
                  >
                    <CancelIcon className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Formulário de criação/edição de tarefas */}
        {isFormVisible && (
          <div className="mb-8">
            <TaskForm
              onSubmit={handleAddTask}
              onCancel={() => setIsFormVisible(false)}
            />
          </div>
        )}

        {/* Filtros de tarefas */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => handleFilterChange('all')}
              variant={filter === 'all' ? 'primary' : 'outline'}
              className="text-sm"
            >
              Todas ({taskStats.total})
            </Button>
            <Button
              onClick={() => handleFilterChange('pending')}
              variant={filter === 'pending' ? 'primary' : 'outline'}
              className="text-sm"
            >
              Pendentes ({taskStats.pending})
            </Button>
            <Button
              onClick={() => handleFilterChange('completed')}
              variant={filter === 'completed' ? 'primary' : 'outline'}
              className="text-sm"
            >
              Concluídas ({taskStats.completed})
            </Button>
          </div>
        </div>

        {/* Lista de tarefas */}
        <div className="space-y-4">
          {filteredTasks.length > 0 ? (
            // Lista de tarefas quando há itens
            filteredTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggleTask}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))
          ) : (
            // Estado vazio quando não há tarefas
            <EmptyState
              title={getEmptyStateTitle(searchTerm, filter)}
              description={getEmptyStateDescription(searchTerm, tasks)}
              action={
                !isFormVisible && tasks.length === 0 ? (
                  <Button
                    onClick={() => setIsFormVisible(true)}
                    variant="primary"
                    className="flex items-center space-x-2"
                  >
                    <CreateTaskIcon className="w-5 h-5" />
                    <span>Criar primeira tarefa</span>
                  </Button>
                ) : null
              }
            />
          )}
        </div>
      </main>
    </>
  );
}

export default TasksPage;
