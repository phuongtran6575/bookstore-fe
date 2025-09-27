import {Modal,Box,Typography,TextField,Button,Stack,} from "@mui/material";
import { useEffect, useState } from "react";
import { useAddAddressToser, useUpdateAddress } from "../../api/hook/useUser";

interface AddressModalProps {
  open: boolean;
  onClose: () => void;
  address_id?: string;
  isEdit: boolean;
   initialData?: {
    full_name: string;
    phone_number: string;
    full_address: string;
    is_default: boolean;
  };
}

const AddressModalAccount = ({ open, onClose, isEdit, address_id, initialData }: AddressModalProps) => {
  const addAddress = useAddAddressToser()
  const updateAddress = useUpdateAddress()
  const [form, setForm] = useState({
    full_name: "",
    phone_number: "",
    full_address: "",
    is_default: false
  });

  useEffect(() => {
    if (isEdit && initialData) {
      setForm(initialData);
    } else {
      setForm({
        full_name: "",
        phone_number: "",
        full_address: "",
        is_default: false,
      });
    }
  }, [isEdit, initialData, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAddress = () => {
    addAddress.mutate(form,{
      onSuccess: () =>{
        setForm({
      full_name: "",
      phone_number: "",
      full_address: "",
      is_default: false,
    });}} )
    onClose();
  };


  const handleEditAddress = () => {
    if (!address_id) return;
    updateAddress.mutate(
      { id: address_id, data: form },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };


  const handleAddorEdit = () => {
  if (isEdit) {
    handleEditAddress();
  } else {
    handleAddAddress();
  }
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
            <Button onClick={handleAddorEdit} variant="contained" sx={{ bgcolor: "orange" }}>
              {isEdit ? "Lưu địa chỉ": "Lưu thay đổi"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddressModalAccount;
