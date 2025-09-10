import { createContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

/**
 * Context para gerenciamento de autenticação
 * 
 * Demonstra os conceitos de:
 * - useContext: compartilhamento de estado entre componentes
 * - useState: controle do estado de autenticação
 * - useEffect: sincronização com localStorage para persistência
 */
const AuthContext = createContext();

/**
 * Provider do contexto de autenticação - COMPONENTE COM ESTADO
 * 
 * Demonstra:
 * - useState: gerencia estado do usuário logado
 * - useEffect: carrega dados do localStorage na inicialização
 * - useContext: fornece dados para toda a árvore de componentes
 * - useMemo: otimiza o valor do contexto
 */
export const AuthProvider = ({ children }) => {
  // useState: controla se há usuário logado
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect: carrega dados de autenticação do localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  /**
   * Função de login - autentica com dados fake salvos no localStorage
   * Demonstra formulário controlado e validação
   */
  const login = (email, password) => {
    // Busca usuários cadastrados no localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = { email: foundUser.email, id: foundUser.id };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    }
    
    return { success: false, error: 'Email ou senha inválidos' };
  };

  /**
   * Função de registro - salva novo usuário no localStorage
   * Demonstra validação de formulário e manipulação de dados
   */
  const register = (email, password, confirmPassword) => {
    // Validações básicas
    if (!email || !password || !confirmPassword) {
      return { success: false, error: 'Todos os campos são obrigatórios' };
    }
    
    if (password.length < 6) {
      return { success: false, error: 'A senha deve ter pelo menos 6 caracteres' };
    }
    
    if (password !== confirmPassword) {
      return { success: false, error: 'As senhas não coincidem' };
    }

    // Verifica se email já está cadastrado
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email já cadastrado' };
    }

    // Cria novo usuário
    const newUser = {
      id: Date.now().toString(),
      email,
      password
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Faz login automaticamente após registro
    const userData = { email: newUser.email, id: newUser.id };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    return { success: true };
  };

  /**
   * Função de logout - remove dados de autenticação
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // useMemo: otimiza o valor do contexto para evitar re-renders desnecessários
  const value = useMemo(() => ({
    user,
    login,
    register,
    logout,
    loading
  }), [user, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Validação de props
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
