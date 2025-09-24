import { Box, Typography, Button, Stack } from "@mui/material";
import AddressCard from "../../Component/Client/AddressCard";
import { useGetAddrressesUSer } from "../../api/hook/useUser";


const AddressBookPage = () => {
  const { data: addresses = [], isLoading, error } = useGetAddrressesUSer();

  if (isLoading) return <p>Loading books...</p>;
  if (error) return <p>Error loading books</p>;
  

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
        {addresses.map((addr) => (
          <AddressCard key={addr.id} name={addr.full_name} phone={addr.phone_number} address={addr.full_address} isDefault = {addr.is_default}  />
        ))}
      </Stack>
    </Box>
  );
};

export default AddressBookPage;
