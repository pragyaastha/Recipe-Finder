import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Alert from "./Alert";
import {
  Typography,
  Button,
  Paper,
  Box,
  Container,
  CssBaseline,
  Stack,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";
import { Person, AccessTime, Favorite } from "@mui/icons-material";
import { fetchRecipeItem, addToFavourite } from "../Redux/RecipeActions";

const RecipeInstruction = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipeInstruction = useSelector((state) => state.recipeInstruction);
  const favouriteRecipe = useSelector((state) => state.favouriteRecipe);

  const {
    publisher,
    source_url,
    image_url,
    title,
    servings,
    cooking_time,
    ingredients,
  } = recipeInstruction;

  const [showalert, setShowAlert] = useState(false);

  useEffect(() => {
    dispatch(fetchRecipeItem(id));
  }, [id, dispatch]);

  const handleAddClick = () => {
    const existingItem = favouriteRecipe.find((value) => value.id === id);
    if (existingItem) setShowAlert(true);
    else dispatch(addToFavourite({ image_url, publisher, title, id }));
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Card sx={{ mt: 5, boxShadow: 3, borderRadius: 3 }}>
          <CardMedia
            component="img"
            image={image_url}
            alt={title}
            sx={{ height: 300, objectFit: "cover" }}
          />
          <CardContent>
            <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h6" color="textSecondary" align="center">
              {publisher}
            </Typography>

            <Stack direction="row" justifyContent="center" spacing={4} sx={{ my: 2 }}>
              <Box display="flex" alignItems="center">
                <Person sx={{ mr: 1 }} />
                <Typography variant="h6">Servings: {servings}</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <AccessTime sx={{ mr: 1 }} />
                <Typography variant="h6">Cooking Time: {cooking_time} mins</Typography>
              </Box>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Stack direction="row" justifyContent="center" spacing={2} sx={{ mb: 2 }}>
              <Button variant="contained" color="primary" href={source_url} target="_blank">
                View Full Recipe
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<Favorite />}
                onClick={handleAddClick}
              >
                Add to Favourites
              </Button>
            </Stack>
            <Alert open={showalert} setOpen={setShowAlert} />
          </CardContent>
        </Card>

        <Box sx={{ mt: 5, p: 3, boxShadow: 2, borderRadius: 2, bgcolor: "#f3f3f3" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Ingredients
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <ul>
            {ingredients?.map((value, index) => (
              <li key={index}>
                <Typography variant="h6">
                  {value.quantity} {value.unit} {value.description}
                </Typography>
              </li>
            ))}
          </ul>
        </Box>
      </Container>
    </>
  );
};

export default RecipeInstruction;