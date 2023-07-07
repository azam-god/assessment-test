import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import axios from "axios";
import BodyComponent from "./BodyComponent";
import Logo from "./logo.jfif";
import { useLocation, useNavigate } from "react-router";

function HeaderComponent() {
  const location = useLocation();
  const navigate = useNavigate();

  const [categoryList, setCategoryList] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryBlogs, setSelectedCategoryBlogs] = useState([]);
  useEffect(() => {
    axios.get("https://backend.kodehash.com/blog/category").then((res) => {
      let data = res.data.data.data;
      setCategoryList(data);

      let params = location?.pathname?.split("/");
      let id = parseInt(params[1]);

      if (!!id) {
        setSelectedCategory(data.find((e) => e.id === id));
      } else {
        setSelectedCategory(data[0]);
      }
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

  useEffect(() => {
    let params = location?.pathname?.split("/");
    let id = parseInt(params[1]);
    if (!!id && !!selectedCategory?.id && id !== selectedCategory?.id) {
      onChangeCategory(id);
    }
  }, [location]);

  const onChangeCategory = (id) => {
    navigate(`/${id}`);
    let category = categoryList.find((e) => e.id === id);
    setSelectedCategory(category);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <Box display="flex" alignItems="center">
              <img src={Logo} style={{ width: "32px", height: "32px" }} />
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
            categoryName={selectedCategory?.name}
          />
        </Box>
      </Box>
    </>
  );
}

export default HeaderComponent;
