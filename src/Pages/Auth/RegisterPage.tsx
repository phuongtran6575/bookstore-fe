import { Box, Button, Checkbox, Divider, FormControlLabel, TextField, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useState } from "react";
import { useRegister } from '../../api/hook/useAuth';
import { useNavigate } from "react-router-dom";

const RegisterPage = () =>
{
  const [form, setForm] = useState({email: "", password_hash: "", phone_number:"", full_name: ""})
  const {mutate: register, isPending, error } = useRegister()
  const navigate = useNavigate()
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    register(form, {
      onSuccess: () =>navigate("/auth/login")
    }); 
  };
    return (
        <Box mt={3}>
        <Typography variant="h6" fontWeight="bold">
          Tạo tài khoản mới
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Bắt đầu hành trình của bạn với chúng tôi
        </Typography>
  
        <TextField label="Họ và tên" fullWidth margin="normal" onChange={e => setForm({...form, full_name: e.target.value})} value={form.full_name} />
        <TextField label="Email" fullWidth margin="normal" onChange={e => setForm({...form, email: e.target.value})} value={form.email} />
        <TextField label="Mật khẩu" type="password" fullWidth margin="normal" onChange={e => setForm({...form, password_hash: e.target.value})} value={form.password_hash} helperText="Ít nhất 8 ký tự" />
        <TextField label="số điện thoại" fullWidth margin="normal" onChange={e => setForm({...form, phone_number: e.target.value })} value={form.phone_number} />
  
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
  
        <Button fullWidth variant="contained" onClick={handleRegister} disabled={isPending}
          sx={{ bgcolor: "warning.main",
            "&:hover": { bgcolor: "warning.dark" },
            borderRadius: 2,
            py: 1.5,
            fontWeight: "bold",}}>
          ĐĂNG KÝ
        </Button>
            {error && <p style={{ color: "red" }}>Login failed!</p>}
        <Divider sx={{ my: 3 }}>Hoặc tiếp tục với</Divider>
  
        <Box sx={{ display: "flex", gap: 2 }}> <Button fullWidth variant="outlined" startIcon={<FacebookIcon />} sx={{ borderRadius: 2 }} >
            Facebook
          </Button>
          <Button fullWidth variant="outlined" startIcon={<FacebookIcon />} sx={{ borderRadius: 2 }} >
            Facebook
          </Button>
        </Box>
      </Box>
    )
}
export default RegisterPage;