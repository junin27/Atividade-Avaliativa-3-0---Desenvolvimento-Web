import PropTypes from 'prop-types';

/**
 * Componente Card reutilizável - Design System
 * 
 * Demonstra os conceitos de:
 * - Design System: container padronizado
 * - Estados visuais: normal, hover, interactive
 * - Flexibilidade: diferentes variantes
 * 
 * @param {Object} props - Propriedades do card
 * @param {React.ReactNode} props.children - Conteúdo do card
 * @param {string} props.variant - Variante visual (default, hover, interactive)
 * @param {React.ElementType} props.as - Elemento a ser renderizado
 * @param {string} props.className - Classes CSS adicionais
 * @returns {JSX.Element} Elemento de card estilizado
 */
function Card({ 
  children,
  variant = 'default',
  as = 'div',
  className = '',
  ...props 
}) {
  // Classes base do design system
  const baseClasses = 'card';
  
  // Variantes disponíveis
  const variantClasses = {
    default: '',
    hover: 'card-hover',
    interactive: 'card-interactive'
  };
  
  // Combina todas as classes
  const combinedClasses = [
    baseClasses,
    variantClasses[variant] || '',
    className
  ].filter(Boolean).join(' ');

  const Component = as;

  return (
    <Component
      className={combinedClasses}
      {...props}
    >
      {children}
    </Component>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'hover', 'interactive']),
  as: PropTypes.elementType,
  className: PropTypes.string
};

export default Card;
