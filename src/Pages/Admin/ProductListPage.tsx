import { Box, FormControl, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import type { Book } from '../../core/Types'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import SearchIcon from "@mui/icons-material/Search";

const ProductListPage = () => {
  const listBook: Book[] = [
    {
            id: 1,
            name: "Book 1",
            price: 10000,
            category: "Category 1",
            action: true
        },
        {
            id: 2,
            name: "Book 2",
            price: 20000,
            category: "Category 2",
            action: false
        },
        {
            id: 3,
            name: "Book 3",
            price: 30000,
            category: "Category 3",
            action: true
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
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>Product Manager</Typography>
        </Box>
        <Box sx={{border: "1px solid #e5e7eb", borderRadius: 2,  backgroundColor:"white", p:3}}>
          <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, }}>
              <TextField variant="outlined" placeholder="Tìm kiếm theo tên sách..." size="small" sx={{ width: "80%" }}
                slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="action" />
                        </InputAdornment>
                      ),
                    },
                  }}/>
              <FormControl size="small" sx={{ minWidth: 200 }}>
              <Select>
                <MenuItem value="all">Tất cả danh mục</MenuItem>
                <MenuItem value="novel">Tiểu thuyết</MenuItem>
                <MenuItem value="comic">Truyện tranh</MenuItem>
                <MenuItem value="science">Khoa học</MenuItem>
              </Select>
            </FormControl>
            </Box>
          <DataGrid
            rows={listBook}
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

export default ProductListPage
