import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Chip, Autocomplete } from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useRoleCrud, useUserCrud, useUserRoleRelationship } from "../../../api/hook/useUser";

const UserEditPage = () => {

  const { id } = useParams<{ id: string }>();
  const { useGetUserById, useUpdateUser } = useUserCrud();
  const {useRemoveRoleFromUser, useGetRolesByUserId, useAddRoleToUser} = useUserRoleRelationship();
  const {useGetListRoles} = useRoleCrud();

  const { data: user, isLoading, error } = useGetUserById(id || "");
  const { data: roles, isLoading: isLoadingRoles } = useGetRolesByUserId(id || "");
  const{ data: allRoles =[]} = useGetListRoles(); 

  const addRole = useAddRoleToUser();
  const removeRole = useRemoveRoleFromUser();
  const updateUser = useUpdateUser();
  const navigate = useNavigate();


  const [selectedRoles, setSelectedRoles] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (roles) {
      setSelectedRoles(roles); // roles từ API -> Autocomplete value
    }
  }, [roles]);

  if (!id) return <p>No user selected</p>;
  if (isLoading || isLoadingRoles) return <p>Loading...</p>;
  if (error) return <p>Failed to load user</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateUser.mutate(
      { id, data: formData },
      { onSuccess: () => navigate(`/admin/users`) }
    );
  };
   const handleRoleChange = (_e: any, value: any[]) => {
    const added = value.filter(
      (r) => !selectedRoles.find((sr) => sr.id === r.id)
    );
    const removed = selectedRoles.filter(
      (sr) => !value.find((r) => r.id === sr.id)
    );

    // thêm mới
    added.forEach((role) => {
      addRole.mutate({ leftId: id!, rightId: role.id });
    });

    // xoá bớt
    removed.forEach((role) => {
      removeRole.mutate({ leftId: id!, rightId: role.id });
    });

    setSelectedRoles(value); // cập nhật lại state
  };

  return (
    <Box p={3}>
      <Typography color="warning.main" sx={{ mb: 2 }}>
        <Link to={`/admin/users`}>← Quay lại danh sách user</Link>
      </Typography>

      <Typography variant="h5" fontWeight="bold" mb={3}>
        Chỉnh sửa user
      </Typography>

      <Box padding={3} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
        <TextField name="full_name" value={formData.full_name} onChange={handleChange} fullWidth label="Name" sx={{ mb: 2 }} />
        <TextField name="email" value={formData.email} onChange={handleChange} fullWidth label="Email" sx={{ mb: 2 }} />
        <TextField name="phone_number" value={formData.phone_number} onChange={handleChange} fullWidth label="Phone" sx={{ mb: 2 }} />
      
        <Autocomplete
          multiple
          options={allRoles || []}
          getOptionLabel={(option) => option.name}
          value={selectedRoles || []}
          onChange={handleRoleChange}
          isOptionEqualToValue={(option, value) => option.id === value.id} // 👈 fix trùng
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Chọn Roles" />
          )}
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              <Chip label={option.name} />
            </li>
          )}
        />

        

        <Box mt={2} display="flex" gap={2}>
          <Button variant="contained" onClick={handleSave}>Lưu</Button>
          <Button variant="outlined" onClick={() => navigate(`/admin/users`)}>Hủy</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UserEditPage;
