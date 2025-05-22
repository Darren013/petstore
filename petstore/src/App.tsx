import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PetDetailPage } from './pages/PetDetailPage';
import { AddPetPage } from './pages/AddPetPage';
import { EditPetPage } from './pages/EditPetPage';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Fab,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import PetsIcon from '@mui/icons-material/Pets';
import { useState } from 'react';

const theme = createTheme({
  palette: {
    primary: { main: '#4a148c' },
    secondary: { main: '#ff6f00' },
    background: { default: '#f3f3f3' },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", sans-serif',
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
});

const navLinks = [
  { text: 'Home', path: '/' },
  { text: 'Add New Pet', path: '/add' },
];

const AppContent = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      {/* AppBar */}
      <AppBar position="sticky" color="primary" elevation={4}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PetsIcon />
            <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
              PetStore
            </Typography>
          </Box>
          {isMobile ? (
            <IconButton color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {navLinks.map((link) => (
                <Typography
                  key={link.text}
                  component={Link}
                  to={link.path}
                  sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 500 }}
                >
                  {link.text}
                </Typography>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
          <List>
            {navLinks.map((link) => (
              <ListItem button key={link.text} onClick={() => navigate(link.path)}>
                <ListItemText primary={link.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Page Content */}
      <Container sx={{ mt: 4, mb: 6, flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pets/:id" element={<PetDetailPage />} />
          <Route path="/add" element={<AddPetPage />} />
          <Route path="/edit/:id" element={<EditPetPage />} />
        </Routes>
      </Container>

      {/* Floating Add Button */}
      {!isMobile && (
        <Fab
          color="secondary"
          aria-label="add"
          onClick={() => navigate('/add')}
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 30,
            boxShadow: 3,
          }}
        >
          <AddIcon />
        </Fab>
      )}

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 2,
          px: 2,
          backgroundColor: 'primary.main',
          color: '#fff',
          textAlign: 'center',
          mt: 'auto',
          boxShadow: '0 -2px 6px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="body2">© 2025 PetStore. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App;
