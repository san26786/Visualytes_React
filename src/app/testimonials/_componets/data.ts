export interface Testimonial {
    id: number;
    image: string;
    name: string;
    designation: string;
    company?: string;
    review: string;
  }
  
  export const testimonials: Testimonial[] = [
    {
      id: 1,
      image: "/assets/png/no-image.png",
      name: "Andrew Bridges",
      designation: "Director",
      company: "South Coast Clearance Services Ltd",
      review:
        "The website is beautifully done! Everything that needed attention has been addressed with great care. I'm really pleased with the progress so far.",
    },
    {
      id: 2,
      image: "/assets/png/no-image.png",
      name: "Nader Fam",
      designation: "Savile Executive Cars Owner",
      review:
        "It was a pleasure working with the team. The entire process went smoothly without any issues. Making changes was quick and easy, and everything was handled efficiently and professionally.",
    },
    {
      id: 3,
      image: "/assets/png/no-image.png",
      name: "Jonathan Bowles",
      designation: "Director",
      company: "Bushido Doubler",
      review:
        "The website is clean, simple, and fits perfectly for a startup. It covers all the essential needs without any complexity. Great job!",
    },
    {
      id: 4,
      image: "/assets/png/julie-1.png",
      name: "Julie Freeman",
      designation: "Reeds Central Ltd Owner",
      review:
        "Fabulous service from start to finish and who were extremely patient with us, being as non techy as we are at Reeds. The final website they produced was clear, concise, but had a personal touch and exactly what we wanted. Thank you guys, great work.",
    },
    {
      id: 5,
      image: "/assets/jpg/mathew_wildmen_1.jpg",
      name: "Matthew Wildeman",
      designation: "Owner",
      company: "MW Estate Planning",
      review:
        "Visualytes have been doing my SEO for a number of months. I started on page 3 of Google but I'm now on page 1 for all my key search terms. Nagendra Mishra has helped me understand the mystical world of SEO and I would highly recommend his company.",
    },
    {
      id: 6,
      image: "/assets/Steve-Munson.jpg",
      name: "Stephen J Munson",
      designation: "",
      review:
        "Nagendra and the Visualytes Team took on board our programming requirements of our new website, and reacted superbly, programming the website in a timely manner and implementing the tweaks to finalise and publish the site. I would highly recommend using them for website design, programming, installation and ongoing maintenance and SEO services.",
    },
    {
      id: 7,
      image: "/assets/png/foto-trendz-owner.png",
      name: "Mark Vella",
      designation: "Foto Trendz Owner",
      review:
        "I was introduced to Visualytes by a friend. I had a website produced by them. Their customer service has been amazing. They guided me through every step and I have already recommended them to a friend. Thanks to you all for making it an easy process.",
    },
    {
      id: 8,
      image: "/assets/png/helleo-1.png",
      name: "Hellen Ohwofasa",
      designation: "Director",
      company: "3D Pro Lashes",
      review:
        "Highly professional services, solution oriented and goes extra mile to ensure customer satisfaction. Very pleased with the team. Thank you so much.",
    },
    {
      id: 9,
      image: "/assets/png/Andrew-killing.png",
      name: "Andrew Killing",
      designation: "Director",
      company: "Thorney Park Golf Club",
      review:
        "I wonder what magic you guys must have done to recover our ROI and generate annual revenue in just a couple of months despite 2020 being a pandemic year. Visualytes is the perfect partner for us.",
    },
    {
      id: 10,
      image: "/assets/jpg/mathew_wildmen_1.jpg",
      name: "Matthew Potter",
      designation: "PGA Professional",
      company: "Thorney Park Golf Club",
      review:
        "I can't recommend enough and let you know that you guys do an excellent job. Our new site is so much faster and easier to work with and updating pages is incredibly simple.",
    },
    {
      id: 11,
      image: "/assets/jpg/gurd_s.jpg",
      name: "Gurd Singh",
      designation: "Director",
      company: "Lamoda",
      review:
        "Cannot recommend highly enough. Fantastic team and all the support we could need for our large online platform. Nothing is ever too much.",
    },
    {
      id: 12,
      image: "/assets/jpg/sanket_t.jpg",
      name: "Sanket Tamboli",
      designation: "Director",
      company: "Factory Fresh",
      review:
        "Great to work with the team. They provide proper guidance and unique solutions according to business needs. The support team is efficient and available at all times.",
    },
    {
      id: 13,
      image: "/assets/png/Ram_kallyan.png",
      name: "Dr. Ram Kalyan",
      designation: "Station Manager",
      company: "Unity101",
      review:
        "Thank you and your team for your excellent service and positive attitude. The quality of your work and support are second to none.",
    },
    {
      id: 14,
      image: "/assets/png/no-image.png",
      name: "Salim Vassi",
      designation: "Director",
      company: "London Car Rental",
      review:
        "Thanks to Visualytes, our London Car Rental business achieved remarkable success in just six months. All 50 keywords now rank on page one. Highly recommended!",
    },
    {
      id: 15,
      image: "/assets/png/no-image.png",
      name: "Dr. Abdoulie Sanneh",
      designation: "The Chair",
      company: "TUVAA",
      review:
        "The United Voice of African Associations is incredibly grateful to Visualytes for their continuous support. They created a professional website free of charge and continue to offer excellent service.",
    },
    {
      id: 16,
      image: "/assets/png/no-image.png",
      name: "Beena Acharyav",
      designation: "Owner",
      company: "Beena's Beauty Clinic",
      review:
        "I was very impressed with the professionalism of the website development process. The team was always available to answer questions and I highly recommend their services.",
    },
    {
      id: 17,
      image: "/assets/png/no-image.png",
      name: "Alka Tripathi",
      designation: "",
      company: "The Team Canada",
      review:
        "It was a splendid experience with Visualytes. They explained every aspect of running a successful website and continue to provide excellent after-service. Highly recommended.",
    },
    {
      id: 18,
      image: "/assets/png/no-image.png",
      name: "Elias Ndiema",
      designation: "",
      review:
        "Without paid advertising I started getting good local clients from my website within two months. Excellent online presence work.",
    },
    {
      id: 19,
      image: "/assets/png/no-image.png",
      name: "Suleiman Rajab",
      designation: "",
      review:
        "Honest, punctual, and highly skilled. Altogether a great team. I highly recommend working with them.",
    },
    {
      id: 20,
      image: "/assets/png/julie-1.png",
      name: "Julie Freeman",
      designation: "Reeds Central Ltd Owner",
      review:
        "Fabulous service from start to finish and who were extremely patient with us, being as non techy as we are at Reeds. The final website they produced was clear, concise, but had a personal touch and exactly what we wanted. Thank you guys, great work.",
    },
  ];