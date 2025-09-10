import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Routes from './app/routes';
import './index.css';

/**
 * Componente principal da aplicação - SEM ESTADO
 * 
 * Demonstra os conceitos de:
 * - React: Componente funcional que organiza a estrutura da aplicação
 * - DOM: React gerencia o Virtual DOM para renderizar eficientemente
 * - Componente sem estado: apenas renderiza estrutura, não gerencia dados
 * 
 * @returns {JSX.Element} Estrutura principal da aplicação
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
