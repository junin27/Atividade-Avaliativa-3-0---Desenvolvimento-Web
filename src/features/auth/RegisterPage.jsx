import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Label from '../../components/Label';
import Card from '../../components/Card';

/**
 * Componente RegisterPage - COM ESTADO
 * 
 * Demonstra os conceitos de:
 * - useState: controle do estado do formulário de registro
 * - Formulário: validação mais complexa com confirmação de senha
 * - Componente com estado: gerencia múltiplos campos e validações
 * 
 * @returns {JSX.Element} Página de registro com formulário
 */
function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  // useState: controla os dados do formulário de registro
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  // useState: controla estados de UI e validação
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /**
   * Manipula mudanças nos campos do formulário
   * Demonstra formulário controlado com validação em tempo real
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Remove erro do campo quando usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Valida formulário em tempo real
   * Demonstra validação de formulário e lógica de negócio
   */
  const validateForm = () => {
    const newErrors = {};

    // Validação de email
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    // Validação de senha
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    // Validação de confirmação de senha
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Manipula submissão do formulário de registro
   * Demonstra validação completa e manipulação de erros
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Simula delay de rede
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const result = register(
        formData.email, 
        formData.password, 
        formData.confirmPassword
      );
      
      if (result.success) {
        navigate('/tasks');
      } else {
        setErrors({ general: result.error });
      }
    } catch {
      setErrors({ general: 'Erro inesperado. Tente novamente.' });
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
                Criar nova conta
              </h1>
              <p className="text-muted-foreground">
                Cadastre-se para começar a organizar suas tarefas
              </p>
            </div>

            {/* Formulário controlado com validação */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" required>
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
                  error={errors.email}
                />
              </div>

              <div>
                <Label htmlFor="password" required>
                  Senha
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Mínimo 6 caracteres"
                  error={errors.password}
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" required>
                  Confirmar Senha
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Digite a senha novamente"
                  error={errors.confirmPassword}
                />
              </div>

              {/* Erro geral */}
              {errors.general && (
                <div 
                  className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-3"
                  role="alert" 
                  aria-live="polite"
                >
                  {errors.general}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Cadastrando...' : 'Criar Conta'}
              </Button>
            </form>

            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground">
                Já tem uma conta?{' '}
                <Link 
                  to="/login" 
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Entrar
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default RegisterPage;
