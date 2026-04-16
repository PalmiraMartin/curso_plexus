import { Box, Typography } from '@mui/material';
import { TaskCard } from '../TaskCard/TaskCard';
import type { Task } from '../../types/task';

interface TaskListProps {
  tasks: Task[];
}

export const TaskList = ({ tasks }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No hay tareas creadas aún
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Crea tu primera tarea usando el formulario de arriba
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
        Lista de tareas ({tasks.length})
      </Typography>

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </Box>
  );
};