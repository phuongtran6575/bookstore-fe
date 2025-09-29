import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Autocomplete, Chip, IconButton } from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useBookAuthorRelationship, useBookCategoryRelationship, useBookTagRelationship, useGetBookbyId, useGetImagesBook, useUpdateBook, useAddImageToBook, useRemoveImageFromBook, useSetThumbnailImage, useAddPublisherToBook, useRemovePublisherFromBook, useGetListPublishersBook } from '../../../api/hook/useBook';
import { useAuthorCrud, useCategoryCrud, usePublisherCrud, useTagCrud } from "../../../api/hook/useUltility";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Delete, Star, StarBorder } from "@mui/icons-material";

const ProductEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, error } = useGetBookbyId(id || "");
  

  const {useGetAuthorsByBookId ,useAddAuthorToBook, useRemoveAuthorFromBook} = useBookAuthorRelationship()
  const {useGetCategoriesByBookId ,useAddCategoryToBook, useRemoveCategoryFromBook} = useBookCategoryRelationship()
  const {useGetTagsByBookId ,useAddTagToBook, useRemoveTagFromBook} = useBookTagRelationship() 

  const {useGetListTags} = useTagCrud()
  const {useGetListAuthors} = useAuthorCrud()
  const {useGetListCategories} = useCategoryCrud()
  const {useGetListPublishers} = usePublisherCrud()
  
  const addAuthor = useAddAuthorToBook()
  const removeAuthor = useRemoveAuthorFromBook()
  const addCategory = useAddCategoryToBook()
  const removeCategory = useRemoveCategoryFromBook()
  const addPublisher = useAddPublisherToBook()
  const removePublisher = useRemovePublisherFromBook()
  const addTag = useAddTagToBook()
  const removeTag = useRemoveTagFromBook()
  const addImage = useAddImageToBook()
  const removeImage = useRemoveImageFromBook()


  const { data: tags, isLoading: isLoadingTags, error: errorTags } = useGetTagsByBookId(id || "");
  const{ data: allTags =[]} = useGetListTags();
  
  const { data: authors, isLoading: isLoadingAuthors, error: errorAuthors } = useGetAuthorsByBookId(id || "");
  const{ data: allAuthors =[]} = useGetListAuthors(); 

  const { data: publishers, isLoading: isLoadingPublishers, error: errorPublishers } = useGetListPublishersBook(id || "");
  const{ data: allPublishers =[]} = useGetListPublishers(); 

  const { data: categories, isLoading: isLoadinCategories, error: errorCategories } = useGetCategoriesByBookId(id || "");
  const{ data: allCategories =[]} = useGetListCategories(); 

  const { data: images, isLoading: isLoadingImages, error: errorImages } = useGetImagesBook(id || "");

  const [selectedAuthors, setSelectedAuthors] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const [selectedPublishers, setSelectedPublishers] = useState<any[]>([]);
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const [selectImages, setSelectedImages] = useState<any[]>([]);
  const setThumbnail = useSetThumbnailImage();


  const updateBook = useUpdateBook();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sku: "",
    price: 0,
    sale_price: 0,
    stock_quantity: 0,
    ISBN:"",
    page_count: 0,
    cover_type: "",
    publication_date: null as Date | null,
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        description: book.description || "",
        sku: book.sku || "",
        price: book.price || 0,
        sale_price: book.sale_price || 0,
        stock_quantity: book.stock_quantity || 0,
        ISBN: book.ISBN || "",
        page_count: book.page_count || 0,
        cover_type: book.cover_type || "",
        publication_date: book.publication_date ? new Date(book.publication_date) : null,      
      });
    }
  }, [book]);

  useEffect(() => {
    if (categories) {
      setSelectedCategories(categories); 
    }
  }, [categories]);

  useEffect(() => {
    if (authors) {
      setSelectedAuthors(authors); 
    }
  }, [authors]);

  useEffect(() => {
    if (publishers) {
      setSelectedPublishers(publishers); 
    }
  }, [publishers]);
  useEffect(() => {
    if (tags) {
      setSelectedTags(tags); 
    }
  }, [tags]);
  useEffect(() => {
  if (images) {
    setSelectedImages(images);
  }
}, [images]);

  if (!id) return <p>No user selected</p>;
  if (isLoading || isLoadingTags || isLoadingAuthors || isLoadingPublishers || isLoadinCategories ||isLoadingImages) return <p>Loading user...</p>;
  if (error || errorTags || errorAuthors || errorPublishers ||errorCategories || errorImages) return <p>Failed to load user</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, publication_date:new Date(e.target.value)  }));
  };

  
  const handleRemoveImage = (id: string) => {
    removeImage.mutate(id);
  };
  
   const handleSetThumbnail = (id: string) => {
    setThumbnail.mutate(id);
  };


  const handleSave = () => {
    updateBook.mutate(
      { id, data: formData },
      { onSuccess: () => navigate(`/admin/books`) }
    );
  };

  const handleCategoryChange = (_e: any, value: any[]) => {
    const added = value.filter(
      (r) => !selectedCategories.find((sr) => sr.id === r.id)
    );
    const removed = selectedCategories.filter(
      (sr) => !value.find((r) => r.id === sr.id)
    );

    added.forEach((category) => {
      addCategory.mutate({ leftId: id!, rightId: category.id });
    });

    removed.forEach((category) => {
      removeCategory.mutate({ leftId: id!, rightId: category.id });
    });

    setSelectedCategories(value); 
  };

  const handleAuthorChange = (_e: any, value: any[]) => {
    const added = value.filter(
      (r) => !selectedAuthors.find((sr) => sr.id === r.id)
    );
    const removed = selectedAuthors.filter(
      (sr) => !value.find((r) => r.id === sr.id)
    );

    added.forEach((author) => {
      addAuthor.mutate({ leftId: id!, rightId: author.id });
    });

    removed.forEach((author) => {
      removeAuthor.mutate({ leftId: id!, rightId: author.id });
    });

    setSelectedAuthors(value); 
  };

  const handlePublisherChange = (_e: any, value: any[]) => {
    const added = value.filter(
      (r) => !selectedPublishers.find((sr) => sr.id === r.id)
    );
    const removed = selectedPublishers.filter(
      (sr) => !value.find((r) => r.id === sr.id)
    );

    added.forEach((publisher) => {
      addPublisher.mutate({ product_id: id!, publisher_id: publisher.id });
    });

    removed.forEach((publisher) => {
      removePublisher.mutate({ product_id: id!, publisher_id: publisher.id });
    });

    setSelectedPublishers(value); 
  };

  const handleTagChange = (_e: any, value: any[]) => {
    const added = value.filter(
      (r) => !selectedTags.find((sr) => sr.id === r.id)
    );
    const removed = selectedTags.filter(
      (sr) => !value.find((r) => r.id === sr.id)
    );

    added.forEach((tag) => {
      addTag.mutate({ leftId: id!, rightId: tag.id });
    });

    removed.forEach((tag) => {
      removeTag.mutate({ leftId: id!, rightId: tag.id });
    });

    setSelectedTags(value); 
  };

  return (
    <Box p={3}>
      <Typography color="warning.main" sx={{ mb: 2 }}>
        <Link to={`/admin/books `}>← Quay lại danh sách Book</Link>
      </Typography>

      <Typography variant="h5" fontWeight="bold" mb={3}>
        Chỉnh sửa Book
      </Typography>

      <Box padding={3} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
        <TextField  defaultValue={book?.title} fullWidth label="Tên sách" size="small" sx={{ mb: 2 }} />
          <TextField fullWidth label="Tên sách" name="title" size="small" sx={{ mb: 2 }} value={formData.title} onChange={handleChange} />
        <TextField fullWidth label="Mô tả chi tiết" name="description" size="small" sx={{ mb: 2 }} multiline rows={4} value={formData.description} onChange={handleChange} />
        <TextField fullWidth label="SKU" name="sku" size="small" sx={{ mb: 2 }} value={formData.sku} onChange={handleChange} />
        <TextField fullWidth label="Giá" name="price" size="small" type="number" sx={{ mb: 2 }} value={formData.price} onChange={handleChange} />
        <TextField fullWidth label="Giá Sale" name="sale_price" size="small" type="number" sx={{ mb: 2 }} value={formData.sale_price} onChange={handleChange} />
        <TextField fullWidth label="ISBN" name="ISBN" size="small" sx={{ mb: 2 }} value={formData.ISBN} onChange={handleChange} />
        <TextField fullWidth label="Số lượng" name="stock_quantity" size="small" type="number" sx={{ mb: 2 }} value={formData.stock_quantity} onChange={handleChange} />
        <TextField fullWidth label="Số trang" name="page_count" size="small" type="number" sx={{ mb: 2 }} value={formData.page_count} onChange={handleChange} />
        <TextField fullWidth label="Loại" name="cover_type" size="small" sx={{ mb: 2 }} value={formData.cover_type} onChange={handleChange} />
        <TextField fullWidth label="Ngày phát hành" name="publication_date" size="small" type="date" sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} value={formData.publication_date? new Date(formData.publication_date).toISOString().split("T")[0]: ""} onChange={handleDateChange} />
        
        <Typography fontWeight="bold" mb={2}>Categories </Typography>
        <Autocomplete
          multiple sx={{ mb: 2 }}
          options={allCategories || []}
          getOptionLabel={(option) => option.name}
          value={selectedCategories || []}
          onChange={handleCategoryChange}
          isOptionEqualToValue={(option, value) => option.id === value.id} // 👈 fix trùng
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Chọn Categories" />
          )}
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              <Chip label={option.name} />
            </li>)}/>

        <Typography fontWeight="bold" mb={2}> Authors </Typography>
        <Autocomplete
          multiple sx={{ mb: 2 }}
          options={allAuthors || []}
          getOptionLabel={(option) => option.name}
          value={selectedAuthors || []}
          onChange={handleAuthorChange}
          isOptionEqualToValue={(option, value) => option.id === value.id} // 👈 fix trùng
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Chọn Authors" />
          )}
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              <Chip label={option.name} />
            </li>)}/>

        <Typography fontWeight="bold" mb={2}> Publishers </Typography>
        <Autocomplete
          multiple sx={{ mb: 2 }}
          options={allPublishers || []}
          getOptionLabel={(option) => option.name}
          value={selectedPublishers || []}
          onChange={handlePublisherChange}
          isOptionEqualToValue={(option, value) => option.id === value.id} // 👈 fix trùng
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Chọn Publishers" />
          )}
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              <Chip label={option.name} />
            </li>)}/>
        
        <Typography fontWeight="bold" mb={2}> Tags</Typography>
        <Autocomplete
          multiple sx={{ mb: 2 }}
          options={allTags || []}
          getOptionLabel={(option) => option.name}
          value={selectedTags || []}
          onChange={handleTagChange}
          isOptionEqualToValue={(option, value) => option.id === value.id} // 👈 fix trùng
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Chọn Tags" />
          )}
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              <Chip label={option.name} />
            </li>)}/>
        
        <Box padding={3} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
              <Typography fontWeight="bold" mb={2}> Upload & Preview ảnh </Typography>
              <Button variant="contained" component="label" sx={{ mb: 2 }}> Chọn ảnh
                <input type="file" accept="image/*" hidden multiple />
              </Button>

                {images && images.length > 0 ? (
                  <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={10}
                    slidesPerView={3}
                    style={{ width: "100%", height: "300px" }} >
                    {images.map((img: any) => (
                      <SwiperSlide key={img.id}>
                        <Box
                          component="img"
                          src={img.image_url}
                          alt={book?.title}
                          sx={{ width: "100%", height: "100%", objectFit: "cover",borderRadius: 2, border: "1px solid #e5e7eb", }} />
                        <IconButton
                          size="small"
                          sx={{ position: "absolute", top: 5,right: 5, bgcolor: "rgba(0,0,0,0.5)", color: "white", "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },}}
                          onClick={() => handleRemoveImage(img.id)} >
                          <Delete fontSize="small" />
                      </IconButton>
                      <IconButton size="small"
                        sx={{ position: "absolute", top: 5, left: 5,  bgcolor: "rgba(0,0,0,0.5)",  color: "white",  "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },}}
                        onClick={() => handleSetThumbnail(img.id)}>
                        {img.is_thumbnail ? <Star /> : <StarBorder />}
                      </IconButton>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : ( <Typography variant="body2" color="text.secondary"> Chưa có hình ảnh nào </Typography>)}
        </Box>
        <Box mt={2} display="flex" gap={2}>
          <Button variant="contained" onClick={handleSave}>Lưu</Button>
          <Button variant="outlined" onClick={() => navigate(`/admin/books`)}>Hủy</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductEditPage;
