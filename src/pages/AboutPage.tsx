import { MdSupportAgent } from "react-icons/md";
import { GiDeliveryDrone } from "react-icons/gi";
import { BiCheckShield } from "react-icons/bi";
import img1 from "../assets/images/about1.jpg";
import img2 from "../assets/images/about2.jpg";
const AboutPage = () => {
  return (
    <div style={{ padding: "0 10px" }}>
      {/* Responsive Image */}
      <img
        src={img1}
        alt=""
        style={{
          width: "100%",
          height: "auto",
          maxHeight: "400px",
          backgroundPosition: "center",
        }}
      />

      {/* Content */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", marginTop: "50px" }}>
        {/* OUR STORY */}
        <div style={{ margin: "40px 0" }}>
          <h2
            style={{
              fontSize: "26px",
              fontWeight: "500",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            OUR STORY
          </h2>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "500",
              margin: "20px 0",
              lineHeight: "20px",
              textAlign: "center",
            }}
          >
            Sophistication in Every Detail, Elegance in Every Story
          </h3>
          <p style={{ fontSize: "16px", lineHeight: "25px", color: "gray" }}>
            Beyond the products, the shop prides itself on creating a
            personalized experience. Attentive consultants guide guests through
            their selections, ensuring every purchase is more than just a
            transaction; it’s an investment in artistry and sophistication.
            Whether it’s a bespoke gown for a special occasion or a timeless
            accessory that becomes a cherished heirloom, each item carries a
            story waiting to be told. As the shop flourishes, its mission
            remains unwavering—to inspire, to captivate, and to celebrate the
            art of elegance. This is not just a store; it is a haven for
            dreamers, a tribute to craftsmanship, and a testament to the
            enduring allure of refined beauty.
          </p>

          {/* Our Mission & Vision */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              marginTop: "30px",
              justifyContent: "space-between",
            }}
          >
            <div style={{ flex: 1, minWidth: "280px" }}>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  marginBottom: "10px",
                }}
              >
                Our Mission
              </h2>
              <p
                style={{ fontSize: "16px", lineHeight: "25px", color: "gray" }}
              >
                To inspire and elevate the art of elegance by offering
                meticulously crafted pieces that embody sophistication, quality,
                and timeless beauty. We are dedicated to providing an
                unparalleled shopping experience that celebrates creativity,
                heritage, and craftsmanship.
              </p>
            </div>
            <div style={{ flex: 1, minWidth: "280px" }}>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  marginBottom: "10px",
                }}
              >
                Our Vision
              </h2>
              <p
                style={{ fontSize: "16px", lineHeight: "25px", color: "gray" }}
              >
                To become a globally recognized destination for refined luxury,
                where artistry and innovation harmonize to create extraordinary
                pieces that resonate with discerning customers. We aim to set
                new standards in elegance and excellence, enriching lives
                through the beauty of our creations.
              </p>
            </div>
          </div>
        </div>

        {/* The Company Section */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "20px",
            justifyContent: "center",
            margin: "40px 0",
          }}
        >
          {/* Image */}
          <div style={{ flex: 1, minWidth: "300px" }}>
            <img
              src={img2}
              alt=""
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: "300px", padding: "20px" }}>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "500",
                marginBottom: "10px",
              }}
            >
              The Company
            </h2>
            <p style={{ fontSize: "16px", lineHeight: "25px", color: "gray" }}>
              The founders, visionaries with a deep passion for aesthetics,
              sought to create more than just a store; they built an
              experience—a sanctuary for those who appreciate beauty in its
              finest forms. From the moment one steps through the grand
              entrance, a world of elegance unfolds. Soft golden lights
              illuminate exquisite displays, each curated with an eye for
              perfection. The air carries the subtle scent of fresh florals, a
              gentle reminder of nature’s influence on the artistry within.
              <br /> <br />
              Shelves lined with meticulously crafted items—from luxurious
              fabrics to delicate jewelry—whisper stories of dedication,
              innovation, and inspiration. About Our CompanyOur company was
              founded on the belief that elegance and craftsmanship should go
              hand in hand. With a commitment to excellence, we curate and
              create pieces that celebrate both tradition and innovation. Our
              team of skilled artisans and designers work passionately to bring
              unique, high-quality products to life, ensuring every piece tells
              a meaningful story. Rooted in a philosophy of timeless beauty and
              sophistication, we strive to offer an unparalleled experience that
              leaves a lasting impression on our valued customers.
            </p>
          </div>
        </div>

        {/* Customer Service Section */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "30px",
            margin: "50px 0",
            textAlign: "center",
          }}
        >
          <div
            style={{
              flex: "1 1 250px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <GiDeliveryDrone style={{ fontSize: "52px" }} />
            <h2 style={{ fontSize: "16px", fontWeight: "500" }}>
              Fast And Free Delivery
            </h2>
            <p style={{ fontSize: "15px", color: "#767676" }}>
              Free delivery for all orders over $140
            </p>
          </div>

          <div
            style={{
              flex: "1 1 250px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <MdSupportAgent style={{ fontSize: "52px" }} />
            <h2 style={{ fontSize: "16px", fontWeight: "500" }}>
              24/7 Customer Support
            </h2>
            <p style={{ fontSize: "15px", color: "#767676" }}>
              Friendly 24/7 customer support
            </p>
          </div>

          <div
            style={{
              flex: "1 1 250px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <BiCheckShield style={{ fontSize: "52px" }} />
            <h2 style={{ fontSize: "16px", fontWeight: "500" }}>
              Money Back Guarantee
            </h2>
            <p style={{ fontSize: "15px", color: "#767676" }}>
              We return money within 30 days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
