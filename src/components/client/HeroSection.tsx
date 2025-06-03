import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router";

const HeroSection = () => {
    const [showBrands, setShowBrands] = useState(false);
const navigate=useNavigate()
    useEffect(() => {
        AOS.init({ duration: 400 });

        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowBrands(true);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const handleCategoryClick = (category: string) => {
        navigate(`/cars?category=${category.toLowerCase()}`);
    };
    return (
        <section className="relative min-h-[170vh] overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            'url(https://www.bmw-m.com/content/dam/bmw/marketBMW_M/www_bmw-m_com/topics/magazine-article-pool/2024/wallpaper/m-wallpaper/3-0-csl/bmw-3-0-csl-mi-05.jpg)',
                        backgroundAttachment: "fixed",
                    }}
                >
                    <div className="absolute inset-0 bg-black/40" />
                </div>
            </div>

            <div className="relative z-10 container ml-[10px] pt-40 pb-16 h-full flex flex-col justify-center">
                <div className="max-w-2xl mt-16 md:mt-0 ml-10 bg-transparent">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-left mb-4">
                        Drive Your Dream Car Today
                    </h1>
                    <p className="text-2xl text-left w-[450px]  text-white/90 mb-8">
                        Experience the thrill of driving premium vehicles with our
                        hassle-free rental service. Choose from our extensive fleet.
                    </p>
                </div>
            </div>

            <div className="h-[100px]" />

            {showBrands && (
                <div
                    className="relative z-10 flex justify-start ml-20"
                    data-aos="fade-up"
                >
                    <div className="  rounded-xl p-6 grid grid-cols-4 sm:grid-cols-1 gap-4 w-[90%] max-w-[350px]">
                        {[
                            "Hybrid",
                            "Electric",
                            "Sedan",
                            "Sports",
                            "SUV",
                            "Luxury"
                        ].map((brand, i) => (
                            <button
                                key={i}
                                onClick={()=>handleCategoryClick(brand)}
                                className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg hover:bg-white/30 transition"
                            >
                                {brand}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </section>)
}

export default HeroSection