import { Box, Button, Divider, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useState } from "react";
import { useLogin } from "../../api/hook/useAuth";
import { useNavigate } from "react-router-dom";

const LoginPage = () =>
{
  const [form, setForm] = useState({email: "", password: ""})
  const { mutate: login, isPending, error } = useLogin();
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(form,{
      onSuccess: () =>{
        navigate("/account/accountdashboard")
      }
    }); // gọi useLogin -> tự động lưu token + user vào store
    
  };
    return (
        <Box mt={3}>
        <Typography variant="h6" fontWeight="bold">Chào mừng trở lại!</Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>Đăng nhập để tiếp tục</Typography>
        <TextField label="Email" fullWidth margin="normal" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <TextField label="Mật khẩu" fullWidth margin="normal" value={form.password} onChange={e => setForm({...form, password: e.target.value})}
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
          <Typography variant="body2" color="warning.main" sx={{ cursor: "pointer" }}> Quên mật khẩu? </Typography>
        </Box>
  
        <Button fullWidth variant="contained" onClick={handleLogin} disabled={isPending}
          sx={{
            bgcolor: "warning.main",
            "&:hover": { bgcolor: "warning.dark" },
            borderRadius: 2,
            py: 1.5,
            fontWeight: "bold",}}>
          ĐĂNG NHẬP
        </Button>
            {error && <p style={{ color: "red" }}>Login failed!</p>}
        <Divider sx={{ my: 3 }}>Hoặc tiếp tục với</Divider>
  
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button fullWidth  variant="outlined" startIcon={<FacebookIcon />} sx={{ borderRadius: 2 }}>Facebook </Button>
          <Button fullWidth variant="outlined" startIcon={<FacebookIcon />} sx={{ borderRadius: 2 }}>Facebook</Button>
        </Box>
      </Box>
    )
}
export default LoginPage;