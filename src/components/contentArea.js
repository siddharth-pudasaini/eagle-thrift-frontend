import { Box } from "@mui/material";

const ContentArea = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "90vh",
        minWidth: "98vw",
        marginTop: "3vh",
        marginLeft: "0.5vw",
        marginBottom: "3vh",
      }}
    >
      {children}
    </Box>
  );
};

export default ContentArea;
