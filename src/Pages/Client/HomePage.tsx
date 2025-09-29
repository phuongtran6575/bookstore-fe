import { Box, Typography, Button, Container } from "@mui/material";

import BannerHomePage from "../../Component/Client/BannerHomePage";
import { useGetListBooks } from "../../api/hook/useBook";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate()
  const handleClick = (id: string) =>{
    navigate(`product/${id}`)
  }
  const {data: books = []} = useGetListBooks()
  return (
    <Box>
        <BannerHomePage/>
        {books.map(book => (
            <Button onClick={() => handleClick(book.id)} key={book.id}>{book.title}</Button>
        ))}
       
    </Box>
  );
};

export default HomePage;
