import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Label from '../../components/Label';
import Card from '../../components/Card';

/**
 * Componente LoginPage - COM ESTADO
 * 
 * Demonstra os conceitos de:
 * - useState: controle do estado do formulário
 * - Formulário: formulário controlado com validação
 * - Componente com estado: gerencia dados de entrada do usuário
 * - Manipulação de eventos: onChange e onSubmit
 * 
 * @returns {JSX.Element} Página de login com formulário
 */
function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // useState: controla os dados do formulário
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // useState: controla estados de UI
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Manipula mudanças nos campos do formulário
   * Demonstra formulário controlado e manipulação de eventos
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpa erro quando usuário começa a digitar
    if (error) setError('');
  };

  /**
   * Manipula submissão do formulário
   * Demonstra validação e chamada de API (simulada)
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.email || !formData.password) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simula delay de rede
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const result = login(formData.email, formData.password);
      
      if (result.success) {
        navigate('/tasks');
      } else {
        setError(result.error);
      }
    } catch {
      setError('Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <Card className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Entrar na sua conta
              </h1>
              <p className="text-muted-foreground">
                Acesse suas tarefas e mantenha-se organizado
              </p>
            </div>

            {/* Formulário controlado */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  error={error}
                />
              </div>

              <div>
                <Label htmlFor="password">
                  Senha
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Sua senha"
                  error={error}
                />
              </div>

              {/* Exibição de erro */}
              {error && (
                <div 
                  className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-3"
                  role="alert"
                  aria-live="polite"
                >
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground">
                Não tem uma conta?{' '}
                <Link 
                  to="/register" 
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Cadastre-se
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
