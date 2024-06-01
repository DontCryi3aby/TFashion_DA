import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Card, Typography } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

function Search() {
  const [searchParams] = useSearchParams();
  const searchTitle = searchParams.get("title");

  const [productsSearch, setProductsSearch] = useState([]);
  const [titleSearch, setTitleSearch] = useState(searchTitle);

  const navigate = useNavigate();

  const handleSearchSubmit = async () => {
    navigate(`/products?title=${titleSearch}`);
  };

  const handleClearSearch = () => {
    setTitleSearch("");
  };

  return (
    <Box
      width={280}
      sx={{
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 1,
        position: "relative",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm"
          value={titleSearch}
          onChange={(e) => setTitleSearch(e.target.value)}
        />
        <ClearOutlinedIcon
          fontSize="small"
          sx={{ color: "#000", cursor: "pointer" }}
          onClick={handleClearSearch}
        />
      </Box>
      <SearchOutlinedIcon
        onClick={handleSearchSubmit}
        sx={{ color: "#000", cursor: "pointer", ml: 2 }}
      />

      <Card
        sx={{
          position: "absolute",
          top: "100%",
          left: 0,
          display: true ? "none" : "block",
        }}
      >
        ABC
      </Card>
    </Box>
  );
}

export default Search;
