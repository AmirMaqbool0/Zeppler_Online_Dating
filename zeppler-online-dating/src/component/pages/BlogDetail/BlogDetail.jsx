import React, { useState } from "react";
import "./style.css";
import BlogImg from "../../../assests/blog-card.png";
import Logo from "../../../assests/logo.png";
import { Calendar, User } from "lucide-react";
import Footer from "../../Footer/Footer";
import Banner from "../../Banner/Banner";

const BlogDetail = () => {
  // State to manage search query
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy data for recent blogs (replace with your actual data source)
  const recentBlogs = Array(5)
    .fill()
    .map((item, index) => ({
      id: index + 1,
      title: `Recent Blog ${index + 1}`,
      author: "Justin",
      date: "19 Feb 2023",
    }));

  // Function to filter recent blogs based on search query
  const filteredRecentBlogs = recentBlogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="blog-detail-container">
      <div className="blog-detail-banner">
        <Banner
          heading={"Lorem ipsum dolor sit dummy blog 1"}
          subHeding={"Home - Blogs - Lorem ipsum dolor sit dummy blog 1"}
        />
      </div>
      <div className="blog-detail-content">
        <div className="blog-detail">
          <div className="blog-detail-img">
            <img src={BlogImg} alt="" />
          </div>
          <div className="blog-detail-date">
            <div className="blog-authar">
              <User size={14} color="#172542" />
              <span>Admin</span>
            </div>
            <div className="blog-date">
              <Calendar size={14} color="#172542" />
              <span>Feb 19, 2024</span>
            </div>
          </div>
          <div className="blog-detail-titel">
            <span>Lorem ipsum dolor sit dummy blog 1</span>
          </div>
          <div className="blog-detail-text">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum. Sed
              ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt.
            </p>
          </div>
          <div className="blog-detail-subheading">
            <span>Tip 1: Learn how to control your emotions</span>
          </div>
          <div className="blog-detail-text">
            <p>
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit, sed quia non numquam eius modi
              tempora incidunt ut labore et dolore magnam aliquam quaerat
              voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
              ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
              consequatur? Quis autem vel eum iure reprehenderit qui in ea
              voluptate velit esse quam nihil molestiae consequatur, vel illum
              qui dolorem eum fugiat quo voluptas nulla pariatur.
            </p>
          </div>
        </div>
        <div className="recent-blogs">
          <div className="recent-blog-search">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="recent-blogs-heading">
            <span>Recent Blogs</span>
          </div>
          {/* Map over filtered recent blogs */}
          {filteredRecentBlogs.map((blog) => (
            <div className="recent-blog-card" key={blog.id}>
              <img src={BlogImg} alt="" />
              <div className="recent-blog-card-text">
                <span>{blog.title}</span>
                <div className="recent-blog-card-date">
                  <span>{blog.author}</span>
                  <span>{blog.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetail;
