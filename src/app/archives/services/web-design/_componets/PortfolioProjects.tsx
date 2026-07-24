import { sectionReveal } from "@/src/common/components/ui/brand/page-effects";
import { motion } from "framer-motion";
import Image from "next/image";
import HomeBrandButton from "../../../../(home)/_componts/shared/HomeBrandButton";
import { useState } from "react";
import { BRAND_HOVER } from "@/src/common/components/ui/brand/theme";
 
export default function PortfolioProjects() {
   const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Brochure", "Charity", "Corporate", "Directory", "Ecommerce", "Portfolio", "Promotional"];
   const portfolioProjects = [
    { title: "Harry Redknapp", categories: ["Promotional"], image: "https://services.visualytes.com/wp-content/uploads/2020/02/vis-j-600x600.jpg" },
    { title: "Excel Surveyors And Valuers", categories: ["Corporate"], image: "https://services.visualytes.com/wp-content/uploads/2020/02/property-value-600x600.png" },
    { title: "Numeric Accounting Limited", categories: ["Corporate"], image: "https://services.visualytes.com/wp-content/uploads/2020/02/numeric-accounting-600x600.png" },
    { title: "GEOFF HURST GEOFF HURST", categories: ["Promotional"], image: "https://services.visualytes.com/wp-content/uploads/2020/02/sir-geoff-hurst-600x600.png" },
    { title: "The Boardroom", categories: ["Corporate"], image: "https://services.visualytes.com/wp-content/uploads/2020/02/i-go-to-be-challenged-600x600.png" },
        { title: "Marsham Court Hotel", categories: ["Corporate"], image: "https://services.visualytes.com/wp-content/uploads/2020/02/marshamcourthotel-768x768.png" },

    { title: "Ibleo", categories: ["Corporate"], image: "https://services.visualytes.com/wp-content/uploads/2020/02/homemade-authentic-sicilian-food-768x768.png" },

        { title: "Studio Creatives", categories: ["Corporate"], image: "https://services.visualytes.com/wp-content/uploads/2020/02/studio-creatives-768x768.png" },
                { title: "Unity 101 Community Radio", categories: ["Corporate"], image: "https://services.visualytes.com/wp-content/uploads/2020/02/unity-768x768.png" },
                  { title: "Lois Ambitho Foundation", categories: ["Charity"], image: "https://services.visualytes.com/wp-content/uploads/2020/02/together-we-can-768x768.png" },

                        { title: "Venus", categories: ["Corporate"], image: "https://services.visualytes.com/wp-content/uploads/2020/02/venus-768x768.png" },
    { title: "Compassion UK", categories: ["Charity"], image: "https://services.visualytes.com/wp-content/uploads/2020/02/compassion-600x600.png" },
    { title: "DPO Assist", categories: ["Brochure", "Corporate"], image: "https://services.visualytes.com/wp-content/uploads/2020/02/DPO-600x600.png" },
    { title: "Signing It Online", categories: ["Brochure"], image: "https://services.visualytes.com/wp-content/uploads/2020/02/signitonline-768x768.png" },
        { title: "Home Alisara Excel Spa", categories: ["Brochure"], image: "https://services.visualytes.com/wp-content/uploads/2020/02/welcome-to-alisara-excel-spa-768x768.png" },
            { title: "Home Carewell Beauty Clinic", categories: ["Brochure"], image: "https://services.visualytes.com/wp-content/uploads/2020/02/carewell-beauty-clinic-768x768.png" },

    { title: "Find Us On Web", categories: ["Corporate", "Directory"], image: "https://services.visualytes.com/wp-content/uploads/2020/02/trade-show-2019-20-600x600.png" },
    { title: "Simply Invoice", categories: ["Brochure"], image: "https://services.visualytes.com/wp-content/uploads/2020/02/managing-your-invoice-online-600x600.png" },
    { title: "Geecon Global", categories: ["Corporate"], image: "https://services.visualytes.com/wp-content/uploads/2020/02/geecon-600x600.png" },
    { title: "Grafix Sign", categories: ["Brochure", "Corporate"], image: "https://services.visualytes.com/wp-content/uploads/2020/02/grafix-sign-600x600.png" },
   { title: " Tara Hamilton Howard", categories: ["Portfolio"], image: "https://services.visualytes.com/wp-content/uploads/2020/02/tarahamilton-768x768.png" },
      { title: " Lilliesonline", categories: ["Ecommerce"], image: "https://services.visualytes.com/wp-content/uploads/2020/02/lillies-768x768.png" },
            { title: " OSeasons", categories: ["Ecommerce"], image: "https://services.visualytes.com/wp-content/uploads/2020/02/oseasons-768x768.png" },

      { title: " LAMODA", categories: ["Ecommerce"], image: "https://services.visualytes.com/wp-content/uploads/2020/02/lamoda1-768x768.png" },


  ];

  const filteredProjects = activeFilter === "All" 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.categories.includes(activeFilter));
  return (
  <>
  <section className="py-16 lg:py-20">
            <div className="mx-auto max-w-[1320px] px-6">
              <motion.div
                {...sectionReveal}
                className="mb-16 text-center"
              >
                <span className="inline-block rounded-full border border-pink-300/30 bg-pink-300/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-pink-300 mb-6">
                  Our Portfolio
                </span>
                <h2 className="text-[40px] sm:text-[48px] font-bold text-white">
                  Our Latest & Greatest <span className="bg-gradient-to-r from-pink-300 to-fuchsia-300 bg-clip-text text-transparent">Projects</span>
                </h2>
              </motion.div>
  
              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`px-6 py-2 text-sm font-bold transition-all duration-300 ${
                      activeFilter === category
                        ? "bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white shadow-lg"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
  
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.map((project, index) => (
                      <motion.div
                        key={index}
                        {...sectionReveal}
                        transition={{ delay: index * 0.08 }}
                        className={`group relative overflow-hidden  cursor-pointer ${BRAND_HOVER.card}`}
                        onClick={() => window.open(project.image, "_blank")}
                      >
                        {/* Image */}
                        <div className="relative h-[380px] w-full bg-slate-950">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-contain  transition-transform duration-700 group-hover:scale-105"
                          />
  
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100" />
  
                          {/* Hover Content */}
                          <div className="absolute bottom-0 left-0 right-0 translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 p-6">
                          
  
                            <h3 className="text-2xl font-bold text-white">
                              {project.title}
                            </h3>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
            </div>
             <div className="mt-12 flex justify-center">
                    <HomeBrandButton href="/portfolio" variant="outline">
                     View all projects
                    </HomeBrandButton>
                  </div>
          </section>
        </>
        )
}