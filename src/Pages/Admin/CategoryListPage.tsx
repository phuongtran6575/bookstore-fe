import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import type { Category } from '../../core/Types';
import axios from 'axios';

const CategoryListPage = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const fetchCategories = () => {
    axios.get(``).then(response =>{
      setCategories(response.data)
    }).catch(e => console.log(e))
  }
  useEffect(() =>{
    fetchCategories
  }, [])
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'slug', headerName: 'Slug', width: 200 },
    { field: 'amount', headerName: 'Amount', width: 200 },
    { field: 'action', headerName: 'Action', width: 200 },
  ];
  return (
    
    <Box> 
        <Typography variant='h6' sx={{ fontWeight: "bold", mb: 2 }}>Danh sách danh mục</Typography>
        <Box sx={{display:"flex", justifyContent:"center",gap: 3, alignItems:"center"}}>
          <Box sx={{backgroundColor:"white", flex: 1, p: 3, border: "1px solid #e5e7eb", borderRadius: 2 }}>
            <Typography variant="h6" mb={2}> Thêm Danh mục mới </Typography>
            
            <InputLabel>Tên danh mục</InputLabel>
            
            <TextField fullWidth  variant="outlined" size="small" margin="normal"/>
            
            <InputLabel>Chuỗi định danh (slug)</InputLabel>
            
            <TextField fullWidth  variant="outlined" size="small" margin="normal"/>
            
            <InputLabel>Danh mục cha</InputLabel>
            
            <FormControl fullWidth size="small" margin="normal">
              <Select defaultValue="">
                <MenuItem value="">Không có</MenuItem>
                <MenuItem value="1">Danh mục A</MenuItem>
                <MenuItem value="2">Danh mục B</MenuItem>
              </Select>
            </FormControl>
            
            <Button fullWidth variant="contained"
              sx={{ mt: 2, backgroundColor: "#d97706", "&:hover": { backgroundColor: "#b45309" } }}>
            Thêm mới
            </Button>
          </Box>
          <Box sx={{backgroundColor:"white", p:3, border: "1px solid #e5e7eb", borderRadius: 2}}>
            <DataGrid
              rows={categories}
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
              }}/>
          </Box>
        </Box>
    </Box>
  )
}

export default CategoryListPage
