import { Box } from "@mui/material";

const ContentArea = ({children}) => {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        width: "98vw",
        marginTop: "3vh",
        marginLeft: "0.5vw",
      }}
    >
      {children}
    </Box>
  );
};

export default ContentArea;