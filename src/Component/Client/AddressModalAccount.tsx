import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";

interface AddressModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

const AddressModalAccount = ({ open, onClose, onSave }: AddressModalProps) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{ bgcolor: "white", width: 400, p: 3,  mx: "auto",  mt: "10%",  borderRadius: 2,  boxShadow: 24,}}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Thêm địa chỉ mới
        </Typography>

        <Stack spacing={2}>
          <TextField  name="name" label="Họ tên người nhận" variant="outlined" fullWidth 
            value={form.name}
            onChange={handleChange}
            slotProps={{
              input: {
                sx: { bgcolor: "white" },  }, }} />

          <TextField name="phone" label="Số điện thoại" variant="outlined" fullWidth
            value={form.phone}
            onChange={handleChange}
            slotProps={{
              input: {sx: { bgcolor: "white" },  }, }} />

          <TextField name="address" label="Địa chỉ (Số nhà, đường)" variant="outlined"  fullWidth
            value={form.address}
            onChange={handleChange}
            slotProps={{
              input: {sx: { bgcolor: "white" }, }, }} />

          <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
            <Button onClick={onClose} variant="outlined" color="inherit">
              Hủy
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              sx={{ bgcolor: "orange" }}
            >
              Lưu địa chỉ
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddressModalAccount;
