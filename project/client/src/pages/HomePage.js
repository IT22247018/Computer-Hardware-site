import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import { Typography, CardContent, CardMedia, Chip, Rating, Stack, Switch } from '@mui/material';
import "../styles/Homepage.css";
import videoSource from "./video.mp4";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper/core';
import "../styles/productlistcss/style.css"


const HomePage = () => {
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
      
    <div>
      <section id="billboard" className="position-relative overflow-hidden bg-light-blue">
        <Swiper navigation={{
          prevEl: '.swiper-arrow-prev',
          nextEl: '.swiper-arrow-next',
        }} className="main-swiper">
          <SwiperSlide>
            <div className="container">
              <div className="row d-flex align-items-center">
                <div className="col-md-6">
                  <div className="banner-content">
                    <h1 className="display-2 text-uppercase text-dark pb-5">Your Products Are Great.</h1>
                    <a href="shop.html" className="btn btn-medium btn-dark text-uppercase btn-rounded-none">Shop Product</a>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="image-holder">
                    <img src="images/banner-image.png" alt="banner" />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="container">
              <div className="row d-flex flex-wrap align-items-center">
                <div className="col-md-6">
                  <div className="banner-content">
                    <h1 className="display-2 text-uppercase text-dark pb-5">Technology Hack You Won't Get</h1>
                    <a href="shop.html" className="btn btn-medium btn-dark text-uppercase btn-rounded-none">Shop Product</a>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="image-holder">
                    <img src="images/banner-image.png" alt="banner" />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="swiper-icon swiper-arrow swiper-arrow-prev">
          <svg className="chevron-left">
            <use xlinkHref="#chevron-left" />
          </svg>
        </div>
        <div className="swiper-icon swiper-arrow swiper-arrow-next">
          <svg className="chevron-right">
            <use xlinkHref="#chevron-right" />
          </svg>
        </div>
      </section>
      <section id="company-services" className="padding-large">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 pb-3">
              <div className="icon-box d-flex">
                <div className="icon-box-icon pe-3 pb-3">
                  <svg className="cart-outline">
                    <use xlinkHref="#cart-outline" />
                  </svg>
                </div>
                <div className="icon-box-content">
                  
                  <h3 className="card-title text-uppercase text-dark">Free delivery</h3>
                  <p>Consectetur adipi elit lorem ipsum dolor sit amet.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 pb-3">
              <div className="icon-box d-flex">
                <div className="icon-box-icon pe-3 pb-3">
                  <svg className="quality">
                    <use xlinkHref="#quality" />
                  </svg>
                </div>
                <div className="icon-box-content">
                  <h3 className="card-title text-uppercase text-dark">Quality guarantee</h3>
                  <p>Dolor sit amet orem ipsu mcons ectetur adipi elit.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 pb-3">
              <div className="icon-box d-flex">
                <div className="icon-box-icon pe-3 pb-3">
                  <svg className="price-tag">
                    <use xlinkHref="#price-tag" />
                  </svg>
                </div>
                <div className="icon-box-content">
                  <h3 className="card-title text-uppercase text-dark">Daily offers</h3>
                  <p>Amet consectetur adipi elit loreme ipsum dolor sit.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 pb-3">
              <div className="icon-box d-flex">
                <div className="icon-box-icon pe-3 pb-3">
                  <svg className="shield-plus">
                    <use xlinkHref="#shield-plus" />
                  </svg>
                </div>
                <div className="icon-box-content">
                  <h3 className="card-title text-uppercase text-dark">100% secure payment</h3>
                  <p>Rem Lopsum dolor sit amet, consectetur adipi elit.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* START PHONE OF MOBILE PHONE SECTION */}
      <section id="mobile-products" className="product-store position-relative padding-large no-padding-top">
      <div className="container">
        <div className="row">
          <div className="display-header d-flex justify-content-between pb-3">
            <h2 className="display-7 text-dark text-uppercase">Mobile Products</h2>
            <div className="btn-right">
              <a href="/productlist" className="btn btn-medium btn-normal text-uppercase">Go to Shop</a>
            </div>
          </div>
          <div className="swiper product-swiper">
            <div className="swiper-wrapper">
              {/* Mobile Products Swiper Slides */}
              <div classname="swiper-slide">

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

<div className="container">
  <div className="row">
    {posts?.map((post) => (
      <div
        key={post._id}
        className={`col-md-4 mb-4 ${post.category === "blue" ? "blue-card" : ""}`}
      >
        <div className="product-card position-relative">
          <div className="image-holder" style={{ height: "200px", overflow: "hidden" }}>
            <img
              src={`${process.env.PUBLIC_URL}/images/background.jpg`}
              alt="Yosemite National Park"
              className="img-fluid"
              style={{ width: "100%", objectFit: "cover", height: "100%" }}
            />
          </div>
          <CardContent>
            <Typography variant="h5" component="div">
              {post.topic}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip
                size="small"
                label={`Category: ${post.category}`}
                color="primary"
              />
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {post.description}
            </Typography>
          </CardContent>
        </div>
      </div>
    ))}
  </div>
</div>
        </div>

        



    {/* Repeat the above swiper-slide structure for other products */}
            </div>
          </div>
        </div>
      </div>
      <div className="swiper-pagination position-absolute text-center"></div>
    </section>

{/* START OF MOBILE PHONE SECTION */}
    <section id="mobile-products" className="product-store position-relative padding-large no-padding-top">
      <div className="container">
        <div className="row">
          <div className="display-header d-flex justify-content-between pb-3">
            <h2 className="display-7 text-dark text-uppercase">SMART WATCHES</h2>
            <div className="btn-right">
              <a href="shop.html" className="btn btn-medium btn-normal text-uppercase">Go to Shop</a>
            </div>
          </div>
          <div className="swiper product-swiper">
            <div className="swiper-wrapper">
              {/* Mobile Products Swiper Slides */}
              <div classname="swiper-slide">
        </div>

             <div className="product-card position-relative">
  <div className="image-holder">
    <img src="images/product-item6.jpg" alt="product-item" classname="img-fluid" />
  </div>
  <div className="cart-concern position-absolute">
    <div className="cart-button d-flex">
      <a href="#" className="btn btn-medium btn-black">Add to Cart<svg className="cart-outline"><use xlinkHref="#cart-outline" /></svg></a>
    </div>
  </div>
  <div className="card-detail d-flex justify-content-between align-items-baseline pt-3">
    <h3 className="card-title text-uppercase">
      <a href="#">Pink watch</a>
    </h3>
    <span className="item-price text-primary">$980</span>
  </div>
</div>

    {/* Repeat the above swiper-slide structure for other products */}
            </div>
          </div>
        </div>
      </div>
      <div className="swiper-pagination position-absolute text-center"></div>
    </section>
 {/* END OF MOBILE PHONE SECTION */}
   
 <section id="yearly-sale" className="bg-light-blue overflow-hidden mt-5 padding-xlarge" style={{ backgroundImage: "url('images/single-image1.png')", backgroundPosition: 'right', backgroundRepeat: 'no-repeat' }}>
      <div className="row d-flex flex-wrap align-items-center">
        <div className="col-md-6 col-sm-12">
          <div className="text-content offset-4 padding-medium">
            <h3>10% off</h3>
            <h2 className="display-2 pb-5 text-uppercase text-dark">New year sale</h2>
            <a href="shop.html" className="btn btn-medium btn-dark text-uppercase btn-rounded-none">Shop Sale</a>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          {/* Additional content for the right side of the section, if any */}
        </div>
      </div>
    </section>

    <section id="subscribe" className="container-grid padding-large position-relative overflow-hidden">
      <div className="container">
        <div className="row">
          <div className="subscribe-content bg-dark d-flex flex-wrap justify-content-center align-items-center padding-medium">
            <div className="col-md-6 col-sm-12">
              <div className="display-header pe-3">
                <h2 className="display-7 text-uppercase text-light">Subscribe Us Now</h2>
                <p>Get latest news, updates and deals directly mailed to your inbox.</p>
              </div>
            </div>
            <div className="col-md-5 col-sm-12">
              <form className="subscription-form validate">
                <div className="input-group flex-wrap">
                  <input className="form-control btn-rounded-none" type="email" name="EMAIL" placeholder="Your email address here" required />
                  <button className="btn btn-medium btn-primary text-uppercase btn-rounded-none" type="submit" name="subscribe">Subscribe</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="instagram" className="padding-large overflow-hidden no-padding-top">
      <div className="container">
        <div className="row">
          <div className="display-header text-uppercase text-dark text-center pb-3">
            <h2 className="display-7">Shop Our Insta</h2>
          </div>
          <div className="d-flex flex-wrap">
            <figure className="instagram-item pe-2">
              <a href="https://templatesjungle.com/" className="image-link position-relative">
                <img src="images/insta-item1.jpg" alt="instagram" className="insta-image" />
                <div className="icon-overlay position-absolute d-flex justify-content-center">
                  <svg className="instagram">
                    <use xlinkHref="#instagram"></use>
                  </svg>
                </div>
              </a>
            </figure>
            <figure className="instagram-item pe-2">
              <a href="https://templatesjungle.com/" className="image-link position-relative">
                <img src="images/insta-item2.jpg" alt="instagram" className="insta-image" />
                <div className="icon-overlay position-absolute d-flex justify-content-center">
                  <svg className="instagram">
                    <use xlinkHref="#instagram"></use>
                  </svg>
                </div>
              </a>
            </figure>
            <figure className="instagram-item pe-2">
              <a href="https://templatesjungle.com/" className="image-link position-relative">
                <img src="images/insta-item3.jpg" alt="instagram" className="insta-image" />
                <div className="icon-overlay position-absolute d-flex justify-content-center">
                  <svg className="instagram">
                    <use xlinkHref="#instagram"></use>
                  </svg>
                </div>
              </a>
            </figure>
            <figure className="instagram-item pe-2">
              <a href="https://templatesjungle.com/" className="image-link position-relative">
                <img src="images/insta-item4.jpg" alt="instagram" className="insta-image" />
                <div className="icon-overlay position-absolute d-flex justify-content-center">
                  <svg className="instagram">
                    <use xlinkHref="#instagram"></use>
                  </svg>
                </div>
              </a>
            </figure>
            <figure className="instagram-item pe-2">
              <a href="https://templatesjungle.com/" className="image-link position-relative">
                <img src="images/insta-item5.jpg" alt="instagram" className="insta-image" />
                <div className="icon-overlay position-absolute d-flex justify-content-center">
                  <svg className="instagram">
                    <use xlinkHref="#instagram"></use>
                  </svg>
                </div>
              </a>
            </figure>
          </div>
        </div>
      </div>
    </section>



    </div>
    </Layout>
    </>
  );
};

export default HomePage;