import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Container,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addToFavourite } from "../Redux/RecipeActions";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Alert from "./Alert";
import SearchListAlert from "./SearchListAlert";

const Home = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.allRecipeData);
  const loading = useSelector((state) => state.loading);
  const favouriteRecipe = useSelector((state) => state.favouriteRecipe);
  const [showalert, setShowAlert] = useState(false);

  const handleAddClick = (recipe) => {
    const existingItem = favouriteRecipe.find(
      (value) => value.id === recipe.id
    );
    if (existingItem) setShowAlert(true);
    else dispatch(addToFavourite(recipe));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ flexGrow: 1, m: 3 }}>
          {allRecipes.length > 0 ? (
            <Grid container spacing={5}>
              {allRecipes.map((value) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={value.id}>
                  <Card>
                    <Link
                      to={{ pathname: `/RecipeInstruction/${value.id}` }}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <CardActionArea>
                        <CardMedia sx={{ height: 140 }} image={value.image_url} />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {value.title}
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            {value.publisher}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Link>
                    <CardActions>
                      <Button size="small" onClick={() => handleAddClick(value)}>
                        Add Favorite
                      </Button>
                      <Alert open={showalert} setOpen={setShowAlert} />
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Container maxWidth="md" sx={{ textAlign: "center", py: 10 }}>
              <Typography variant="h3" gutterBottom>
                Welcome to Recipe Finder!
              </Typography>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Discover delicious recipes at your fingertips. Search and save
                your favorite recipes.
              </Typography>
           
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={Link}
                to="/search"
              >
                Start Searching
              </Button>
              <SearchListAlert />
            </Container>
          )}
        </Box>
      )}
    </>
  );
};

export default Home;