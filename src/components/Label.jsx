import PropTypes from 'prop-types';

/**
 * Componente Label reutilizável - Design System
 * 
 * Demonstra os conceitos de:
 * - Design System: label padronizado
 * - Acessibilidade: associação com inputs via htmlFor
 * - Estados visuais: normal, required
 * 
 * @param {Object} props - Propriedades do label
 * @param {React.ReactNode} props.children - Texto do label
 * @param {string} props.htmlFor - ID do input associado
 * @param {boolean} props.required - Se o campo é obrigatório
 * @param {string} props.className - Classes CSS adicionais
 * @returns {JSX.Element} Elemento de label estilizado
 */
function Label({ 
  children,
  htmlFor,
  required = false,
  className = '',
  ...props 
}) {
  // Classes base do design system
  const baseClasses = 'label';
  
  // Classes condicionais
  const conditionalClasses = required ? 'label-required' : '';
  
  // Combina todas as classes
  const combinedClasses = [
    baseClasses,
    conditionalClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <label
      htmlFor={htmlFor}
      className={combinedClasses}
      {...props}
    >
      {children}
    </label>
  );
}

Label.propTypes = {
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string
};

export default Label;
