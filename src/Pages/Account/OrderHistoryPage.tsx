import { Box, Typography, Chip, Link } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

const rows = [
  { id: 1, code: "DH123460", date: "19/8/2025", total: "132.000 ₫", status: "Chờ xác nhận" },
  { id: 2, code: "DH123459", date: "18/8/2025", total: "188.000 ₫", status: "Đang xử lý" },
  { id: 3, code: "DH123457", date: "15/7/2024", total: "286.000 ₫", status: "Đang giao" },
  { id: 4, code: "DH123458", date: "1/6/2024", total: "226.000 ₫", status: "Đã hủy" },
  { id: 5, code: "DH123456", date: "20/5/2024", total: "268.000 ₫", status: "Đã giao" },
];

const getStatusChip = (status: string) => {
  switch (status) {
    case "Chờ xác nhận":
      return <Chip label={status} color="default" size="small" />;
    case "Đang xử lý":
      return <Chip label={status} color="info" size="small" />;
    case "Đang giao":
      return <Chip label={status} color="warning" size="small" />;
    case "Đã hủy":
      return <Chip label={status} color="error" size="small" />;
    case "Đã giao":
      return <Chip label={status} color="success" size="small" />;
    default:
      return <Chip label={status} size="small" />;
  }
};

const columns: GridColDef[] = [
  { field: "code", headerName: "MÃ ĐƠN HÀNG", flex: 1, renderCell: (params) => (
    <Typography fontWeight="bold">{params.value}</Typography>
  )},
  { field: "date", headerName: "NGÀY ĐẶT", flex: 1 },
  { field: "total", headerName: "TỔNG TIỀN", flex: 1 },
  { 
    field: "status", 
    headerName: "TRẠNG THÁI", 
    flex: 1,
    renderCell: (params) => getStatusChip(params.value) 
  },
  {
    field: "detail",
    headerName: "",
    flex: 1,
    sortable: false,
    renderCell: () => (
      <Link href="#" underline="hover" color="warning.main" fontWeight="bold">
        Xem chi tiết
      </Link>
    ),
  },
];

const OrderHistoryPage = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Lịch sử đơn hàng
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        
        disableRowSelectionOnClick
        hideFooter
      />
    </Box>
  );
};

export default OrderHistoryPage;

