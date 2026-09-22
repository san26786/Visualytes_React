export interface BlogPost {
  id: string;
  blogKey: string;
  title: string;
  slug: string;
  date: string;
  formattedDate: string;
  author: { name: string };
  images: { alt: string };
  categories: { name: string; slug: string | undefined }[];
  description: string;
  metrics: { views: number | null; likes: number | null; comments: number | null };
}

export const blogs: BlogPost[] = [
  {
    "id": "post-11630",
    "blogKey": "blog1",
    "title": "How Partnering with a Web Development Company Can Elevate Your Online Presence",
    "slug": "how-partnering-with-a-web-development-company-can-elevate-your-online-presence",
    "date": "2024-11-23T09:09:22+00:00",
    "formattedDate": "November 23, 2024",
    "author": {
      "name": "Visualytess"
    },
    "images": {
      "alt": "Web Development Company Online Presence Boost online presence"
    },
    "categories": [
      {
        "name": "Blog",
        "slug": "blog"
      },
      {
        "name": "Custom Websites",
        "slug": "custom-websites"
      },
      {
        "name": "Web design",
        "slug": "web-design-blog"
      }
    ],
    "description": "In today’s digital-first world, a well-designed, high-performing website is no longer a luxury—it’s essential for any business aiming to thrive online. But creating a site that effectively represents your brand, captures leads, and scales with your growth can be challenging. This is where a professional web development company comes into play. By leveraging a team of skilled developers, designers, and strategists, a web development company can transform your website into a powerful business asset.",
    "metrics": {
      "views": 828,
      "likes": 0,
      "comments": 0
    }
  },
  {
    "id": "post-11620",
    "blogKey": "blog2",
    "title": "SEO Company in London Shares the Importance of SEO Slugs for Better Rankings",
    "slug": "seo-company-in-london-shares-the-importance-of-seo-slugs-for-better-rankings",
    "date": "2024-11-19T11:29:30+00:00",
    "formattedDate": "November 19, 2024",
    "author": {
      "name": "Visualytess"
    },
    "images": {
      "alt": "SEO Company in London & SEO Slugs"
    },
    "categories": [
      {
        "name": "Blog",
        "slug": "blog"
      },
      {
        "name": "Branding",
        "slug": "branding-blog"
      },
      {
        "name": "SEO",
        "slug": "seo"
      }
    ],
    "description": "When it comes to search engine optimization, every detail matters. Among the various components that contribute to effective SEO, SEO slugs are one of the most underrated yet impactful tools. As a premier SEO Company in London, Visualytes Limited understands the significance of well-crafted slugs in improving search engine visibility and user engagement. This blog explains the purpose of an SEO slug, best practices for creating them, and lesser-known facts about their role in SEO.",
    "metrics": {
      "views": 822,
      "likes": 0,
      "comments": 0
    }
  },
  {
    "id": "post-11604",
    "blogKey": "blog3",
    "title": "How Google’s RankBrain Algorithm Impacts Social Media Marketing agency’s strategies",
    "slug": "how-googles-rankbrain-algorithm-impacts-social-media-marketing-agencys-strategies",
    "date": "2024-11-13T13:16:03+00:00",
    "formattedDate": "November 13, 2024",
    "author": {
      "name": "Visualytess"
    },
    "images": {
      "alt": ""
    },
    "categories": [
      {
        "name": "Blog",
        "slug": "blog"
      },
      {
        "name": "Branding",
        "slug": "branding-blog"
      }
    ],
    "description": "In the evolving world of digital marketing, understanding Google’s algorithm is essential for a successful online presence. For businesses aiming to enhance visibility, it’s crucial to stay updated on the latest technology Google uses to rank search results. Rank Brain, an artificial intelligence (AI) algorithm, is one of these key tools, and it plays a significant role in delivering the most relevant search results.",
    "metrics": {
      "views": null,
      "likes": null,
      "comments": null
    }
  },
  {
    "id": "post-11585",
    "blogKey": "blog4",
    "title": "How a Web Development Company Creates Impactful Meta Descriptions for Better SEO",
    "slug": "how-a-web-development-company-creates-impactful-meta-descriptions-for-better-seo",
    "date": "2024-11-13T10:30:45+00:00",
    "formattedDate": "November 13, 2024",
    "author": {
      "name": "Visualytess"
    },
    "images": {
      "alt": "Web development company considering meta description for SEO of website"
    },
    "categories": [
      {
        "name": "Blog",
        "slug": "blog"
      },
      {
        "name": "Web design",
        "slug": "web-design-blog"
      }
    ],
    "description": "In the digital age, a strong online presence is crucial for any business. One of the often-overlooked but essential aspects of website optimization is the meta description—the brief snippet that appears below your website link in search results. As a professional Web Development Company in the UK, Visualytes Limited knows the importance of crafting effective meta descriptions that drive clicks, engage users, and boost search rankings.",
    "metrics": {
      "views": 1002,
      "likes": 0,
      "comments": 0
    }
  },
  {
    "id": "post-8914",
    "blogKey": "blog5",
    "title": "Maintenance & Support",
    "slug": "maintenance-support",
    "date": "2020-09-10T14:57:16+00:00",
    "formattedDate": "September 10, 2020",
    "author": {
      "name": "Visualytess"
    },
    "images": {
      "alt": "maintenance management"
    },
    "categories": [
      {
        "name": "Branding",
        "slug": "branding-blog"
      },
      {
        "name": "SEO",
        "slug": "seo"
      }
    ],
    "description": "Your business website is your online identity and to keep it in a good condition you have to go a little extra mile. Just like your most possessed vehicles, your website is a valued asset that you need to maintain in a good condition all the time. So, it is wise enough to spend time getting a website maintenance agreement done.",
    "metrics": {
      "views": 3727,
      "likes": 0,
      "comments": 0
    }
  },
  {
    "id": "post-8912",
    "blogKey": "blog6",
    "title": "Website Hosting Services",
    "slug": "website-hosting-services",
    "date": "2020-09-10T14:51:10+00:00",
    "formattedDate": "September 10, 2020",
    "author": {
      "name": "Visualytess"
    },
    "images": {
      "alt": "website hosting services"
    },
    "categories": [
      {
        "name": "Branding",
        "slug": "branding-blog"
      }
    ],
    "description": "Every small and big business investments require a strong foundation to stand strong. And, every website needs to have a reliable hosting provider which is worth every penny spent. What is the use of your online identity (your website) if it keeps on crashing every minute? Choosing the right hosting provider is as important as choosing the right web developer for your website.",
    "metrics": {
      "views": 3562,
      "likes": 0,
      "comments": 0
    }
  },
  {
    "id": "post-8910",
    "blogKey": "blog7",
    "title": "VR And Mobile Games",
    "slug": "vr-and-mobile-games",
    "date": "2020-09-10T14:44:40+00:00",
    "formattedDate": "September 10, 2020",
    "author": {
      "name": "Visualytess"
    },
    "images": {
      "alt": "virtual reality"
    },
    "categories": [
      {
        "name": "Mobile app",
        "slug": "mobile-app"
      }
    ],
    "description": "Making people sit up and notice and keeping the mobile user engaged and immersed in a 3D environment is a phenomenal thought. Companies worldwide are exploring their possibilities to build a Virtual Reality-based application to attract consumers on a large scale. With more than 90% of millennials’ inclination towards interactive mobile gaming, VR will be tried and tested by various companies in the coming years too.",
    "metrics": {
      "views": 3305,
      "likes": 0,
      "comments": 0
    }
  },
  {
    "id": "post-8824",
    "blogKey": "blog8",
    "title": "Augmented Reality",
    "slug": "augmented-reality",
    "date": "2020-08-29T12:40:30+00:00",
    "formattedDate": "August 29, 2020",
    "author": {
      "name": "Visualytess"
    },
    "images": {
      "alt": "augmented reality"
    },
    "categories": [
      {
        "name": "Mobile app",
        "slug": "mobile-app"
      }
    ],
    "description": "Augmented Reality has the power to change the way people perceive products and services which can enhance their everyday lives. The actual use in transforming businesses is yet to be explored by many organisations across the world. It has the potential to overcome competition in the business that are revaluating their strategies to attract consumers.",
    "metrics": {
      "views": 3461,
      "likes": 0,
      "comments": 0
    }
  },
  {
    "id": "post-8821",
    "blogKey": "blog9",
    "title": "Mobile App Develpment",
    "slug": "mobile-app-develpment",
    "date": "2020-08-29T12:24:31+00:00",
    "formattedDate": "August 29, 2020",
    "author": {
      "name": "Visualytess"
    },
    "images": {
      "alt": "Mobile App Development"
    },
    "categories": [
      {
        "name": "Mobile app",
        "slug": "mobile-app"
      }
    ],
    "description": "Mobile applications have become like our significant other; we cannot live without it anymore. Our lifestyle has been evolved over the years so much with the use of mobile applications for several tasks like paying the power bill; making a to-do list or searching for a new car; we use handy applications for hassle-free processing. According to Google, about 80% of mobile users prefer to buy from a company having a mobile application for better user experience.",
    "metrics": {
      "views": 3641,
      "likes": 0,
      "comments": 0
    }
  },
  {
    "id": "post-8578",
    "blogKey": "blog10",
    "title": "Corporate Branding",
    "slug": "corporate-branding",
    "date": "2020-08-12T12:24:09+00:00",
    "formattedDate": "August 12, 2020",
    "author": {
      "name": "Visualytess"
    },
    "images": {
      "alt": "corporate branding"
    },
    "categories": [
      {
        "name": "Branding",
        "slug": "branding-blog"
      }
    ],
    "description": "Corporate Branding is making the customer feel your specialty in everything that belongs to your company. In other words, how your customers perceive your brand will depend on a lot of factors like, how you manage your staff; how you give importance to customer reviews and suggestions; how well you handle complaints from customers; your creativity in marketing; and a lot more.",
    "metrics": {
      "views": 3541,
      "likes": 0,
      "comments": 0
    }
  },
  {
    "id": "post-8579",
    "blogKey": "blog11",
    "title": "Social Media Marketing",
    "slug": "social-media-marketing",
    "date": "2020-08-12T12:10:05+00:00",
    "formattedDate": "August 12, 2020",
    "author": {
      "name": "Visualytess"
    },
    "images": {
      "alt": "social_media_marketing"
    },
    "categories": [
      {
        "name": "Branding",
        "slug": "branding-blog"
      },
      {
        "name": "SEO",
        "slug": "seo"
      }
    ],
    "description": "Companies of all sizes and categories are racing up to get noticed on social media platforms every minute of the day. The new ones find it hard to get popular and the old ones keep looking for fresh ideas.",
    "metrics": {
      "views": 3203,
      "likes": 0,
      "comments": 0
    }
  },
  {
    "id": "post-8542",
    "blogKey": "blog12",
    "title": "Search Engine Marketing",
    "slug": "search-engine-marketing",
    "date": "2020-08-08T08:24:50+00:00",
    "formattedDate": "August 8, 2020",
    "author": {
      "name": "Visualytess"
    },
    "images": {
      "alt": "seo company in basingstoke"
    },
    "categories": [
      {
        "name": "SEO",
        "slug": "seo"
      }
    ],
    "description": "Small and big businesses alike are all on the same worldwide web (internet) putting in all their efforts to stand out from the crowd. They know it is their brand’s persona that will attract customers and keep them hooked to their products. So the marketing strategies are shaped in such a manner as to satisfy the customers by helping them with their desired product or service. SEO and SEM prime factors affecting the ranking of a website.",
    "metrics": {
      "views": 3310,
      "likes": 0,
      "comments": 0
    }
  },
  {
    "id": "post-8534",
    "blogKey": "blog13",
    "title": "Bespoke Software",
    "slug": "bespoke-software",
    "date": "2020-08-08T07:56:54+00:00",
    "formattedDate": "August 8, 2020",
    "author": {
      "name": "Visualytess"
    },
    "images": {
      "alt": "Bespoke Software Development"
    },
    "categories": [
      {
        "name": "Custom Websites",
        "slug": "custom-websites"
      }
    ],
    "description": "Many business owners are often in a dilemma about choosing between a tailor-made software (bespoke software) and commonly used software. Going ahead with bespoke software can open up a lot of possibilities for business expansion and development. However, some companies prefer not to invest in a custom-made software and settle for less expensive off-the-shelf products.",
    "metrics": {
      "views": 3039,
      "likes": 0,
      "comments": 0
    }
  },
  {
    "id": "post-8529",
    "blogKey": "blog14",
    "title": "E-commerce Website",
    "slug": "e-commerce-website",
    "date": "2020-08-07T08:39:42+00:00",
    "formattedDate": "August 7, 2020",
    "author": {
      "name": "Visualytess"
    },
    "images": {
      "alt": "eCommerce Website Design"
    },
    "categories": [
      {
        "name": "E-commerce",
        "slug": "e-commerce"
      },
      {
        "name": "Web design",
        "slug": "web-design-blog"
      }
    ],
    "description": "Online shopping has given a whole new experience to people who are constantly looking for a change in style, easy access to the latest gadgets, or just want to buy essential grocery items. Retail businesses have seen great success with the increasing number of online shoppers for almost all items. So what makes an e-commerce website most-visited?",
    "metrics": {
      "views": 3342,
      "likes": 0,
      "comments": 0
    }
  },
  {
    "id": "post-6704",
    "blogKey": "blog15",
    "title": "Website Designing: 5 Reasons Why Your Business Needs it",
    "slug": "website-designing-5-reasons-why-your-business-needs-it",
    "date": "2019-06-12T10:00:00+00:00",
    "formattedDate": "June 12, 2019",
    "author": {
      "name": "Visualytess"
    },
    "images": {
      "alt": "Website Designing for Business"
    },
    "categories": [
      {
        "name": "Blog",
        "slug": "blog"
      },
      {
        "name": "Web design",
        "slug": "web-design-blog"
      }
    ],
    "description": "Are you still struggling to get on new customers with traditional offline marketing techniques? Do you feel online marketing would take more time and money? If you feel you are not tech-savvy and a business website is not your thing; think about it a little more.",
    "metrics": {
      "views": 4100,
      "likes": 0,
      "comments": 0
    }
  }
];

export const localBlogImages: Record<string, string> = {
  blog1: "/assets/png/blog/blog1.png",
  blog2: "/assets/png/blog/blog2.png",
  blog3: "/assets/png/blog/blog3.png",
  blog4: "/assets/png/blog/blog4.png",
  blog5: "/assets/png/blog/blog5.png",
  blog6: "/assets/png/blog/blog6.jpg",
  blog7: "/assets/png/blog/blog7.jpg",
  blog8: "/assets/png/blog/blog8.jpg",
  blog9: "/assets/png/blog/blog9.png",
  blog10: "/assets/png/blog/blog10.jpg",
  blog11: "/assets/png/blog/blog11.jpg",
  blog12: "/assets/png/blog/blog12.png",
  blog13: "/assets/png/services/Bespoke-Software-Development.png",
  blog14: "/assets/png/03_ecommerce.png",
  blog15: "/assets/png/services/Website-designing.png",
};

export function getLocalBlogImage(blogKey: string) {
  return localBlogImages[blogKey] || localBlogImages.blog1;
}

export function getBlogBySlugOrKey(slugOrKey: string): BlogPost | undefined {
  return blogs.find((post) => post.slug === slugOrKey || post.blogKey === slugOrKey);
}

