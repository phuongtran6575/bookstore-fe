import { Box, Button, Divider, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";

const LoginPage = () =>
{
    return (
        <Box mt={3}>
        <Typography variant="h6" fontWeight="bold">Chào mừng trở lại!</Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>Đăng nhập để tiếp tục</Typography>
        <TextField label="Email" fullWidth margin="normal" />
        <TextField label="Mật khẩu" fullWidth margin="normal"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton >
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <Box textAlign="right" mb={2}>
          <Typography variant="body2" color="warning.main" sx={{ cursor: "pointer" }}>
            Quên mật khẩu?
          </Typography>
        </Box>
  
        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "warning.main",
            "&:hover": { bgcolor: "warning.dark" },
            borderRadius: 2,
            py: 1.5,
            fontWeight: "bold",
          }}
        >
          ĐĂNG NHẬP
        </Button>
  
        <Divider sx={{ my: 3 }}>Hoặc tiếp tục với</Divider>
  
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<FacebookIcon />}
            sx={{ borderRadius: 2 }}
          >
            Facebook
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<FacebookIcon />}
            sx={{ borderRadius: 2 }}
          >
            Facebook
          </Button>
        </Box>
      </Box>
    )
}
export default LoginPage;