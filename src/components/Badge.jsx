import PropTypes from 'prop-types';

/**
 * Componente Badge reutilizável - Design System
 * 
 * Demonstra os conceitos de:
 * - Design System: indicadores visuais padronizados
 * - Estados: diferentes variantes para diferentes contextos
 * - Flexibilidade: tamanhos e cores variadas
 * 
 * @param {Object} props - Propriedades do badge
 * @param {React.ReactNode} props.children - Conteúdo do badge
 * @param {string} props.variant - Variante visual (default, success, warning, danger, info)
 * @param {string} props.size - Tamanho (sm, md, lg)
 * @param {string} props.className - Classes CSS adicionais
 * @returns {JSX.Element} Elemento de badge estilizado
 */
function Badge({ 
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props 
}) {
  // Classes base do design system
  const baseClasses = 'badge';
  
  // Variantes disponíveis
  const variantClasses = {
    default: 'badge-default',
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
    info: 'badge-info'
  };
  
  // Tamanhos disponíveis
  const sizeClasses = {
    sm: 'badge-sm',
    md: '',
    lg: 'badge-lg'
  };
  
  // Combina todas as classes
  const combinedClasses = [
    baseClasses,
    variantClasses[variant] || '',
    sizeClasses[size] || '',
    className
  ].filter(Boolean).join(' ');

  return (
    <span
      className={combinedClasses}
      {...props}
    >
      {children}
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'success', 'warning', 'danger', 'info']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string
};

export default Badge;
