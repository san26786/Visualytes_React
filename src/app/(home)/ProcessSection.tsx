import Image from "next/image";
import "./process.css";

const steps = [
  {
    title: "Strategy",
    color: "color1",
    image: "/assets/webp/strategy-01.jpg.bv.webp",
    text: "Stay ahead of your business competitors better by following what's original and new for the users. We do robust strategies that can perform better, we define your competition and target audience.",
  },
  {
    title: "Design",
    color: "color2",
    image: "/assets/webp/design-02.jpg.bv.webp",
    text: "Colour scheme, layout, sitemap, and style. We bring your brand to life with a one of a kind masterpiece, built just for you.",
  },
  {
    title: "Development",
    color: "color3",
    image: "/assets/webp/develop-03.jpg.bv.webp",
    text: "We turn your ideas into a reality by going an extra mile with you. Your website is placed on a development server and you get to watch the whole process.",
  },
  {
    title: "Support",
    color: "color4",
    image: "/assets/webp/support-04.jpg.bv.webp",
    text: "This is where you go live, to the world. Marketing, Maintenance and Enhancements; we'll be at your side for the life of your site.",
  },
];

export default function ProcessSection() {
  return (
    <section
      className="process-section"
      style={{
        backgroundImage: "url('/images/process/texture.png')",
      }}
    >
      <div className="container">
        <div className="heading">
          <h2>Our Process</h2>
        </div>

        <div className="fw-theme-steps">
          {steps.map((step, index) => (
            <div className="fw-theme-step-wrap" key={index}>
              <div className="fw-step-left-part">
                <h2 className={`step-title ${step.color}`}>
                  {step.title}
                </h2>
              </div>

              <div className="fw-step-center-part">
                <Image
                  src={step.image}
                  alt={step.title}
                  width={270}
                  height={270}
                />
              </div>

              <div className="fw-step-right-part">
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bottom-line">
          <Image
            src="/images/process/vertical_line2.png"
            alt=""
            width={20}
            height={180}
          />
        </div>
      </div>
    </section>
  );
}