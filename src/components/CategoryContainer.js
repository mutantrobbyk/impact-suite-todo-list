import React, { useEffect, useState } from "react";
import axios from "axios";
import Category from "./Category";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { blue } from "@mui/material/colors";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';

const CategoryContainer = () => {
  let [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   axios.get("/api/categories").then((result) => {
  //     setCategories(result.data);
  //   });
  // }, []);

  const card = (staticCategory) => (
    <React.Fragment>
      <CardContent>
      <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          Todos
        </Typography>
        <Category staticCategory={staticCategory} />
      </CardContent>
    </React.Fragment>
  );
  return (
    <Grid container spacing={3} margin>
      <div>
        <Box sx={{ width: '30vw'}}>
          <Card sx={{ maxHeight:300, overflowY: 'scroll' }} variant="outlined">{card(true)}</Card>
        </Box>
      </div>
      <Icon sx={{ color: blue[500] }}>add_circle</Icon>
      <div>
        {categories.map((category) => (
          <div key={category.id}>
            <Box sx={{ maxWidth: 275 }}>
              <Card variant="outlined">{card(false)}</Card>
            </Box>
          </div>
        ))}
      </div>
    </Grid>
  );
};

export default CategoryContainer;
