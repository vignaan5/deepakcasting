import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper,
  styled
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  borderRadius: 16,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
}));

const FormSection = ({ title, children }) => (
  <StyledPaper>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Grid container spacing={2}>
      {children}
    </Grid>
  </StyledPaper>
);


export const ExperienceSection = ({ experience, setExperience }) => {
    const [projects, setProjects] = useState([{
      type: '',
      platform: '',
      role: '',
      status: '',
      title: '',
      trailerStatus: '',
      count: null
    }]);
  
    const handleAddProject = () => {
      setProjects([...projects, {
        type: '',
        platform: '',
        role: '',
        status: '',
        title: '',
        trailerStatus: '',
        count: null
      }]);
    };
  
    const handleProjectChange = (index, field, value) => {
      const newProjects = [...projects];
      newProjects[index][field] = value;
      setProjects(newProjects);
      setExperience({ projects: newProjects });
    };
  
    return (
      <FormSection title="Experience">
        {projects.map((project, index) => (
          <Box key={index} sx={{ mb: 3, width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Project Type"
                  value={project.type}
                  onChange={(e) => handleProjectChange(index, 'type', e.target.value)}
                >
                  <MenuItem value="series">Series</MenuItem>
                  <MenuItem value="album song">Album Song</MenuItem>
                  <MenuItem value="short films">Short Films</MenuItem>
                  <MenuItem value="webseries">Web Series</MenuItem>
                  <MenuItem value="film">Film</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Platform"
                  value={project.platform}
                  onChange={(e) => handleProjectChange(index, 'platform', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Role"
                  value={project.role}
                  onChange={(e) => handleProjectChange(index, 'role', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Status"
                  value={project.status}
                  onChange={(e) => handleProjectChange(index, 'status', e.target.value)}
                >
                  <MenuItem value="releasing soon">Releasing Soon</MenuItem>
                  <MenuItem value="released">Released</MenuItem>
                  <MenuItem value="demo">Demo</MenuItem>
                  <MenuItem value="worked">Worked</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Title"
                  value={project.title}
                  onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Trailer Status"
                  value={project.trailerStatus}
                  onChange={(e) => handleProjectChange(index, 'trailerStatus', e.target.value)}
                >
                  <MenuItem value="released">Released</MenuItem>
                  <MenuItem value="not released">Not Released</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Count"
                  value={project.count}
                  onChange={(e) => handleProjectChange(index, 'count', e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        ))}
        <Button
          variant="outlined"
          onClick={handleAddProject}
          startIcon={<AddIcon />}
          sx={{ mt: 2 }}
        >
          Add Another Project
        </Button>
      </FormSection>
    );
  };
  