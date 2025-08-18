import { Box, Button, Checkbox, Divider, FormControlLabel, TextField, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";

const RegisterPage = () =>
{
    return (
        <Box mt={3}>
        <Typography variant="h6" fontWeight="bold">
          Tạo tài khoản mới
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Bắt đầu hành trình của bạn với chúng tôi
        </Typography>
  
        <TextField label="Họ và tên" fullWidth margin="normal" />
        <TextField label="Email" fullWidth margin="normal" />
        <TextField label="Mật khẩu" type="password" fullWidth margin="normal" helperText="Ít nhất 8 ký tự" />
        <TextField label="Xác nhận mật khẩu" type="password" fullWidth margin="normal" />
  
        <FormControlLabel
          control={<Checkbox color="warning" />}
          label={
            <Typography variant="body2">
              Tôi đồng ý với{" "}
              <Typography component="span" color="warning.main" sx={{ cursor: "pointer" }}>
                Điều khoản Dịch vụ
              </Typography>{" "}
              và{" "}
              <Typography component="span" color="warning.main" sx={{ cursor: "pointer" }}>
                Chính sách Bảo mật
              </Typography>
            </Typography>
          }
          sx={{ my: 2 }}
        />
  
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
          ĐĂNG KÝ
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
export default RegisterPage;