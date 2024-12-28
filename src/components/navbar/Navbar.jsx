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
  Menu,
  MenuItem,
  Collapse
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
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import TheatersIcon from '@mui/icons-material/Theaters';
import ElderlyIcon from '@mui/icons-material/Elderly';

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
  height: '60px',
  objectFit: 'contain'
});

const StyledMenuItem = styled(MenuItem)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '10px 20px',
  '& .MuiSvgIcon-root': {
    fontSize: '20px'
  }
});

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState({});
  const [anchorEl, setAnchorEl] = useState({
    Models: null,
    'Actors & Models': null
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const modelDropdownItems = [
    { name: 'Male', icon: <ManIcon /> },
    { name: 'Women', icon: <WomanIcon /> },
    { name: 'Kids', icon: <ChildCareIcon /> },
    { name: 'Plus Size', icon: <AccessibilityNewIcon /> }
  ];

  const actorsDropdownItems = [
    { name: 'Actors', icon: <TheatersIcon /> },
    { name: 'Salt & Pepper Models', icon: <ElderlyIcon /> }
  ];

  const menuItems = [
    { name: 'Home', hasDropdown: false, icon: <HomeIcon /> },
    { name: 'Models', hasDropdown: true, icon: <PeopleIcon />, dropdownItems: modelDropdownItems },
    { name: 'Actors & Models', hasDropdown: true, icon: <TheaterComedyIcon />, dropdownItems: actorsDropdownItems },
    { name: 'Influencer', hasDropdown: false, icon: <TrendingUpIcon /> },
    { name: 'About Us', hasDropdown: false, icon: <InfoIcon /> },
    { name: 'Contact Us', hasDropdown: false, icon: <ContactMailIcon /> },
    { name: 'Join Us', hasDropdown: false, icon: <PersonAddIcon /> }
  ];

  const handleMenuClick = (event, name) => {
    event.stopPropagation();
    setAnchorEl(prev => ({
      ...prev,
      [name]: prev[name] ? null : event.currentTarget
    }));
  };

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
              <Box key={item.name}>
                <NavButton 
                  startIcon={item.icon}
                  endIcon={
                    item.hasDropdown && (
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuClick(e, item.name)}
                        sx={{ p: 0, minWidth: 0 }}
                      >
                        <KeyboardArrowDownIcon />
                      </IconButton>
                    )
                  }
                >
                  {item.name}
                </NavButton>
                {item.hasDropdown && (
                  <Menu
                    anchorEl={anchorEl[item.name]}
                    open={Boolean(anchorEl[item.name])}
                    onClose={() => setAnchorEl(prev => ({ ...prev, [item.name]: null }))}
                    PaperProps={{
                      sx: {
                        mt: 1,
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        minWidth: '200px'
                      }
                    }}
                  >
                    {item.dropdownItems.map((dropItem) => (
                      <StyledMenuItem 
                        key={dropItem.name}
                        onClick={() => setAnchorEl(prev => ({ ...prev, [item.name]: null }))}
                      >
                        {dropItem.icon}
                        {dropItem.name}
                      </StyledMenuItem>
                    ))}
                  </Menu>
                )}
              </Box>
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
              <React.Fragment key={item.name}>
                <ListItem 
                  button 
                  onClick={() => item.hasDropdown && setMobileExpanded(prev => ({
                    ...prev,
                    [item.name]: !prev[item.name]
                  }))}
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
                  {item.hasDropdown && (
                    <KeyboardArrowDownIcon 
                      sx={{ 
                        transform: mobileExpanded[item.name] ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.3s'
                      }} 
                    />
                  )}
                </ListItem>
                {item.hasDropdown && (
                  <Collapse in={mobileExpanded[item.name]}>
                    <List sx={{ pl: 4 }}>
                      {item.dropdownItems.map((dropItem) => (
                        <ListItem 
                          button 
                          key={dropItem.name}
                          sx={{
                            py: 1,
                            px: 2,
                            '&:hover': {
                              backgroundColor: 'rgba(0,0,0,0.04)'
                            }
                          }}
                        >
                          {dropItem.icon}
                          <ListItemText primary={dropItem.name} sx={{ ml: 2 }} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            ))}
          </List>
        </Drawer>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
