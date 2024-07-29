
import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data from API
    axios.get('http://localhost:5001/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  const handleDelete = (id) => {
    console.log('xxx')
    axios.delete(`http://localhost:5001/api/products/${id}`)
      .then(() => {
        console.log('yyy')
        setProducts(products.filter(product => product.id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the product!', error);
      });
    // setProducts(products.filter(product => product.id !== id));
  };

  return (
    <Container>
      <Box textAlign="center" my={4}>
        <Typography variant="h3">Product List</Typography>
      </Box>
      {/* <h1>Product List</h1> */}
      <Grid container spacing={4}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={4} key={product.id}>
            <Card>
              <Box position="relative">
                <CardMedia
                  component="img"
                  alt={product.description}
                  height="140"
                  image={product.imageUrl}
                />
                <IconButton
                  aria-label="delete"
                  style={{ position: 'absolute', top: 0, right: 0, color:'#e95d77' }}
                  onClick={() => handleDelete(product.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
              <CardContent>
                <Typography variant="h6">
                  ${product.price}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );

};

export default ProductList;




