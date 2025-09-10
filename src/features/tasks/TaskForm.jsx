import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Label from '../../components/Label';
import Card from '../../components/Card';
import { SaveIcon, CancelIcon } from '../../components/Icons';
import { validateTask } from './taskUtils';

/**
 * Componente TaskForm - COM ESTADO
 * 
 * Demonstra os conceitos de:
 * - useState: controle do estado do formulário
 * - useRef: referência para focar elemento DOM
 * - useEffect: foco automático quando componente monta
 * - Formulário: formulário controlado com validação
 * - Componente com estado: gerencia dados de entrada
 * 
 * @param {Object} props - Propriedades do componente
 * @param {Function} props.onSubmit - Função chamada ao submeter formulário
 * @param {Function} props.onCancel - Função chamada ao cancelar (opcional)
 * @param {Object} props.initialData - Dados iniciais para edição (opcional)
 * @returns {JSX.Element} Formulário de tarefa
 */
function TaskForm({ onSubmit, onCancel, initialData = null }) {
  // useState: controla os dados do formulário
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || ''
  });

  // useState: controla estados de validação e UI
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useRef: referência para o campo de título para foco automático
  const titleInputRef = useRef(null);

  // useEffect: foca no campo de título quando componente monta
  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  /**
   * Manipula mudanças nos campos do formulário
   * Demonstra formulário controlado
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Remove erro do campo quando usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Manipula submissão do formulário
   * Demonstra validação e callback para componente pai
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Valida dados usando função utilitária
    const validation = validateTask(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await onSubmit(formData);
      
      // Limpa formulário após sucesso (se não for edição)
      if (!initialData) {
        setFormData({ title: '', description: '' });
        // Foca novamente no campo título usando useRef
        if (titleInputRef.current) {
          titleInputRef.current.focus();
        }
      }
    } catch {
      setErrors({ general: 'Erro ao salvar tarefa. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Manipula cancelamento da edição
   */
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title" required>
              Título da Tarefa
            </Label>
            <Input
              ref={titleInputRef} // useRef: referência para foco automático
              id="title"
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="Digite o título da tarefa"
              maxLength={100}
              error={errors.title}
              aria-describedby={errors.title ? "title-error" : undefined}
              aria-invalid={!!errors.title}
            />
            {errors.title && (
              <div id="title-error" className="text-sm text-danger-600 mt-1" role="alert">
                {errors.title}
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="description">
              Descrição (Opcional)
            </Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`input w-full ${errors.description ? 'input-error' : ''}`}
              placeholder="Adicione uma descrição..."
              rows={3}
              maxLength={500}
              aria-describedby={errors.description ? "description-error" : undefined}
              aria-invalid={!!errors.description}
            />
            {errors.description && (
              <div id="description-error" className="text-sm text-danger-600 mt-1" role="alert">
                {errors.description}
              </div>
            )}
          </div>

          {/* Erro geral */}
          {errors.general && (
            <div className="text-sm text-danger-600" role="alert" aria-live="polite">
              {errors.general}
            </div>
          )}

          {/* Botões de ação */}
          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              disabled={isSubmitting || !formData.title.trim()}
              className="flex-1 flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <SaveIcon className="w-4 h-4" />
                  <span>{getButtonText()}</span>
                </>
              )}
            </Button>
            
            {onCancel && (
              <Button
                type="button"
                variant="secondary"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="flex items-center space-x-2"
              >
                <CancelIcon className="w-4 h-4" />
                <span>Cancelar</span>
              </Button>
            )}
          </div>
        </div>
      </form>
    </Card>
  );

  /**
   * Função auxiliar para definir texto do botão
   */
  function getButtonText() {
    return initialData ? 'Atualizar Tarefa' : 'Criar Tarefa';
  }
}

TaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  initialData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string
  })
};

export default TaskForm;
