import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Chip,
  useTheme,
  useMediaQuery,
  styled
} from '@mui/material';
import {
  Height,
  Scale,
  Face,
  LocationOn,
  CheckCircle,
  PhotoCamera,
  TheaterComedy,
  Brush,
  Celebration,
  LocalMall,
  Checkroom,
  Nightlife,
  BeachAccess,
  Movie,
  CameraAlt
} from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  borderRadius: 16,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
}));

const InfoItem = ({ icon, label, value }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
    {icon}
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">
        {value}
      </Typography>
    </Box>
  </Box>
);

// Comfort level icons mapping
const comfortLevelIcons = {
  traditionalWear: <Checkroom />,
  westernWear: <LocalMall />,
  nightWear: <Nightlife />,
  swimWear: <BeachAccess />,
  printShoot: <PhotoCamera />,
  rampShows: <Celebration />,
  commercialAds: <Movie />,
  fashionShoot: <CameraAlt />,
  designerShoot: <Brush />,
  actingShoot: <TheaterComedy />
};

const ModelProfile = ({ model }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Filter only the comfort levels that are true
  const activeComfortLevels = Object.entries(model.comfortLevel)
    .filter(([_, value]) => value === true)
    .reduce((acc, [key]) => ({ ...acc, [key]: comfortLevelIcons[key] }), {});

  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto', p: 2 }}>
      <Grid container spacing={3}>
        {/* Hero Section */}
        <Grid item xs={12} md={6}>
          <Box 
            component="img"
            src={model.photos[0]}
            sx={{
              width: '100%',
              height: isMobile ? '400px' : '600px',
              objectFit: 'cover',
              borderRadius: 2
            }}
          />
        </Grid>

        {/* Basic Info */}
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h4" gutterBottom>
              {model.personalInfo.fullName}
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <InfoItem 
                  icon={<Height />}
                  label="Height"
                  value={`${model.personalInfo.physicalAttributes.height} ft`}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InfoItem 
                  icon={<Scale />}
                  label="Weight"
                  value={`${model.personalInfo.physicalAttributes.weight} kg`}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InfoItem 
                  icon={<Face />}
                  label="Age"
                  value={model.personalInfo.age}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InfoItem 
                  icon={<LocationOn />}
                  label="Location"
                  value={model.personalInfo.city}
                />
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>

        {/* Measurements */}
        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Measurements
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="subtitle2">Bust</Typography>
                <Typography>{model.personalInfo.physicalAttributes.bust}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle2">Waist</Typography>
                <Typography>{model.personalInfo.physicalAttributes.waist}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle2">Hips</Typography>
                <Typography>{model.personalInfo.physicalAttributes.hips}</Typography>
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>

        {/* Comfort Level - Only showing active ones */}
        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Comfort Level
            </Typography>
            <Grid container spacing={1}>
              {Object.entries(activeComfortLevels).map(([key, icon]) => (
                <Grid item xs={6} sm={4} md={3} key={key}>
                  <Chip
                    icon={icon}
                    label={key.replace(/([A-Z])/g, ' $1').trim()}
                    color="primary"
                    variant="outlined"
                    sx={{ 
                      width: '100%', 
                      mb: 1,
                      '& .MuiChip-icon': {
                        color: 'inherit'
                      }
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </StyledPaper>
        </Grid>

        {/* Portfolio Grid */}
        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Portfolio
            </Typography>
            <Grid container spacing={2}>
              {model.photos.map((photo, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box
                    component="img"
                    src={photo}
                    sx={{
                      width: '100%',
                      height: '300px',
                      objectFit: 'cover',
                      borderRadius: 1
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ModelProfile;
