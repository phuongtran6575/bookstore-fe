import { Box, Typography, TextField, Button, Autocomplete, Chip,} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useBookAuthorRelationship, useBookCategoryRelationship, useBookPublisherRelationship, useBookTagRelationship, useCreateBook } from "../../../api/hook/useBook";
import { useState } from "react";
import type {  Author, Category, Publisher, Tag } from "../../../core/Types";
import { useAuthorCrud, useCategoryCrud, usePublisherCrud, useTagCrud } from "../../../api/hook/useUltility";

const ProductAddPage = () => {
  const {useAddCategoryToBook} = useBookCategoryRelationship();
  const {useAddAuthorToBook} = useBookAuthorRelationship();
  const {useAddPublisherToBook} = useBookPublisherRelationship();
  const {useAddTagToBook} = useBookTagRelationship();

  const {useGetListCategories} = useCategoryCrud();
  const {useGetListAuthors} = useAuthorCrud();
  const {useGetListPublishers} = usePublisherCrud();
  const {useGetListTags} = useTagCrud();


  const navigate = useNavigate();
  const createBook = useCreateBook();
  const addCategoryToBook = useAddCategoryToBook();
  const addAuthorToBook = useAddAuthorToBook();
  const addPublisherToBook = useAddPublisherToBook();
  const addTagToBook = useAddTagToBook();
  
  const {data: categories = []} = useGetListCategories();
  const {data: authors = []} = useGetListAuthors();
  const {data: publishers = []} = useGetListPublishers();
  const {data: tags = []} = useGetListTags();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sku: "",
    price: 0,
    sale_price: 0,
    ISBN: "",
    stock_quantity: 0,
    page_count: 0,
    cover_type: "",
    publication_date: null as Date | null,
    
  });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.type === "number" ? Number(e.target.value) : e.target.value;
    setFormData(prev => ({ ...prev, [e.target.name]: val }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, publication_date:new Date(e.target.value)  }));
  };

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<Author[]>([]);
  const [selectedPublishers, setSelectedPublishers] = useState<Publisher[]>([]);

  

  const handleSave = () => {
    createBook.mutate(formData, {
      onSuccess: (newBook) => {
        selectedCategories.forEach((category) => {
          addCategoryToBook.mutate({ leftId: newBook.id, rightId: category.id });
          
        });
        selectedAuthors.forEach((author) => {
          addAuthorToBook.mutate({ leftId: newBook.id, rightId: author.id });
          console.log(newBook.id)
          console.log(author.id)
        });
        selectedTags.forEach((publisher) => {
          addPublisherToBook.mutate({ leftId: newBook.id, rightId: publisher.id });
        });
        selectedTags.forEach((tag) => {
          addTagToBook.mutate({ leftId: newBook.id, rightId: tag.id });
        });
        alert("Thêm sách thành công!");
        // có thể điều hướng về danh sách sản phẩm
        navigate("/admin/books");
      },
      onError: (err) => {
        console.error(err);
        alert("Có lỗi xảy ra khi thêm sách");
      },
    });
  };
  return (
    <Box p={3}>
      {/* Quay lại */}
      <Typography component={Link} to="/admin/books" color="warning.main" sx={{ cursor: "pointer", mb: 2 }}>
    ← Quay lại danh sách sản phẩm
        
      </Typography>

      {/* Tiêu đề */}
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Thêm sản phẩm mới
      </Typography>

      <Box padding={3} margin={7} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
           <Typography fontWeight="bold" mb={2}>Thông tin cơ bản</Typography>

        <TextField fullWidth label="Tên sách" name="title" size="small" sx={{ mb: 2 }} value={formData.title} onChange={handleChange} />
        <TextField fullWidth label="Mô tả chi tiết" name="description" size="small" sx={{ mb: 2 }} multiline rows={4} value={formData.description} onChange={handleChange} />
        <TextField fullWidth label="SKU" name="sku" size="small" sx={{ mb: 2 }} value={formData.sku} onChange={handleChange} />
        <TextField fullWidth label="Giá" name="price" size="small" type="number" sx={{ mb: 2 }} value={formData.price} onChange={handleChange} />
        <TextField fullWidth label="Giá Sale" name="sale_price" size="small" type="number" sx={{ mb: 2 }} value={formData.sale_price} onChange={handleChange} />
        <TextField fullWidth label="Số lượng" name="stock_quantity" size="small" type="number" sx={{ mb: 2 }} value={formData.stock_quantity} onChange={handleChange} />
        <TextField fullWidth label="Số trang" name="page_count" size="small" type="number" sx={{ mb: 2 }} value={formData.page_count} onChange={handleChange} />
        <TextField fullWidth label="ISBN" name="ISBN" size="small" sx={{ mb: 2 }} value={formData.ISBN} onChange={handleChange} />
        <TextField fullWidth label="Loại" name="cover_type" size="small" sx={{ mb: 2 }} value={formData.cover_type} onChange={handleChange} />
        <TextField fullWidth label="Ngày phát hành" name="publication_date" size="small" type="date" sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} value={formData.publication_date ? formData.publication_date.toISOString().split("T")[0] : ""} onChange={handleDateChange} />
        
        <Autocomplete
          multiple
          options={categories}
          getOptionLabel={(option) => option.name}
          value={selectedCategories}
          onChange={(_e, value) => setSelectedCategories(value)}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Chọn Danh mục" />
          )}
          // dùng renderOption thay cho renderTags
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              <Chip label={option.name} />
            </li>
          )}
        />

        <Autocomplete
          multiple
          options={authors}
          getOptionLabel={(option) => option.name}
          value={selectedAuthors}
          onChange={(_e, value) => setSelectedAuthors(value)}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Chọn tác giả" />
          )}
          // dùng renderOption thay cho renderTags
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              <Chip label={option.name} />
            </li>
          )}
        />

        <Autocomplete
          multiple
          options={publishers}
          getOptionLabel={(option) => option.name}
          value={selectedPublishers}
          onChange={(_e, value) => setSelectedPublishers(value)}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Chọn nhà xuất bản" />
          )}
          // dùng renderOption thay cho renderTags
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              <Chip label={option.name} />
            </li>
          )}
        />

        <Autocomplete
          multiple
          options={tags}
          getOptionLabel={(option) => option.name}
          value={selectedTags}
          onChange={(_e, value) => setSelectedTags(value)}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Chọn tag" />
          )}
          // dùng renderOption thay cho renderTags
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              <Chip label={option.name} />
            </li>
          )}
        />

      </Box>

      {/* Nút */}
      <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="outlined">Hủy</Button>
        <Button onClick={handleSave} variant="contained" color="warning">
          Lưu sản phẩm
        </Button>
      </Box>
    </Box>
  );
};

export default ProductAddPage;
