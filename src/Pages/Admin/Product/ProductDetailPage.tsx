import { Box,  Chip,  TextField, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useBookAuthorRelationship, useBookCategoryRelationship, useBookPublisherRelationship, useBookTagRelationship, useGetBookbyId } from '../../../api/hook/useBook';
const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>(); 
  const {useGetCategoriesByBookId} = useBookCategoryRelationship();
  const {useGetAuthorsByBookId} = useBookAuthorRelationship();
  const {useGetPublishersByBookId} = useBookPublisherRelationship();
  const {useGetTagsByBookId} = useBookTagRelationship();

  if (!id) return <p>No product selected</p>;
  const { data: book, isLoading, error } = useGetBookbyId(id);
  const {data: categories, isLoading: isLoadingCategories, error: errorCategories  } = useGetCategoriesByBookId(id);
  const {data: authors, isLoading: isLoadingAuthors, error: errorAuthors  } = useGetAuthorsByBookId(id);
  const {data: publishers, isLoading: isLoadingPublishers, error: errorPublishers  } = useGetPublishersByBookId(id);
  const {data: tags, isLoading: isLoadingTags, error: errorTags  } = useGetTagsByBookId(id);

  if (!id) return <p>No user selected</p>;
  if (isLoading || isLoadingCategories || isLoadingAuthors || isLoadingPublishers || isLoadingTags) return <p>Loading user...</p>;
  if (error || errorCategories || errorAuthors || errorPublishers || errorTags) return <p>Failed to load user</p>;

  return (
    <Box p={3}>
      {/* Quay lại */}
      <Typography color="warning.main" sx={{ cursor: "pointer", mb: 2 }}>
       <Link to="/admin/books">← Quay lại danh sách sản phẩm</Link>
      </Typography>
      {/* Tiêu đề */}
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Thông tin sản phẩm
      </Typography>

      <Box padding={3} margin={7} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
          <Typography fontWeight="bold" mb={2}>Thông tin cơ bản</Typography>
          <TextField disabled defaultValue={book?.title} fullWidth label="Tên sách" size="small" sx={{ mb: 2 }} />
          <TextField disabled defaultValue={book?.description} fullWidth label="Mô tả chi tiết" sx={{ mb: 2 }} size="small" multiline rows={4} />
          <TextField disabled defaultValue={book?.sku} fullWidth label="SKU" size="small" sx={{ mb: 2 }} />
          <TextField disabled defaultValue={book?.price} fullWidth label="Giá" size="small" sx={{ mb: 2 }} />
          <TextField disabled defaultValue={book?.sale_price} fullWidth label="Giá Sale" size="small" sx={{ mb: 2 }} />
          <TextField disabled defaultValue={book?.stock_quantity} fullWidth label="Số lượng" size="small" sx={{ mb: 2 }} />
          <TextField disabled defaultValue={book?.page_count} fullWidth label="Số trang" size="small" sx={{ mb: 2 }} />
          <TextField disabled defaultValue={book?.ISBN} fullWidth label="ISBN" size="small" sx={{ mb: 2 }} />
          <TextField disabled defaultValue={book?.cover_type} fullWidth label="Loại" size="small" sx={{ mb: 2 }} />
          <TextField disabled defaultValue={book?.publication_date} fullWidth label="Ngày phát hành" size="small" sx={{ mb: 2 }} />
          <TextField disabled defaultValue={book?.created_at} fullWidth label="Create ngày" size="small" sx={{ mb: 2 }} />
          <TextField disabled defaultValue={book?.updated_at} fullWidth label="Update ngày" size="small" sx={{ mb: 2 }} />
      </Box>
      <Box padding={3} margin={7} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
            
            
            <Typography fontWeight="bold" mb={2}>
              Categories
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <Chip
                    key={category.id}
                    label={category.name}   
                    color="primary"
                    variant="outlined"
                  />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Chưa có Category nào
                </Typography>
              )}
            </Box>


            <Typography fontWeight="bold" mb={2}>
              Authors
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
              {authors && authors.length > 0 ? (
                authors.map((author) => (
                  <Chip
                    key={author.id}
                    label={author.name}   
                    color="primary"
                    variant="outlined"
                  />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Chưa có Author nào
                </Typography>
              )}
            </Box>


            <Typography fontWeight="bold" mb={2}>
              Publishers
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
              {publishers && publishers.length > 0 ? (
                publishers.map((publisher) => (
                  <Chip
                    key={publisher.id}
                    label={publisher.name}   
                    color="primary"
                    variant="outlined"
                  />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Chưa có Publishers nào
                </Typography>
              )}
            </Box>


            <Typography fontWeight="bold" mb={2}>
              Tags
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
              {tags && tags.length > 0 ? (
                tags.map((tag) => (
                  <Chip
                    key={tag.id}
                    label={tag.name}   
                    color="primary"
                    variant="outlined"
                  />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Chưa có Tags nào
                </Typography>
              )}
            </Box>
        </Box>

      
    </Box>
  )
}

export default ProductDetailPage
