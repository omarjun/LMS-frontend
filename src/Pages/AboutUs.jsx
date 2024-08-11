import HomeLayout from "../Layouts/HomeLayout"
import aboutMainImage from "../Assests/Images/aboutMainImage.png"
import apj from "../Assests/Images/apj.png"
import billGates from "../Assests/Images/billGates.png"
import einstein from "../Assests/Images/einstein.png"
import nelsonMandela from "../Assests/Images/nelsonMandela.png"
import steveJobs from "../Assests/Images/steveJobs.png"
import Carousel from "../Components/Carousel"
import { celebrities } from "../Constants/celebrities"
function AboutUs() {

  return (
    <HomeLayout> 
        <div className="pl-20 pt-20 flex flex-col text-white">
            <div className="flex items-center gap-5 mx-10">
                <section className="w-1/2 space-y-10">
                    <h1 className="text-5xl text-yellow-500 font-semibold">Affordable and quality education</h1>
                    <p className="text-xl text-gray-200">Our goal is to provide affordable and quality education to the world.
                        We are providing the platform for the aspiring teachers and students 
                        to share their skills, creativity and knowledge to each-other to empo
                        wer and contribute in the growth and wellness of mankind.
                    </p>
                </section>
                <div className="w-1/2">
                    <img 
                        id="test1"
                        style={{
                            filter: "drop-shadow(0px 10px 10px rgb(0,0,0))"
                        }}
                        className="drop-shadow-2xl"
                        src={aboutMainImage} 
                        alt="aboutMainPageImage" />
                </div>
            </div>
            <div className="carousel m-auto w-1/2 my-16">
                {celebrities && celebrities.map(celebrity => 
                                                                <Carousel 
                                                                {...celebrity}
                                                                 key={celebrity.slideNumber} totalSlides={celebrities.length} 
                                                            />)}

                
            </div>
        </div>
    </HomeLayout>
  )
}

export default AboutUs