import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import axios from "axios";
import BodyComponent from "./BodyComponent";

export default function HeaderComponent() {
  const [categoryList, setCategoryList] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryBlogs, setSelectedCategoryBlogs] = useState([]);
  useEffect(() => {
    axios.get("https://backend.kodehash.com/blog/category").then((res) => {
      setCategoryList(res.data.data.data);
      setSelectedCategory(res.data.data.data[0]);
    });
  }, []);

  useEffect(() => {
    if (!!selectedCategory?.id) {
      axios
        .get(
          `https://backend.kodehash.com/blog/blog-list?category_id=${selectedCategory.id}`
        )
        .then((res) => {
          setSelectedCategoryBlogs(res.data.data);
        });
    }
  }, [selectedCategory?.id]);

  const onChangeCategory = (id) => {
    setSelectedCategory(categoryList.find((e) => e.id === id));
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <Box>
              {categoryList?.map((item) => (
                <Button
                  key={item.id}
                  sx={{ color: "#fff" }}
                  onClick={() => onChangeCategory(item.id)}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ p: 3 }} width={1}>
          <Toolbar />
          <BodyComponent
            blogList={selectedCategoryBlogs}
            categoryId={selectedCategory?.id}
          />
        </Box>
      </Box>
    </>
  );
}
