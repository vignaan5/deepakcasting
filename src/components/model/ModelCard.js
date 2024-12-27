import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  IconButton,
  Box,
  styled,
  Collapse,
  Button,
  
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 250,
  width: '100%',
  margin: 10,
  transition: 'all 0.3s ease-in-out',
  borderRadius: 16,
  overflow: 'hidden',
  backgroundColor: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
  },
}));

const ImageContainer = styled(Box)({
  position: 'relative',
  paddingTop: '133%', // Taller aspect ratio to match reference
  width: '100%',
  overflow: 'hidden'
});

const TextOverlay = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
  padding: '48px 16px 16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  zIndex: 2
});

const ScrollableBox = styled(Box)({
  display: 'flex',
  overflowX: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none'
  },
  scrollBehavior: 'smooth',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  padding: '8px 0',
});

const FilmThumbnail = styled(Box)({
  minWidth: '60px',
  margin: '0 8px',
  position: 'relative',
});

const BookButton = styled(Button)({
  padding: '12px 24px',
  textTransform: 'none',
  borderRadius: '8px',
  fontWeight: 500,
  fontSize: '16px',
  letterSpacing: '0.5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
});

const CardHeader = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  padding: '16px',
  display: 'flex',
  justifyContent: 'flex-start',
  zIndex: 1,
  background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)'
});

const LogoImage = styled('img')({
  height: '32px',
  objectFit: 'contain',
  filter: 'brightness(0) invert(0)',
  padding: '4px'
});

const ModelCard = ({ model }) => {
  const [expanded, setExpanded] = useState(false);
  const defaultImage = require('../../assets/images/dcasting.png');

  const films = model.films?.length > 0 
    ? model.films 
    : [{ id: 'default', title: 'No Movies Yet', image: defaultImage }];

  return (
    <StyledCard>
      <ImageContainer>
        <CardHeader>
          <LogoImage 
            src={model.logoUrl} 
            alt={model.brand}
          />
        </CardHeader>
        <CardMedia
          component="img"
          image={model.imageUrl}
          alt={model.name}
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '50% 20%',
          }}
        />
        <TextOverlay>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: '600',
              fontSize: '20px',
              color: '#ffffff',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              textAlign: 'center',
              mb: 1
            }}
          >
            {model.brand}
          </Typography>
          <Typography 
            variant="body1"
            sx={{ 
              color: 'rgba(255,255,255,0.95)',
              fontSize: '14px',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
              textAlign: 'center'
            }}
          >
            {model.name}
          </Typography>
        </TextOverlay>
      </ImageContainer>

      <CardContent sx={{ padding: '16px' }}>
        <Box sx={{ mt: 1 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle2" sx={{ fontWeight: '500' }}>
              Featured In:
            </Typography>
            <IconButton 
              onClick={() => setExpanded(!expanded)}
              sx={{ 
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s'
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>

          {!expanded && (
            <ScrollableBox>
              {films.map((film) => (
                <FilmThumbnail key={film.id}>
                  <img 
                    src={film.image}
                    alt={film.title}
                    style={{ 
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  />
                </FilmThumbnail>
              ))}
            </ScrollableBox>
          )}

          <Collapse in={expanded} timeout="auto">
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 2, 
              mt: 2,
              justifyContent: 'center' 
            }}>
              {films.map((film) => (
                <Box key={film.id} sx={{ textAlign: 'center', width: '100px' }}>
                  <img 
                    src={film.image}
                    alt={film.title}
                    style={{ 
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mt: 1,
                      fontSize: '12px',
                      color: 'text.secondary'
                    }}
                  >
                    {film.title}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Collapse>
        </Box>

        <BookButton 
          variant="outlined" 
          fullWidth 
          sx={{ 
            mt: 2,
            borderColor: '#1a1a1a',
            color: '#1a1a1a',
            '&:hover': {
              borderColor: '#1a1a1a',
              backgroundColor: 'rgba(0,0,0,0.04)'
            }
          }}
        >
          Book This Model
          <KeyboardArrowRightIcon />
        </BookButton>
      </CardContent>
    </StyledCard>
  );
};

export default ModelCard;
