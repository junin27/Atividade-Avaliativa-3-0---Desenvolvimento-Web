import PropTypes from 'prop-types';
import Card from './Card';
import { EmptyStateIcon } from './Icons';

/**
 * Componente EmptyState - Design System
 * 
 * Demonstra os conceitos de:
 * - Componente sem estado: renderiza UI pura baseada em props
 * - Reutilização: pode ser usado para diferentes estados vazios
 * - Props: recebe dados do componente pai
 * - Acessibilidade: aria-label para leitores de tela
 * - Design System: usa Card para consistência visual
 * 
 * @param {Object} props - Propriedades do componente
 * @param {string} props.title - Título principal
 * @param {string} props.description - Descrição do estado
 * @param {JSX.Element} props.action - Botão ou ação opcional
 * @returns {JSX.Element} Componente de estado vazio
 */
function EmptyState({ 
  title = 'Nenhum item encontrado', 
  description = 'Não há itens para exibir no momento.', 
  action = null 
}) {
  return (
    <Card className="text-center py-12">
      <div 
        className="flex justify-center mb-6 opacity-40"
        aria-hidden="true"
      >
        <EmptyStateIcon className="w-16 h-16 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-content-primary mb-3">
        {title}
      </h3>
      <p className="text-content-secondary mb-8 max-w-md mx-auto leading-relaxed">
        {description}
      </p>
      {action && (
        <div className="flex justify-center">
          {action}
        </div>
      )}
    </Card>
  );
}

EmptyState.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  action: PropTypes.node
};

export default EmptyState;
