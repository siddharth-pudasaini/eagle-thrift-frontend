import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';

export default function AccountInfo() {
    const [name, setName] = React.useState('Name of the User');
    const [email, setEmail] = React.useState('name@domain.com');
    const [bio, setBio] = React.useState('A description of this user.');
    const [image, setImage] = React.useState('/path/to/profile.jpg');
    const fileInputRef = React.useRef(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <Container component="main" sx={{ minHeight: '100vh', overflowY: 'auto' }}>
            <Typography variant="h6" component="div" sx={{ padding: 2, textAlign: 'center' }}>
                Account Information
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ width: 56, height: 56 }} src={image} />
                <Button variant="text" color="primary" sx={{ mt: 0.5, textTransform: 'none', '&:hover': { backgroundColor: 'inherit', color: '#00853E' }, fontSize: '1.25rem' }} onClick={triggerFileInput}>
                    Edit profile image
                </Button>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>
            <List component="nav">
                <ListItem>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <TextField
                        label="Bio"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </ListItem>
                <Divider />
            </List>
            <Typography variant="h6" component="div" sx={{ padding: 2 }}>
                My Listings
            </Typography>
            <div style={{ display: 'flex', overflowX: 'scroll', padding: 2 }}>
                {Array(5).fill('/path/to/listing/image.jpg').map((src, index) => (
                    <img key={index} src={src} alt={`Listing ${index}`} style={{ width: 100, height: 100, marginRight: 8 }} />
                ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <Button variant="text" color="error" sx={{ mt: 0.8, mb: 0.5, textTransform: 'none', '&:hover': { backgroundColor: 'inherit', color: '#f00' }, fontSize: '1.0rem' }}>
                    Delete Account
                </Button>
                <Button variant="text" color="primary" sx={{ mt: 0.1, mb: 1, textTransform: 'none', '&:hover': { backgroundColor: 'inherit', color: '#00853E' }, fontSize: '1.25rem' }}>
                    Log Out
                </Button>
            </div>
        </Container>
    );
}
