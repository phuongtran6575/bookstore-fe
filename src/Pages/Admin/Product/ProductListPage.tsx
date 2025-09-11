import { Box, Button, FormControl, IconButton, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import SearchIcon from "@mui/icons-material/Search";
import { useBooks, useDeleteBook } from '../../../api/hook/useBook';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { Link, useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
const ProductListPage = () => {
  const navigate = useNavigate();
  const { data: books, isLoading, error } = useBooks();
  const deleteBook = useDeleteBook();

  if (isLoading) return <p>Loading books...</p>;
  if (error) return <p>Error loading books</p>;

  const handleEdit = (id: string) => {
    navigate(`/admin/productDetailandEdit/${id}`);
    console.log("Edit product", id)
  
  };
  const handleRead = (id: string) => {
    navigate(`/admin/productDetailandEdit/${id}`);
    console.log("Add product", id)
    
  };

  const handleDelete = (id: string) => {
    deleteBook.mutate(id);
    console.log("delete product", id)
    
  };
  


    const columns: GridColDef[] = [
    { field: 'sku', headerName: 'SKU', width: 100 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'price', headerName: 'Price', width: 120 },
    { field: 'sale_price', headerName: 'Sale Price', width: 120 },
    { field: 'stock_quantity', headerName: 'Stock', width: 100 },
    {
      field: "edit",
      headerName: "Edit",
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => handleEdit(params.row.id)}>
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
    {
      field: "get",
      headerName: "Read",
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => handleRead(params.row.id)}>
          <RemoveRedEyeIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>Product Manager</Typography>
        </Box>
        <Box sx={{border: "1px solid #e5e7eb", borderRadius: 2,  backgroundColor:"white", p:3}}>
          <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, }}>
              <TextField variant="outlined" placeholder="Tìm kiếm theo tên sách..." size="small" sx={{ width: "30%" }}
                slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="action" />
                        </InputAdornment>
                      ),
                    },
                  }}/>
              <Button  component={Link} to="/admin/productAdd" variant="contained" color="warning"> + Thêm sản phẩm </Button>
            </Box>
          <DataGrid
            rows={books}
            filterMode="server"
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
