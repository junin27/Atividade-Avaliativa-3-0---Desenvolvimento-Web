import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginPage from '../features/auth/LoginPage';
import RegisterPage from '../features/auth/RegisterPage';
import TasksPage from '../features/tasks/TasksPage';
import ProtectedRoute from '../features/auth/ProtectedRoute';

/**
 * Componente de roteamento da aplicação - SEM ESTADO
 * 
 * Demonstra os conceitos de:
 * - Navegação autenticada: rotas protegidas que exigem login
 * - React Router: sistema de navegação SPA (Single Page Application)
 * - Componente sem estado: apenas define estrutura de rotas
 * 
 * @returns {JSX.Element} Sistema de rotas da aplicação
 */
function Routes() {
  const { user, loading } = useAuth();

  // Exibe loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Carregando...</div>
      </div>
    );
  }

  return (
    <RouterRoutes>
      {/* Rota raiz - redireciona baseado na autenticação */}
      <Route 
        path="/" 
        element={
          user ? <Navigate to="/tasks" replace /> : <Navigate to="/login" replace />
        } 
      />
      
      {/* Rotas públicas - apenas para usuários não autenticados */}
      <Route 
        path="/login" 
        element={!user ? <LoginPage /> : <Navigate to="/tasks" replace />} 
      />
      <Route 
        path="/register" 
        element={!user ? <RegisterPage /> : <Navigate to="/tasks" replace />} 
      />
      
      {/* Rotas protegidas - apenas para usuários autenticados */}
      <Route 
        path="/tasks" 
        element={
          <ProtectedRoute>
            <TasksPage />
          </ProtectedRoute>
        } 
      />
      
      {/* Rota catch-all para URLs inválidas */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </RouterRoutes>
  );
}

export default Routes;
