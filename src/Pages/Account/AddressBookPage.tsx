import { Box, Typography, Button, Stack } from "@mui/material";
import AddressCard from "../../Component/Client/AddressCard";
import { useAddAddressToser, useGetAddrressesUSer } from "../../api/hook/useUser";
import AddressModalAccount from "../../Component/Client/AddressModalAccount";
import { useState } from "react";


const AddressBookPage = () => {
  const { data: addresses = [], isLoading, error } = useGetAddrressesUSer();
  const [open, setOpen ]= useState(false)
  if (isLoading) return <p>Loading books...</p>;
  if (error) return <p>Error loading books</p>;
  
  const handleOpenModalAddress = () =>{
    setOpen(true)
  }
  
  const handleOnClose = () =>{
    setOpen(false)
  }

  return (
    <Box p={3} >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          Sổ địa chỉ
        </Typography>
        <Button onClick={handleOpenModalAddress} variant="contained" sx={{ bgcolor: "#c2410c", ":hover": { bgcolor: "#9a3412" } }}>
          + Thêm địa chỉ mới
        </Button>
      </Stack>
      <AddressModalAccount open={open} onClose={handleOnClose}/>
      <Stack direction="row" flexWrap="wrap" gap={2}>
        {addresses.map((addr) => (
          <AddressCard key={addr.id} name={addr.full_name} phone={addr.phone_number} address={addr.full_address} isDefault = {addr.is_default} id={addr.id}  />
        ))}
      </Stack>
    </Box>
  );
};

export default AddressBookPage;
