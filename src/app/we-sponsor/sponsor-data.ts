export type Sponsorship = {
  id: string;
  postId: string;
  index: string;
  title: string;
  dateLabel: string;
  sortDate: string;
  detail: string;
  image: string;
  featured?: boolean;
  colorClasses: string;
};

export const sponsorships: Sponsorship[] = [
  {
    id: "eastleigh-mela-2023", postId: "post-11338", index: "01", title: "Eastleigh Mela 2023", dateLabel: "11 May 2023", sortDate: "2023-05-11",
    detail: "Lead sponsor, organized together with the Asian Welfare and Cultural Association (AWCA).", image: "/assets/png/Eastleigh-Mela-23.png", 
    colorClasses: "bg-violet-50 text-violet-950 dark:bg-violet-950/40 dark:text-violet-50",
  },
  {
    id: "eastleigh-mela-2024", postId: "post-10739", index: "02", title: "Eastleigh Mela 2024", dateLabel: "5 Jul 2022", sortDate: "2022-07-05",
    detail: "24 July, held at Eastleigh recreation ground.", image: "/assets/jpg/eastleigh.jpg",
    colorClasses: "bg-teal-50 text-teal-950 dark:bg-teal-950/40 dark:text-teal-50",
  },
  {
    id: "golf-day-championship", postId: "post-10720", index: "03", title: "Golf Day Championship", dateLabel: "21 Feb 2022", sortDate: "2022-02-21",
    detail: "Visualytes Golf Day Championship, held 4 June 2022.", image: "/assets/jpg/fix_golf-1170x780.jpg",
    colorClasses: "bg-orange-50 text-orange-950 dark:bg-orange-950/40 dark:text-orange-50",
  },
  {
    id: "big-platinum-festival", postId: "post-10683", index: "04", title: "The Big Platinum Festival", dateLabel: "1 Feb 2022", sortDate: "2022-02-01",
    featured: true,
    detail: "22 July, 10:00am - 9:00pm.", image: "/assets/jpg/Banner_fix-1170x780.jpg",
    colorClasses: "bg-pink-50 text-pink-950 dark:bg-pink-950/40 dark:text-pink-50",
  },
  {
    id: "gosport-festival-2021", postId: "post-10660", index: "05", title: "Gosport Festival 2021", dateLabel: "30 Jul - 1 Aug 2021", sortDate: "2021-07-30",
    featured: true,
    detail: "Held at Gosport Waterfront.", image: "/assets/jpg/Disco_dance.jpg",
    colorClasses: "bg-amber-50 text-amber-950 dark:bg-amber-950/40 dark:text-amber-50",
  },
];

export function getSponsorship(slug: string) {
  return sponsorships.find((item) => item.id === slug);
}
