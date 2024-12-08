/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import "../App.css";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";

export default function ShoppingSite() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const url = "https://fakestoreapi.com/products";
  useEffect(() => {
    console.log("mounting function");
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <NavBar cart={cart} />
      {products && (
        <div id="product-list">
          {products?.map((prod, idx) => (
            <ProductCard
              products={prod}
              key={idx}
              cart={cart}
              setCart={setCart}
            />
          ))}
        </div>
      )}
    </>
  );
}

function ProductCard({ products, cart, setCart }) {
  const [showAdd, setShowAdd] = useState(true);
  function handleAddCart(addProduct) {
    setCart([...cart, addProduct]);
    setShowAdd(!showAdd);
  }
  function handleRemoveCart(id) {
    let newCartData = cart.filter((prod) => prod.id != id);
    setCart(newCartData);
    setShowAdd(!showAdd);
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={products?.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {products?.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {products?.description}
          </Typography>
          <Typography>Rs.{products?.price}</Typography>
          <Typography>Rating : {products?.rating?.rate}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {showAdd ? (
          <Button
            onClick={() => handleAddCart(products)}
            variant="contained"
            size="small"
            color="primary"
          >
            Add Cart
          </Button>
        ) : (
          <Button
            onClick={() => handleRemoveCart(products.id)}
            variant="contained"
            size="small"
            color="error"
          >
            Remove Cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

function NavBar({ cart }) {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: "100px" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ShopCart
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="shooping cart"
            sx={{ mr: 2 }}
          >
            <Badge badgeContent={cart?.length} color="error">
              <AddShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
