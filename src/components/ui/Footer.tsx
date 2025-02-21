import { Layout } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import bannerDefaultImage from "../../assets/images/slideshow-pattern.webp";

const { Footer } = Layout;

const FooterArea = () => {
  return (
    <Footer
      style={{
        background: "#f5e6e0",
        backgroundImage: `url(${bannerDefaultImage})`,
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "50px 0",
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-between"
      >
        {/*  Brand Info */}
        <div className="space-y-3">
          <h3 style={{ color: "black", fontSize: "20px" }}>Elegant Shop</h3>
          <p style={{ color: "gray", fontSize: "14px", lineHeight: "1.5" }}>
            Elevate your style with our premium Products.
          </p>
          <p style={{ color: "gray", fontSize: "14px", lineHeight: "1" }}>
            <span className="text-md font-semibold">Address:</span> 134, Unique
            Road, Newwork 223.
          </p>
          <p style={{ color: "gray", fontSize: "14px", lineHeight: "1" }}>
            <span className="text-md font-semibold">Email:</span>{" "}
            elegantshop@support.com
          </p>
          <p style={{ color: "gray", fontSize: "14px", lineHeight: "1" }}>
            <span className="text-md font-semibold">Phone:</span> +13456367478{" "}
          </p>
        </div>

        {/*  Quick links */}
        <div className="space-y-3">
          <h4 style={{ color: "black", fontSize: "18px" }}>Quick links</h4>
          <ul style={{ listStyle: "none", padding: 0, color: "gray" }}>
            <li style={{ marginBottom: "15px" }}>
              <a href="/" style={{ color: "gray", textDecoration: "none" }}>
                Home
              </a>
            </li>
            <li style={{ marginBottom: "15px" }}>
              <a
                href="/allProducts"
                style={{ color: "gray", textDecoration: "none" }}
              >
                Shop
              </a>
            </li>
            <li style={{ marginBottom: "15px" }}>
              <a
                href="/about"
                style={{ color: "gray", textDecoration: "none" }}
              >
                About Us
              </a>
            </li>
            <li style={{ marginBottom: "15px" }}>
              <a href="#" style={{ color: "gray", textDecoration: "none" }}>
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/*  Customer Service */}
        <div>
          <h4 style={{ color: "black", fontSize: "18px" }}>Customer Service</h4>
          <ul style={{ listStyle: "none", padding: "0", color: "gray" }}>
            <li style={{ marginBottom: "15px" }}>
              <a href="#" style={{ color: "gray", textDecoration: "none" }}>
                FAQs
              </a>
            </li>
            <li style={{ marginBottom: "15px" }}>
              <a href="#" style={{ color: "gray", textDecoration: "none" }}>
                Returns
              </a>
            </li>
            <li style={{ marginBottom: "15px" }}>
              <a href="#" style={{ color: "gray", textDecoration: "none" }}>
                Shipping
              </a>
            </li>
            <li style={{ marginBottom: "15px" }}>
              <a href="#" style={{ color: "gray", textDecoration: "none" }}>
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* div4: Social Media */}
        <div>
          <h4 style={{ color: "black", fontSize: "18px" }}>Follow Us</h4>
          <div style={{ display: "flex", gap: "15px" }}>
            <a href="#" style={{ color: "#0C67DC", fontSize: "22px" }}>
              <FacebookOutlined />
            </a>
            <a href="#" style={{ color: "#1C96E8", fontSize: "22px" }}>
              <TwitterOutlined />
            </a>
            <a href="#" style={{ color: "#C90CE3", fontSize: "22px" }}>
              <InstagramOutlined />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div
        style={{
          paddingTop: "30px",
          fontSize: "14px",
          color: "gray",
          textAlign: "center",
          borderTop: "1px solid #f2f2f2f2",
        }}
      >
        © {new Date().getFullYear()} Elegant Shop. All rights reserved.
      </div>
    </Footer>
  );
};

export default FooterArea;
