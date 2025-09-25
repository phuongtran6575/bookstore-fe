import { Box, Typography, TextField, Button, Autocomplete, Chip,} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import type {   Role, UserCreate } from "../../../core/Types";
import { useRoleCrud, useUserCrud, useUserRoleRelationship } from "../../../api/hook/useUser";

const UserAddPage = () => {
  const { useCreateUser } = useUserCrud();
  const { useAddRoleToUser } = useUserRoleRelationship();
  const {useGetListRoles} = useRoleCrud();

  const addRoleToUser = useAddRoleToUser();
  const navigate = useNavigate();
  const createUser = useCreateUser();
  
  const {data: roles = []} = useGetListRoles()
  const [formData, setFormData] = useState<UserCreate>({
    full_name: "",
    email: "",
    password_hash: "",
    phone_number: "",
  });
   const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.type === "number" ? Number(e.target.value) : e.target.value;
    setFormData(prev => ({ ...prev, [e.target.name]: val }));
  };


  const handleSave = () => {
    createUser.mutate(formData, {
      onSuccess: (newUser) => {
        console.log("Created user:", newUser);
        selectedRoles.forEach((role) => {
          addRoleToUser.mutate({ leftId: newUser.id, rightId: role.id });
        });
        alert("Thêm User thành công!");
        navigate("/admin/users");
      },
      onError: (err) => {
        console.error(err);
        alert("Có lỗi xảy ra khi thêm User");
      },
    });
  };
  return (
    <Box p={3}>
      {/* Quay lại */}
      <Typography component={Link} to="/admin/users" color="warning.main" sx={{ cursor: "pointer", mb: 2 }}>
    ← Quay lại danh sách sản phẩm
        
      </Typography>

      {/* Tiêu đề */}
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Thêm sản phẩm mới
      </Typography>

      <Box padding={3} margin={7} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
           <Typography fontWeight="bold" mb={2}>Thông tin cơ bản</Typography>

        <TextField fullWidth label="Tên User" name="full_name" size="small" sx={{ mb: 2 }} value={formData.full_name} onChange={handleChange} />
        <TextField fullWidth label="Email" name="email" size="small" sx={{ mb: 2 }} value={formData.email} onChange={handleChange} />
        
        <TextField fullWidth label="Password" name="password_hash" size="small"  sx={{ mb: 2 }} value={formData.password_hash} onChange={handleChange} />
        <TextField fullWidth label="Phone" name="phone_number" size="small"  sx={{ mb: 2 }} value={formData.phone_number} onChange={handleChange} />

        <Autocomplete
          multiple
          options={roles}
          getOptionLabel={(option) => option.name}
          value={selectedRoles}
          onChange={(_e, value) => setSelectedRoles(value)}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Chọn Roles" />
          )}
          // dùng renderOption thay cho renderTags
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              <Chip label={option.name} />
            </li>
          )}
        />

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

export default UserAddPage;
