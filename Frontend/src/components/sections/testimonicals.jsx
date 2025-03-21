import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const testimonialsData = [
  {
    id: 1,
    quote:
      "Very easy to work with! Was able to quickly get something beautiful and performant up and running in minutes. Straightforward to customize, as well. Dashkit is 🔥!!!",
    name: "Tanya",
    role: "Marbo customer",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    background:
      "https://images.unsplash.com/photo-1740504713072-2b634befcf6a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Mnx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    quote:
      "Absolutely love the support and attention to detail. This is exactly what I needed!",
    name: "James",
    role: "Web Developer",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    background:
      "https://images.unsplash.com/photo-1740004731264-3cde5c198cc2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Function to handle next slide
  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
      );
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  // Function to handle previous slide
  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
      );
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  // Function to handle dot navigation
  const goToSlide = (index) => {
    if (!isTransitioning && index !== currentIndex) {
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  // Auto-advance slides
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <section className="relative py-16 px-4 lg:py-24 overflow-hidden bg-gradient-to-br from-white to-purple-50">

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* Testimonial Card Section */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <div className="overflow-hidden relative lg:ml-12">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {testimonialsData.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="w-full flex-shrink-0"
                    >
                      <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
                        <div className="relative h-48 w-full overflow-hidden">
                          <img
                            src={testimonial.background}
                            alt="background"
                            className="w-full h-full object-cover transform scale-105 transition-transform duration-700 hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/20"></div>
                          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
                        </div>

                        <div className="px-6 pt-0 pb-10 text-center">
                          <div className="relative -mt-10 mb-6 flex justify-center">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
                            />
                          </div>

                          <blockquote className="italic text-gray-700 text-lg mb-6 relative">
                            <span className="absolute -top-4 -left-2 text-4xl text-indigo-200">"</span>
                            {testimonial.quote}
                            <span className="absolute -bottom-4 -right-2 text-4xl text-indigo-200">"</span>
                          </blockquote>

                          <h4 className="font-bold text-xl text-indigo-900 mb-1">{testimonial.name}</h4>
                          <p className="text-indigo-600">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-center mt-6 gap-4">
                <button
                  onClick={prevSlide}
                  disabled={isTransitioning}
                  className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md hover:bg-indigo-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 disabled:opacity-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  disabled={isTransitioning}
                  className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md hover:bg-indigo-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 disabled:opacity-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>

              {/* Pagination Indicator */}
              <div className="flex justify-center gap-2 mt-4">
                {testimonialsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${currentIndex === index ? "bg-indigo-600 w-6" : "bg-indigo-300 w-2"
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 leading-tight">
              Why Our Customers <span className="text-indigo-600">Love Us</span>
            </h2>

            <p className="text-gray-700 text-lg">
              At Marbo Global, we empower vendors to grow their businesses
              effortlessly while providing buyers with a seamless and secure
              shopping experience. Our commitment to excellence makes transactions
              smooth and stress-free.
            </p>

            <div className="space-y-4 mt-6">
              {[
                "Thousands of happy customers worldwide",
                "Effortless buying and selling with secure payments",
                "Dedicated support ensuring a hassle-free experience"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
            <Link to="/signup">
              <button className="mt-8 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Join us Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;