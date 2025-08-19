import { Box, Typography, Button, Card, CardContent, Divider, Chip, Stack } from "@mui/material";

const AddressCard = ({ name, phone, address, isDefault }: any) => {
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

const AddressBookPage = () => {
  const addresses = [
    {
      name: "Trần Thị An",
      phone: "0987654321",
      address: "123 Đường Sách, Phường Bến Nghé\nQuận 1, TP. Hồ Chí Minh",
      isDefault: true,
    },
    {
      name: "Trần Thị An",
      phone: "0987654321",
      address: "456 Chung cư Tri Thức, Tầng 10\nQuận 3, TP. Hồ Chí Minh",
      isDefault: false,
    },
    {
      name: "Văn phòng Công ty",
      phone: "02838123456",
      address: "789 Tòa nhà Office, Đường Công Nghệ\nTP. Thủ Đức, TP. Hồ Chí Minh",
      isDefault: false,
    },
  ];

  return (
    <Box p={3} >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          Sổ địa chỉ
        </Typography>
        <Button variant="contained" sx={{ bgcolor: "#c2410c", ":hover": { bgcolor: "#9a3412" } }}>
          + Thêm địa chỉ mới
        </Button>
      </Stack>

      <Stack direction="row" flexWrap="wrap" gap={2}>
        {addresses.map((addr, index) => (
          <AddressCard key={index} {...addr} />
        ))}
      </Stack>
    </Box>
  );
};

export default AddressBookPage;
