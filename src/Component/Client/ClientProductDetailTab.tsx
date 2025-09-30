import { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid";
import ReviewTab from "./ReviewTab";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

interface ProductTabsProps {
  book: any;
  authors: any[];
  publishers: any[];
}

const ProductTabs = ({ book, authors, publishers }: ProductTabsProps) => {
  const [tabValue, setTabValue] = useState(0);

  const infoBoxStyle = {
    p: 2,
    borderRadius: 2,
    backgroundColor: "#f9fbfd",
  };

  return (
    <Box mt={4}>
      <Tabs sx={{ borderBottom: 1, borderColor: "divider" }} textColor="inherit"  indicatorColor="primary"
        value={tabValue}
        onChange={(_, newValue) => setTabValue(newValue)}>
        <Tab label="Mô tả sản phẩm" />
        <Tab label="Thông tin chi tiết" />
        <Tab label="Đánh giá (3)" />
      </Tabs>

      {/* Tab 1 */}
      <TabPanel value={tabValue} index={0}>
        <Typography>{book?.description || "Chưa có mô tả"}</Typography>
      </TabPanel>

      {/* Tab 2 */}
      <TabPanel value={tabValue} index={1}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 6 }}  >
            <Box sx={infoBoxStyle}>
              <Typography fontWeight="bold">Nhà xuất bản:</Typography>
              <Typography>
                {publishers?.length > 0 ? publishers.map((p: any) => p.name).join(", ") : "Đang cập nhật"}
              </Typography>
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Box sx={infoBoxStyle}>
              <Typography fontWeight="bold">Ngày xuất bản:</Typography>
              <Typography>{book?.publication_date || "Đang cập nhật"}</Typography>
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Box sx={infoBoxStyle}>
              <Typography fontWeight="bold">Số trang:</Typography>
              <Typography>{book?.page_count || "Đang cập nhật"}</Typography>
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Box sx={infoBoxStyle}>
              <Typography fontWeight="bold">Loại bìa:</Typography>
              <Typography>{book?.cover_type || "Đang cập nhật"}</Typography>
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Box sx={infoBoxStyle}>
              <Typography fontWeight="bold">Kích thước:</Typography>
              <Typography>{book?.size || "Đang cập nhật"}</Typography>
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Box sx={infoBoxStyle}>
              <Typography fontWeight="bold">Tác giả:</Typography>
              <Typography>
                {authors?.length > 0 ? authors.map((a: any) => a.name).join(", ") : "Đang cập nhật"}
              </Typography>
            </Box>
          </Grid2>
        </Grid2>
      </TabPanel>

      {/* Tab 3 */}
      <TabPanel value={tabValue} index={2}>
        <ReviewTab />
      </TabPanel>
      
    </Box>
  );
};

export default ProductTabs;
