import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';  // For the arrow icons
import Divider from '@mui/material/Divider';

export default function AccountInfo() {
    return (
        <Container component="main">
            <Typography variant="h6" component="div" sx={{ padding: 2, textAlign: 'center' }}>
                Account Information
            </Typography>
            <Avatar sx={{ width: 56, height: 56, margin: 'auto' }} src="/path/to/profile.jpg" />
            <Button variant="text" color="primary" sx={{ mt: 0.5, textTransform: 'none', '&:hover':{backgroundColor: 'inherit', color: '#00853E'}, fontSize: '1.25rem'}}>
                Edit profile image
            </Button>
            <List component="nav">
                <ListItem button>
                    <ListItemText primary="Name" secondary="Helena Hills" />
                    <ListItemIcon>
                        <ArrowForwardIosIcon />
                    </ListItemIcon>
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText primary="Email" secondary="name@domain.com" />
                    <ListItemIcon>
                        <ArrowForwardIosIcon />
                    </ListItemIcon>
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText primary="Bio" secondary="A description of this user." />
                    <ListItemIcon>
                        <ArrowForwardIosIcon />
                    </ListItemIcon>
                </ListItem>
                <Divider />
            </List>
            <Typography variant="h6" component="div" sx={{ padding: 2 }}>
                My Listings
            </Typography>
            {/* Add horizontal scroll for images */}
            <div style={{ display: 'flex', overflowX: 'scroll', padding: 2 }}>
                {Array(5).fill('/path/to/listing/image.jpg').map((src, index) => (
                    <img key={index} src={src} alt={`Listing ${index}`} style={{ width: 100, height: 100, marginRight: 8 }} />
                ))}
            </div>
            <Button variant="text" color="error" sx={{ mt: 2, mb: 2, width: '100%', textTransform: 'none', '&:hover':{backgroundColor: 'inherit', color: '#f00'}, fontSize: '1.0rem'}}>
                Delete Account
            </Button>
            <Button variant="text" color="primary" sx={{ mt: 1, mb: 1, width: '100%', textTransform: 'none', '&:hover':{backgroundColor: 'inherit', color: '#00853E'}, fontSize: '1.25rem'}}>
                Log Out
            </Button>
        </Container>
    );
}












// import * as React from 'react';
// import { useState } from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
// import { Link as RouterLink } from 'react-router-dom';
// import Link from '@mui/material/Link';

// export default function AccountInfo() {
//   const [user, setUser] = useState({
//     name: 'Helena Hills',
//     email: 'name@domain.com',
//     bio: 'A description of this user.',
//     listings: Array(5).fill('/path/to/listing/image.jpg') // replace with actual image paths
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setUser(prev => ({ ...prev, [name]: value }));
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Box sx={{
//         marginTop: 8,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//       }}>
//         <Typography component="h1" variant="h5">
//           Account Information
//         </Typography>
//         <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 100, height: 100 }}>
//           {/* Avatar Image Source */}
//           <img src="/path/to/profile.jpg" alt="Profile" style={{ width: '100%' }} />
//         </Avatar>
//         <Button variant="text" color="primary" sx={{ mt: 0.5, textTransform: 'none', '&:hover':{backgroundColor: 'inherit', color: '#00853E'}, fontSize: '1.25rem'}}>
//           Edit Profile Image
//         </Button>
//         <Box sx={{ mt: 2, width: '100%' }}>
//           <TextField
//             margin="normal"
//             fullWidth
//             label="Name"
//             name="name"
//             value={user.name}
//             onChange={handleChange}
//             variant="outlined"
//           />
//           <TextField
//             margin="normal"
//             fullWidth
//             label="Email"
//             name="email"
//             value={user.email}
//             onChange={handleChange}
//             variant="outlined"
//           />
//           <TextField
//             margin="normal"
//             fullWidth
//             label="Bio"
//             name="bio"
//             value={user.bio}
//             multiline
//             rows={4}
//             onChange={handleChange}
//             variant="outlined"
//           />
//           <Typography component="h2" variant="h6" sx={{ mt: 2 }}>
//             My Listings
//           </Typography>
//           <Box sx={{ display: 'flex', overflowX: 'scroll' }}>
//             {user.listings.map((listing, index) => (
//               <img key={index} src={listing} alt="Listing" style={{ width: 100, height: 100, marginRight: 8 }} />
//             ))}
//           </Box>
//           <Button variant="text" color="error" sx={{ mt: 2, mb: 2, width: '100%', textTransform: 'none', '&:hover':{backgroundColor: 'inherit', color: '#f00'}, fontSize: '1.0rem'}}>
//             Delete Account
//           </Button>
//           <Link component={RouterLink} to="/logout" variant="body2" style={{ display: 'block', textAlign: 'center', fontSize: '1.25rem' }}>
//             Log Out
//           </Link>
//         </Box>
//       </Box>
//     </Container>
//   );
// }
