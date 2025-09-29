import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SearchIcon from "@mui/icons-material/Search";
import {  usePublisherCrud } from '../../../api/hook/useUltility';

const PublisherListPage = () => {
  const { useGetListPublishers, useDeletePublisher} = usePublisherCrud();
  const deletePublisher = useDeletePublisher() 
  const { data: publishers = [], isLoading, error } = useGetListPublishers();
  const navigate = useNavigate()


  if (isLoading) return <p>Loading books...</p>;
  if (error) return <p>Error loading books</p>;

  const handleEdit = (id: string) => {
    navigate(`/admin/publisherEdit/${id}`);
    console.log("Edit product", id)
  
  };
  const handleRead = (id: string) => {
    navigate(`/admin/publisherDetail/${id}`);
    console.log("Add product", id)
    
  };

  const handleDelete = (id: string) => {
    deletePublisher.mutate(id);
    console.log("delete publisher", id)
    
  };
  


    const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex:1 },   
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
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>Publisher Manager</Typography>
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
              <Button  component={Link} to="/admin/publisherAdd" variant="contained" color="warning"> + Thêm danh mục</Button>
            </Box>
          <DataGrid
            rows={publishers}
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

export default PublisherListPage

