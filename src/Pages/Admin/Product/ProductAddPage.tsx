import { Box, Typography, TextField, Button, Autocomplete, Chip, IconButton,} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAddImageToBook, useBookAuthorRelationship, useBookCategoryRelationship, useBookPublisherRelationship, useBookTagRelationship, useCreateBook } from "../../../api/hook/useBook";
import { useState } from "react";
import type {  Author, Category, Publisher, Tag } from "../../../core/Types";
import { useAuthorCrud, useCategoryCrud, usePublisherCrud, useTagCrud } from "../../../api/hook/useUltility";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Delete } from "@mui/icons-material";

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
  const addImageToBook = useAddImageToBook();
  
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

  const [images, setImages] = useState<File[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    setImages((prev) => [...prev, ...filesArray]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

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

  

  const handleSave = async () => {
  createBook.mutate(formData, {
    onSuccess: async (newBook) => {
      selectedCategories.forEach((category) => {
        addCategoryToBook.mutate({ leftId: newBook.id, rightId: category.id });
      });
      selectedAuthors.forEach((author) => {
        addAuthorToBook.mutate({ leftId: newBook.id, rightId: author.id });
      });
      selectedPublishers.forEach((publisher) => {
        addPublisherToBook.mutate({ leftId: newBook.id, rightId: publisher.id });
      });
      selectedTags.forEach((tag) => {
        addTagToBook.mutate({ leftId: newBook.id, rightId: tag.id });
      });

      // Giả lập ảnh với picsum
      for (let i = 0; i < 6; i++) {
        const randomId = Math.floor(Math.random() * 1000);
        const image_url = `https://picsum.photos/id/${randomId}/600/800`;
        await addImageToBook.mutateAsync({
          image_url,
          book_id: newBook.id,
        });
        // if (i === 0) await setThumbnailImage.mutateAsync(imageId)
      }

      alert("Thêm sách thành công!");
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
          multiple sx={{ mb: 2 }}
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
            </li> )} />

        <Autocomplete
          multiple sx={{ mb: 2 }}
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
            </li>  )} />

        <Autocomplete
          multiple sx={{ mb: 2 }}
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
            </li> )} />

        <Autocomplete
          multiple sx={{ mb: 2 }}
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
            </li> )}/>

      </Box>
      <Box padding={3} margin={7} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white" >
        <Typography fontWeight="bold" mb={2}> Upload & Preview ảnh </Typography>
        {/* Nút upload */}
        <Button variant="contained" component="label" sx={{ mb: 2 }}> Chọn ảnh
          <input type="file" accept="image/*" hidden multiple onChange={handleImageUpload}/>
        </Button>
        {/* Swiper preview ảnh */}
        {images.length > 0 && (
          <Swiper spaceBetween={10} slidesPerView={3} navigation  modules={[Navigation]} style={{ width: "100%", height: "250px" }}>
            {images.map((file, index) => (
              <SwiperSlide key={index}>
                <Box sx={{ position: "relative", width: "100%", height: "100%",}}>
                  <img src={URL.createObjectURL(file)}
                    alt={`preview-${index}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px", }} />
                  <IconButton
                    size="small"
                    sx={{ position: "absolute", top: 5,right: 5, bgcolor: "rgba(0,0,0,0.5)", color: "white", "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },}}
                    onClick={() => handleRemoveImage(index)} >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

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
