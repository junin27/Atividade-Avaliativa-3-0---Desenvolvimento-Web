/**
 * Utilitários para manipulação de tarefas
 * 
 * Demonstra os conceitos de:
 * - Funções puras: recebem dados e retornam novos dados sem efeitos colaterais
 * - Lógica de negócio: separação de responsabilidades
 * - Testabilidade: funções fáceis de testar unitariamente
 */

/**
 * Filtra tarefas baseado no filtro selecionado e termo de busca
 * 
 * @param {Array} tasks - Lista de tarefas
 * @param {string} filter - Filtro: 'all', 'pending', 'completed'
 * @param {string} searchTerm - Termo de busca
 * @returns {Array} Lista de tarefas filtradas
 */
export const filterTasks = (tasks, filter, searchTerm = '') => {
  if (!Array.isArray(tasks)) {
    return [];
  }

  // Aplica filtro por status
  let result;
  switch (filter) {
    case 'pending':
      result = tasks.filter(task => !task.completed);
      break;
    case 'completed':
      result = tasks.filter(task => task.completed);
      break;
    case 'all':
    default:
      result = tasks;
      break;
  }

  // Aplica busca por texto (título e descrição)
  if (searchTerm.trim()) {
    const searchLower = searchTerm.toLowerCase();
    result = result.filter(task => 
      task.title.toLowerCase().includes(searchLower) ||
      task.description?.toLowerCase().includes(searchLower)
    );
  }

  return result;
};

/**
 * Calcula estatísticas das tarefas
 * 
 * @param {Array} tasks - Lista de tarefas
 * @returns {Object} Estatísticas: total, pending, completed
 */
export const calculateTaskStats = (tasks) => {
  if (!Array.isArray(tasks)) {
    return { total: 0, pending: 0, completed: 0 };
  }

  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;

  return { total, pending, completed };
};

/**
 * Cria uma nova tarefa com dados padrão
 * 
 * @param {string} title - Título da tarefa
 * @param {string} description - Descrição da tarefa
 * @returns {Object} Nova tarefa
 */
export const createTask = (title, description = '') => {
  return {
    id: Date.now().toString() + Math.random().toString(36).substring(2, 11),
    title: title.trim(),
    description: description.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

/**
 * Atualiza uma tarefa existente
 * 
 * @param {Object} task - Tarefa existente
 * @param {Object} updates - Atualizações a serem aplicadas
 * @returns {Object} Tarefa atualizada
 */
export const updateTask = (task, updates) => {
  return {
    ...task,
    ...updates,
    updatedAt: new Date().toISOString()
  };
};

/**
 * Ordena tarefas por critério
 * 
 * @param {Array} tasks - Lista de tarefas
 * @param {string} sortBy - Critério: 'createdAt', 'title', 'status'
 * @param {string} sortOrder - Ordem: 'asc', 'desc'
 * @returns {Array} Lista de tarefas ordenadas
 */
export const sortTasks = (tasks, sortBy = 'createdAt', sortOrder = 'desc') => {
  if (!Array.isArray(tasks)) {
    return [];
  }

  const sortedTasks = [...tasks];

  sortedTasks.sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case 'title':
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      case 'status':
        aValue = a.completed;
        bValue = b.completed;
        break;
      case 'createdAt':
      default:
        aValue = new Date(a.createdAt);
        bValue = new Date(b.createdAt);
        break;
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return sortedTasks;
};

/**
 * Valida dados de uma tarefa
 * 
 * @param {Object} taskData - Dados da tarefa
 * @returns {Object} Resultado da validação: { isValid, errors }
 */
export const validateTask = (taskData) => {
  const errors = {};

  if (!taskData.title || taskData.title.trim().length === 0) {
    errors.title = 'Título é obrigatório';
  }

  if (taskData.title && taskData.title.trim().length > 100) {
    errors.title = 'Título deve ter no máximo 100 caracteres';
  }

  if (taskData.description && taskData.description.trim().length > 500) {
    errors.description = 'Descrição deve ter no máximo 500 caracteres';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Carrega tarefas do localStorage para um usuário específico
 * 
 * @param {string} userId - ID do usuário
 * @returns {Array} Lista de tarefas salvas
 */
export const loadTasks = (userId) => {
  try {
    const savedTasks = localStorage.getItem(`tasks_${userId}`);
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error);
    return [];
  }
};

/**
 * Salva tarefas no localStorage para um usuário específico
 * 
 * @param {string} userId - ID do usuário
 * @param {Array} tasks - Lista de tarefas para salvar
 */
export const saveTasks = (userId, tasks) => {
  try {
    localStorage.setItem(`tasks_${userId}`, JSON.stringify(tasks));
  } catch (error) {
    console.error('Erro ao salvar tarefas:', error);
  }
};

/**
 * Remove uma tarefa da lista
 * 
 * @param {Array} tasks - Lista atual de tarefas
 * @param {string} taskId - ID da tarefa a ser removida
 * @returns {Array} Nova lista sem a tarefa removida
 */
export const deleteTask = (tasks, taskId) => {
  return tasks.filter(task => task.id !== taskId);
};
