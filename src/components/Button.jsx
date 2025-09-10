import PropTypes from 'prop-types';

/**
 * Componente Button reutilizável - Design System
 * 
 * Demonstra os conceitos de:
 * - Design System: componente base com variantes e tamanhos
 * - Acessibilidade: suporte completo a teclado e leitores de tela
 * - Estados visuais: hover, focus, active, disabled
 * - Flexibilidade: pode renderizar como button, link ou custom element
 * 
 * @param {Object} props - Propriedades do botão
 * @param {React.ElementType} props.as - Elemento a ser renderizado (button, 'a', etc.)
 * @param {string} props.variant - Variante visual (primary, secondary, ghost, danger)
 * @param {string} props.size - Tamanho (sm, md, lg)
 * @param {React.ReactNode} props.children - Conteúdo do botão
 * @param {string} props.className - Classes CSS adicionais
 * @param {boolean} props.disabled - Se o botão está desabilitado
 * @param {Function} props.onClick - Função executada no clique
 * @returns {JSX.Element} Elemento de botão estilizado
 */
function Button({ 
  as: Component = 'button',
  variant = 'primary', 
  size = 'md',
  children, 
  className = '',
  disabled = false,
  onClick,
  ...props 
}) {
  // Classes base do design system
  const baseClasses = 'btn';
  
  // Variantes de estilo
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary', 
    ghost: 'btn-ghost',
    danger: 'btn-danger'
  };
  
  // Tamanhos disponíveis
  const sizeClasses = {
    sm: 'btn-sm',
    md: '', // tamanho padrão já está no .btn
    lg: 'btn-lg'
  };

  // Combina todas as classes
  const combinedClasses = [
    baseClasses,
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size] || '',
    className
  ].filter(Boolean).join(' ');

  // Props específicas para diferentes elementos
  const elementProps = {
    className: combinedClasses,
    disabled: disabled,
    onClick: onClick,
    'aria-disabled': disabled ? 'true' : undefined,
    ...props
  };

  // Remove disabled para elementos que não suportam (como links)
  if (Component !== 'button' && Component !== 'input') {
    delete elementProps.disabled;
  }

  return (
    <Component {...elementProps}>
      {children}
    </Component>
  );
}

Button.propTypes = {
  as: PropTypes.elementType,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

export default Button;
