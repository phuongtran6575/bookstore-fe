import { Box, Typography, TextField, Button,} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRoleCrud } from "../../../api/hook/useUser";

const RoleAddPage = () => {
  const { useCreateRole } = useRoleCrud();
  const navigate = useNavigate();
  const createUser = useCreateRole();
  const [formData, setFormData] = useState({
    name: "",

  });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.type === "number" ? Number(e.target.value) : e.target.value;
    setFormData(prev => ({ ...prev, [e.target.name]: val }));
  };


  const handleSave = () => {
    createUser.mutate(formData, {
      onSuccess: () => {
        alert("Thêm Role thành công!");
        // có thể điều hướng về danh sách sản phẩm
        navigate("/admin/roles");
      },
      onError: (err) => {
        console.error(err);
        alert("Có lỗi xảy ra khi thêm Role");
      },
    });
  };
  return (
    <Box p={3}>
      {/* Quay lại */}
      <Typography component={Link} to="/admin/roles" color="warning.main" sx={{ cursor: "pointer", mb: 2 }}>
    ← Quay lại danh sách sản phẩm
        
      </Typography>

      {/* Tiêu đề */}
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Thêm sản phẩm mới
      </Typography>

      <Box padding={3} margin={7} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
           <Typography fontWeight="bold" mb={2}>Thông tin cơ bản</Typography>

        <TextField fullWidth label="Tên User" name="name" size="small" sx={{ mb: 2 }} value={formData.name} onChange={handleChange} />
        
      </Box>


      {/* Nút */}
      <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="outlined">Hủy</Button>
        <Button onClick={handleSave} variant="contained" color="warning">
          Lưu sản phẩm
        </Button>
      </Box>
    </Box>
  );
};

export default RoleAddPage;
