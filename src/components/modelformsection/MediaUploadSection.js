import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  TextField,
  CircularProgress,
  ImageList,
  ImageListItem,
  IconButton,
  styled
} from '@mui/material';
import { Delete, CloudUpload } from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  borderRadius: 16,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const MediaUploadSection = ({ onImagesUploaded, onVideoLinksAdded }) => {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [videoLinks, setVideoLinks] = useState([]);
  const [newVideoLink, setNewVideoLink] = useState('');

  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const response = await fetch('https://api.imgbb.com/1/upload?key=1157c824271dcfe43d849d49a4d9057a', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      return data.data.url;
    } catch (error) {
      console.error('Error uploading to ImgBB:', error);
      throw error;
    }
  };

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    setUploading(true);

    try {
      const uploadPromises = files.map(file => uploadToImgBB(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      
      setImages(prev => [...prev, ...uploadedUrls]);
      onImagesUploaded(uploadedUrls);
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleVideoLinkAdd = () => {
    if (newVideoLink && (newVideoLink.includes('youtube.com') || newVideoLink.includes('vimeo.com'))) {
      setVideoLinks(prev => [...prev, newVideoLink]);
      onVideoLinksAdded([...videoLinks, newVideoLink]);
      setNewVideoLink('');
    }
  };

  const handleImageDelete = (indexToDelete) => {
    setImages(prev => prev.filter((_, index) => index !== indexToDelete));
  };

  const handleVideoLinkDelete = (indexToDelete) => {
    setVideoLinks(prev => prev.filter((_, index) => index !== indexToDelete));
  };

  return (
    <StyledPaper>
      <Typography variant="h6" gutterBottom>
        Media Upload
      </Typography>
      
      {/* Image Upload Section */}
      <Box sx={{ mb: 3 }}>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUpload />}
          disabled={uploading}
          sx={{ mb: 2 }}
        >
          Upload Images
          <VisuallyHiddenInput
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          />
        </Button>
        
        {uploading && <CircularProgress size={24} sx={{ ml: 2 }} />}

        <ImageList cols={3} gap={8}>
          {images.map((url, index) => (
            <ImageListItem key={index}>
              <img
                src={url}
                alt={`Upload ${index + 1}`}
                loading="lazy"
                style={{ borderRadius: 8 }}
              />
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  bgcolor: 'rgba(0,0,0,0.5)',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
                }}
                onClick={() => handleImageDelete(index)}
              >
                <Delete sx={{ color: 'white' }} />
              </IconButton>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

      {/* Video Links Section */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Video Links (YouTube/Vimeo)
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              value={newVideoLink}
              onChange={(e) => setNewVideoLink(e.target.value)}
              placeholder="Paste YouTube or Vimeo link"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              onClick={handleVideoLinkAdd}
              disabled={!newVideoLink}
              fullWidth
            >
              Add Link
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ mt: 2 }}>
          {videoLinks.map((link, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 1,
                mb: 1,
                bgcolor: 'rgba(0,0,0,0.04)',
                borderRadius: 1
              }}
            >
              <Typography noWrap sx={{ flex: 1, mr: 2 }}>
                {link}
              </Typography>
              <IconButton
                size="small"
                onClick={() => handleVideoLinkDelete(index)}
              >
                <Delete />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>
    </StyledPaper>
  );
};

export default MediaUploadSection;
