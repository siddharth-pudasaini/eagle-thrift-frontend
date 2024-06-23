import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

export default function AccountInfo() {
  const [user, setUser] = useState({
    name: 'Helena Hills',
    email: 'name@domain.com',
    bio: 'A description of this user.',
    listings: Array(5).fill('/path/to/listing/image.jpg') // replace with actual image paths
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Typography component="h1" variant="h5">
          Account Information
        </Typography>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 100, height: 100 }}>
          {/* Avatar Image Source */}
          <img src="/path/to/profile.jpg" alt="Profile" style={{ width: '100%' }} />
        </Avatar>
        <Button variant="outlined" color="primary" sx={{ mt: 1 }}>
          Edit Profile Image
        </Button>
        <Box sx={{ mt: 2, width: '100%' }}>
          <TextField
            margin="normal"
            fullWidth
            label="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            margin="normal"
            fullWidth
            label="Bio"
            name="bio"
            value={user.bio}
            multiline
            rows={4}
            onChange={handleChange}
            variant="outlined"
          />
          <Typography component="h2" variant="h6" sx={{ mt: 2 }}>
            My Listings
          </Typography>
          <Box sx={{ display: 'flex', overflowX: 'scroll' }}>
            {user.listings.map((listing, index) => (
              <img key={index} src={listing} alt="Listing" style={{ width: 100, height: 100, marginRight: 8 }} />
            ))}
          </Box>
          <Button variant="contained" color="error" sx={{ mt: 2, mb: 2, width: '100%' }}>
            Delete Account
          </Button>
          <Link component={RouterLink} to="/logout" variant="body2" style={{ display: 'block', textAlign: 'center' }}>
            Log Out
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
