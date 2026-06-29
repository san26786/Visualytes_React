export default function VideoSection() {
    return (
      <section className="w-full bg-white ">
        
        {/* Heading */}
        <h3 className="text-center text-4xl md:text-6xl lg:text-[42px] font-medium text-[#1f2732] mb-10 normal-case">
        Watch our 2 min video to Learn About us</h3>
  
        {/* Video */}
        <div className="max-w-9xl mx-auto ">
          <div className="relative w-full aspect-video overflow-hidden rounded-lg ">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              
            >
              <source
                src="/assets/mp4/Visualytes_AV_highres_1080_v2-1.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
  
        {/* Button */}
        <div className="mt-2 flex justify-center">
          <a
            href="/assets/mp4/Visualytes_AV_highres_1080_v2-1.mp4"
            target="_blank"
            className=" flex
    h-[82px]
    min-w-[255px]
    items-center
    justify-center
    rounded-full
    border-2
    border-[#ff497c]
    bg-[#ff497c]
    px-14
    text-[13px]
    font-bold
    uppercase
    tracking-[3px]
    text-white
    transition-all
    duration-300
    hover:bg-white
    hover:text-black
    hover:border-[#ff497c] mt-5"
          >
            VIEW IN FULL SCREEN
          </a>
        </div>
       
      </section>
    );
  }