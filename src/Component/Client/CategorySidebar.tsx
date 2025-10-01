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
    Button,
    FormGroup,
    Radio,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { useAuthorCrud, usePublisherCrud } from '../../api/hook/useUltility';
import StarIcon from '@mui/icons-material/Star';




const CategorySidebar = () => {
    const { useGetListAuthors } = useAuthorCrud();
    const { useGetListPublishers } = usePublisherCrud();

    const { data: authors = [] } = useGetListAuthors();
    const { data: publishers = [] } = useGetListPublishers();

    const [price, setPrice] = useState<number[]>([0, 500000]);

    const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
    const [selectedPublishers, setSelectedPublishers] = useState<string[]>([]);

    const [search, setSearch] = useState("");

    const [showAllAuthors, setShowAllAuthors] = useState(false);
    const [showAllPublishers, setShowAllPublishers] = useState(false);

    const [selectedRating, setSelectedRating] = useState<number | null>(null);

    const handlePriceChange = (_: Event, newValue: number | number[]) => {
        setPrice(newValue as number[]);
    };

    // toggle chung cho author / publisher
    const handleFilterToggle = (
        id: string,
        selected: string[],
        setSelected: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
        );
    };

    const filteredModels = (models: any[]) =>
        models.filter((a: any) =>
            a.name.toLowerCase().includes(search.toLowerCase())
        );

    const visibleFilter = (models: any[], showAll: boolean) =>
        showAll ? filteredModels(models) : filteredModels(models).slice(0, 6);

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
                <Button
                    size="small"
                    color="warning"
                    onClick={() => {
                        setSelectedAuthors([]);
                        setSelectedPublishers([]);
                        setSelectedRating(null);
                        setPrice([0, 500000]);
                    }}
                >
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
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{ mb: 1 }}
                    />
                    <FormGroup>
                        {visibleFilter(authors, showAllAuthors).map((author) => (
                            <FormControlLabel
                                key={author.id}
                                control={
                                    <Checkbox
                                        checked={selectedAuthors.includes(author.id)}
                                        onChange={() =>
                                            handleFilterToggle(author.id, selectedAuthors, setSelectedAuthors)
                                        }
                                    />
                                }
                                label={author.name}
                            />
                        ))}
                    </FormGroup>
                    {filteredModels(authors).length > 6 && (
                        <Button
                            size="small"
                            onClick={() => setShowAllAuthors(!showAllAuthors)}
                            sx={{ mt: 1 }}
                        >
                            {showAllAuthors ? "Thu gọn" : "Xem thêm"}
                        </Button>
                    )}
                </AccordionDetails>
            </Accordion>

            {/* Nhà xuất bản */}
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontWeight="bold">Nhà xuất bản</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField
                        size="small"
                        placeholder="Tìm nhà xuất bản..."
                        fullWidth
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{ mb: 1 }}
                    />
                    <FormGroup>
                        {visibleFilter(publishers, showAllPublishers).map((publisher) => (
                            <FormControlLabel
                                key={publisher.id}
                                control={
                                    <Checkbox
                                        checked={selectedPublishers.includes(publisher.id)}
                                        onChange={() =>
                                            handleFilterToggle(
                                                publisher.id,
                                                selectedPublishers,
                                                setSelectedPublishers
                                            )
                                        }
                                    />
                                }
                                label={publisher.name}
                            />
                        ))}
                    </FormGroup>
                    {filteredModels(publishers).length > 6 && (
                        <Button
                            size="small"
                            onClick={() => setShowAllPublishers(!showAllPublishers)}
                            sx={{ mt: 1 }}
                        >
                            {showAllPublishers ? "Thu gọn" : "Xem thêm"}
                        </Button>
                    )}
                </AccordionDetails>
            </Accordion>

            {/* Đánh giá */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontWeight="bold">Đánh giá</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <Box
                            key={rating}
                            display="flex"
                            alignItems="center"
                            sx={{ cursor: "pointer", mb: 1 }}
                            onClick={() => setSelectedRating(rating)}
                        >
                            <Radio
                                checked={selectedRating === rating}
                                onChange={() => setSelectedRating(rating)}
                                value={rating}
                                size="small"
                            />
                            {Array.from({ length: 5 }, (_, i) => (
                                <StarIcon
                                    key={i}
                                    sx={{
                                        color: i < rating ? "gold" : "#ccc",
                                        fontSize: 20,
                                    }}
                                />
                            ))}
                            <Typography variant="body2" sx={{ ml: 1 }}>
                                từ {rating} sao
                            </Typography>
                        </Box>
                    ))}
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default CategorySidebar;
