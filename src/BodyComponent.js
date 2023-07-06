import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DOMPurify from "dompurify";
import axios from "axios";

export default function BodyComponent(props) {
  const { blogList, categoryId } = props;
  const [selectedPost, setSelectedPost] = useState(blogList[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setSelectedPost(blogList[0]);
    setCurrentIndex(0);
    console.log(blogList[0], categoryId);
  }, [blogList.length, categoryId, blogList[0]?.id]);

  // useEffect(() => {
  //   if (!!selectedPost?.slug) {
  //     axios
  //       .get(
  //         `https://backend.kodehash.com/blog/blog-detail?blog=${selectedPost?.slug}`
  //       )
  //       .then((res) => {
  //         console.log(res.data);
  //         // setSelectedPost(res.data);
  //       });
  //   }
  // }, [selectedPost?.id]);

  const onChangePost = (id) => {
    let index = blogList.findIndex((e) => e.id === id);
    setSelectedPost(blogList[index]);
    setCurrentIndex(index);
  };

  const backClick = () => {
    setSelectedPost(blogList[currentIndex - 1] ?? null);
    setCurrentIndex(currentIndex - 1);
  };

  const nextClick = () => {
    setSelectedPost(blogList[currentIndex + 1] ?? null);
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <>
      <Box display="flex" flexDirection="row" height="auto" width={1}>
        <Box
          width={0.2}
          maxHeight={"90vh"}
          style={{ overflowY: "scroll", position: "fixed" }}
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
            style={{ padding: "10px", fontSize: "17px", textAlign: "center" }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(selectedPost?.long_description)
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
      </Box>
    </>
  );
}
