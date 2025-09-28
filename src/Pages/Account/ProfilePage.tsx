import { useEffect, useState } from "react";
import { Box, Typography, InputLabel, TextField, Stack, Button } from "@mui/material";
import { useUserCrud } from "../../api/hook/useUser";
import { useReadMe } from "../../api/hook/useAuth";
import { useNavigate } from "react-router-dom";
   // hook chứa updateUser

const ProfilePage = () => {
  const { useUpdateUser } = useUserCrud();
  const updateUser = useUpdateUser();
  const navigate = useNavigate()

  const [isDetail, setIsDetail] = useState(true);
  const { data: profile, isLoading, error } = useReadMe();

  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
  });

  // load dữ liệu từ profile vào form khi fetch xong
  useEffect(() => {
    if (profile?.user) {
      setFormData({
        full_name: profile.user.full_name,
        phone_number: profile.user.phone_number ?? "",
      });
    }
  }, [profile]);

  if (isLoading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading profile</p>;
  if (!profile?.user) return <p>No user found</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateUser.mutate(
      { id: profile.user.id, data: formData },
      {
        onSuccess: () => {
          setIsDetail(true); // quay về chế độ detail sau khi lưu
          navigate("/")
        },
      }
    );
  };

  const handleCancel = () => {
    // reset formData về dữ liệu gốc
    setFormData({
      full_name: profile.user.full_name,
      phone_number: profile.user.phone_number ?? "",
    });
    setIsDetail(true);
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold">
        Thông tin cá nhân
      </Typography>

      <Box padding={3} sx={{ mt: 3 }} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
        <InputLabel sx={{ mb: 1 }}>Tên</InputLabel>
        <TextField
          name="full_name"
          disabled={isDetail}
          value={formData.full_name}
          onChange={handleChange}
          fullWidth
          size="small"
          sx={{ mb: 2 }}
        />

        <InputLabel sx={{ mb: 1 }}>Email</InputLabel>
        <TextField
          disabled
          fullWidth
          value={profile.user.email}
          size="small"
          sx={{ mb: 2 }}
        />

        <InputLabel sx={{ mb: 1 }}>Số điện thoại</InputLabel>
        <TextField
          name="phone_number"
          disabled={isDetail}
          value={formData.phone_number}
          onChange={handleChange}
          fullWidth
          size="small"
          sx={{ mb: 2 }}
        />
      </Box>

      <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
        {!isDetail && (
          <Button variant="outlined" color="inherit" onClick={handleCancel}>
            Hủy
          </Button>
        )}

        {isDetail ? (
          <Button
            onClick={() => setIsDetail(false)}
            variant="contained"
            sx={{ bgcolor: "orange" }}
          >
            Sửa thông tin
          </Button>
        ) : (
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{ bgcolor: "orange" }}
          >
            Lưu thông tin
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default ProfilePage;
