"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { sectionReveal } from "@/src/common/components/ui/brand/page-effects";

const faqs = [
  {
    question: "Do you sign an NDA?",
    answer: "Yes, we sign an NDA (Non-Disclosure Agreement) always when a client wants it. We can do it at the very beginning before we discuss your project’s detail, or at another stage of the process – it’s up to you.",
  },
  {
    question: "Who owns the Intellectual Property rights?",
    answer: "Yes, you are the owner of Intellectual Property rights at all times.",
  },
  {
    question: "How do you handle time zone differences?",
    answer: "We are 100% office-based team, so while working with a partner from any place in the world, we have at the most 2 time zones to coordinate. We have experience in working with clients from all over the world and we are able to cooperate effectively across multiple time zones. During the kick-off meeting, we set the rules for our cooperation. We agree upon our meeting times that are comfortable for both sides. We set our working hours so that we can have a video-call with you. We communicate with you on Slack through a project-dedicated channel, where you can always see all the important discussions about your product.",
  },
  {
    question: "Where is your team based?",
    answer: "Our team works in one office, based in Southampton, United Kingdom. Visualytes is one of the fastest-growing tech hubs in the world. Its location enables fast and convenient access from any city in the world.",
  },
  {
    question: "What pricing model do you use?",
    answer: "You work with us on a Time & Materials basis. The total cost of a T&M project depends on the actual effort made towards the development. In this model, you pay for the actual time the team spends on the development of specific tasks. You are in charge of the project’s scope and set priorities for the development team. Why we use Time & Materials model? It ensures flexibility, shorter time-to-market, and it allows Continuous Delivery of a software product. This approach ensures high-quality – your mobile app will be tested at every stage of development. What’s more, you can flexibly set the direction of app development depending on the users’ feedback, market situation, or opportunities that arise during the development.",
  },
  {
    question: "What specialists are in your team?",
    answer: "We’re 100% office-based team of 70+ talented professionals: iOS developers, Android developers, Flutter developers, React Native developers, Backend developers, and Web developers. However, our development team consists also of certified Scrum Masters, UX/UI designers, and Quality Assurance Engineers, and Business Analyst. Having these experts on board, we are able to take the whole app development process of your shoulders, so you can focus on the business.",
  },
  {
    question: "How big is a typical development team?",
    answer: "We adjust the team’s size according to your needs. A typical development team consists of: 1 Product Owner (from you side), 1 Scrum Master, 1 Quality Assurance Engineer, 2 Android developers, 2 iOS developers, 1 Business Analyst (optional).",
  },
  {
    question: "Can you show examples of your work?",
    answer: "Android: CCC Shoes & Bags, Giphy, Makani, Veepee, HoneyBee, Hematologist’s Calculator, iOS: CCC Shoes & Bags, Makani, Hematologist’s Calculator Flutter: in10 Web: Culture Secrets Apple Watch: OhMiBod iPad: HSPal",
  },
  {
    question: "What industries do you have experience in?",
    answer: "We have completed over 130 mobile & web projects and we have a strong background in developing applications from various categories – just to name a few: mobile commerce, IoT, fintech, medtech, maps & transport, lifestyle, digital transformation, and more. The knowledge and experience gained in so many industries for nearly 10 years mean that we are able to deal with the development of any type of application.",
  },
  {
    question: "Is the code transferable to another team?",
    answer: "Yes. The code we create is very readable and well documented, which makes it easy to transfer the project to another team if needed.",
  },
  {
    question: "What are the stages of app development?",
    answer: "There are 7 crucial stages of the mobile app development process from a business point of view: Clarifying the vision, Choosing a partner, Wireframes & Design, Project Kick-off & Setup, App development, Release Preparation, App Maintenance.",
  },
  {
    question: "How much does it cost to develop an app?",
    answer: "In our experience, the best way to talk about the cost of mobile app development is by thinking about it in terms of complexity. And so: Basic applications cost around $29,500. Such apps take the development team from 500 to 700 hours of work (development + QA). Medium-complexity applications cost around $29,500-$50,500. This kind of apps include more sophisticated features like customer-facing server applications. Building such a mobile application will take the team around 700 to 1200 working hours. Complex mobile applications cost more than $50,500. They require building a complicated architecture, and multiple integrations or meeting high-security demands cost even more. They take more than 1200 hours to complete.",
  },
  {
    question: "Who is in the standard team?",
    answer: "A standard team consists of a Product Owner (on your side), Scrum Master, Quality Assurance specialists, UX/UI Designers, and Developers. The size of the team depends on your deadlines and the complexity of your project.",
  },
  {
    question: "Do you provide progress updates?",
    answer: "Yes, of course. After every Sprint Review, you will get: An app demo build (so you can check if the created app fits your expectations), A detailed review of what’s been done, Information about eventual difficulties or additional work that has been done, Information about how many hours the team worked on the project during the Sprint. According to your preferences, you can take part in the Review meeting, or just get the above-mentioned information with an E-mail. What’s more, we use these good practices to ensure 100% transparency: You have direct contact with every team member – through Slack, e-mail, video call, during Scrum meetings, or even live. PO Guidance – as a Product Owner will be supported in your role. We will introduce you to the necessary tools that help you to monitor the budget and maximize the value delivered by a development team. Jira Dashboard – the team will provide you with a presentation of the most important data about the project on transparent charts. Tempo Timesheet – it is a Jira tracking tool. At any moment you can check what the team is spending time on. Forecast & Change Management – we forecast the project budget, support you in its’ monitoring, and predict potential risks, so they can be prevented. Dropbox / Google – you have access to all materials collected in one place.",
  },
  {
    question: "Do you help with app store publishing?",
    answer: "Yes, of course. We will upload your Android application on the Google Play Store and your iOS app on Apple Store. It is also a part of our app development process. We will also guide you through the app setup on the stores regarding the marketing materials, description, and legacy issues.",
  },
  {
    question: "Do you offer app maintenance?",
    answer: "Yes, we also do maintenance. Mobile app development is just a start. During the app maintenance, the development team implements app monitoring tools (e.g. HockeyApp, Crashlytics, Google Analytics, Firebase) to every product we have created. Thanks to these tools, we can detect any crashes, follow the app’s statistics, and plan product enhancement.",
  },
  {
    question: "Can you help after the project is finished?",
    answer: "We invite you to cooperate with us in the form of app maintenance. This option gives you confidence that the team is available always when your project needs us. If you do not decide on maintenance, you can contact us with a specific need, but whether we can help at the moment depends on the current booking of the team.",
  },
  {
    question: "What happens after app development is complete?",
    answer: "Yes. When we finish mobile app development, we support you in the process of publishing your mobile app on the Google Play Store and Apple Store. Then, we offer you app maintenance services.",
  },
  {
    question: "What is a mobile app?",
    answer: "A mobile app is a type of application designed to run on a mobile device, which can be a smartphone or tablet computer. Contrary to apps designed for desktop computers, mobile apps move away from integrated software systems. Instead, each mobile application provides an isolated and limited functionality. For example, it can be a game, a calculator, or a mobile web browser. Mobile applications are usually developed by a mobile app development company. When talking about basics of mobile application, it’s worth to mention 3 main types of mobile applications – native apps, web apps, and hybrid apps.",
  },
  {
    question: "What are native apps?",
    answer: "Such apps are built for a single mobile Operating System – mostly for Android or iOS. They are downloaded and installed via an app store and have access to the system resources, such as GPS and the camera function. Native mobile apps live and run on a device itself. Facebook Messenger, Whatsapp, Instagram, Google Maps, and Facebook Messenger are examples of popular mobile apps.",
  },
  {
    question: "What are web apps?",
    answer: "Web apps are not native to a particular system and don’t need to be downloaded or installed. User accesses them via the internet browser. Due to their responsive nature, they do look and function similarly to native mobile apps. They need an active Internet connection to run.",
  },
  {
    question: "What is a mobile app development company?",
    answer: "In short, mobile app development companies create mobile applications with focus on delivering software that takes advantage of the unique features of mobile device hardware. In our opinion, a top mobile app development company should be long-term partner who takes the whole app development process off its client’s shoulders. They should have proactive approach – treat your project as their own, and share ideas for the best possible outcomes. Moreover, a professional mobile app developers should be Agile-driven. As the App Owner you should be involved in the process.",
  },
  {
    question: "What is a software house?",
    answer: "Software house is a company that focuses on developing and distributing software products. The goals of a software house vary depending on its client base and specialization. The types of software companies are: Product-based companies – businesses that develop their own products and then deliver them to end-users. Service-based companies (agencies) – companies that work directly with businesses and provide them with services such as custom software development, consulting, or dedicated development teams. A mobile app development company is this kind of a software house.",
  },
  {
    question: "How to choose a mobile app development company?",
    answer: "You’ve decided to develop a mobile app with a professional mobile app development company. The process of choosing the right partner may seem challenging for businesses or entrepreneurs, especially if you are doing it for the first time. If you want to pick the best mobile app development for your needs, probably you’re wondering how to do that. We recommend you to verify a few factors when considering cooperation with a mobile app development company. Here’s a checklist: Check out their portfolio. Have they built products similar to yours? Do they have experience in working with companies from your industry? Check their profile and clients’ reviews on Clutch.co Ask for detailed information about the code. Will you have full ownership of the code created by the company? Will the code be hosted in code repositories like Bitbucket or Github? Make sure the code will be written in English. Learn how do they organize the process of mobile app development. What tools do they use? Do they work in Scrum or other Agile frameworks? Consult the Independent Contractor Agreement with a lawyer before signing it. Compare the estimation you get with the estimation from another company.",
  },
  {
    question: "What are the phases of mobile app development?",
    answer: "Here are the most important phases in mobile app development you should know before jumping on the mobile bandwagon. Phase 1: Discovery During this phase, you need to strategize and define the experience your mobile app will deliver to its users. Who is the target audience? What problem will the mobile app solve? An important deliverable of this phase is a solid product roadmap and the detailed technical requirements document. A 3-day Product Design Workshop is can help you to go through this phase successfully. Phase 2: Mobile app development The development team writes the code and realize your mobile app idea. The duration of this phase will depend on the number of features and complexity. Note that testing will take place during the development phase as well. Once your mobile app has been developed and approved by the app store, it’s time for the launch! Phase 3: Maintenance, support, and further development Once your mobile app is downloaded and used by real users, it’s worth to listen closely to their feedback. This will help you determine which features should be built next, or what you need to change in your product to deliver an even better experience.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20">
      <div className="relative mx-auto max-w-[1320px] px-6">
        <motion.div {...sectionReveal} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/30 transition-colors"
              >
                <h3 className="text-xl font-semibold text-white">{faq.question}</h3>
                <ChevronDown
                  className={`w-6 h-6 text-cyan-300 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
