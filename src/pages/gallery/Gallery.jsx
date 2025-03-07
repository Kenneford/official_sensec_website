import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SmallFooter from "../../components/footer/SmallFooter";
import SearchFilter from "../../components/searchForm/SearchFilter";
import SearchForm from "../../components/searchForm/SearchForm";
import { Search } from "@mui/icons-material";
import { CustomSearchField } from "../../muiStyling/muiStyling";

export function Gallery() {
  const [images, setImages] = useState([
    {
      title: "Debate Team",
      description:
        "Senya SHS wonderful and intelligent debate team who have won numerous awards for the school",
      category: "Academics",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1681248156440-02484faf8416?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2Nob29sJTIwZGViYXRlJTIwdGVhbXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      title: "Football Team",
      description:
        "Senya SHS unbeatable football team who has never lost in finals before for twenty (20) years and still counting.",
      category: "Sports",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1685055940293-176c55f3e2b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vdGJhbGwlMjB0ZWFtfGVufDB8fDB8fHww",
    },
    {
      title: "Volleyball Team",
      description: "Senya SHS die hard volley ball team.",
      category: "Sports",
      imageUrl:
        "https://images.unsplash.com/photo-1721339041025-b4fcc83f0694?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Academics Staff",
      description:
        "Senya SHS well trained staffs who always seek to develop students.",
      category: "Staff",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1706061120889-9e56096472d5?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]);
  const [search, setSearch] = useState("");

  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:5000/images")
  //       .then((res) => setImages(res.data));
  //   }, []);

  const filteredImages = images.filter((image) =>
    image.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Box sx={{ padding: 1 }}>
        <Box maxWidth={961} m={"auto"}>
          <Box
            bgcolor={"#fff"}
            sx={{
              position: "sticky",
              top: 55,
              zIndex: 1,
              marginBottom: 3,
            }}
          >
            <CustomSearchField
              label="Search"
              variant="outlined"
              //   maxWidth={960}
              fullWidth
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                marginTop: 1,
              }}
              size="small"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Search sx={{ "&:hover": { cursor: "pointer" } }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
          {filteredImages?.length > 0 ? (
            <Grid container spacing={3}>
              {filteredImages.map((image) => (
                <Grid item xs={12} sm={6} md={4} key={image.title}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={image.imageUrl}
                      alt={image.title}
                    />
                    <CardContent>
                      <Typography variant="h6">{image.title}</Typography>
                      <Typography variant="body2">{image.category}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box>
              <Typography sx={{}} align="center" color="#696969">
                We couldn&apos;t find any matches for{" "}
                <span style={{ color: "#d72f2f" }}>
                  &quot;{search}
                  &quot;
                </span>
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <SmallFooter />
    </>
  );
}
