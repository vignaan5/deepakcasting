import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Button,
  Chip,
  styled,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import {
  Height,
  Scale,
  Face,
  LocationOn,
  School,
  Language,
  Movie,
  PhotoCamera,
  TheaterComedy,
  Checkroom,
  Work
} from '@mui/icons-material';
import MediaUploadSection from '../components/modelformsection/MediaUploadSection';
import { ExperienceSection } from '../components/modelformsection/ExperienceSection';

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

const ModelForm = () => {
  const [formData, setFormData] = useState({
    model_id: '',
    personalInfo: {
      fullName: '',
      age: '',
      city: '',
      education: '',
      maritalStatus: '',
      profession: ''
      
    },
    physicalAttributes: {
        height: '',
        weight: '',
        bust: '',
        waist: '',
        hips: '',
        skinTone: '',
        eyeColor: '',
        hairColor: '',
        shoeSize: ''
      },
    professionalPreferences: {
      dressPreferences: '',
      outstationShoots: false,
      internationalShoots: false,
      hasPassport: false,
      hasExperience: false,
      flexibleTimings: false,
      languages: []
    },
    shootingInterests: {
      acting: false,
      printShoot: false,
      rampShows: false,
      designerShoots: false,
      ethnicWear: false,
      westernWear: false,
      bikiniShoots: false,
      lingerieShoots: false,
      swimSuits: false,
      calenderShoots: false,
      musicAlbums: false,
      seminude: false,
      nudeShoot: false,
      bodyPaintShoots: false,
      glamourShoots: false
    },
    comfortLevel: {
      onScreenKiss: false,
      onScreenSmooch: false,
      loveMaking: false,
      indianWear: false,
      western: false,
      skirt: false,
      bikini: false,
      shorts: false,
      boldScenes: false,
      indoorOutdoorWork: false,
      allergies: [],
      compro: false
    },
    experience: {
      projects: []
    },
    photos: [],
    videos: []
  });

  const handleInputChange = (section, field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: event.target.value
      }
    }));
  };

  const handlePhysicalAttributeChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      physicalAttributes: {
        ...prev.physicalAttributes,
        [field]: event.target.value
      }
    }));
  };

  const handleCheckboxChange = (section, field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: event.target.checked
      }
    }));
  };

  const handleLanguagesChange = (event) => {
    setFormData(prev => ({
      ...prev,
      professionalPreferences: {
        ...prev.professionalPreferences,
        languages: event.target.value
      }
    }));
  };

  const handleAllergiesChange = (event) => {
    setFormData(prev => ({
      ...prev,
      comfortLevel: {
        ...prev.comfortLevel,
        allergies: event.target.value.split(',').map(item => item.trim())
      }
    }));
  };

  const handleImagesUploaded = (uploadedUrls) => {
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...uploadedUrls]
    }));
  };

  const handleVideoLinksAdded = (links) => {
    setFormData(prev => ({
      ...prev,
      videos: [...prev.videos, ...links]
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Convert string values to appropriate types
    const formDataToSubmit = {
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        age: Number(formData.personalInfo.age)
      },
      physicalAttributes: {
        ...formData.physicalAttributes,
        height: Number(formData.physicalAttributes.height),
        weight: Number(formData.physicalAttributes.weight)
      }
    };


    console.log("sending data json is \n"+ JSON.stringify(formDataToSubmit) );
  
    try {
      const response = await fetch('http://localhost:8080/api/models', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formDataToSubmit)
      });
      if (response.ok) {
        console.log('Form submitted successfully');
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  
  

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
  <Grid container spacing={3}>
    {/* Model ID */}
    <Grid item xs={12}>
      <FormSection title="Model ID">
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Model ID"
            value={formData.model_id || ``}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              model_id: e.target.value
            }))}
            required
            
          />
        </Grid>
      </FormSection>
    </Grid>

    {/* Personal Information */}
    <Grid item xs={12}>
      <FormSection title="Personal Information">
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Full Name"
            value={formData.personalInfo.fullName}
            onChange={handleInputChange('personalInfo', 'fullName')}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Age"
            type="number"
            value={formData.personalInfo.age}
            onChange={handleInputChange('personalInfo', 'age')}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="City"
            value={formData.personalInfo.city}
            onChange={handleInputChange('personalInfo', 'city')}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Education"
            value={formData.personalInfo.education}
            onChange={handleInputChange('personalInfo', 'education')}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Marital Status"
            value={formData.personalInfo.maritalStatus}
            onChange={handleInputChange('personalInfo', 'maritalStatus')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Profession"
            value={formData.personalInfo.profession}
            onChange={handleInputChange('personalInfo', 'profession')}
          />
        </Grid>
      </FormSection>
    </Grid>

    {/* Physical Attributes */}
    <Grid item xs={12}>
      <FormSection title="Physical Attributes">
        <Grid container spacing={2}>
          {Object.entries(formData.physicalAttributes).map(([key, value]) => (
            <Grid item xs={12} md={4} key={key}>
              <TextField
                fullWidth
                label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                value={value}
                onChange={handlePhysicalAttributeChange(key)}
                type={['height', 'weight'].includes(key) ? 'number' : 'text'}
                inputProps={key === 'height' ? { step: 0.1 } : {}}
                required={['height', 'weight', 'bust', 'waist', 'hips'].includes(key)}
              />
            </Grid>
          ))}
        </Grid>
      </FormSection>
    </Grid>

    {/* Professional Preferences */}
    <Grid item xs={12}>
      <FormSection title="Professional Preferences">
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Dress Preferences"
            value={formData.professionalPreferences.dressPreferences}
            onChange={handleInputChange('professionalPreferences', 'dressPreferences')}
          />
        </Grid>
        <Grid item xs={12}>
          <FormGroup row>
            {Object.entries(formData.professionalPreferences)
              .filter(([key]) => typeof formData.professionalPreferences[key] === 'boolean')
              .map(([key]) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      checked={formData.professionalPreferences[key]}
                      onChange={handleCheckboxChange('professionalPreferences', key)}
                    />
                  }
                  label={key.replace(/([A-Z])/g, ' $1').trim()}
                />
              ))}
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Languages</InputLabel>
            <Select
              multiple
              value={formData.professionalPreferences.languages}
              onChange={handleLanguagesChange}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {['English', 'Hindi', 'Telugu'].map((lang) => (
                <MenuItem key={lang} value={lang}>
                  {lang}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </FormSection>
    </Grid>

    {/* Shooting Interests */}
    <Grid item xs={12}>
      <FormSection title="Shooting Interests">
        <Grid item xs={12}>
          <FormGroup row>
            {Object.entries(formData.shootingInterests).map(([key, value]) => (
              <FormControlLabel
                key={key}
                control={
                  <Checkbox
                    checked={value}
                    onChange={handleCheckboxChange('shootingInterests', key)}
                  />
                }
                label={key.replace(/([A-Z])/g, ' $1').trim()}
              />
            ))}
          </FormGroup>
        </Grid>
      </FormSection>
    </Grid>

    {/* Comfort Level */}
    <Grid item xs={12}>
      <FormSection title="Comfort Level">
        <Grid item xs={12}>
          <FormGroup row>
            {Object.entries(formData.comfortLevel)
              .filter(([key]) => key !== 'allergies')
              .map(([key, value]) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      checked={value}
                      onChange={handleCheckboxChange('comfortLevel', key)}
                    />
                  }
                  label={key.replace(/([A-Z])/g, ' $1').trim()}
                />
              ))}
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Allergies (comma-separated)"
            value={formData.comfortLevel.allergies.join(', ')}
            onChange={handleAllergiesChange}
          />
        </Grid>
      </FormSection>
    </Grid>

    {/* Experience Section */}
    <Grid item xs={12}>
      <ExperienceSection
        experience={formData.experience}
        setExperience={(exp) => setFormData(prev => ({ ...prev, experience: exp }))}
      />
    </Grid>

    {/* Media Upload Section */}
    <Grid item xs={12}>
      <MediaUploadSection
        onImagesUploaded={handleImagesUploaded}
        onVideoLinksAdded={handleVideoLinksAdded}
      />
    </Grid>

    {/* Submit Button */}
    <Grid item xs={12}>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
      >
        Submit
      </Button>
    </Grid>
  </Grid>
</Box>

  );
};

export default ModelForm;
