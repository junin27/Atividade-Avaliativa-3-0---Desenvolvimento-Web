import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

/**
 * Hook customizado para usar o contexto de autenticação
 * Facilita o acesso ao contexto e garante que seja usado dentro do Provider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
