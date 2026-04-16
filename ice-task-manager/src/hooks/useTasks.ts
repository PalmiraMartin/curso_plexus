import { useState, useCallback } from 'react';
import type { Task, IceValues } from '../types/task';
import { sortTasksByPriority } from '../utils/taskSort';
import { calculateIceScore, normalizeIceValues } from '../utils/ice';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const createTask = useCallback((name: string, description: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      name: name.trim(),
      description: description.trim(),
      status: 'idle',
      createdAt: Date.now(),
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
  }, []);

  const updateIceValues = useCallback((taskId: string, values: IceValues) => {
    const normalizedValues = normalizeIceValues(values);

    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id !== taskId) {
          return task;
        }

        const updatedTask = {
          ...task,
          ...normalizedValues,
          iceScore: calculateIceScore(normalizedValues.impact, normalizedValues.confidence, normalizedValues.ease),
        };

        return updatedTask;
      })
    );
  }, []);

  const openModal = useCallback((taskId: string) => {
    setSelectedTaskId(taskId);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedTaskId(null);
  }, []);

  const sortedTasks = sortTasksByPriority(tasks);

  return {
    tasks: sortedTasks,
    selectedTaskId,
    createTask,
    updateIceValues,
    openModal,
    closeModal,
  };
};