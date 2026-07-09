export interface AboutPage {
    bannerTitle: string;
    title: string;
    intro: string;
    description: string[];
    image: string;
    topDescription: string[];
    bullets: string[];
    bottomTitle?: string;
    bottomDescription: string;
  }
  
  export const aboutPages: Record<string, AboutPage> = {
    "what-can-we-do-for-your-website": {
      bannerTitle: "What Can We Do for Your Website?",
      title: "What Can We Do for Your Website?",
      intro: "Our first question when we approach a new website project is 'What do you want?'",
      description: [
        "Our first question when we approach a new website project is “What do you want?” Everything else comes second to that.",
        "No two websites should be alike. Your website will have not only its own unique identity but also its own unique problems. And solving those problems in order to deliver the website of your dreams is our passion.",
        "We work to visualise what it is you want and need and then deploy our substantial experience and resources to achieve that. Our range of resources means that we don’t have to impose the way we work on"
      ],
     
      image: "/assets/jpg/img_5.jpg",
      topDescription: ["you. We have numerous platforms at our disposal, for example, so that we can choose the one best suited for your site, rather than insisting on you accepting the one we prefer working with.",
        "We’ll build you anything from a basic “shop window” to a sophisticated ecommerce site, and incorporate elements such as Content Management, CRM systems, customer portals and Cloud services. We’ll also create targeted landing pages with fully automated CRM and mailing list capture.",
    "You website doesn’t have to be a simple online brochure. A modern website is a powerful tool for inbound marketing, and we’ll make the most of it, allowing you to publish engaging and interactive information, services, products and video.",
"Your site’s SEO is essential to ensure it ranks high on Google and other search engines, making it easy for your prospects to find. The SEO we build into the site is only the beginning, though. We provide an ongoing SEO consultancy, with services ranging from keyword and marketing research, link building and social media promotion to regular technical SEO audits, analysis and reports.",
"What you’ll get from Visualytes Ltd is a website that will be easily found by your target market and will engage and attract prospects when they get to the site. It will be doing its job to its full potential."
],
      bullets: [
        
      ],
      bottomDescription: ""
    },
  
    "how-can-we-make-your-hardware-cheaper-safer-and-more-efficient": {
      bannerTitle: "How Can We Make Your Hardware Cheaper, Safer and More Efficient?",
      title: "How Can We Make Your Hardware Cheaper, Safer and More Efficient?",
      intro: "",
      description: ["Visualytes Ltd will provide you with a dedicated server to host your website and any other systems you have from us, so you won’t be sharing servers with anyone. We’ll take on all ongoing requirements, including both routine maintenance and troubleshooting.",
        "One of the biggest dilemmas for an SME is what to do about hardware such as servers. Using your own can be expensive, not only due to the capital outlay, but also because of the space you need for the servers, not to mention the ongoing maintenance. On the other hand, if you outsource your hardware requirements, you have to share with other",

      ],
      image: "/assets/jpg/post-carausel-7.jpg",
      topDescription: ["users, creating worries about security. We’ll also provide powerful, high-quality VPS hosting, using both hardware and software that’s state of the art. Most importantly, your VPS can be fully customised to your own needs, including the operating system of your preference.",
        "For all these services, we offer packages that fit your level of requirements and are easily scalable for your changing needs."
      ],
      bullets: [],
      bottomDescription: ""
    },
  
    "how-can-we-help-with-your-marketing": {
      bannerTitle: "How Can We Help with Your Marketing?",
      title: "How Can We Help with Your Marketing?",
      intro: "",
      description: ["All businesses need marketing, regardless of their size or how long they’ve been going, but this requirement is especially acute for a new SME. How are you going to make yourself visible in a crowded market and ensure your business will grow?",
        "We can help you with a range of digital marketing services, enabling you to develop and maintain the strategies you need to reach the clients you want.",
    "Social media is crucial for driving clients to your website. Most platforms allow you to analyse your performance, letting you"],
      image: "/assets/jpg/img_11.jpg",
      topDescription: ["determine which posts are working and which aren’t. Whether your preferred platforms are the common ones like Facebook, Instagram, Twitter, LinkedIn and YouTube or more niche alternatives, our tools help you make the most of your social media marketing.",
        "Just as important are search engine marketing and content marketing. Search engine marketing helps your website climb high on the search engine rankings and stay there, while content marketing provides the useful, intriguing or amusing pieces that draw your prospects in.",
        "We have a powerful range of tools that will make it straightforward to formulate, carry out and maintain all your digital marketing strategies."
      ],
      bullets: [],
      bottomDescription: ""
    },
  
    "how-can-we-provide-you-with-customised-software": {
      bannerTitle: "How Can We Provide You with Customised Software?",
      title: "How Can We Provide You with Customised Software?",
      intro: "",
      description: ["There’s plenty of generic software out there, but it can pose problems for an SME. Perhaps it doesn’t do exactly what you need it to. Perhaps you only want a piece of software for one particular function, but you still have to pay out for the whole thing. Or perhaps there isn’t anything that meets a very niche need.",
        "Visualytes Ltd creates the customised software you need, with a dedicated manager working with you to ensure everything is exactly as you want it. We use pre-built frameworks, allowing us to develop software to your specific requirements quickly, efficiently and at a"
      ],
      image: "/assets/jpg/post-carausel-5.jpg",
      topDescription: ["reasonable cost. We’ve evolved flexible methods of software development that always put you first. We’ll respond at all stages to your feedback, and we bring the vast combined experience of our team to solve your problems, however daunting they might seem.",
        "With us, you can have the exact software you need to develop your business without breaking the bank."
      ],
      bullets: [],
      bottomDescription: ""
    },
  
    "how-can-we-keep-your-software-running-efficiently": {
      bannerTitle: "How Can We Keep Your Software Running Efficiently?",
      title: "How Can We Keep Your Software Running Efficiently?",
      intro: "",
      description: ["Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.",
        "Aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam."
      ],
      image: "/assets/jpg/post-carausel-1.jpg",
      topDescription: ["that maintenance will be carried out quickly and efficiently by experts, resulting in a minimum of downtime. And there won’t be the worry of what might happen if a key member of staff should leave.",
        "Our support services make sure all updates are applied quickly and without fuss. We’ll also help with processes like installation and management of licence keys to ensure your software runs smoothly and you can concentrate on the real focus of your business."
      ],
      bullets: [],
      bottomDescription: ""
    },
  
    "how-can-our-products-help-you": {
      bannerTitle: "How Can Our Products Help You?",
      title: "How Can Our Products Help You?",
      intro: "",
      description: ["Besides the packages we offer, Visualytes Ltd offers a wide range of specific products to help you automate your business. You can pick and choose which of these products is most suitable for you, but it’s likely that any SME would benefit from at least some of these, if not all.",
        "Our signature Visualytes product is a wide-ranging system that includes various modules. Do you need to streamline your HR operations? Make your recruitment cycle more straightforward? Manage attendance and leave? Visualytes provides simple tools to do all these and much more."
      ],
      image: "/assets/jpg/post-carausel-3.jpg",
      topDescription: ["Other products range from a secure, state-of-the-art video conferencing platform and superior SMS gateway to online invoicing, a powerful and flexible CRM and a comprehensive business intelligence platform. There are many other products, and our enthusiastic R&D department is coming up with new solutions all the time, geared specifically towards the needs of SMEs."],
      bullets: [],
      bottomDescription: ""
    },
  };


  // export const items = [
  //   {
  //     title: "Who We Are",
  //     icon: "rt-icon2-user",
  //     color: "#fff",
  //     bg: "#A0CE4E",
  //     content: (
  //       <>
  //         <p>
  //           We are a team of San Diego web design and development professionals who love partnering with good people and businesses to help them achieve online success.
  //         </p>
  
  //       </>
  //     ),
  //   },
  //   {
  //     title: "What We Do",
  //     icon: "rt-icon2-diamond2",
  //     color: "#fff",
  //     bg: "#00bea3",
  
  //     content: (
  //       <>
  //         <p>
  //           We’re focused on honing our crafts and bringing everything we have to the table for our clients. We create custom, functional websites focused on converting your users into customers.
  //         </p>
  
  
  //       </>
  //     ),
  //   },
  //   {
  //     title: "Why We Do It",
  //     icon: "rt-icon2-like",
  //     color: "#fff",
  //     bg: "#F57C00",
  //     content: (
  //       <>
  //         <p>
  //           Each of us loves what we do and we feel that spirit helps translate into the quality of our work. Working with clients who love their work combines into a fun, wonderful partnership for everyone involved.
  //         </p>
  
  
  //       </>
  //     ),
  //   },
  // ];
  export const features = [
    {
      title: "Reliable",
      image: "/assets/png/orange-circle.png",
      line: "#E85D12",
      description:
        "Visualytes is a renowned company. We believe in building & maintaining long term relationships with all our clients.",
    },
    {
      title: "Experience",
      image: "/assets/png/green-circle.png",
      line: "#A9C700",
      description:
        "We are Internationally experienced in all web & software development innovations and bring this expertise to you.",
    },
    {
      title: "Solutions",
      image: "/assets/png/blue-circle.png",
      line: "#3B82C4",
      description:
        "We offer you best solutions in order to exceed your expectations. We are wholly qualified in offering effective software development solutions.",
    },
    {
      title: "Affordable",
      image: "/assets/png/purple-circle.png",
      line: "#72429A",
      description:
        "We continue to provide best and affordable web development services and solutions to a wide range of large corporations and SME.",
    },
  ];
  
  export const cards = [
    {
      image: "/assets/jpg/img_5.jpg",
      title: "What Can We Do for Your Website?",
      description:
        "Our first question when we approach a new website project is “What do you want?” Everything else comes second to that.",
      link: "/about/what-can-we-do-for-your-website",
    },
    {
      image: "/assets/jpg/img_1.jpg",
      title: "How Can We Make Your Hardware Cheaper, Safer and More Efficient?",
      description:
        "One of the biggest dilemmas for an SME is what to do about hardware such as servers.",
      link: "/about/how-can-we-make-your-hardware-cheaper-safer-and-more-efficient",
    },
    {
      image: "/assets/jpg/img_11.jpg",
      title: "How Can We Help with Your Marketing?",
      description:
        "All businesses need marketing, regardless of their size or how long they've been going.",
      link: "/about/how-can-we-help-with-your-marketing",
    },
    {
      image: "/assets/jpg/post-carausel-5.jpg",
      title: "How Can We Provide You with Customised Software?",
      description:
        "There's plenty of generic software out there, but it can pose problems for an SME.",
      link: "/about/how-can-we-provide-you-with-customised-software",
    },
    {
      image: "/assets/jpg/post-carausel-1.jpg",
      title: "How Can We Keep Your Software Running Efficiently?",
      description:
        "Whether you're using our customised software or products available on the general market.",
      link: "/about/how-can-we-keep-your-software-running-efficiently",
    },
    {
      image: "/assets/jpg/post-carausel-3.jpg",
      title: "How Can Our Products Help You?",
      description:
        "Besides the packages we offer, Visualytes Ltd offers a wide range of specific products to help you automate your business.",
      link: "/about/how-can-our-products-help-you",
    },
  ];