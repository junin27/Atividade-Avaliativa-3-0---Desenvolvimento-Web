# 📝 To-Do App - Demonstração Completa React + JavaScript

Um aplicativo de lista de tarefas (To-Do) desenvolvido em **React + JavaScript + Tailwind CSS** que demonstra todos os principais conceitos do desenvolvimento front-end moderno de forma prática e educacional.

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js** versão 18+ (recomendado 20+)
- **npm** ou **yarn**

### Instalação e Execução
```bash
# 1. Clone o repositório
git clone https://github.com/junin27/Atividade-Avaliativa-3-0---Desenvolvimento-Web.git
cd Atividade-Avaliativa-3-0---Desenvolvimento-Web

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
- `package.json`: definição de dependências e scripts
- `npm install`: instalação de pacotes
- `npm run dev`: execução do servidor de desenvolvimento
- Build tools: Vite, PostCSS, Tailwind CSS

### 2. **O que é React**
**React** é uma biblioteca JavaScript para construção de interfaces de usuário baseada em componentes reutilizáveis e estado reativo.

**Como foi aplicado neste projeto:**
- **SPA (Single Page Application)**: navegação sem recarregar página
- **Componentes**: estruturas reutilizáveis de UI (`Button`, `Header`, `TaskItem`)
- **Props**: passagem de dados entre componentes
- **Estado**: gerenciamento de dados dinâmicos com hooks
- **Eventos**: manipulação de interações do usuário

**Exemplos práticos:**
```javascript
// Componente funcional React
function Button({ children, onClick, variant = 'primary' }) {
  return (
    <button onClick={onClick} className={variantClasses[variant]}>
      {children}
    </button>
  );
}

// Uso em JSX
<Button onClick={handleSubmit} variant="primary">
  Salvar
</Button>
```

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

```javascript
// components/Button.jsx - SEM ESTADO
function Button({ children, onClick, variant }) {
  return (
    <button onClick={onClick} className={getVariantClass(variant)}>
      {children}
    </button>
  );
}

// components/Header.jsx - SEM ESTADO  
function Header() {
  const { user, logout } = useAuth(); // apenas consome dados
  return <nav>...</nav>; // apenas renderiza
}

// components/EmptyState.jsx - SEM ESTADO
function EmptyState({ title, description, icon }) {
  return <div>...</div>; // apenas apresenta dados
}
```

#### **Componentes COM Estado** (Stateful/Container)
Gerenciam dados e lógica de negócio:

```javascript
// features/tasks/TasksPage.jsx - COM ESTADO
function TasksPage() {
  const [tasks, setTasks] = useState([]); // gerencia estado
  const [filter, setFilter] = useState('all');
  
  const handleCreateTask = (taskData) => { // lógica de negócio
    setTasks(prev => [newTask, ...prev]);
  };
  
  return <div>...</div>; // renderiza + gerencia dados
}

// features/auth/LoginPage.jsx - COM ESTADO
function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => { // processa formulário
    // validação e envio
  };
}
```

### 5. **Listas em React**
Renderização de arrays de dados com performance otimizada:

```javascript
// features/tasks/TasksPage.jsx
{filteredTasks.map(task => (
  <TaskItem
    key={task.id} // Chave única e estável para performance
    task={task}
    onToggle={handleToggleTask}
    onEdit={handleEditTask}
    onDelete={handleDeleteTask}
  />
))}
```

**Conceitos aplicados:**
- **Keys únicas**: `key={task.id}` para otimização de re-renderização
- **Mapeamento**: transformação de dados em elementos JSX
- **Filtragem**: `filteredTasks` baseado em critérios dinâmicos
- **Performance**: React reutiliza elementos com keys estáveis

### 6. **Formulários Controlados**
Inputs sincronizados com estado React:

```javascript
// features/auth/LoginPage.jsx
const [formData, setFormData] = useState({ email: '', password: '' });

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

<input
  name="email"
  value={formData.email} // controlado pelo estado
  onChange={handleChange} // atualiza estado
/>
```

**Características demonstradas:**
- **Single source of truth**: estado como única fonte de dados
- **Validação em tempo real**: feedback imediato
- **Prevenção de submissão inválida**: botões desabilitados
- **Acessibilidade**: labels, aria-* attributes

### 7. **Navegação Autenticada**
Sistema de rotas protegidas com React Router:

```javascript
// app/routes.jsx
<Route 
  path="/tasks" 
  element={
    <ProtectedRoute> {/* HOC que verifica autenticação */}
      <TasksPage />
    </ProtectedRoute>
  } 
/>

// features/auth/ProtectedRoute.jsx
function ProtectedRoute({ children }) {
  const { user } = useAuth(); // verifica contexto
  
  if (!user) {
    return <Navigate to="/login" replace />; // redireciona se não autenticado
  }
  
  return children; // renderiza componente protegido
}
```

**Funcionalidades implementadas:**
- **Rotas públicas**: `/login`, `/register` (apenas não autenticados)
- **Rotas protegidas**: `/tasks` (apenas autenticados)
- **Redirecionamentos automáticos**: baseados no estado de autenticação
- **Persistência**: sessão mantida no localStorage

### 8. **Os 5 Hooks Obrigatórios**

#### **useState** - Estado Local
```javascript
// features/tasks/TasksPage.jsx
const [tasks, setTasks] = useState([]); // lista de tarefas
const [filter, setFilter] = useState('all'); // filtro ativo
const [searchTerm, setSearchTerm] = useState(''); // termo de busca

// features/auth/LoginPage.jsx  
const [formData, setFormData] = useState({ email: '', password: '' });
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);
```

#### **useEffect** - Efeitos Colaterais
```javascript
// features/tasks/TasksPage.jsx

// Carrega tarefas do localStorage na inicialização
useEffect(() => {
  const savedTasks = localStorage.getItem(`tasks_${user.id}`);
  if (savedTasks) {
    setTasks(JSON.parse(savedTasks));
  }
}, [user.id]);

// Salva tarefas no localStorage quando há mudanças
useEffect(() => {
  localStorage.setItem(`tasks_${user.id}`, JSON.stringify(tasks));
}, [tasks, user.id]);

// Atualiza título da página baseado nas estatísticas
useEffect(() => {
  const stats = calculateTaskStats(tasks);
  document.title = `Todo App - ${stats.pending} pendente(s)`;
  
  return () => { // cleanup
    document.title = 'Todo App';
  };
}, [tasks]);
```

#### **useContext** - Compartilhamento de Estado
```javascript
// context/AuthContext.jsx
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

// Usado em qualquer componente:
// features/tasks/TasksPage.jsx
function TasksPage() {
  const { user } = useAuth(); // acessa contexto de autenticação
  // ...
}
```

#### **useRef** - Referências DOM
```javascript
// features/tasks/TaskForm.jsx
const titleInputRef = useRef(null);

// Foca automaticamente no campo título
useEffect(() => {
  if (titleInputRef.current) {
    titleInputRef.current.focus();
  }
}, []);

<input
  ref={titleInputRef} // referência direta ao elemento DOM
  name="title"
  // ...
/>

// features/tasks/TasksPage.jsx
const searchInputRef = useRef(null);

const focusSearch = () => {
  if (searchInputRef.current) {
    searchInputRef.current.focus(); // manipulação direta do DOM
  }
};
```

#### **useMemo** - Memoização e Performance
```javascript
// features/tasks/TasksPage.jsx

// Memoiza lista filtrada para evitar recálculo desnecessário
const filteredTasks = useMemo(() => {
  return filterTasks(tasks, filter, searchTerm);
}, [tasks, filter, searchTerm]); // recalcula apenas quando dependências mudam

// Memoiza estatísticas para evitar recálculo desnecessário  
const taskStats = useMemo(() => {
  return calculateTaskStats(tasks);
}, [tasks]); // recalcula apenas quando tasks muda
```

**Benefícios de performance:**
- Evita recálculos desnecessários em cada render
- Melhora performance com listas grandes
- Reduz trabalho computacional

---

## 📁 Estrutura do Projeto

```
src/
├── app/
│   └── routes.jsx              # Configuração de rotas da aplicação
├── components/                 # Componentes reutilizáveis SEM ESTADO
│   ├── Button.jsx             # Botão reutilizável com variantes
│   ├── Card.jsx               # Card/Container estilizado
│   ├── Input.jsx              # Campo de entrada com validação
│   ├── Label.jsx              # Label acessível para formulários
│   ├── Badge.jsx              # Badge/Tag para status
│   ├── Icons.jsx              # Sistema completo de ícones SVG
│   ├── Header.jsx             # Cabeçalho com navegação e dark mode
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
├── hooks/                     # Custom hooks
│   └── useAuth.js            # Hook personalizado para autenticação
├── styles/
│   └── index.css             # Design System CSS + Tailwind customizado
├── App.jsx                   # Componente raiz SEM ESTADO
└── main.jsx                  # Ponto de entrada da aplicação

public/
├── todo-icon.svg             # Ícone personalizado da aplicação
└── vite.svg                  # Ícone padrão do Vite

tests/
└── taskUtils.test.js         # Testes unitários com Vitest

Arquivos de configuração:
├── package.json              # Dependências e scripts
├── vite.config.js           # Configuração do Vite
├── vitest.config.js         # Configuração de testes
├── tailwind.config.js       # Configuração do Tailwind
├── postcss.config.js        # Configuração do PostCSS
├── .prettierrc              # Configuração do Prettier
├── index.html               # HTML principal (título: "To-Do App")
└── README.md                # Este arquivo
```

### **Descrição dos Diretórios:**

- **`/app`**: Configurações centrais da aplicação (rotas, providers)
- **`/components`**: Componentes UI reutilizáveis e sem estado, incluindo sistema completo de ícones SVG
- **`/context`**: Contextos React para compartilhamento de estado global
- **`/features`**: Funcionalidades organizadas por domínio de negócio
- **`/hooks`**: Custom hooks reutilizáveis (useAuth)
- **`/tests`**: Testes unitários e de integração
- **`/public`**: Arquivos estáticos incluindo ícone personalizado da aplicação

## 🎨 Sistema de Design Implementado

### **Ícones SVG Personalizados**
Criamos um sistema completo de ícones em `components/Icons.jsx`:

```javascript
// Sistema de ícones SVG com PropTypes
export const TodoIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

// Outros ícones: SearchIcon, NewTaskIcon, EditIcon, DeleteIcon, 
// SaveIcon, CancelIcon, LogoutIcon, CheckIcon, CreateTaskIcon, EmptyStateIcon
```

**Características dos ícones:**
- **11 ícones SVG** personalizados e consistentes
- **PropTypes validation** para type safety
- **Responsive sizing** com classes Tailwind
- **Acessibilidade** com aria-labels appropriados
- **Substituição completa de emojis** por ícones profissionais

### **Header Estilizado**
Header com design moderno e funcional:

```javascript
// Header com ícone personalizado e texto branco
<Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
  <TodoIcon className="w-7 h-7 text-white" />
  <h1 className="text-xl font-bold text-white">
    To Do App
  </h1>
</Link>
```

**Características do header:**
- **Background gradient**: gradiente escuro profissional
- **Texto branco**: alta legibilidade em fundo escuro
- **Ícone personalizado**: TodoIcon em vez de emoji
- **Dark mode toggle**: funcional com ícones do Heroicons
- **Navegação contextual**: diferente para usuários autenticados/não autenticados

### **Design System CSS Customizado**
Sistema completo de design em `index.css`:

```css
/* Design System com CSS Variables */
:root {
  --color-primary: 34 99 235;        /* blue-600 */
  --color-surface: 248 250 252;      /* slate-50 */
  --color-text: 15 23 42;            /* slate-900 */
  --radius-xl: 20px;
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

/* Header estilizado */
.header {
  background: linear-gradient(135deg, rgb(30 41 59), rgb(51 65 85));
  border-bottom: 1px solid rgb(71 85 105);
  box-shadow: var(--shadow);
}

/* Campo de busca com ícone */
.search-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  pointer-events: none;
}
```

---

## 🛠️ Decisões Técnicas

### **Sistema de Ícones SVG vs Emojis**
- **Antes**: Emojis (🗑️, ✏️, ➕) inconsistentes entre sistemas
- **Depois**: SVG icons customizados com design unificado
- **Benefícios**: Consistência visual, melhor acessibilidade, fácil manutenção

### **Design System Próprio vs Biblioteca Externa**
- **Escolha**: CSS customizado com variables + Tailwind utilities
- **Vantagens**: Controle total, performance otimizada, aprendizado completo
- **Resultado**: Sistema escalável e maintível

### **Título e Favicon Personalizados**
- **Título**: "To-Do App" (antes: "Vite + React")
- **Favicon**: Ícone SVG personalizado (antes: ícone do Vite)
- **Impacto**: Identidade visual profissional e reconhecível

### **Por que Vite?**
- **Performance**: build e hot reload ultra-rápidos
- **Simplicidade**: configuração mínima out-of-the-box
- **ES Modules**: suporte nativo sem bundling em desenvolvimento
- **Ecosistema**: excelente integração com React e Tailwind

### **Por que Tailwind CSS + CSS Customizado?**
- **Utility-first**: desenvolvimento rápido com classes utilitárias
- **Consistência**: design system integrado com CSS variables
- **Performance**: apenas CSS usado é incluído no build
- **Flexibilidade**: CSS customizado para componentes complexos (header, search)

### **Por que Context API em vez de Redux?**
- **Simplicidade**: menos boilerplate para aplicação pequena/média
- **Nativo**: parte do React, sem dependências externas
- **Suficiente**: atende necessidades de compartilhamento de estado
- **Didático**: demonstra conceitos fundamentais do React

### **Campo de Busca Estilizado**
Implementação de busca com ícone integrado:

```javascript
// TasksPage.jsx - Campo de busca estilizado
<div className="search-input-container">
  <SearchIcon className="search-icon w-5 h-5 text-muted-foreground" />
  <input
    ref={searchInputRef}
    type="text"
    placeholder="Buscar tarefas..."
    value={searchTerm}
    onChange={handleSearchChange}
    className="input w-full sm:w-64"
    style={{ paddingLeft: '2.5rem', paddingRight: searchTerm ? '2.5rem' : '1rem' }}
    aria-label="Buscar tarefas"
  />
  {searchTerm && (
    <button onClick={handleClearSearch} className="search-clear-button">
      <CancelIcon className="w-4 h-4" />
    </button>
  )}
</div>
```

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

// Botões com ícones descritivos
<Button aria-label="Editar tarefa">
  <EditIcon className="w-4 h-4" />
</Button>
<Button aria-label="Excluir tarefa">
  <DeleteIcon className="w-4 h-4" />
</Button>
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
- **Referências estáveis**: `useRef` para DOM e foco automático
- **Keys otimizadas**: IDs únicos para listas
- **SVG optimization**: ícones vetoriais leves e escaláveis
- **CSS variables**: reutilização eficiente de estilos
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
✅ **Sistema de ícones SVG** profissional e acessível  
✅ **Design System** completo com CSS customizado  
✅ **Campo de busca estilizado** com UX profissional  
✅ **Header responsivo** com dark mode funcional  
✅ **Favicon e título** personalizados para identidade visual  

### **Diferenciais Implementados:**
- 🎨 **Sistema de design próprio** com CSS variables e Tailwind
- 📱 **11 ícones SVG** customizados substituindo emojis
- 🔍 **Busca avançada** com ícone integrado e clear button
- 🌓 **Dark mode** funcional com persistência
- ♿ **Acessibilidade** completa com ARIA labels e navegação por teclado
- 🏷️ **PropTypes validation** em todos os componentes de ícones

O código está organizado, comentado, testado e pronto para defesa oral, servindo como referência completa para os conceitos fundamentais do React e desenvolvimento web moderno com foco em UX/UI profissional.

---

**Desenvolvido para fins educacionais - To-Do App 2024**  
**Repositório:** https://github.com/junin27/Atividade-Avaliativa-3-0---Desenvolvimento-Web
