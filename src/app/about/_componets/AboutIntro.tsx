import PageBanner from "@/src/common/components/layouts/PageBanner";

 export default function AboutIntro() {
    return (
        <>
        
        <section >
        <PageBanner title="About Us" />

        {/* Tag Line */}
        <div className="max-w-7xl mx-auto px-6 py-5">
          <h2 className="text-center text-[48px] font-medium text-[#784191]">
          &quot; Your Visualisation Is Our Reality &quot;
          </h2>
        </div>

        {/* Brand Statement */}
        <div className="max-w-7xl mx-auto px-6 py-5 text-center">
          <h2 className="text-[48px] font-medium text-[#3886C6]">
            Our Brand Statement
          </h2>

          <p className="mt-5 text-[30px] font-medium text-gray-800 leading-relaxed max-w-7xl mx-auto">
            Visualytes brings perfection, high quality deliveries and premium
            level service to web-apps, computer software and digital marketing
            while helping clients to fulfill all their IT needs under one roof.
          </p>
        </div>

        {/* Welcome Title */}
        <div className="max-w-7xl mx-auto px-6 pt-5">
          <div className="flex justify-center">
            <div className="border border-gray-400 rounded-full px-10 py-3">
              <h3 className="text-3xl md:text-5xl font-medium text-[#BDCF0F]">
                Welcome Message From Our MD
              </h3>
            </div>
          </div>
        </div>

        {/* Welcome Content */}
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="space-y-5 text-[#7f7f7f] text-[20px] font-[400] leading-9">
            <p>
              Welcome to Visualytes. We are a group of highly dynamic, creative
              and talented skill set of people, who are one hundred percent ready
              to go that extra mile in order to create premium value for our
              clients. It’s this skill set of creativity that make Visualytes so
              great and one of the top reasons our clients choose to work with us
              on their required projects. This is the foundation on which our
              successful and innovative reputation is based.
            </p>

            <p>
              We have created Visualytes to reinvent existing business models and
              industry standards, developing first-class solutions for our
              clients, partners, employees, and shareholders. Today we are proud
              to say that we have surpassed this optimistic goal in so many areas
              with optimal effectiveness.
            </p>

            <p>
              When we say we are your partner for total technical care, we mean
              it! With many years of experience and expertise, we are one of the
              industry leaders in integrated IT solutions, which are not only the
              backbone of our business but also the trigger of our growth into new
              innovation and strategic expansion. Owing to such forward thinking
              mindset, we have confidently marched towards new market and service
              growth areas and successfully positioned ourselves in both software
              solution and whole lifecycle of software development. We are your
              one-stop shop for all your IT needs. Our client growth and
              satisfaction has resulted in us globalizing and differentiating
              ourselves from competitors in a very short time.
            </p>

            <p>
              Please feel free to explore our website, learn more about us and
              what we do.
            </p>

            <p>We very much look forward to working with you.</p>

            <div className="pt-3">
              <p>Sincerely,</p>

              <p className="font-bold text-gray-900 mt-5">
                Nagendra Mishra
              </p>

              <p>Managing Director</p>
            </div>
          </div>
        </div>
      </section>

       </>
    );
}