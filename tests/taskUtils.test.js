import { describe, it, expect } from 'vitest';
import {
  filterTasks,
  calculateTaskStats,
  createTask,
  updateTask,
  sortTasks,
  validateTask
} from '../src/features/tasks/taskUtils.js';

/**
 * Testes unitários para taskUtils
 * 
 * Demonstra os conceitos de:
 * - Testes unitários: verificação de funções puras
 * - Vitest: framework de testes para JavaScript
 * - Casos de teste: diferentes cenários e edge cases
 */

describe('taskUtils', () => {
  // Dados de teste mockados
  const mockTasks = [
    {
      id: '1',
      title: 'Tarefa 1',
      description: 'Descrição da tarefa 1',
      completed: false,
      createdAt: '2024-01-01T10:00:00.000Z'
    },
    {
      id: '2',
      title: 'Tarefa 2',
      description: 'Descrição da tarefa 2',
      completed: true,
      createdAt: '2024-01-02T10:00:00.000Z'
    },
    {
      id: '3',
      title: 'Comprar leite',
      description: 'Ir ao supermercado',
      completed: false,
      createdAt: '2024-01-03T10:00:00.000Z'
    }
  ];

  describe('filterTasks', () => {
    it('deve retornar todas as tarefas quando filtro é "all"', () => {
      const result = filterTasks(mockTasks, 'all');
      expect(result).toHaveLength(3);
      expect(result).toEqual(mockTasks);
    });

    it('deve retornar apenas tarefas pendentes quando filtro é "pending"', () => {
      const result = filterTasks(mockTasks, 'pending');
      expect(result).toHaveLength(2);
      expect(result.every(task => !task.completed)).toBe(true);
    });

    it('deve retornar apenas tarefas concluídas quando filtro é "completed"', () => {
      const result = filterTasks(mockTasks, 'completed');
      expect(result).toHaveLength(1);
      expect(result.every(task => task.completed)).toBe(true);
    });

    it('deve filtrar por termo de busca no título', () => {
      const result = filterTasks(mockTasks, 'all', 'Comprar');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Comprar leite');
    });

    it('deve filtrar por termo de busca na descrição', () => {
      const result = filterTasks(mockTasks, 'all', 'supermercado');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Comprar leite');
    });

    it('deve ser case-insensitive na busca', () => {
      const result = filterTasks(mockTasks, 'all', 'COMPRAR');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Comprar leite');
    });

    it('deve retornar array vazio para entrada inválida', () => {
      expect(filterTasks(null, 'all')).toEqual([]);
      expect(filterTasks(undefined, 'all')).toEqual([]);
      expect(filterTasks('not-array', 'all')).toEqual([]);
    });

    it('deve combinar filtro de status com busca', () => {
      const result = filterTasks(mockTasks, 'pending', 'Comprar');
      expect(result).toHaveLength(1);
      expect(result[0].completed).toBe(false);
      expect(result[0].title).toBe('Comprar leite');
    });
  });

  describe('calculateTaskStats', () => {
    it('deve calcular estatísticas corretamente', () => {
      const stats = calculateTaskStats(mockTasks);
      expect(stats).toEqual({
        total: 3,
        pending: 2,
        completed: 1
      });
    });

    it('deve retornar zeros para array vazio', () => {
      const stats = calculateTaskStats([]);
      expect(stats).toEqual({
        total: 0,
        pending: 0,
        completed: 0
      });
    });

    it('deve retornar zeros para entrada inválida', () => {
      expect(calculateTaskStats(null)).toEqual({
        total: 0,
        pending: 0,
        completed: 0
      });
      expect(calculateTaskStats(undefined)).toEqual({
        total: 0,
        pending: 0,
        completed: 0
      });
    });
  });

  describe('createTask', () => {
    it('deve criar tarefa com dados corretos', () => {
      const task = createTask('Título teste', 'Descrição teste');
      
      expect(task.title).toBe('Título teste');
      expect(task.description).toBe('Descrição teste');
      expect(task.completed).toBe(false);
      expect(task.id).toBeDefined();
      expect(task.createdAt).toBeDefined();
      expect(task.updatedAt).toBeDefined();
    });

    it('deve criar tarefa sem descrição', () => {
      const task = createTask('Apenas título');
      
      expect(task.title).toBe('Apenas título');
      expect(task.description).toBe('');
    });

    it('deve fazer trim dos dados', () => {
      const task = createTask('  Título com espaços  ', '  Descrição com espaços  ');
      
      expect(task.title).toBe('Título com espaços');
      expect(task.description).toBe('Descrição com espaços');
    });

    it('deve gerar IDs únicos', () => {
      const task1 = createTask('Tarefa 1');
      const task2 = createTask('Tarefa 2');
      
      expect(task1.id).not.toBe(task2.id);
    });
  });

  describe('updateTask', () => {
    it('deve atualizar tarefa corretamente', () => {
      const originalTask = mockTasks[0];
      const updates = { title: 'Título atualizado', completed: true };
      
      const updatedTask = updateTask(originalTask, updates);
      
      expect(updatedTask.title).toBe('Título atualizado');
      expect(updatedTask.completed).toBe(true);
      expect(updatedTask.id).toBe(originalTask.id);
      expect(updatedTask.updatedAt).not.toBe(originalTask.updatedAt);
    });

    it('deve manter propriedades não atualizadas', () => {
      const originalTask = mockTasks[0];
      const updates = { completed: true };
      
      const updatedTask = updateTask(originalTask, updates);
      
      expect(updatedTask.title).toBe(originalTask.title);
      expect(updatedTask.description).toBe(originalTask.description);
      expect(updatedTask.completed).toBe(true);
    });
  });

  describe('sortTasks', () => {
    it('deve ordenar por data de criação (mais recente primeiro)', () => {
      const sorted = sortTasks(mockTasks, 'createdAt', 'desc');
      
      expect(sorted[0].id).toBe('3');
      expect(sorted[1].id).toBe('2');
      expect(sorted[2].id).toBe('1');
    });

    it('deve ordenar por título alfabeticamente', () => {
      const sorted = sortTasks(mockTasks, 'title', 'asc');
      
      expect(sorted[0].title).toBe('Comprar leite');
      expect(sorted[1].title).toBe('Tarefa 1');
      expect(sorted[2].title).toBe('Tarefa 2');
    });

    it('deve retornar array vazio para entrada inválida', () => {
      expect(sortTasks(null)).toEqual([]);
      expect(sortTasks(undefined)).toEqual([]);
    });
  });

  describe('validateTask', () => {
    it('deve validar tarefa válida', () => {
      const validation = validateTask({
        title: 'Título válido',
        description: 'Descrição válida'
      });
      
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toEqual({});
    });

    it('deve rejeitar título vazio', () => {
      const validation = validateTask({
        title: '',
        description: 'Descrição'
      });
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors.title).toBe('Título é obrigatório');
    });

    it('deve rejeitar título muito longo', () => {
      const longTitle = 'a'.repeat(101);
      const validation = validateTask({
        title: longTitle,
        description: 'Descrição'
      });
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors.title).toBe('Título deve ter no máximo 100 caracteres');
    });

    it('deve rejeitar descrição muito longa', () => {
      const longDescription = 'a'.repeat(501);
      const validation = validateTask({
        title: 'Título válido',
        description: longDescription
      });
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors.description).toBe('Descrição deve ter no máximo 500 caracteres');
    });

    it('deve aceitar título apenas com espaços como inválido', () => {
      const validation = validateTask({
        title: '   ',
        description: 'Descrição'
      });
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors.title).toBe('Título é obrigatório');
    });
  });
});
