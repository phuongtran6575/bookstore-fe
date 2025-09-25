import {Modal,Box,Typography,TextField,Button,Stack,} from "@mui/material";
import { useState } from "react";
import { useAddAddressToser } from "../../api/hook/useUser";

interface AddressModalProps {
  open: boolean;
  onClose: () => void;
}

const AddressModalAccount = ({ open, onClose }: AddressModalProps) => {
  const addAddress = useAddAddressToser()
  const [form, setForm] = useState({
    full_name: "",
    phone_number: "",
    full_address: "",
    is_default: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    addAddress.mutate(form)
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
          <TextField  name="full_name" label="Họ tên người nhận" variant="outlined" fullWidth 
            value={form.full_name}
            onChange={handleChange}
            slotProps={{
              input: {
                sx: { bgcolor: "white" },  }, }} />

          <TextField name="phone_number" label="Số điện thoại" variant="outlined" fullWidth
            value={form.phone_number}
            onChange={handleChange}
            slotProps={{
              input: {sx: { bgcolor: "white" },  }, }} />

          <TextField name="full_address" label="Địa chỉ (Số nhà, đường)" variant="outlined"  fullWidth
            value={form.full_address}
            onChange={handleChange}
            slotProps={{
              input: {sx: { bgcolor: "white" }, }, }} />

          <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
            <Button onClick={onClose} variant="outlined" color="inherit"> Hủy </Button>
            <Button onClick={handleSave} variant="contained" sx={{ bgcolor: "orange" }}>
              Lưu địa chỉ
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddressModalAccount;
