import { Button, Card, CardContent, Chip, Divider, Stack, Typography } from "@mui/material";

interface AddressCardProps  {
    name: string;
    phone: string;
    address: string;
    isDefault: boolean
}

const AddressCard = ({ name, phone, address, isDefault }: AddressCardProps) => {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        p: 2,
        flex: 1,
        minWidth: "300px",
      }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography fontWeight="bold">{name}</Typography>
          {isDefault && (
            <Chip
              label="Mặc định"
              size="small"
              color="success"
              sx={{ bgcolor: "rgba(34,197,94,0.1)", color: "green" }}
            />
          )}
        </Stack>
        <Typography>{phone}</Typography>
        <Typography whiteSpace="pre-line">{address}</Typography>

        <Divider sx={{ my: 1 }} />

        <Stack direction="row" spacing={2}>
          <Button size="small" color="warning">Sửa</Button>
          <Button size="small" color="error">Xóa</Button>
          {!isDefault && (
            <Button size="small">Đặt làm mặc định</Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
