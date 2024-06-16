
import React from "react";

import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';



const NotFound=()=>{
    return (
      <Container maxWidth='sm'>
        <Alert severity="error">Page Not Found</Alert>
      </Container>
    );
}

export default NotFound