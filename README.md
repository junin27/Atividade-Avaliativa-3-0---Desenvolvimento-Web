# 📝 Todo App - Demonstração Completa React + JavaScript

Um aplicativo de lista de tarefas (To-Do) desenvolvido em **React + JavaScript + Tailwind CSS** que demonstra todos os principais conceitos do desenvolvimento front-end moderno de forma prática e educacional.

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js** versão 18+ (recomendado 20+)
- **npm** ou **yarn**

### Instalação e Execução
```bash
# 1. Clone o repositório (se aplicável) ou navegue até a pasta
cd todo-app

# 2. Instale as dependências
npm install

# 3. Execute em modo desenvolvimento
npm run dev

# 4. Abra no navegador
# O projeto estará disponível em http://localhost:5173
```

### Scripts Disponíveis
```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build de produção
npm run test         # Executa testes unitários
npm run lint         # Verifica código com ESLint
npm run format       # Formata código com Prettier
```

---

## 🎯 Conceitos Demonstrados

Este projeto foi desenvolvido especificamente para demonstrar os seguintes conceitos de forma prática:

### 1. **O que é Node.js**
**Node.js** é um ambiente de execução JavaScript construído no motor V8 do Chrome que permite executar JavaScript no servidor/desktop, fora do navegador.

**Por que foi usado neste projeto:**
- **Tooling**: Vite (build tool), ESLint (linting), Prettier (formatação)
- **Gerenciamento de pacotes**: npm para instalar React, Tailwind, React Router
- **Ambiente de desenvolvimento**: servidor de desenvolvimento com hot reload
- **Build**: empacotamento e otimização para produção

**Onde vemos Node em ação:**
- [`package.json`](./package.json): definição de dependências e scripts
- `npm install`: instalação de pacotes
- `npm run dev`: execução do servidor de desenvolvimento
- Build tools: Vite, PostCSS, Tailwind CSS

**Exemplo prático no código:**
```json
// package.json - linhas 6-14
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "test": "vitest",
  "preview": "vite preview"
}
```
[📁 Ver arquivo completo](./package.json)

### 2. **O que é React**
**React** é uma biblioteca JavaScript para construção de interfaces de usuário baseada em componentes reutilizáveis e estado reativo.

**Como foi aplicado neste projeto:**
- **SPA (Single Page Application)**: navegação sem recarregar página
- **Componentes**: estruturas reutilizáveis de UI (`Button`, `Header`, `TaskItem`)
- **Props**: passagem de dados entre componentes
- **Estado**: gerenciamento de dados dinâmicos com hooks
- **Eventos**: manipulação de interações do usuário

**Exemplos práticos no código:**

**1. Componente principal da aplicação:**
```javascript
// src/App.jsx - linhas 15-25
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
```
[📁 Ver arquivo completo](./src/App.jsx)

**2. Componente Button reutilizável:**
```javascript
// src/components/Button.jsx - linhas 25-45
function Button({ 
  as: Component = 'button',
  variant = 'primary', 
  size = 'md',
  children, 
  onClick,
  ...props 
}) {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary'
  };
  // ...
}
```
[📁 Ver arquivo completo](./src/components/Button.jsx)

### 3. **O que é DOM e Virtual DOM**
**DOM (Document Object Model)** é a representação em árvore dos elementos HTML de uma página web que o browser cria na memória.

**Como React gerencia o DOM:**
- **Virtual DOM**: React mantém uma representação virtual do DOM em memória
- **Diffing**: compara versões antigas e novas do Virtual DOM
- **Reconciliação**: atualiza apenas os elementos que mudaram no DOM real
- **Performance**: evita manipulações desnecessárias do DOM

**Vantagens demonstradas:**
- **Atualizações eficientes**: quando uma tarefa é marcada como concluída, apenas esse item é re-renderizado
- **Estado reativo**: mudanças no estado automaticamente atualizam a UI
- **Batch updates**: múltiplas mudanças são agrupadas em uma única atualização

### 4. **Componentes com Estado vs Sem Estado**

#### **Componentes SEM Estado** (Stateless/Presentational)
Recebem dados via props e apenas renderizam UI:

**1. Button - Componente de UI puro:**
```javascript
// src/components/Button.jsx - linhas 25-50
function Button({ 
  as: Component = 'button',
  variant = 'primary', 
  size = 'md',
  children, 
  onClick,
  ...props 
}) {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary'
  };
  return (
    <Component onClick={onClick} className={combinedClasses}>
      {children}
    </Component>
  );
}
```
[📁 Ver arquivo completo](./src/components/Button.jsx)

**2. App - Componente estrutural:**
```javascript
// src/App.jsx - linhas 15-25
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
```
[📁 Ver arquivo completo](./src/App.jsx)

**3. ProtectedRoute - HOC sem estado:**
```javascript
// src/features/auth/ProtectedRoute.jsx - linhas 15-30
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth(); // apenas consome dados
  
  if (loading) {
    return <div>Verificando autenticação...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children; // apenas renderiza
}
```
[📁 Ver arquivo completo](./src/features/auth/ProtectedRoute.jsx)

#### **Componentes COM Estado** (Stateful/Container)
Gerenciam dados e lógica de negócio:

**1. TasksPage - Página principal com múltiplos estados:**
```javascript
// src/features/tasks/TasksPage.jsx - linhas 35-45
function TasksPage() {
  const { user } = useAuth(); // useContext
  
  // useState: controle do estado das tarefas
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  // useRef: referência para o campo de busca
  const searchInputRef = useRef(null);
  
  // Lógica de negócio
  const handleAddTask = (taskData) => {
    const newTask = createTask(taskData.title, taskData.description);
    setTasks(prevTasks => [...prevTasks, newTask]);
  };
}
```
[📁 Ver arquivo completo](./src/features/tasks/TasksPage.jsx)

**2. TaskForm - Formulário controlado:**
```javascript
// src/features/tasks/TaskForm.jsx - linhas 25-40
function TaskForm({ onSubmit, onCancel, initialData = null }) {
  // useState: controla os dados do formulário
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // useRef: referência para foco automático
  const titleInputRef = useRef(null);
}
```
[📁 Ver arquivo completo](./src/features/tasks/TaskForm.jsx)

**3. LoginPage - Autenticação com estado:**
```javascript
// src/features/auth/LoginPage.jsx - linhas 20-35
function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // useState: controla os dados do formulário
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
}
```
[📁 Ver arquivo completo](./src/features/auth/LoginPage.jsx)

### 5. **Listas em React**
Renderização de arrays de dados com performance otimizada:

**Implementação no TasksPage:**
```javascript
// src/features/tasks/TasksPage.jsx - linhas 275-285
{filteredTasks.length > 0 ? (
  // Lista de tarefas quando há itens
  filteredTasks.map(task => (
    <TaskItem
      key={task.id} // Chave única e estável para performance
      task={task}
      onToggle={handleToggleTask}
      onEdit={handleEditTask}
      onDelete={handleDeleteTask}
    />
  ))
) : (
  // Estado vazio quando não há tarefas
  <EmptyState
    title={getEmptyStateTitle(searchTerm, filter)}
    description={getEmptyStateDescription(searchTerm, tasks)}
  />
)}
```
[📁 Ver arquivo completo](./src/features/tasks/TasksPage.jsx#L275-L285)

**Filtragem otimizada com useMemo:**
```javascript
// src/features/tasks/TasksPage.jsx - linhas 85-90
// useMemo: otimização de performance para lista filtrada
const filteredTasks = useMemo(() => {
  return filterTasks(tasks, filter, searchTerm);
}, [tasks, filter, searchTerm]);
```
[📁 Ver arquivo completo](./src/features/tasks/TasksPage.jsx#L85-L90)

**Conceitos aplicados:**
- **Keys únicas**: `key={task.id}` para otimização de re-renderização
- **Mapeamento**: transformação de dados em elementos JSX
- **Filtragem**: `filteredTasks` baseado em critérios dinâmicos
- **Performance**: React reutiliza elementos com keys estáveis
- **useMemo**: evita recálculo desnecessário da lista filtrada

### 6. **Formulários Controlados**
Inputs sincronizados com estado React:

**1. Formulário de Login:**
```javascript
// src/features/auth/LoginPage.jsx - linhas 25-45
const [formData, setFormData] = useState({
  email: '',
  password: ''
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
  // Limpa erro quando usuário começa a digitar
  if (error) setError('');
};

<Input
  name="email"
  type="email"
  value={formData.email} // controlado pelo estado
  onChange={handleChange} // atualiza estado
  required
/>
```
[📁 Ver arquivo completo](./src/features/auth/LoginPage.jsx#L25-L45)

**2. Formulário de Tarefa com validação:**
```javascript
// src/features/tasks/TaskForm.jsx - linhas 50-70
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

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Valida dados usando função utilitária
  const validation = validateTask(formData);
  if (!validation.isValid) {
    setErrors(validation.errors);
    return;
  }
};
```
[📁 Ver arquivo completo](./src/features/tasks/TaskForm.jsx#L50-L70)

**Características demonstradas:**
- **Single source of truth**: estado como única fonte de dados
- **Validação em tempo real**: feedback imediato
- **Prevenção de submissão inválida**: botões desabilitados
- **Acessibilidade**: labels, aria-* attributes
- **Limpeza de erros**: remove erros quando usuário digita

### 7. **Navegação Autenticada**
Sistema de rotas protegidas com React Router:

**1. Configuração de rotas:**
```javascript
// src/app/routes.jsx - linhas 30-65
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
  </RouterRoutes>
);
```
[📁 Ver arquivo completo](./src/app/routes.jsx#L30-L65)

**2. Componente ProtectedRoute:**
```javascript
// src/features/auth/ProtectedRoute.jsx - linhas 15-35
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth(); // verifica contexto
  
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
```
[📁 Ver arquivo completo](./src/features/auth/ProtectedRoute.jsx#L15-L35)

**3. Context de autenticação:**
```javascript
// src/context/AuthContext.jsx - linhas 25-35
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
```
[📁 Ver arquivo completo](./src/context/AuthContext.jsx#L25-L35)

**Funcionalidades implementadas:**
- **Rotas públicas**: `/login`, `/register` (apenas não autenticados)
- **Rotas protegidas**: `/tasks` (apenas autenticados)
- **Redirecionamentos automáticos**: baseados no estado de autenticação
- **Persistência**: sessão mantida no localStorage
- **Loading states**: feedback visual durante verificação

### 8. **Os 5 Hooks Obrigatórios**

#### **useState** - Estado Local

**1. TasksPage - Múltiplos estados:**
```javascript
// src/features/tasks/TasksPage.jsx - linhas 37-42
const [tasks, setTasks] = useState([]); // lista de tarefas
const [filter, setFilter] = useState('all'); // filtro ativo
const [searchTerm, setSearchTerm] = useState(''); // termo de busca
const [isFormVisible, setIsFormVisible] = useState(false); // controle do formulário
```
[📁 Ver arquivo completo](./src/features/tasks/TasksPage.jsx#L37-L42)

**2. LoginPage - Estado de formulário:**
```javascript
// src/features/auth/LoginPage.jsx - linhas 25-30
const [formData, setFormData] = useState({
  email: '',
  password: ''
});
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);
```
[📁 Ver arquivo completo](./src/features/auth/LoginPage.jsx#L25-L30)

**3. TaskForm - Estado com validação:**
```javascript
// src/features/tasks/TaskForm.jsx - linhas 27-35
const [formData, setFormData] = useState({
  title: initialData?.title || '',
  description: initialData?.description || ''
});
const [errors, setErrors] = useState({});
const [isSubmitting, setIsSubmitting] = useState(false);
```
[📁 Ver arquivo completo](./src/features/tasks/TaskForm.jsx#L27-L35)

#### **useEffect** - Efeitos Colaterais

**1. TasksPage - Carregamento e salvamento:**
```javascript
// src/features/tasks/TasksPage.jsx - linhas 45-55
// Carrega tarefas do localStorage na montagem
useEffect(() => {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    try {
      setTasks(JSON.parse(savedTasks));
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }
  }
}, []); // executa apenas na montagem

// Salva tarefas no localStorage quando a lista muda
useEffect(() => {
  if (tasks.length > 0) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}, [tasks]); // executa quando tasks muda
```
[📁 Ver arquivo completo](./src/features/tasks/TasksPage.jsx#L45-L55)

**2. AuthContext - Autenticação persistente:**
```javascript
// src/context/AuthContext.jsx - linhas 30-40
// Carrega dados de autenticação do localStorage
useEffect(() => {
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    try {
      setUser(JSON.parse(savedUser));
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    }
  }
  setLoading(false);
}, []); // executa apenas na montagem
```
[📁 Ver arquivo completo](./src/context/AuthContext.jsx#L30-L40)

**3. TaskForm - Foco automático:**
```javascript
// src/features/tasks/TaskForm.jsx - linhas 40-45
// Foca no campo de título quando o formulário é montado
useEffect(() => {
  if (titleRef.current) {
    titleRef.current.focus();
  }
}, []); // executa apenas na montagem
```
[📁 Ver arquivo completo](./src/features/tasks/TaskForm.jsx#L40-L45)

#### **useContext** - Compartilhamento de Estado

**1. Criação do Context e hook customizado:**
```javascript
// src/context/AuthContext.jsx - linhas 10-20
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};
```
[📁 Ver arquivo completo](./src/context/AuthContext.jsx#L10-L20)

**2. TasksPage - Acesso ao contexto:**
```javascript
// src/features/tasks/TasksPage.jsx - linhas 35-40
function TasksPage() {
  const { user } = useAuth(); // acessa contexto de autenticação
  
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  // ...
}
```
[📁 Ver arquivo completo](./src/features/tasks/TasksPage.jsx#L35-L40)

**3. LoginPage - Uso das funções do contexto:**
```javascript
// src/features/auth/LoginPage.jsx - linhas 20-30
function LoginPage() {
  const { login } = useAuth(); // acessa função de login
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate('/tasks');
    } catch (error) {
      setError(error.message);
    }
  };
}
```
[📁 Ver arquivo completo](./src/features/auth/LoginPage.jsx#L20-L30)

**4. ProtectedRoute - Verificação de autenticação:**
```javascript
// src/features/auth/ProtectedRoute.jsx - linhas 15-25
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth(); // verifica estado de autenticação
  
  if (loading) {
    return <div>Verificando autenticação...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}
```
[📁 Ver arquivo completo](./src/features/auth/ProtectedRoute.jsx#L15-L25)

#### **useRef** - Referências DOM

**1. TaskForm - Foco automático em campos:**
```javascript
// src/features/tasks/TaskForm.jsx - linhas 30-35
const titleRef = useRef(null);
const descriptionRef = useRef(null);

// Foca automaticamente no campo título quando o formulário é montado
useEffect(() => {
  if (titleRef.current) {
    titleRef.current.focus();
  }
}, []);
```
[📁 Ver arquivo completo](./src/features/tasks/TaskForm.jsx#L30-L35)

**2. TaskForm - Aplicação da ref no JSX:**
```javascript
// src/features/tasks/TaskForm.jsx - linhas 80-95
<input
  ref={titleRef}
  type="text"
  value={formData.title}
  onChange={(e) => setFormData({...formData, title: e.target.value})}
  placeholder="Título da tarefa"
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  required
/>

<textarea
  ref={descriptionRef}
  value={formData.description}
  onChange={(e) => setFormData({...formData, description: e.target.value})}
  placeholder="Descrição da tarefa (opcional)"
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  rows={3}
/>
```
[📁 Ver arquivo completo](./src/features/tasks/TaskForm.jsx#L80-L95)

**3. TasksPage - Ref para campo de busca:**
```javascript
// src/features/tasks/TasksPage.jsx - linhas 40-45
const searchRef = useRef(null);

// Função para limpar busca e focar no campo
const clearSearch = () => {
  setSearchTerm('');
  if (searchRef.current) {
    searchRef.current.focus();
  }
};
```
[📁 Ver arquivo completo](./src/features/tasks/TasksPage.jsx#L40-L45)

#### **useMemo** - Memoização e Performance

**1. TasksPage - Filtragem otimizada de tarefas:**
```javascript
// src/features/tasks/TasksPage.jsx - linhas 85-100
const filteredTasks = useMemo(() => {
  return tasks.filter(task => {
    // Filtro por status (all, completed, pending)
    const matchesFilter = filter === 'all' || 
                         (filter === 'completed' && task.completed) ||
                         (filter === 'pending' && !task.completed);
    
    // Filtro por termo de busca no título e descrição
    const matchesSearch = searchTerm === '' || 
                         task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });
}, [tasks, filter, searchTerm]); // recalcula apenas quando dependências mudam
```
[📁 Ver arquivo completo](./src/features/tasks/TasksPage.jsx#L85-L100)

**2. TasksPage - Estatísticas calculadas:**
```javascript
// src/features/tasks/TasksPage.jsx - linhas 102-115
const taskStats = useMemo(() => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return {
    total,
    completed,
    pending,
    completionRate
  };
}, [tasks]); // otimiza cálculo de estatísticas complexas
```
[📁 Ver arquivo completo](./src/features/tasks/TasksPage.jsx#L102-L115)

**3. AuthContext - Valor do contexto memoizado:**
```javascript
// src/context/AuthContext.jsx - linhas 70-80
const value = useMemo(() => ({
  user,
  loading,
  login,
  logout,
  register
}), [user, loading]); // evita re-renderizações desnecessárias dos consumidores

return (
  <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
);
```
[📁 Ver arquivo completo](./src/context/AuthContext.jsx#L70-L80)

**Benefícios de performance:**
- Evita recálculos desnecessários em cada render
- Melhora performance com listas grandes
- Reduz trabalho computacional
- Previne re-renderizações em cascata nos consumidores de contexto

---

## 📁 Estrutura do Projeto

```
src/
├── app/
│   └── routes.jsx              # Configuração de rotas da aplicação
├── components/                 # Componentes reutilizáveis SEM ESTADO
│   ├── Button.jsx             # Botão reutilizável com variantes
│   ├── Header.jsx             # Cabeçalho com navegação
│   └── EmptyState.jsx         # Estado vazio para listas
├── context/                   # Contextos React
│   └── AuthContext.jsx        # Contexto de autenticação (useContext)
├── features/                  # Funcionalidades organizadas por domínio
│   ├── auth/                  # Módulo de autenticação
│   │   ├── LoginPage.jsx      # Página de login (COM ESTADO)
│   │   ├── RegisterPage.jsx   # Página de registro (COM ESTADO)
│   │   └── ProtectedRoute.jsx # HOC para rotas protegidas
│   └── tasks/                 # Módulo de tarefas
│       ├── TasksPage.jsx      # Página principal (COM ESTADO)
│       ├── TaskForm.jsx       # Formulário de tarefa (COM ESTADO)
│       ├── TaskItem.jsx       # Item de tarefa (HÍBRIDO)
│       └── taskUtils.js       # Funções utilitárias (testadas)
├── styles/
│   └── index.css             # Estilos Tailwind + customizações
├── App.jsx                   # Componente raiz SEM ESTADO
└── main.jsx                  # Ponto de entrada da aplicação

tests/
└── taskUtils.test.js         # Testes unitários com Vitest

Arquivos de configuração:
├── package.json              # Dependências e scripts
├── vite.config.js           # Configuração do Vite
├── vitest.config.js         # Configuração de testes
├── tailwind.config.js       # Configuração do Tailwind
├── postcss.config.js        # Configuração do PostCSS
├── .prettierrc              # Configuração do Prettier
└── README.md                # Este arquivo
```

### **Descrição dos Diretórios:**

- **`/app`**: Configurações centrais da aplicação (rotas, providers)
- **`/components`**: Componentes UI reutilizáveis e sem estado
- **`/context`**: Contextos React para compartilhamento de estado global
- **`/features`**: Funcionalidades organizadas por domínio de negócio
- **`/tests`**: Testes unitários e de integração

---

## 🛠️ Decisões Técnicas

### **Por que Vite?**
- **Performance**: build e hot reload ultra-rápidos
- **Simplicidade**: configuração mínima out-of-the-box
- **ES Modules**: suporte nativo sem bundling em desenvolvimento
- **Ecosistema**: excelente integração com React e Tailwind

### **Por que Tailwind CSS?**
- **Utility-first**: desenvolvimento rápido com classes utilitárias
- **Consistência**: design system integrado
- **Performance**: apenas CSS usado é incluído no build
- **Responsividade**: modificadores nativos para diferentes telas

### **Por que Context API em vez de Redux?**
- **Simplicidade**: menos boilerplate para aplicação pequena/média
- **Nativo**: parte do React, sem dependências externas
- **Suficiente**: atende necessidades de compartilhamento de estado
- **Didático**: demonstra conceitos fundamentais do React

### **Limitações da Autenticação Fake:**
- **localStorage**: dados perdidos ao limpar navegador
- **Sem criptografia**: senhas armazenadas em texto plano
- **Sem sessão**: sem timeout ou renovação automática
- **Sem backend**: validação apenas no front-end

**Justificativa:** Foco educacional nos conceitos React sem complexidade de backend.

---

## ♿ Acessibilidade Implementada

### **Semântica HTML:**
- Headers `<h1>`, `<h2>`, `<h3>` em hierarquia correta
- Elementos `<main>`, `<nav>`, `<header>` para estrutura
- Botões `<button>` vs links `<a>` utilizados adequadamente
- Labels `<label>` associadas a todos os inputs

### **ARIA Attributes:**
```javascript
// Formulários
<input aria-describedby="error-message" aria-invalid={!!error} />
<div id="error-message" role="alert">{error}</div>

// Estados dinâmicos
<div role="status" aria-live="polite">Carregando...</div>

// Botões descritivos
<button aria-label="Excluir tarefa">🗑️</button>
```

### **Foco e Navegação:**
- **useRef** para foco automático em campos importantes
- **Tab navigation** em ordem lógica
- **Focus visible** para navegação por teclado
- **Enter** funciona para submissão de formulários

### **Contraste e Legibilidade:**
- Cores com contraste adequado (WCAG AA)
- Texto legível em diferentes tamanhos
- Estados hover/focus visualmente distintos

---

## 🧪 Como Testar

### **Executar Testes:**
```bash
npm run test        # Executa todos os testes
npm run test:ui     # Interface visual dos testes  
npm run test:coverage # Relatório de cobertura
```

### **Exemplo de Teste Unitário:**
```javascript
// tests/taskUtils.test.js
import { filterTasks } from '../src/features/tasks/taskUtils.js';

describe('filterTasks', () => {
  it('deve filtrar tarefas por termo de busca', () => {
    const tasks = [
      { title: 'Comprar leite', completed: false },
      { title: 'Estudar React', completed: true }
    ];
    
    const result = filterTasks(tasks, 'all', 'Comprar');
    
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Comprar leite');
  });
});
```

### **Testando Manualmente:**

1. **Registro de Usuário:**
   - Cadastre com email válido e senha 6+ caracteres
   - Teste validações (senhas não coincidem, campo vazio)

2. **Login/Logout:**
   - Entre com credenciais cadastradas
   - Teste redirecionamentos automáticos
   - Faça logout e verifique limpeza de sessão

3. **CRUD de Tarefas:**
   - Crie tarefa com título obrigatório
   - Edite título e descrição inline
   - Marque como concluída/pendente
   - Exclua com confirmação

4. **Filtros e Busca:**
   - Teste filtros: Todas, Pendentes, Concluídas
   - Busque por texto no título e descrição
   - Combine filtros com busca

5. **Persistência:**
   - Atualize a página e verifique dados mantidos
   - Abra nova aba e verifique sessão
   - Limpe localStorage e teste estado inicial

---

## 🚀 Possíveis Extensões

### **Funcionalidades:**
- **Drag & Drop**: reordenação de tarefas
- **Categorias/Tags**: organização por projetos
- **Datas**: prazos e lembretes
- **Compartilhamento**: tarefas colaborativas
- **Busca avançada**: filtros complexos

### **Técnicas:**
- **Backend real**: API REST com autenticação JWT
- **Estado global**: Redux Toolkit ou Zustand
- **Offline-first**: Service Workers e Cache API
- **Real-time**: WebSockets para sincronização
- **Mobile**: React Native ou PWA

### **Performance:**
- **Code splitting**: carregamento sob demanda
- **Virtual scrolling**: listas grandes otimizadas
- **Image optimization**: avatars e anexos
- **Bundle analysis**: otimização de tamanho

### **Testes:**
- **Testes E2E**: Cypress ou Playwright
- **Visual regression**: Chromatic ou Percy
- **Acessibilidade**: axe-core automatizado
- **Performance**: Lighthouse CI

---

## 🎓 Conceitos Avançados Demonstrados

### **Patterns de Componentes:**
- **Container vs Presentational**: separação de responsabilidades
- **Higher-Order Components**: `ProtectedRoute`
- **Render Props**: (pode ser expandido)
- **Compound Components**: (pode ser expandido)

### **Performance:**
- **Memoização**: `useMemo` para cálculos custosos
- **Referências estáveis**: `useRef` para DOM
- **Keys otimizadas**: IDs únicos para listas
- **Bundle splitting**: imports dinâmicos (pode ser expandido)

### **Estado e Side Effects:**
- **Local vs Global state**: quando usar cada um
- **Effect cleanup**: prevenção de memory leaks
- **Effect dependencies**: otimização de execução
- **Custom hooks**: (pode ser expandido)

---

## 📚 Recursos de Aprendizado

### **Documentação Oficial:**
- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/)

### **Conceitos Fundamentais:**
- [Virtual DOM](https://react.dev/learn/preserving-and-resetting-state)
- [Hooks Rules](https://react.dev/reference/rules/rules-of-hooks)
- [State Management](https://react.dev/learn/managing-state)
- [Effect Dependencies](https://react.dev/learn/lifecycle-of-reactive-effects)

### **Boas Práticas:**
- [React Beta Docs](https://react.dev/learn)
- [JavaScript Info](https://javascript.info/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Web Content Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 🏁 Conclusão

Este projeto demonstra de forma prática e completa os principais conceitos do desenvolvimento React moderno:

✅ **Node.js** como ambiente de desenvolvimento e tooling  
✅ **React** como biblioteca de componentes reativos  
✅ **DOM/Virtual DOM** e otimizações de rendering  
✅ **Componentes com e sem estado** com exemplos claros  
✅ **Listas** com keys otimizadas e performance  
✅ **Formulários** controlados com validação  
✅ **Navegação autenticada** com rotas protegidas  
✅ **5 Hooks obrigatórios** com casos de uso práticos  

O código está organizado, comentado e pronto para defesa oral, servindo como referência completa para os conceitos fundamentais do React e desenvolvimento web moderno.

---

**Desenvolvido para fins educacionais - Todo App 2024**
