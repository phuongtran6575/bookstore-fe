import { Button, Card, CardContent, Chip, Divider, Stack, Typography } from "@mui/material";
import {  useRemoveAddressFromUser, useSetDefaultAddress } from "../../api/hook/useUser";

interface AddressCardProps  {
    name: string;
    phone: string;
    address: string;
    isDefault: boolean;
    id: string
    onEdit: () => void
}

const AddressCard = ({ name, phone, address, isDefault, id, onEdit }: AddressCardProps) => {
  const deleteAddress = useRemoveAddressFromUser()
  const setDefaultAddress = useSetDefaultAddress();

  const handleSetDefault = (id: string) => {
    setDefaultAddress.mutate(id);
  };

  const handleDelete = (id: string) =>{
    deleteAddress.mutate(id)
  }
  return (
    <Card variant="outlined"
      sx={{ borderRadius: 2,  p: 2, flex: 1, minWidth: "300px",}}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography fontWeight="bold">{name}</Typography>
          {isDefault && (
            <Chip label="Mặc định" size="small" color="success" sx={{ bgcolor: "rgba(34,197,94,0.1)", color: "green" }}/> )}
        </Stack>
        <Typography>{phone}</Typography>
        <Typography whiteSpace="pre-line">{address}</Typography>

        <Divider sx={{ my: 1 }} />

        <Stack direction="row" spacing={2}>
          <Button onClick={onEdit} size="small" color="warning">Sửa</Button>
          <Button onClick={() => handleDelete(id)} size="small" color="error">Xóa</Button>
          {!isDefault && (
            <Button onClick={() => handleSetDefault(id)} size="small">Đặt làm mặc định</Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
