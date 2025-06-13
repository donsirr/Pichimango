import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState, useRef } from "react";

function Home() {
    const images = [
        "/image1.png",
        "/image2.png",
        "/image3.png"
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const timerRef = useRef(null);

    const [sliderRef, instanceRef] = useKeenSlider({
        loop: true,
        duration: 1000,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
    });

    // 🔁 Autoplay effect
    useEffect(() => {
        if (!instanceRef.current) return;

        timerRef.current = setInterval(() => {
            instanceRef.current.next();
        }, 5000); // 5s autoplay

        return () => clearInterval(timerRef.current);
    }, [instanceRef]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative overflow-hidden"
        >
            {/* Background Carousel */}
            <div ref={sliderRef} className="keen-slider absolute inset-0 z-0">
                {images.map((img, idx) => (
                    <div key={idx} className="keen-slider__slide relative">
                        <img
                            src={img}
                            alt={`Slide ${idx}`}
                            className="w-full h-screen object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Hero content */}
            <div className="relative z-20 px-6 sm:px-12 py-32 max-w-4xl mx-auto text-black text-center">
                <motion.h1
                    className="text-5xl font-serif font-semibold mb-6 leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    Curated Luxury<br />For the Modern You
                </motion.h1>

                <motion.p
                    className="text-lg text-black-200 mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    Discover timeless fashion, refined accessories, and exquisite makeup — all handpicked for elegance.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                >
                    <Link
                        to="/catalog"
                        className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-medium text-lg shadow hover:shadow-lg transition"
                    >
                        Explore Catalog
                    </Link>
                </motion.div>

                {/* Scroll-down arrow */}
                <div className="mt-12 flex justify-center">
                    <a href="#categories" className="animate-bounce text-white text-3xl">
                        ↓
                    </a>
                </div>
            </div>

            {/* Dots */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => instanceRef.current?.moveToIdx(idx)}
                        className={`w-3 h-3 rounded-full ${
                            currentSlide === idx ? "bg-white" : "bg-white/50"
                        }`}
                    />
                ))}
            </div>

            {/* Categories */}
            <section id="categories" className="bg-white py-20 px-6 sm:px-12">
                <h2 className="text-3xl font-serif text-center mb-12">Featured Categories</h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[ 
                        { title: "Clothes", image: "https://scontent.fcrk1-5.fna.fbcdn.net/v/t39.30808-6/492215891_1243859841073135_1626196793754947215_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeF0-xWvIooVOejlAsHRDLty-ugYbdye4tP66Bht3J7i07eWMfo3x74nZQTwSWTVEVTpChW4Qp3OkZ4uZFrAMi6_&_nc_ohc=rak5fqBXa3wQ7kNvwEgus2C&_nc_oc=AdnYdK0qXnbG6P100YCJL-e-dl2mG4JlFR5c9P1ws4-ZwjQmRKrtVPxrRwuHjJMVlPs&_nc_zt=23&_nc_ht=scontent.fcrk1-5.fna&_nc_gid=55T94wKRBhqMpxo97XUQVw&oh=00_AfNBKh07qXhqLLqijMixJYn_iQXhymODwPaicuZREgQpnQ&oe=68516D12" },
                        { title: "Accessories", image: "https://scontent.fcrk1-1.fna.fbcdn.net/v/t39.30808-6/493852792_1247351427390643_6589400935086303216_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=108&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeEU3yz3iklxRTb1Mbb_5INF04QW4MLiYQLThBbgwuJhAvDWufR6QHyMy-3HejwPMKVcV1zhy8YPbJ4AVizaGMfT&_nc_ohc=x6eiCca2o4IQ7kNvwFRdZ_-&_nc_oc=Adn79vyrc_JWoR29ViIGA91npGcOM11VycKiOvf5l2kibqd8uNelusWO3EzuhmqtIaw&_nc_zt=23&_nc_ht=scontent.fcrk1-1.fna&_nc_gid=4V9xlgjzevOAoo7xqAVXzQ&oh=00_AfOFrmR-3ekZpHeCDipdWvcQUL1b6B0uh8WP9W3Fzfpx_A&oe=68514F84" },
                        { title: "Makeup", image: "https://scontent.fcrk1-1.fna.fbcdn.net/v/t39.30808-6/496003583_1258461242946328_5374555885262828983_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeHO8f6WSi8D7CoHnVpydgEILH3AqOwk6mcsfcCo7CTqZ4wIvhVSXFLuHcvtL8PrtPbVS0jQM-9AWoh5Pq2Sz2Xa&_nc_ohc=-7yTmXe8ZKoQ7kNvwEzFQax&_nc_oc=Adms6XsbNCsl8Fw9cRp8mGau3q99PmNprn2_p7MBygXBiMbinp5FWqIHYM0G40T-T3s&_nc_zt=23&_nc_ht=scontent.fcrk1-1.fna&_nc_gid=Ir37mKYdkfQsY9GRPewu4g&oh=00_AfOSW_GtgRkWeHbAVrEeZU0MyKIQYoFm-nug25YCZrVN4A&oe=685153B8" },
                    ].map((cat) => (
                        <div
                            key={cat.title}
                            className="overflow-hidden rounded-2xl shadow hover:shadow-lg transition group cursor-pointer"
                        >
                            <img
                                src={cat.image}
                                alt={cat.title}
                                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="p-4 bg-white">
                                <h3 className="text-xl font-medium text-center">{cat.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </motion.div>
    );
}

export default Home;
