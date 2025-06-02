import { Link } from "react-router";

const AboutHero = () => {
    return (
        <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: 'url(https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)',
                    backgroundAttachment: 'fixed'
                }}
            ></div>

            <div className="relative z-20 container mx-auto px-4 py-32 md:py-40 flex flex-col items-center text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    Driving Excellence <br className="hidden md:block" />
                    <span className="text-red-500">Since 1995</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-100 max-w-2xl mb-10">
                    We're more than just a car rental company. We're your partner in exploring the world on your terms, with premium vehicles and exceptional service.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to={"/contact"}>
                        <button className="bg-red-500 hover:bg-red-600 text-white py-3 px-8 rounded-md font-medium transition duration-300 flex items-center justify-center">
                            Contact Us
                        </button>
                    </Link>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-10">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
                    <path fill="#f9fafb" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
                </svg>
            </div>
        </div>
    );
};

export default AboutHero;