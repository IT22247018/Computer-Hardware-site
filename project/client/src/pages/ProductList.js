import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import { Typography, CardContent, CardMedia, Chip, Rating, Stack, Switch } from '@mui/material';
import "../styles/Homepage.css";
import videoSource from "./video.mp4";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper/core';
import "../styles/productlistcss/style.css"
import "../styles/productlistcss/demo.css"
import "../styles/productlistcss/category.css"

const ProductList = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);


  const getAllPosts = async () => {
    try {
      const response = await axios.get("/api/v1/post/get-posts")
      setPosts(response.data.data);//methana posts kiyla ne ghuwe ethkota emnne natha
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to fetch posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  
  useEffect(() => {
    getAllPosts();
  }, []);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (product) => {
    // Check if the product is already in the cart
    const existingItem = cart.find((item) => item._id === product._id);

    // If the product is not in the cart, add it with quantity 1
    if (!existingItem) {
      const updatedProduct = { ...product, quantity: 1 };
      setCart([...cart, updatedProduct]);
      localStorage.setItem('cart', JSON.stringify([...cart, updatedProduct]));
      toast.success('Item Added to cart');
    } else {
      // If the product is already in the cart, update its quantity
      const updatedCart = cart.map((item) =>
        item._id === existingItem._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      toast.success('Quantity Updated in cart');
    }
  };
  return (
    <>

    <Layout title={"ALl Products - Best offers "} className="home-page">
    <div className="wrapper">
  <div className="d-md-flex align-items-md-center">
    <div className="h3">Fruits and vegetables</div>
    <div className="ml-auto d-flex align-items-center views"> <span className="btn text-success"> <span className="fas fa-th px-md-2 px-1" /><span>Grid view</span> </span> <span className="btn"> <span className="fas fa-list-ul" /><span className="px-md-2 px-1">List view</span> </span> <span className="green-label px-md-2 px-1">428</span> <span className="text-muted">Products</span> </div>
  </div>
  <div className="d-lg-flex align-items-lg-center pt-2">
    <div className="form-inline d-flex align-items-center my-2 mr-lg-2 radio bg-light border"> <label className="options">Most Popular <input type="radio" name="radio" /> <span className="checkmark" /> </label> <label className="options">Cheapest <input type="radio" name="radio" defaultChecked /> <span className="checkmark" /> </label> </div>
    <div className="form-inline d-flex align-items-center my-2 checkbox bg-light border mx-lg-2"> <label className="tick">Farm <input type="checkbox" defaultChecked="checked" /> <span className="check" /> </label> <span className="text-success px-2 count"> 328</span> </div>
    <div className="form-inline d-flex align-items-center my-2 checkbox bg-light border mx-lg-2"> <label className="tick">Bio <input type="checkbox" /> <span className="check" /> </label> <span className="text-success px-2 count"> 72</span> </div>
    <div className="form-inline d-flex align-items-center my-2 checkbox bg-light border mx-lg-2"> <label className="tick">Czech republic <input type="checkbox" /> <span className="check" /> </label> <span className="border px-1 mx-2 mr-3 font-weight-bold count"> 12</span> <select name="country" id="country" className="bg-light">
        <option value hidden>Country</option>
        <option value="India">India</option>
        <option value="USA">USA</option>
        <option value="Uk">UK</option>
      </select> </div>
  </div>
  <div className="d-sm-flex align-items-sm-center pt-2 clear">
    <div className="text-muted filter-label">Applied Filters:</div>
    <div className="green-label font-weight-bold p-0 px-1 mx-sm-1 mx-0 my-sm-0 my-2">Selected Filtre <span className=" px-1 close">×</span> </div>
    <div className="green-label font-weight-bold p-0 px-1 mx-sm-1 mx-0">Selected Filtre <span className=" px-1 close">×</span> </div>
  </div>
  <div className="filters"> <button className="btn btn-success" type="button" data-toggle="collapse" data-target="#mobile-filter" aria-expanded="true" aria-controls="mobile-filter">Filter<span className="px-1 fas fa-filter" /></button> </div>
  
  <div style={{height: 300, overflowY: 'auto'}}>
  <section id="sidebar">
      <div className="py-3">
        <h5 className="font-weight-bold">Categories</h5>
        <ul className="list-group">
          <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"> vegetables <span className="badge badge-primary badge-pill">328</span> </li>
          <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"> Fruits <span className="badge badge-primary badge-pill">112</span> </li>
          <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"> Kitchen Accessories <span className="badge badge-primary badge-pill">32</span> </li>
          <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"> Chefs Tips <span className="badge badge-primary badge-pill">48</span> </li>
        </ul>
      </div>
      <div className="py-3">
        <h5 className="font-weight-bold">Brands</h5>
        <form className="brand">
          <div className="form-inline d-flex align-items-center py-1"> <label className="tick">Royal Fields <input type="checkbox" /> <span className="check" /> </label> </div>
          <div className="form-inline d-flex align-items-center py-1"> <label className="tick">Crasmas Fields <input type="checkbox" defaultChecked /> <span className="check" /> </label> </div>
          <div className="form-inline d-flex align-items-center py-1"> <label className="tick">Vegetarisma Farm <input type="checkbox" defaultChecked /> <span className="check" /> </label> </div>
          <div className="form-inline d-flex align-items-center py-1"> <label className="tick">Farmar Field Eve <input type="checkbox" /> <span className="check" /> </label> </div>
          <div className="form-inline d-flex align-items-center py-1"> <label className="tick">True Farmar Steve <input type="checkbox" /> <span className="check" /> </label> </div>
        </form>
      </div>
      <div className="py-3">
        <h5 className="font-weight-bold">Rating</h5>
        <form className="rating">
          <div className="form-inline d-flex align-items-center py-2"> <label className="tick"><span className="fas fa-star" /> <span className="fas fa-star" /> <span className="fas fa-star" /> <span className="fas fa-star" /> <span className="fas fa-star" /> <input type="checkbox" /> <span className="check" /> </label> </div>
          <div className="form-inline d-flex align-items-center py-2"> <label className="tick"> <span className="fas fa-star" /> <span className="fas fa-star" /> <span className="fas fa-star" /> <span className="fas fa-star" /> <span className="far fa-star px-1 text-muted" /> <input type="checkbox" /> <span className="check" /> </label> </div>
          <div className="form-inline d-flex align-items-center py-2"> <label className="tick"><span className="fas fa-star" /> <span className="fas fa-star" /> <span className="fas fa-star" /> <span className="far fa-star px-1 text-muted" /> <span className="far fa-star px-1 text-muted" /> <input type="checkbox" /> <span className="check" /> </label> </div>
          <div className="form-inline d-flex align-items-center py-2"> <label className="tick"><span className="fas fa-star" /> <span className="fas fa-star" /> <span className="far fa-star px-1 text-muted" /> <span className="far fa-star px-1 text-muted" /> <span className="far fa-star px-1 text-muted" /> <input type="checkbox" /> <span className="check" /> </label> </div>
          <div className="form-inline d-flex align-items-center py-2"> <label className="tick"> <span className="fas fa-star" /> <span className="far fa-star px-1 text-muted" /> <span className="far fa-star px-1 text-muted" /> <span className="far fa-star px-1 text-muted" /> <span className="far fa-star px-1 text-muted" /> <input type="checkbox" /> <span className="check" /> </label> </div>
        </form>
      </div>
    </section> {/* Products Section */}
    <section id="products">
      <div className="container py-3">
        <div className="row">
        <div className="row">
  {products?.map((p) => (
    <div className="col-lg-3 col-sm-6 d-flex flex-column align-items-center justify-content-center product-item my-3" key={p._id}>
      <div className="product">
        <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} />
        <ul className="d-flex align-items-center justify-content-center list-unstyled icons">
          <li className="icon"><span className="fas fa-expand-arrows-alt"></span></li>
          <li className="icon mx-3"><span className="far fa-heart"></span></li>
          <li className="icon" onClick={() => navigate(`/product/${p.slug}`)}>
          <span className="fas fa-shopping-bag"></span>
          </li>
        </ul>
      </div>
      <div className="tag bg-green">new</div>
      <div className="title pt-4 pb-1">{p.name}</div>
      <div className="d-flex align-content-center justify-content-center">
        <span className="fas fa-star"></span>
        <span className="fas fa-star"></span>
        <span className="fas fa-star"></span>
        <span className="fas fa-star"></span>
        <span className="fas fa-star"></span>
      </div>
      <div className="price">
        {p.price !== undefined
          ? p.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })
          : "$ 0.0"}
      </div>
    </div>
  ))}
</div>
          
         
         
        </div>
      </div>
    </section>
  </div>
</div>

    
    </Layout>
    </>
  );
};

export default ProductList;