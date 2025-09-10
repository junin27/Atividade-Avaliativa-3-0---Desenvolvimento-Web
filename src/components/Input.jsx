import PropTypes from 'prop-types';
import { forwardRef } from 'react';

/**
 * Componente Input reutilizável - Design System
 * 
 * Demonstra os conceitos de:
 * - Design System: input padronizado com estados visuais
 * - Acessibilidade: labels, aria-attributes, foco visível
 * - Estados: normal, error, disabled
 * - Flexibilidade: suporte a diferentes tipos de input
 * 
 * @param {Object} props - Propriedades do input
 * @param {string} props.type - Tipo do input (text, email, password, etc.)
 * @param {string} props.placeholder - Texto de placeholder
 * @param {string} props.value - Valor do input
 * @param {Function} props.onChange - Função executada na mudança
 * @param {boolean} props.error - Se o input tem erro
 * @param {boolean} props.disabled - Se o input está desabilitado
 * @param {string} props.className - Classes CSS adicionais
 * @returns {JSX.Element} Elemento de input estilizado
 */
const Input = forwardRef(function Input({ 
  type = 'text',
  placeholder,
  value,
  onChange,
  error = false,
  disabled = false,
  className = '',
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  ...props 
}, ref) {
  // Classes base do design system
  const baseClasses = 'input';
  
  // Classes condicionais
  const conditionalClasses = error ? 'input-error' : '';
  
  // Combina todas as classes
  const combinedClasses = [
    baseClasses,
    conditionalClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={combinedClasses}
      aria-invalid={error || ariaInvalid ? 'true' : 'false'}
      aria-describedby={ariaDescribedBy}
      {...props}
    />
  );
});

// Validação de tipos - PropTypes ainda amplamente usado na comunidade React
Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  'aria-describedby': PropTypes.string,
  'aria-invalid': PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

Input.displayName = 'Input';

export default Input;
