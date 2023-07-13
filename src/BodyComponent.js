import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DOMPurify from "dompurify";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

export default function BodyComponent(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation();

  const { blogList, categoryId, categoryName } = props;
  const [selectedPost, setSelectedPost] = useState(blogList[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  useEffect(() => {
    let params = location?.pathname?.split("/");
    let slug = params[2];
    if (!!slug) {
      let index = blogList.findIndex((e) => e.slug === slug);
      setSelectedPost(blogList[index]);
      setCurrentIndex(index);
    } else if (categoryName === blogList[0]?.category) {
      setSelectedPost(blogList[0]);
      setCurrentIndex(0);
      if (!!categoryId && !!blogList[0]) {
        navigate(`/${categoryId}/${blogList[0]?.slug}`);
      }
    }
  }, [blogList.length, categoryId, blogList[0]?.id]);

  const onChangePost = (id) => {
    let index = blogList.findIndex((e) => e.id === id);
    setSelectedPost(blogList[index]);
    setCurrentIndex(index);
    navigate(`/${categoryId}/${blogList[index]?.slug}`);
  };

  const backClick = () => {
    setSelectedPost(blogList[currentIndex - 1] ?? null);
    setCurrentIndex(currentIndex - 1);
    navigate(`/${categoryId}/${blogList[currentIndex - 1]?.slug}`);
  };

  const nextClick = () => {
    setSelectedPost(blogList[currentIndex + 1] ?? null);
    setCurrentIndex(currentIndex + 1);
    navigate(`/${categoryId}/${blogList[currentIndex + 1]?.slug}`);
  };

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        height="auto"
        width={1}
      >
        {isMobile ? (
          <>
            <Box width={1} mb={2}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleMenuOpen}
                aria-controls="blog-menu"
                aria-haspopup="true"
              >
                Select Blog
              </Button>
              <Menu
                id="blog-menu"
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
              >
                {blogList.map((b) => (
                  <MenuItem
                    key={b.id}
                    onClick={() => {
                      onChangePost(b.id);
                      handleMenuClose();
                    }}
                  >
                    {b.blog_title}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box ml={0} width={1} display="flex" flexDirection="column">
              <img src={selectedPost?.image} alt={selectedPost?.alt_image} />
              <div
                style={{
                  padding: "10px",
                  fontSize: "17px",
                  textAlign: "center",
                }}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(selectedPost?.long_description),
                }}
              ></div>
              <Box display="flex">
                <Button
                  disabled={currentIndex === 0}
                  onClick={backClick}
                  variant="outlined"
                >
                  Previous
                </Button>
                <Box flexGrow={1} />
                <Button
                  disabled={currentIndex === blogList.length - 1}
                  onClick={nextClick}
                  variant="contained"
                >
                  Next
                </Button>
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Box
              width={0.2}
              maxHeight="90vh"
              style={{
                overflowY: "scroll",
                position: "fixed",
              }}
            >
              <List>
                {blogList.map((b) => {
                  return (
                    <ListItem key={b.id} selected={b.id === selectedPost?.id}>
                      <ListItemButton onClick={() => onChangePost(b.id)}>
                        <ListItemText primary={b.blog_title} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
            <Box ml="22%" width={0.8} display="flex" flexDirection="column">
              <img src={selectedPost?.image} alt={selectedPost?.alt_image} />
              <div
                style={{
                  padding: "10px",
                  fontSize: "17px",
                  textAlign: "center",
                }}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(selectedPost?.long_description),
                }}
              ></div>
              <Box display="flex">
                <Button
                  disabled={currentIndex === 0}
                  onClick={backClick}
                  variant="outlined"
                >
                  Previous
                </Button>
                <Box flexGrow={1} />
                <Button
                  disabled={currentIndex === blogList.length - 1}
                  onClick={nextClick}
                  variant="contained"
                >
                  Next
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
