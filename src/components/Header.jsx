import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { TodoIcon, LogoutIcon } from './Icons';
import Button from './Button';

/**
 * Componente Header - Design System
 * 
 * Demonstra os conceitos de:
 * - Componente sem estado: renderiza navegação baseada em props/context
 * - useContext: acessa dados de autenticação
 * - Navegação: links para diferentes rotas
 * - Dark Mode: toggle de tema com persistência
 * - DOM: elementos semânticos para acessibilidade
 * 
 * @returns {JSX.Element} Cabeçalho da aplicação com navegação
 */
function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Carrega o tema do localStorage ao montar o componente
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDarkMode(shouldBeDark);
    
    // Aplica o tema no documento
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  /**
   * Toggle do dark mode
   * Persiste a preferência no localStorage
   */
  const toggleDarkMode = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  /**
   * Função para lidar com logout
   * Demonstra manipulação de eventos
   */
  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Título da aplicação */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
              <TodoIcon className="w-7 h-7 text-white" />
              <h1 className="text-xl font-bold text-white">
                To Do App
              </h1>
            </Link>
          </div>

          {/* Navegação baseada no estado de autenticação */}
          <nav className="flex items-center space-x-4">
            {/* Toggle Dark Mode */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="p-2"
              aria-label={isDarkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
            >
              {isDarkMode ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </Button>

            {user ? (
              // Navegação para usuários autenticados
              <div className="flex items-center space-x-4">
                <span className="text-sm header-user-text">
                  Olá, {user.email}
                </span>
                <Link 
                  to="/tasks" 
                  className={`text-sm font-medium header-link ${
                    location.pathname === '/tasks' ? 'active' : ''
                  }`}
                >
                  Minhas Tarefas
                </Link>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-1"
                >
                  <LogoutIcon className="w-4 h-4" />
                  <span>Sair</span>
                </Button>
              </div>
            ) : (
              // Navegação para usuários não autenticados
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className={`text-sm font-medium header-link ${
                    location.pathname === '/login' ? 'active' : ''
                  }`}
                >
                  Entrar
                </Link>
                <Link 
                  to="/register" 
                  className={`text-sm font-medium header-link ${
                    location.pathname === '/register' ? 'active' : ''
                  }`}
                >
                  Cadastrar
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
