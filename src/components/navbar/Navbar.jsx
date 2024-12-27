import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  styled,
  InputBase
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#ffffff',
  boxShadow: 'none',
  borderBottom: '1px solid rgba(0,0,0,0.1)',
  position: 'sticky',
  top: 0,
  zIndex: 1100,
  padding: '8px 0'
});

const NavButton = styled(Button)({
  color: '#000000',
  textTransform: 'none',
  fontSize: '16px',
  padding: '8px 16px',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: '2px',
    backgroundColor: '#000',
    transition: 'width 0.3s ease'
  },
  '&:hover': {
    backgroundColor: 'transparent',
    '&:after': {
      width: '80%'
    }
  }
});

const CallBackButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#000000',
  color: '#ffffff',
  textTransform: 'none',
  padding: '12px 24px',
  borderRadius: '4px',
  fontSize: '16px',
  '&:hover': {
    backgroundColor: '#333333',
  },
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

const Logo = styled('img')({
  height: '75px',
  objectFit: 'contain'
});

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { name: 'Home', hasDropdown: false, icon: <HomeIcon /> },
    { name: 'Models', hasDropdown: true, icon: <PeopleIcon /> },
    { name: 'Actors & Models', hasDropdown: true, icon: <TheaterComedyIcon /> },
    { name: 'Influencer', hasDropdown: false, icon: <TrendingUpIcon /> },
    { name: 'About Us', hasDropdown: false, icon: <InfoIcon /> },
    { name: 'Contact Us', hasDropdown: false, icon: <ContactMailIcon /> },
    { name: 'Join Us', hasDropdown: false, icon: <PersonAddIcon /> }
  ];

  return (
    <StyledAppBar>
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Logo src={require('../../assets/images/dcasting.png')} alt="Auraa Talents" />
        </Box>

        {!isMobile && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 2,
            mx: 'auto'
          }}>
            {menuItems.map((item) => (
              <NavButton 
                key={item.name}
                startIcon={item.icon}
                endIcon={item.hasDropdown ? <KeyboardArrowDownIcon /> : null}
              >
                {item.name}
              </NavButton>
            ))}
          </Box>
        )}

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 2
        }}>
          <IconButton sx={{ color: '#000000' }}>
            <SearchIcon />
          </IconButton>
          <CallBackButton endIcon={<KeyboardArrowRightIcon />}>
            Request A Call Back
          </CallBackButton>
          {isMobile && (
            <IconButton onClick={() => setMobileOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>

        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          PaperProps={{
            sx: {
              width: 280,
              mt: 8,
              borderTopLeftRadius: 16,
              borderBottomLeftRadius: 16
            }
          }}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem 
                button 
                key={item.name}
                sx={{
                  py: 2,
                  px: 3,
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.04)'
                  }
                }}
              >
                {item.icon}
                <ListItemText primary={item.name} sx={{ ml: 2 }} />
                {item.hasDropdown && <KeyboardArrowDownIcon />}
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
