import { useState } from 'react';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface TaskFormProps {
  onCreateTask: (name: string, description: string) => void;
}

export const TaskForm = ({ onCreateTask }: TaskFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const validateForm = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError('El nombre es obligatorio');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!description.trim()) {
      setDescriptionError('La descripción es obligatoria');
      isValid = false;
    } else {
      setDescriptionError('');
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onCreateTask(name.trim(), description.trim());
      // Limpiar el formulario
      setName('');
      setDescription('');
      setNameError('');
      setDescriptionError('');
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Crear nueva tarea
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Nombre de la tarea"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!nameError}
          helperText={nameError}
          fullWidth
          required
          variant="outlined"
        />

        <TextField
          label="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={!!descriptionError}
          helperText={descriptionError}
          fullWidth
          required
          multiline
          rows={3}
          variant="outlined"
        />

        <Button
          type="submit"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ alignSelf: 'flex-start', mt: 1 }}
        >
          Crear tarea
        </Button>
      </Box>
    </Paper>
  );
};