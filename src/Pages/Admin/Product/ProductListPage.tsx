import { Box, Button, IconButton, InputAdornment, Pagination, TextField, Typography } from '@mui/material'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import SearchIcon from "@mui/icons-material/Search";
import { useDeleteBook, useGetListBooks } from '../../../api/hook/useBook';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { Link, useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useState } from 'react';
const ProductListPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 5;


  const { data: response, isLoading, error } = useGetListBooks(page, pageSize);
  const books = response?.items ?? [];
  const total = response?.total ?? 0;
  const totalPages = Math.ceil(total / pageSize);
  console.log(books)
  const deleteBook = useDeleteBook();


  if (isLoading) return <p>Loading books...</p>;
  if (error) return <p>Error loading books</p>;

  const handleEdit = (id: string) => {
    navigate(`/admin/productEdit/${id}`);
    console.log("Edit product", id)

  };
  const handleRead = (id: string) => {
    navigate(`/admin/productDetail/${id}`);
    console.log("Add product", id)

  };

  const handleDelete = (id: string) => {
    deleteBook.mutate(id);
    console.log("delete product", id)

  };



  const columns: GridColDef[] = [
    { field: 'sku', headerName: 'SKU', flex: 1 },
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'price', headerName: 'Price', flex: 1 },
    { field: 'sale_price', headerName: 'Sale Price', flex: 1 },
    { field: 'stock_quantity', headerName: 'Stock', flex: 1 },
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
      <Box sx={{ border: "1px solid #e5e7eb", borderRadius: 2, backgroundColor: "white", p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, }}>
          <TextField variant="outlined" placeholder="Tìm kiếm theo tên sách..." size="small" sx={{ width: "30%" }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              },
            }} />
          <Button component={Link} to="/admin/productAdd" variant="contained" color="warning"> + Thêm sản phẩm </Button>
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
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
          shape="rounded"
        />
      </Box>
    </Box>

  )
}

export default ProductListPage
