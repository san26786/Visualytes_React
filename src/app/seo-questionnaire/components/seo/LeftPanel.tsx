"use client";

import {
  ArrowUpRight,
  BarChart3,
  Globe,
  Search,
  TrendingUp,
} from "lucide-react";

export default function LeftPanel() {
  return (
    <section className="relative flex min-h-screen w-full overflow-hidden bg-[#0B1020] px-12 py-12">
      
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute left-[-150px] top-[-100px] h-[500px] w-[500px] rounded-full bg-violet-600/30 blur-[160px]" />

        <div className="absolute bottom-[-150px] right-[-100px] h-[500px] w-[500px] rounded-full bg-pink-500/20 blur-[160px]" />
      </div>


      {/* Content */}
      <div className="relative z-10 flex w-full flex-col justify-between">


        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">

            <div className="
              flex h-12 w-12 items-center justify-center
              rounded-2xl
              bg-white
              text-xl
              font-bold
              text-black
            ">
              V
            </div>


            <div>
              <h2 className="text-xl font-semibold text-white">
                Visualytes
              </h2>

              <p className="text-sm text-white/50">
                Digital Growth Partner
              </p>
            </div>

          </div>
        </div>



        {/* Main Content */}
        <div className="max-w-xl">


          <div className="
            mb-6 inline-flex
            items-center gap-2
            rounded-full
            border border-white/10
            bg-white/5
            px-5 py-2
            text-sm
            text-white/80
            backdrop-blur-xl
          ">
            <span className="h-2 w-2 rounded-full bg-green-400" />

            SEO Strategy Setup
          </div>



          <h1 className="
            text-6xl
            font-semibold
            leading-[1.05]
            tracking-tight
            text-white
          ">
            Turn Your Website Into A Growth Engine.
          </h1>



          <p className="
            mt-6
            max-w-lg
            text-lg
            leading-8
            text-white/60
          ">
            Answer a few questions and let our SEO experts create
            a personalized strategy to improve rankings, traffic,
            and conversions.
          </p>



          {/* Features */}
          <div className="mt-10 space-y-4">


            {[
              {
                icon: Search,
                title:"Keyword Research",
                desc:"Find opportunities your competitors miss"
              },
              {
                icon: Globe,
                title:"Competitor Analysis",
                desc:"Understand your market position"
              },
              {
                icon: TrendingUp,
                title:"Growth Roadmap",
                desc:"A clear SEO action plan"
              },

            ].map((item,index)=>(
              
              <div
                key={index}
                className="
                flex items-center gap-5
                rounded-2xl
                border border-white/10
                bg-white/[0.05]
                p-5
                backdrop-blur-xl
                "
              >

                <div className="
                  flex h-12 w-12
                  items-center justify-center
                  rounded-xl
                  bg-white
                  text-black
                ">
                  <item.icon size={22}/>
                </div>


                <div>
                  <h3 className="font-medium text-white">
                    {item.title}
                  </h3>

                  <p className="text-sm text-white/50">
                    {item.desc}
                  </p>
                </div>


              </div>

            ))}


          </div>


        </div>




        {/* Analytics Card */}
        <div
          className="
          mt-10
          rounded-3xl
          border border-white/10
          bg-white/[0.06]
          p-6
          backdrop-blur-xl
          "
        >

          <div className="flex justify-between">


            <div>

              <p className="text-sm text-white/50">
                Average Traffic Growth
              </p>


              <div className="mt-2 flex items-center gap-3">

                <h3 className="
                  text-5xl
                  font-semibold
                  text-white
                ">
                  248%
                </h3>


                <span className="
                  flex items-center gap-1
                  rounded-full
                  bg-green-400/10
                  px-3 py-1
                  text-sm
                  text-green-400
                ">
                  +32%
                  <ArrowUpRight size={15}/>
                </span>


              </div>


            </div>



            <div className="
              flex h-16 w-16
              items-center justify-center
              rounded-2xl
              bg-gradient-to-br
              from-violet-500
              to-pink-500
            ">
              <BarChart3
                className="text-white"
                size={30}
              />
            </div>


          </div>


          {/* Fake Graph */}
          <div className="
            mt-8
            flex
            h-20
            items-end
            gap-2
          ">

            {[30,45,35,70,55,90,75,100].map(
              (height,index)=>(
                
                <div
                  key={index}
                  className="
                  flex-1
                  rounded-t-lg
                  bg-gradient-to-t
                  from-violet-500
                  to-pink-400
                  "
                  style={{
                    height:`${height}%`
                  }}
                />

              )
            )}

          </div>


        </div>


      </div>


    </section>
  );
}
