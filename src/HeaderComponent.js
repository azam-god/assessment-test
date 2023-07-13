import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import BodyComponent from "./BodyComponent";
import Button from "@mui/material/Button";
import Logo from "./logo.jfif";
import { useLocation, useNavigate } from "react-router";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

function HeaderComponent() {
  const location = useLocation();
  const navigate = useNavigate();

  const [categoryList, setCategoryList] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryBlogs, setSelectedCategoryBlogs] = useState([]);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleMobileMenuOpen = () => {
    setMobileMenuOpen(true);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <Box
              display="flex"
              alignItems="center"
              sx={{ flexGrow: 1 }}
              ml={{ xs: 1, md: 0 }}
            >
              <img src={Logo} style={{ width: "32px", height: "32px" }} />
              <Box
                sx={{ display: { xs: "none", md: "flex" }, ml: 2 }}
                alignItems="center"
              >
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
            </Box>
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMobileMenuOpen}
              >
                <MenuIcon />
              </IconButton>
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
      <Drawer
        anchor="right"
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <List>
          {categoryList?.map((item) => (
            <ListItem
              key={item.id}
              button
              onClick={() => {
                onChangeCategory(item.id);
                handleMobileMenuClose();
              }}
              selected={item.id === selectedCategory?.id}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default HeaderComponent;
