import { Carousel, Card } from "antd";
import "antd/dist/reset.css";

const testimonials = [
  {
    name: "John Doe",
    title: "CEO of Company",
    testimonial:
      "This product has changed the way we work. The service is excellent and reliable!",
    image: "https://i.ibb.co/9rdQfZW/images.jpg",
  },
  {
    name: "Jane Smith",
    title: "Marketing Director",
    testimonial:
      "Amazing quality and fantastic customer support. I highly recommend it!",
    image: "https://i.ibb.co/3FNwH4X/bapi.png",
  },
  {
    name: "Alice Johnson",
    title: "Product Manager",
    testimonial:
      "Incredible value for the price. This has been a game-changer for our team.",
    image: "https://i.ibb.co/4JLgwJ1/review2.jpg",
  },
  {
    name: "Bob Brown",
    title: "Software Engineer",
    testimonial:
      "The product is very intuitive, and the results have exceeded our expectations.",
    image: "https://i.ibb.co/dDY5HgT/review1.jpg",
  },
  {
    name: "Sarah Miller",
    title: "UX Designer",
    testimonial:
      "A fantastic tool that improves workflow and efficiency. Highly recommended!",
    image: "https://i.ibb.co/tQ7LFy6/review3.jpg",
  },
  {
    name: "Michael Wilson",
    title: "CTO at TechCorp",
    testimonial:
      "Great features and seamless experience. Our team loves it very much!",
    image: "https://i.ibb.co/XFK7rRn/review4.jpg",
  },
];

const TestimonialSlider = () => {
  return (
    <div
      style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "40px 0",
        textAlign: "center",
        backgroundImage: "",
      }}
    >
      <h2
        style={{
          fontSize: "30px",
          fontWeight: "600",
          marginBottom: "30px",
        }}
      >
        What Our Clients Say
      </h2>

      <Carousel
        arrows
        autoplay
        dots
        slidesToShow={3}
        prevArrow={<div style={arrowStyle}>{"<"}</div>}
        nextArrow={<div style={arrowStyle}>{">"}</div>}
        dotPosition="bottom"
        responsive={[
          { breakpoint: 1024, settings: { slidesToShow: 3 } },
          { breakpoint: 768, settings: { slidesToShow: 2 } },
          { breakpoint: 480, settings: { slidesToShow: 1 } },
        ]}
        style={{ maxWidth: "1280px", margin: "0 auto", position: "relative" }}
      >
        {testimonials.map((testimonial, index) => (
          <div key={index} style={{ padding: "0 10px" }}>
            <Card
              style={{
                maxWidth: "350px",
                margin: "auto",
                padding: "20px",
                border: "1px solid #eee",
                borderRadius: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
              }}
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "15px",
                }}
              />
              <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>
                {testimonial.name}
              </h3>
              <p style={{ fontSize: "14px", color: "#555" }}>
                {testimonial.title}
              </p>
              <p
                style={{
                  fontSize: "16px",
                  color: "#777",
                  fontStyle: "italic",
                  marginTop: "10px",
                }}
              >
                "{testimonial.testimonial}"
              </p>
            </Card>
          </div>
        ))}
      </Carousel>

      {/* Custom Dots Styling */}
      <style>
        {`
          .ant-carousel .slick-dots li button {
            background-color: #555 !important; 
          }
          .ant-carousel .slick-dots li.slick-active button {
            background-color: #000 !important; 
          }
        `}
      </style>
    </div>
  );
};

const arrowStyle: React.CSSProperties = {
  fontSize: "20px",
  color: "red",
  background: "#000",
  padding: "10px 15px",
  borderRadius: "50%",
  cursor: "pointer",
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 1000,
};

export default TestimonialSlider;
