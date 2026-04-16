import { Card, CardContent, Typography, Box } from '@mui/material';
import { TaskCardHeader } from '../TaskCardHeader/TaskCardHeader';
import type { Task } from '../../types/task';

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <Card sx={{ mb: 2, boxShadow: 2 }}>
      <CardContent>
        <TaskCardHeader task={task} />

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {task.description}
        </Typography>

        {/* Espacio preparado para campos ICE y acciones futuras */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {/* Aquí se añadirán los campos ICE en tareas futuras */}
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {/* Aquí se añadirán las acciones en tareas futuras */}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};