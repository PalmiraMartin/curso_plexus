import { Typography, Chip, Box } from '@mui/material';
import type { Task } from '../../types/task';

interface TaskCardHeaderProps {
  task: Task;
}

const getStatusColor = (status: Task['status']) => {
  switch (status) {
    case 'idle':
      return 'default';
    case 'loading':
      return 'primary';
    case 'ready':
      return 'info';
    case 'done':
      return 'success';
    case 'error':
      return 'error';
    default:
      return 'default';
  }
};

const getStatusLabel = (status: Task['status']) => {
  switch (status) {
    case 'idle':
      return 'Pendiente';
    case 'loading':
      return 'Calculando';
    case 'ready':
      return 'Listo';
    case 'done':
      return 'Completado';
    case 'error':
      return 'Error';
    default:
      return 'Desconocido';
  }
};

export const TaskCardHeader = ({ task }: TaskCardHeaderProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
      <Box sx={{ flex: 1, mr: 2 }}>
        <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 600 }}>
          {task.name}
        </Typography>
        <Chip
          label={getStatusLabel(task.status)}
          color={getStatusColor(task.status)}
          size="small"
          variant="outlined"
        />
      </Box>
    </Box>
  );
};