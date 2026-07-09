export interface MediaNews {
    id: number;
    image: string;
    title: string;
    link: string;
    content: string[];
    quote: string[];
    publisher: string;
    publishDate: string;
  }
  
  export const mediaNews: MediaNews[] = [
    {
      id: 1,
      image: "/assets/jpg/news-1.jpg",
      title:
        "Southampton's religious buildings are being deep cleaned by local businessman",
      link: "https://www.dailyecho.co.uk/news/18501844.southamptons-religious-buildings-deep-cleaned-local-businessman/",
      content: [
        "RELIGIOUS buildings across Southampton are being deep cleaned by a local businessman so they can reopen as soon as possible.",
        "Around four weeks ago, Southampton businessman, Nagendra Mishra began a project to deep clean all of the religious venues around the city.",
        "Starting with his own temple, the Vedic Society Hindu Temple, word began to spread quickly and Nagendra was able to book many venues across Southampton, including the Abu Bakr Mosque, one of the largest Mosques in the South of England.",
        "The 36-year-old has said that he is just happy to be helping out the community, and that while the virus has taken so much away from us, at a time like this, many people find comfort in religion.",
        `"He said: "My family and I visited our temple every week before lockdown, and when we heard that lockdown measures were being lifted, we were looking forward to going back. We knew that the temple would require a deep clean before we could go back, and then we realised that it wasn't just the Vedic Society Temple, but all the religious venues in the city and hence started a campaign, Clean Society from Corona."`,
        `"I'm just happy to be helping, this virus has taken so much away from all of us, and at a time like this a lot of us find comfort in religion."`
      ],
      quote: [
        "Nagendra is the owner of web development company, Visualytes Limited and he is also a member of BBX - an online business community tool that allow businesses to trade."
      ],
      publisher: "Dailyecho",
      publishDate: "8-Jun-2020"
    },
    {
      id: 2,
      image: "/assets/jpg/news-3.jpg",
      title: "Unity 101 celebrating 15 year anniversary in online event",
      link: "https://www.dailyecho.co.uk/news/18956551.unity-101-celebrating-15-year-anniversary-online-event/",
      content: [
        "A RADIO station is set to connect 600 people to celebrate 15 years of broadcasting.",
        "Unity 101, Southampton based radio station, will be connecting over 600 volunteers, partners and VIP guests as it celebrates its 15th Anniversary online Awards and Achievement Event.",
        "Claiming to be the South's first and longest-running Asian and ethnic community radio station, Unity 101 has an estimated audience of 60,000.",
        "The event is taking place on Zoom, on January 8, 2021 and will be streamed online on the stations website so that people will be able to join in from the comfort of their own homes.",
        "A “lavish” presentation is said to be taking place, with family and friends also being able to enjoy eating a 3 course meal, catered by Sanjha Restaurant, in the comfort of their homes.",
        "Website designer, Visualytes, developed a new website and together with the radio station created “maybe the first Drive In - Take Away” that will maintain social distance and yet, connect People.",
        "With online video, filmed and edited at Solent University and completed and mastered in Mumbai, India, the presentation is expected to have an atmosphere similar to “Bollywood glitzy film”.",
        "Ram Kalyan, project and Station Manager, said: “Unity 101 has always been about community, celebrating cultures, and connecting people."
      ],
      quote: [
        "“Our annual awards and anniversary event has always been a special time to celebrate with all.",
        "“It’s going to be really special. We have a lot of surprises planned for our volunteers and guests.",
        "It will be really interactive including zoom live event experience.",
        "The event will include a talk from the stations director Ash Rajput about connecting people and a speech by Mr Chi Yau Managing Director Yau Brothers & Co Limited.",
        "The 6th Unity 101 Community COVID-19 Awards and the Lifetime Achievement will be presented by Olivia Pinkney, Chief Constable of Hampshire Constabulary, with councillor Sue Blatchford, the Mayor of Southampton also in attendance."
      ],
      publisher: "Dailyecho",
      publishDate: "12-Dec-2020"
    }
  ];