import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import SearchIcon from "@mui/icons-material/Search";
import React from 'react'
import type { Customer } from '../../core/Types';

const CustomerListPage = () => {
  const listCustomer: Customer[] = [
    {
      id: 1,
      name: "Customer 1",
      Budget: 10000,
    },
    {
      id: 2,
      name: "Customer 2",
      Budget: 20000,
    }
  ]
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'Product Name', width: 200 },
    { field: 'price', headerName: 'Price', width: 200 },
    { field: 'category', headerName: 'Category', width: 200 },
  ];
  return (
    <Box> 
        <Typography variant='h6' sx={{ fontWeight: "bold", mb: 2 }}>Customer List Page</Typography>
        <Box sx={{border: "1px solid #e5e7eb", borderRadius: 2,  backgroundColor:"white", p:3}}>
          <TextField variant="outlined" placeholder="Tìm kiếm theo tên sách..." size="small" sx={{ mb:4, width: "100%" }}
                  slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon color="action" />
                          </InputAdornment>
                        ),
                      },
                    }}/>
          <DataGrid
            rows={listCustomer}
            columns={columns}
            pageSizeOptions={[5, 10]}
            disableColumnMenu
            hideFooter 
            sx={{
              "& .MuiDataGrid-columnHeader": {
              backgroundColor: "#fffcfc", // nền xanh dương nhạt
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                color: "black",             // chữ đen
                fontWeight: "bold",
                
              },
            }}
          />
      </Box>
    </Box>
  )
}

export default CustomerListPage
