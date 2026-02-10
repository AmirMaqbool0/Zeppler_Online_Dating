import React, { useState } from "react";
import "./style.css";
import Logo from "../../../assests/logo.png";
import blogImg from "../../../assests/blog-card.png";
import { ArrowRight,ChevronLeft,ChevronRight } from "lucide-react";
import Footer from "../../Footer/Footer";
import BannerImg from '../../../assests/about.png'
import { Link } from "react-router-dom";
import Banner from "../../Banner/Banner";

const Blog = () => {
 
  const [currentPage, setCurrentPage] = useState(1);

  const blogPosts = Array(27).fill().map((_, index) => ({
    id: index + 1,
    title: `Blog ${index + 1}`,
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in cididunt ut labore et dolore magna aliqua. ${index + 1}`,
  }));

  const getBlogPostsForPage = () => {
    const postsPerPage = 9;
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return blogPosts.slice(startIndex, endIndex);
  };

  return (
    <div className="blog-container">
      <Banner heading={'Our Blogs'} subHeding={'Home - Blogs'}/>
      <div className="blog-cards">
        {/* Map over blog posts for the current page */}
        {getBlogPostsForPage().map((post) => (
          <div className="blog-card" key={post.id}>
            <div className="blog-img">
              <img src={blogImg} alt="" />
            </div>
            <div className="blog-text">
              <span>{post.title}</span>
              <p>{post.content}</p>
            </div>
           <Link to={'/blogs/:id'} style={{textDecoration:'none'}}> <div className="blog-card-btn">
              <span>Read More</span>
              <ArrowRight />
            </div> </Link>
            <div className="blog-card-date">
                <span>19</span>
                <span>Feb</span>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
       
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
        >
          <ChevronLeft />
        </button>
       
        {Array.from({ length: Math.ceil(blogPosts.length / 9) }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        
        <button
          disabled={currentPage === Math.ceil(blogPosts.length / 9)}
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
        >
        <ChevronRight />
        </button>
      </div>
      <Footer/>
    </div>
  );
};

export default Blog;
