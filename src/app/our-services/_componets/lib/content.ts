import {
    Search,
    Share2,
    MousePointerClick,
    PenLine,
    Video,
    Mail,
    MessageSquareText,
    Globe,
    Gauge,
    Megaphone,
    type LucideIcon,
  } from 'lucide-react';
  
  export type Service = {
    title: string;
    description: string;
    body?: string;
    icon: LucideIcon;
  };
  
  export const services: Service[] = [
    {
      title: 'Search Engine Optimisation (SEO)',
      description:
        'Search Engine Optimisation is all about getting on that first Google page and another search Engine like Yahoo and Bing, staying top of the list and top of mind. We develop keyword strategies, understand the kind of content that attracts users, optimise rankings and then convert visitors to customers.',
      body: "As our agency has grown, and the digital landscape has evolved, we've developed our Digital Marketing offerings, but SEO is still very much the foundations to our champion campaigns. From making sure your website is technically sound, to understanding Google's ranking factors, we pull all the collated data into one place to produce a search strategy that's right for you. Whether that's achieving more #1 positions than The Beatles, or staying one step ahead of your competitors.",
      icon: Search,
    },
    {
      title: 'Social Media Marketing',
      description:
        "We bring your brand story to life on all the right social media platforms such as Facebook, Twitter, Linkedin, Instagram, Google My Business. We will grow and engage a community around your offering. We will define your audience and give them more to care about. There is so much to 'like'.",
      icon: Share2,
    },
    {
      title: 'PPC and Adwords Management',
      description:
        'We develop strategies for Pay-Per Click and Adwords using Google Ads, bid auctions and build your targeting audience. Optimise campaigns, track conversions, and measure your ROI. As a trusted Google partner, we put our money where our mouth is and promise to maximise your ROI and increase your conversions. With the perfect combination of industry leading tools, and forward thinking brains, we structure all of our PPC campaigns around audits, audiences and analysis. From exploring your current campaigns, to crafting new ones, we use data to find the best places to spend your PPC budget, whether that be on search engines, across display networks or on social media.',
      icon: MousePointerClick,
    },
    {
      title: 'Content Marketing',
      description:
        'We create content that speaks to people, at the right time and via the right channels. Understand what works for you by tracking and measuring performance.',
      body: "Understanding your audience's intentions when searching for a service or product is integral to a content strategy, which is why we not only carry out comprehensive research, but combine it with UX design. We then turn this knowledge into words, creating content that is loved by Google and users alike. Whether it's establishing you as a thought leader in your industry, or reeling in long tail traffic, we create content that sparks engagement, and inspires communities.",
      icon: PenLine,
    },
    {
      title: 'Video marketing',
      description:
        'We will set up, manage and optimise your YouTube channel. Target, test and develop your use of the Google Display Network and get creative with visual formats. We create best of the best video so that your audience can connect with you instantly. Script writing, Story boarding, Animation, Image selection, Video creation leave it all with us.',
      icon: Video,
    },
    {
      title: 'Email Marketing',
      description:
        "Your email list is one of your most powerful assets. We will manage and segment your data, test headlines and maximise open rates and ROI. We also cover marketing automation and the importance of data management regulations. E-mails have become a part of everyday life, everyone expects them, however not everyone opens them. But with a well-thought out email roadmap, we can help you achieve your aims, and ensure your emails are getting opened with the right message, at the right time of day and week. By pairing not-to-be-missed subject lines, with a cracking design we can deliver results and help shape your future campaigns by analysing the data, segmenting your email database and creating an implementation plan.",
      icon: Mail,
    },
    {
      title: 'Text Marketing',
      description:
        'We deliver your messages to your right audience, customers and subscribers using Mobile SMS or Whatsapp messages. We use text marketing to generate sales, but it can also improve brand awareness, educate subscribers, increase website traffic, or promote a charity or nonprofit organization.',
      icon: MessageSquareText,
    },
    {
      title: 'Website Optimisation',
      description:
        'What makes a winning website? You have just got 3 sec to engage your customer. We will give your website the edge that is, well-designed, optimised, better performance that not only looks good but also delivers for your business.',
      icon: Globe,
    },
    {
      title: 'Conversion Rate Optimisation',
      description:
        "It can be frustrating when you've pushed all the right buttons but your campaign isn't taking off. You can create what you think is the best looking e-mail newsletter, or the most engaging landing page, but that doesn't guarantee your audience members will love it just as much as you do. But there is a solution. By mixing together some A/B testing, Multivariate testing and analysis we can provide you with the recipe to success.",
      icon: Gauge,
    },
    {
      title: 'Digital PR and Magazine',
      description:
        "No longer is PR about having the local town crier announce the latest news, being mentioned on the radio, or getting onto page 3 of the national newspaper or getting into a national Magazine. It's about the relationships you have with influential stakeholders, the media and, your target audience, and if there's one thing we're good at, it's building relationships. By knocking some creative minds together we produce campaigns that shake up ideas, capture attention, and produce results.",
      icon: Megaphone,
    },
  ];
  
  export type Pillar = {
    title: string;
    description: string;
  };
  
  export const pillars: Pillar[] = [
    {
      title: 'Clients Love',
      description:
        'Our Clients Love our Transparency, Valued Partnership, Scalable Support, Active Listening, Royal Treatment, Authenticity, Expectation Management from the day before they start with us.',
    },
    {
      title: 'Supporting',
      description:
        'We support our client with the service-learning abilities, clear communication, Client suitable Timeframe adjustment, Simple examples for complex ideas, and educating them on risk free investment',
    },
    {
      title: 'Years Of Experience',
      description:
        'With 15 years of Experience, we produce labour efficiency, Maintain High Standardization and Specialisation, Technology driven solution which is easy to understand for our customers',
    },
    {
      title: 'Result Driven',
      description:
        'We create result driven strategies as we definitely know that digital marketing is one of the best kind. We recognize value, target outcomes, understand customers need, capture demands, and master their brand.',
    },
  ];
  
  export type Plan = {
    name: string;
    price: string;
    audience: string;
    productId: number;
    featured?: boolean;
  };
  
  export const plans: Plan[] = [
    { name: 'Basic', price: '£350', audience: 'For Startup', productId: 3292 },
    {
      name: 'Standard',
      price: '£700',
      audience: 'For Small Businesses',
      productId: 3297,
      featured: true,
    },
    {
      name: 'Premium',
      price: '£1050',
      audience: 'For Midsize Business',
      productId: 3296,
    },
    {
      name: 'Elite',
      price: '£1400',
      audience: 'For Enterprise',
      productId: 3295,
    },
  ];
  
  export type Project = {
    name: string;
    image: string;
    alt: string;
  };
  
  export const projects: Project[] = [
    {
      name: 'Thorney Park Golf Club',
      image:
        'https://services.visualytes.com/wp-content/uploads/2020/12/thornyparkseo.png',
      alt: 'Thorney Park Golf Club',
    },
    { name: 'Spicy Tadka', image: '', alt: 'Spicy Tadka' },
    { name: 'Sterling Washroom Services', image: '', alt: 'Sterling Washroom Services' },
    { name: 'Reeds Central', image: '', alt: 'Reeds Central' },
    { name: 'Positive Branding', image: '', alt: 'Positive Branding' },
    { name: 'Mw Estate Planning', image: '', alt: 'Mw Estate Planning' },
    { name: 'Marsham Court Hotel', image: '', alt: 'Marsham Court Hotel' },
    { name: 'Kandaka Kosmetics', image: '', alt: 'Kandaka Kosmetics' },
  ];
  
  export type Testimonial = {
    quote: string;
    name: string;
    role: string;
  };
  
  export const testimonials: Testimonial[] = [
    {
      quote:
        "Visualytes have been doing my SEO for a number of months. I started on page 3 of Google but I'm now on page 1 for all my key search terms. Nagendra Mishra has helped me understand the mystical world of SEO and I would highly recommend his company.",
      name: 'Matthew Wildeman',
      role: 'MW Estate Owner',
    },
    {
      quote:
        'Fabulous service from start to finish and who were extremely patient with us, being as non techy as we are at Reeds. The final website they produced, was clear, concise, but had a personal touch and exactly what we wanted. Thank you guys, great work.',
      name: 'Julie Freeman',
      role: 'Owner Reeds Central Ltd',
    },
    {
      quote:
        'I was introduced to visualytes by a friend. I had a web site produced by them . To say I am pleased with the web site, and their customer service it has been amazing . They were able to take me through each step and was very patient with me as I am not to hot on social media and websites. I have already recommended them to a friend . Thanks to you all for making it a easy process.',
      name: 'Mark Vella',
      role: 'Foto Trendz Owner',
    },
  ];
  
  export type Post = {
    title: string;
    date: string;
    author: string;
    excerpt: string;
    link: string;
  };
  
  export const posts: Post[] = [
    {
      title: '7 Social Media Marketing Things',
      date: 'July 7th, 2021 09:35 am',
      author: 'Nagendra Mishra',
      excerpt:
        '7 Social Media Marketing Trends to Follow Companies of all sizes and categories are racing up to get noticed on social media platforms every minute of the day. The new ones find it hard to get popular and the old…',
      link: 'https://services.visualytes.com/7-social-media-marketing-things/',
    },
    {
      title: '5 way of search engine marketing',
      date: 'July 7th, 2021 09:35 am',
      author: 'Nagendra Mishra',
      excerpt:
        '5 Ways Search Engine Marketing Will Profit Your Business Small and big businesses alike are all on the same worldwide web (internet) putting in all their efforts to stand out from the crowd. They know it is their brand’s persona…',
      link: 'https://services.visualytes.com/5-way-of-search-engine-marketing/',
    },
  ];
  
  export const heroImage =
    'https://services.visualytes.com/wp-content/uploads/2020/01/Digital-header.jpg';
  
  export const heroImageAlt =
    'website designer, Digital Marketing Agency, search engine optimisation, seo company, seo services, SEO company in London, web designing company, Digital Marketing Agency London, social media agencies, branding agencies';
  