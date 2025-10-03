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




type SidebarProps = {
    filters: {
        authorIds: string[];
        publisherIds: string[];
        categoryIds: string[];
        rating: number | null;
        price: number[];
    };
    setFilters: React.Dispatch<React.SetStateAction<any>>;
};

const CategorySidebar = ({ filters, setFilters }: SidebarProps) => {
    const { useGetListAuthors } = useAuthorCrud();
    const { useGetListPublishers } = usePublisherCrud();

    const { data: authors = [] } = useGetListAuthors();
    const { data: publishers = [] } = useGetListPublishers();

    const [search, setSearch] = useState("");
    const [showAllAuthors, setShowAllAuthors] = useState(false);
    const [showAllPublishers, setShowAllPublishers] = useState(false);

    // Toggle chọn author/publisher
    const handleFilterToggle = (id: string, key: "authorIds" | "publisherIds") => {
        setFilters((prev: any) => ({
            ...prev,
            [key]: prev[key].includes(id)
                ? prev[key].filter((x: string) => x !== id)
                : [...prev[key], id],
        }));
    };

    const handlePriceChange = (_: Event, newValue: number | number[]) => {
        setFilters((prev: any) => ({ ...prev, price: newValue as number[] }));
    };

    const filteredModels = (models: any[]) =>
        models.filter((a: any) =>
            a.name.toLowerCase().includes(search.toLowerCase())
        );

    const visibleFilter = (models: any[], showAll: boolean) =>
        showAll ? filteredModels(models) : filteredModels(models).slice(0, 6);

    return (
        <Box sx={{ width: 280, p: 2, borderRight: "1px solid #eee" }}>

            {/* Reset all */}
            <Button
                size="small"
                color="warning"
                onClick={() =>
                    setFilters({
                        authorIds: [],
                        publisherIds: [],
                        categoryIds: [],
                        rating: null,
                        price: [0, 500000],
                    })
                }
            >
                Xóa tất cả
            </Button>

            {/* Khoảng giá */}
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontWeight="bold">Khoảng giá</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Slider
                        value={filters.price}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={500000}
                        step={10000}
                    />
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
                                        checked={filters.authorIds.includes(author.id)}
                                        onChange={() => handleFilterToggle(author.id, "authorIds")}
                                    />
                                }
                                label={author.name}
                            />
                        ))}
                    </FormGroup>
                    {/* Nút xem thêm / thu gọn */}
                    {filteredModels(authors).length > 6 && (
                        <Button
                            size="small"
                            onClick={() => setShowAllAuthors((prev) => !prev)}
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
                        placeholder="Tìm tác giả..."
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
                                        checked={filters.publisherIds.includes(publisher.id)}
                                        onChange={() =>
                                            handleFilterToggle(publisher.id, "publisherIds")
                                        }
                                    />
                                }
                                label={publisher.name}
                            />
                        ))}
                    </FormGroup>
                    {/* Nút xem thêm / thu gọn */}
                    {filteredModels(publishers).length > 6 && (
                        <Button
                            size="small"
                            onClick={() => setShowAllPublishers((prev) => !prev)}
                        >
                            {showAllPublishers ? "Thu gọn" : "Xem thêm"}
                        </Button>
                    )}
                </AccordionDetails>
            </Accordion>
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
                        >
                            <Radio
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
