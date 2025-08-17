import { Box } from '@mui/material'
import React from 'react'
import type { Book } from '../../core/Types'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'

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
    { field: 'category', headerName: 'Category', width: 300 },
  ];

  return (
     <Box style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={listBook}
        columns={columns}
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
      />
    </Box>
  )
}

export default ProductListPage
