import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { EditIcon, DeleteIcon, CheckIcon, SaveIcon, CancelIcon } from '../../components/Icons';

/**
 * Componente TaskItem - PODE SER COM OU SEM ESTADO dependendo do modo
 * 
 * Demonstra os conceitos de:
 * - Componente sem estado: quando apenas renderiza dados
 * - Componente com estado: quando entra em modo de edição
 * - Props: recebe dados da tarefa e funções do componente pai
 * - Eventos: onClick, onChange para interações
 * 
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.task - Dados da tarefa
 * @param {Function} props.onToggle - Função para marcar/desmarcar tarefa
 * @param {Function} props.onEdit - Função para editar tarefa
 * @param {Function} props.onDelete - Função para excluir tarefa
 * @returns {JSX.Element} Item de tarefa
 */
function TaskItem({ task, onToggle, onEdit, onDelete }) {
  // useState: controla se está em modo de edição (torna componente COM ESTADO)
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || ''
  });

  /**
   * Manipula mudanças nos campos de edição
   */
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Salva edições da tarefa
   */
  const handleSaveEdit = () => {
    if (editData.title.trim()) {
      onEdit(task.id, editData);
      setIsEditing(false);
    }
  };

  /**
   * Cancela edição
   */
  const handleCancelEdit = () => {
    setEditData({
      title: task.title,
      description: task.description || ''
    });
    setIsEditing(false);
  };

  /**
   * Confirma exclusão da tarefa
   */
  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      onDelete(task.id);
    }
  };

  return (
    <Card 
      variant="interactive" 
      className={`transition-all duration-200 ${task.completed ? 'opacity-75' : ''}`}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox para marcar como concluída */}
        <button
          onClick={() => onToggle(task.id)}
          className={`mt-1 w-6 h-6 rounded-md border-2 flex items-center justify-center 
            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500
            ${task.completed 
              ? 'bg-success-500 border-success-500 text-white' 
              : 'border-border-secondary hover:border-primary-500'
            }`}
          aria-label={task.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
        >
          {task.completed && (
            <CheckIcon className="w-4 h-4" />
          )}
        </button>

        {/* Conteúdo da tarefa */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            // Modo de edição - torna o componente COM ESTADO
            <div className="space-y-3">
              <Input
                type="text"
                name="title"
                value={editData.title}
                onChange={handleEditChange}
                placeholder="Título da tarefa"
                autoFocus
              />
              <textarea
                name="description"
                value={editData.description}
                onChange={handleEditChange}
                className="input w-full"
                placeholder="Descrição (opcional)"
                rows="2"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleSaveEdit}
                  variant="primary"
                  size="sm"
                  disabled={!editData.title.trim()}
                  className="flex items-center space-x-1"
                >
                  <SaveIcon className="w-3 h-3" />
                  <span>Salvar</span>
                </Button>
                <Button
                  onClick={handleCancelEdit}
                  variant="secondary"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <CancelIcon className="w-3 h-3" />
                  <span>Cancelar</span>
                </Button>
              </div>
            </div>
          ) : (
            // Modo de exibição - componente SEM ESTADO
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className={`font-medium text-content-primary 
                  ${task.completed ? 'line-through opacity-60' : ''}`}
                >
                  {task.title}
                </h3>
                {task.completed && (
                  <Badge variant="success" size="sm">
                    Concluída
                  </Badge>
                )}
              </div>
              
              {task.description && (
                <p className={`text-sm text-content-secondary 
                  ${task.completed ? 'line-through opacity-60' : ''}`}
                >
                  {task.description}
                </p>
              )}
              
              <div className="text-xs text-content-tertiary">
                Criada em: {new Date(task.createdAt).toLocaleDateString('pt-BR')}
              </div>
            </div>
          )}
        </div>

        {/* Ações da tarefa */}
        {!isEditing && (
          <div className="flex gap-2">
            <Button
              onClick={() => setIsEditing(true)}
              variant="ghost"
              size="sm"
              className="p-2"
              aria-label="Editar tarefa"
            >
              <EditIcon className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleDelete}
              variant="ghost"
              size="sm"
              className="p-2 text-danger-600 hover:text-danger-700"
              aria-label="Excluir tarefa"
            >
              <DeleteIcon className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    completed: PropTypes.bool.isRequired,
    createdAt: PropTypes.string
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TaskItem;
