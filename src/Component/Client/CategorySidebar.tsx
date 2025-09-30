import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Slider,
    TextField,
    Checkbox,
    FormControlLabel,
    Divider,
    Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { useAuthorCrud } from '../../api/hook/useUltility';



const CategorySidebar = () => {
    const { useGetListAuthors } = useAuthorCrud();
    const { data: authors = [], isLoading: isLoadingAuthors, error: errorAuthors } = useGetListAuthors();
    const [price, setPrice] = useState<number[]>([0, 500000]);
    const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);

    const handlePriceChange = (_: Event, newValue: number | number[]) => {
        setPrice(newValue as number[]);
    };

    const handleAuthorToggle = (authorId: string) => {
        setSelectedAuthors((prev) =>
            prev.includes(authorId)
                ? prev.filter((a) => a !== authorId)
                : [...prev, authorId]
        );
    };

    return (
        <Box sx={{ width: 280, p: 2, borderRight: "1px solid #eee" }}>
            {/* Tiêu đề */}
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Văn Học
            </Typography>

            {/* Bộ lọc + Xóa tất cả */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                    Bộ lọc
                </Typography>
                <Button size="small" color="warning">
                    Xóa tất cả
                </Button>
            </Box>

            {/* Khoảng giá */}
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontWeight="bold">Khoảng giá</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Slider
                        value={price}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={500000}
                        step={10000}
                    />
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2">{price[0].toLocaleString()}đ</Typography>
                        <Typography variant="body2">{price[1].toLocaleString()}đ</Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>

            {/* Tác giả */}
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontWeight="bold">Tác giả</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField
                        size="small"
                        placeholder="Tìm tác giả..."
                        fullWidth
                        sx={{ mb: 1 }}
                    />
                    {authors.map((author) => (
                        <FormControlLabel
                            key={author.id}
                            control={
                                <Checkbox
                                    checked={selectedAuthors.includes(author.id)}
                                    onChange={() => handleAuthorToggle(author.id)}
                                />
                            }
                            label={author.name}
                        />
                    ))}
                </AccordionDetails>
            </Accordion>

            {/* Nhà xuất bản */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontWeight="bold">Nhà xuất bản</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2">Danh sách NXB...</Typography>
                </AccordionDetails>
            </Accordion>

            {/* Đánh giá */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontWeight="bold">Đánh giá</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2">Các mức sao...</Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
export default CategorySidebar;