import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../../hooks/useAuth';

/**
 * Componente ProtectedRoute - SEM ESTADO
 * 
 * Demonstra os conceitos de:
 * - Navegação autenticada: proteção de rotas baseada em autenticação
 * - useContext: acesso ao estado de autenticação
 * - Componente sem estado: lógica condicional para renderização
 * - Higher-Order Component: envolve outros componentes com funcionalidade
 * 
 * @param {Object} props - Propriedades do componente
 * @param {JSX.Element} props.children - Componentes filhos a serem protegidos
 * @returns {JSX.Element} Componente filho ou redirecionamento para login
 */
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Exibe loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Verificando autenticação...</div>
      </div>
    );
  }

  // Redireciona para login se não estiver autenticado
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Renderiza componente filho se autenticado
  return children;
}

// Validação de props
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
