export type OfferFeature = {
  name: string;
  disabled?: boolean;
};

export type Offer = {
  name: string;
  price: string;
  features: OfferFeature[];
};


export const offers: Offer[] = [
  {
    name: "Landing Pages",
    price: "499",
    features: [
      {
        name: "Single Static Page",
      },
      {
        name: "Technical Support Post Delivery Free For 3 Months",
      },
      {
        name: "SEO Post Delivery Free For 1 Month",
      },
      {
        name: "Technology Platform: HTML/CSS",
      },
      {
        name: "Mobile Friendly",
      },
      {
        name: "Domain Registration",
        disabled: true,
      },
      {
        name: "Hosting",
        disabled: true,
      },
      {
        name: "Corporate Mailbox",
        disabled: true,
      },
      {
        name: "Custom Functionalities",
        disabled: true,
      },
      {
        name: "Mobile App (iOS + Android)",
        disabled: true,
      },
    ],
  },


  {
    name: "Brochure Website",
    price: "1499",
    features: [
      {
        name: "Five Static Pages",
      },
      {
        name: "Technical Support Post Delivery Free For 3 Months",
      },
      {
        name: "SEO Post Delivery Free For 2 Months",
      },
      {
        name: "Technology Platform: WordPress",
      },
      {
        name: "Mobile Friendly",
      },
      {
        name: "Domain Registration For 1 Year",
      },
      {
        name: "Hosting Free For 3 Months",
      },
      {
        name: "Corporate Mailbox For 5 Users",
      },
      {
        name: "Custom Functionalities",
        disabled: true,
      },
      {
        name: "Mobile App (iOS + Android)",
        disabled: true,
      },
    ],
  },


  {
    name: "Corporate Website",
    price: "2499",
    features: [
      { name: "Static Pages Up To 20" },
      { name: "Technical Support Post Delivery Free For 3 Months" },
      { name: "SEO Post Delivery Free For 2 Months" },
      { name: "Technology Platform: WordPress / Drupal" },
      { name: "Mobile Friendly" },
      { name: "Domain Registration For 1 Year" },
      { name: "Hosting Free For 3 Months" },
      { name: "Corporate Mailbox For 20 Users" },
      { name: "Custom Functionalities" ,disabled: true,},
      { name: "Mobile App (iOS + Android)",disabled: true, },
    ],
  },


  {
    name: "Web Portal",
    price: "3499",
    features: [
      { name: "Unlimited Static Pages" },
      { name: "Technical Support Post Delivery Free For 3 Months" },
      { name: "SEO Post Delivery Free For 2 Months" },
      { name: "Technology Platform: WordPress / Laravel / Drupal / CodeIgniter" },
      { name: "Mobile Friendly" },
      { name: "Domain Registration For 2 Years" },
      { name: "Hosting Free For 3 Months" },
      { name: "Unlimited Corporate Mailbox" },
      { name: "Up To 5 Custom Functionalities" },
      { name: "Mobile App (iOS + Android)",disabled: true, },
    ],
  },


  {
    name: "Ecommerce WW",
    price: "3499",
    features: [
      { name: "Unlimited Static Pages" },
      { name: "Technical Support Post Delivery Free For 3 Months" },
      { name: "SEO Post Delivery Free For 2 Months" },
      { name: "Technology Platform: WooCommerce + WordPress" },
      { name: "Mobile Friendly" },
      { name: "Domain Registration For 2 Years" },
      { name: "Hosting Free For 3 Months" },
      { name: "Unlimited Corporate Mailbox" },
      { name: "Up To 5 Custom Functionalities" },
      { name: "Mobile App (iOS + Android)",disabled: true, },
    ],
  },


  {
    name: "Ecommerce OC",
    price: "4999",
    features: [
      { name: "Unlimited Static Pages" },
      { name: "Technical Support Post Delivery Free For 3 Months" },
      { name: "SEO Post Delivery Free For 2 Months" },
      { name: "Technology Platform: OpenCart" },
      { name: "Mobile Friendly" },
      { name: "Domain Registration For 2 Years" },
      { name: "Hosting Free For 3 Months" },
      { name: "Unlimited Corporate Mailbox" },
      { name: "Up To 5 Custom Functionalities" },
      { name: "Mobile App (iOS + Android)",disabled: true, },
    ],
  },


  {
    name: "Ecommerce MG",
    price: "6999",
    features: [
      { name: "Static Pages Up To 20" },
      { name: "Technical Support Post Delivery Free For 3 Months" },
      { name: "SEO Post Delivery Free For 2 Months" },
      { name: "Technology Platform: Magento" },
      { name: "Mobile Friendly" },
      { name: "Domain Registration For 2 Years" },
      { name: "Hosting Free For 3 Months" },
      { name: "Unlimited Corporate Mailbox" },
      { name: "Up To 5 Custom Functionalities" },
      { name: "Mobile App (iOS + Android)",disabled: true, },
    ],
  },


  {
    name: "Ecommerce MGM",
    price: "9999",
    features: [
      { name: "Unlimited Static Pages" },
      { name: "Technical Support Post Delivery Free For 3 Months" },
      { name: "SEO Post Delivery Free For 2 Months" },
      { name: "Technology Platform: Magento" },
      { name: "Mobile Friendly" },
      { name: "Domain Registration For 2 Years" },
      { name: "Hosting Free For 3 Months" },
      { name: "Unlimited Corporate Mailbox" },
      { name: "Up To 5 Custom Functionalities" },
      { name: "Mobile App (iOS + Android): YES" },
    ],
  },


  {
    name: "Directory Website",
    price: "9999",
    features: [
      { name: "Unlimited Static Pages" },
      { name: "Technical Support Post Delivery Free For 3 Months" },
      { name: "SEO Post Delivery Free For 2 Months" },
      { name: "Technology Platform: CodeIgniter" },
      { name: "Mobile Friendly" },
      { name: "Domain Registration For 2 Years" },
      { name: "Hosting Free For 3 Months" },
      { name: "Unlimited Corporate Mailbox" },
      { name: "Up To 5 Custom Functionalities" },
      { name: "Mobile App (iOS + Android): YES" },
    ],
  },


  {
    name: "Custom Website",
    price: "Contact Us",
    features: [
      { name: "Unlimited Static Pages" },
      { name: "Technical Support Post Delivery Free For 3 Months" },
      { name: "SEO Post Delivery Free For 2 Months" },
      { name: "Technology Platform: Any Technology" },
      { name: "Mobile Friendly" },
      { name: "Domain Registration For 2 Years" },
      { name: "Hosting Free For 3 Months" },
      { name: "Unlimited Corporate Mailbox" },
      { name: "Up To 5 Custom Functionalities" },
      { name: "Mobile App (iOS + Android): YES" },
    ],
  },
];