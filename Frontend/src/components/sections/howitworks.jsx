import { motion } from "framer-motion";
import {
  FaUserPlus,
  FaShoppingCart,
  FaLock,
  FaStore,
  FaCreditCard,
  FaUserCheck,
  FaClipboardCheck,
  FaHandshake
} from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    title: "Service Overview",
    description: "Marbo Global is a comprehensive service marketplace connecting skilled professionals with clients for a wide range of service solutions.",
    icon: <FaHandshake />,
    category: "services",
    color: "#4338ca" // indigo-700
  },
  {
    title: "Sign Up for Services",
    description: "Register as a service provider or client in just a few steps. Our streamlined onboarding process gets you started quickly.",
    icon: <FaUserPlus />,
    category: "services",
    color: "#4338ca" // indigo-700
  },
  {
    title: "Provider Verification",
    description: "Complete verification and document uploads to build trust and ensure reliability in your service offerings.",
    icon: <FaUserCheck />,
    category: "services",
    color: "#4338ca" // indigo-700
  },
  {
    title: "Choose Service Plan",
    description: "Service providers select from various plans (Basic, Premium, VIP) to unlock enhanced features and better visibility.",
    icon: <FaStore />,
    category: "services",
    color: "#4338ca" // indigo-700
  },
  {
    title: "Browse & Engage",
    description: "Clients can explore a diverse range of services, compare options, and select the best solution for their needs.",
    icon: <FaShoppingCart />,
    category: "services",
    color: "#4338ca" // indigo-700
  },
  {
    title: "Payment Processing",
    description: "Our integrated payment gateways ensure secure and efficient processing of service payments.",
    icon: <FaCreditCard />,
    category: "services",
    color: "#4338ca" // indigo-700
  },
  {
    title: "Secure Transactions",
    description: "Experience safe and seamless service transactions with robust security measures for your peace of mind.",
    icon: <FaLock />,
    category: "services",
    color: "#4338ca" // indigo-700
  }
];

const HowItWorks = () => {
  const pathRef = useRef(null);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeStep, setActiveStep] = useState(null);

  useEffect(() => {
    // Check if we're on a mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check initially and add listener
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Animation for glowing particles along the path
    if (pathRef.current && !isMobile) {
      const path = pathRef.current;
      const pathLength = path.getTotalLength();

      // Clear any existing particles
      const existingParticles = containerRef.current.querySelectorAll('.path-particle');
      existingParticles.forEach(p => p.remove());

      // Set up animated particles
      const createParticles = () => {
        for (let i = 0; i < 5; i++) {
          const particle = document.createElement('div');
          particle.className = 'path-particle';
          containerRef.current.appendChild(particle);

          // Random starting point on the path
          const startPercent = Math.random() * 100;

          // Animation
          animateParticle(particle, startPercent, pathLength, path);
        }
      };

      createParticles();
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);

  const animateParticle = (particle, startPercent, pathLength, path) => {
    let percent = startPercent;

    const animate = () => {
      percent = (percent + 0.2) % 100;
      const point = path.getPointAtLength((percent / 100) * pathLength);

      particle.style.left = `${point.x}px`;
      particle.style.top = `${point.y}px`;
      particle.style.transform = 'translate(-50%, -50%)';
      particle.style.boxShadow = '0 0 15px 5px rgba(99, 102, 241, 0.6)';

      requestAnimationFrame(animate);
    };

    animate();
  };

  // Get step background colors with appropriate opacity
  const getStepBackgroundColor = (step, index) => {
    const baseColor = step.color || "#4338ca";
    return `${baseColor}${activeStep === index ? '20' : '10'}`;
  };



  return (
    <section
      className="relative py-20  px-4 md:px-8 bg-gradient-to-b from-[#F4F7F6] to-[#EFF6FF] text-[#2C3E50] font-['Poppins'] overflow-hidden"
      ref={containerRef}
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-100 rounded-full opacity-40 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 rounded-full opacity-50 transform translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/3 right-10 w-20 h-20 bg-indigo-200 rounded-full opacity-30"></div>
        <div className="absolute bottom-1/4 left-20 w-32 h-32 bg-indigo-200 rounded-full opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header section with improved styling */}
        <div className="text-center mb-16 relative">
          <motion.div
            className="inline-block text-indigo-600 font-semibold mb-2 px-4 py-1 bg-indigo-50 rounded-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            Simple Process, Powerful Results
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#0d263f] font-['Playfair_Display'] relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            How Marbo Global Works
          </motion.h2>

          <motion.p
            className="max-w-2xl mx-auto text-lg text-gray-600"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our streamlined marketplace connects vendors and buyers through an intuitive platform designed for global commerce.
          </motion.p>
        </div>


        {/* Desktop curved path layout with improved styling */}
        {!isMobile && (
          <div className="relative max-w-full md:max-w-[1100px] h-[1600px] mx-auto hidden md:block">
            {/* SVG Path for the curved roadmap */}
            <svg
              className="absolute top-0 left-0 w-full h-full z-[1]"
              viewBox="0 0 1000 1600"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4338ca" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.6" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <path
                ref={pathRef}
                d="M500,0 C650,220 350,440 500,660 C650,880 350,1100 500,1320 C650,1540 500,1600 500,1600"
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="4"
                strokeDasharray="10,10"
                className="stroke-linecap-round"
                filter="url(#glow)"
              />
            </svg>

            {/* Steps along the curved path with enhanced styling */}
            <div className="relative h-full w-full z-[3]">
              {steps.map((step, index) => {
                const position = (index / (steps.length - 1)) * 100;
                const isLeft = index % 2 === 0;

                return (
                  <motion.div
                    className={`
                    absolute w-[300px] md:w-[420px] flex items-center transition-all duration-300 ease-in-out 
                    rounded-2xl
                    ${isLeft ? 'left-[10px] md:left-[40px]' : 'right-[10px] md:right-[40px]'} 
                    ${isLeft ? 'flex-row' : 'flex-row-reverse'}
                  `}
                    key={index}
                    style={{ top: `${position}%` }}
                    initial={{
                      opacity: 0,
                      x: isLeft ? -100 : 100,
                      scale: 0.8
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      scale: 1
                    }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.15,
                      type: "spring",
                      stiffness: 50
                    }}
                    onMouseEnter={() => setActiveStep(index)}
                    onMouseLeave={() => setActiveStep(null)}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    {/* Step number indicator */}
                    <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-indigo-100 rounded-full text-indigo-700 font-bold text-sm z-20">
                      {index + 1}
                    </div>

                    {/* Icon container with enhanced styling */}
                    <div className="flex-shrink-0 relative z-10">
                      <motion.div
                        className={`
                        w-[70px] h-[70px] md:w-[90px] md:h-[90px] flex items-center justify-center 
                        rounded-full text-2xl md:text-3xl text-white 
                        shadow-lg z-[2] mx-[10px] md:mx-[20px]
                      `}
                        style={{
                          background: `linear-gradient(135deg, ${step.color}, #6366f1)`,
                          boxShadow: `0 10px 30px -5px ${step.color}90`
                        }}
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.3 }
                        }}
                        animate={{
                          boxShadow: activeStep === index
                            ? [`0 0 20px 5px ${step.color}60`, `0 15px 35px -5px ${step.color}90`]
                            : `0 10px 30px -5px ${step.color}80`
                        }}
                      >
                        {step.icon}
                      </motion.div>
                    </div>

                    {/* Content card with enhanced styling */}
                    <motion.div
                      className="
                      bg-white p-6 md:p-8 rounded-2xl shadow-xl 
                      flex-grow backdrop-blur-sm 
                      border border-indigo-100
                      relative overflow-hidden
                    "
                      animate={{
                        boxShadow: activeStep === index
                          ? '0 20px 50px -10px rgba(67, 56, 202, 0.3)'
                          : '0 10px 30px -5px rgba(67, 56, 202, 0.15)'
                      }}
                      whileHover={{
                        scale: 1.03,
                        transition: { duration: 0.3 }
                      }}
                    >
                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                      <div className="absolute bottom-0 left-0 w-20 h-20 bg-indigo-50 rounded-full translate-y-1/2 -translate-x-1/2 opacity-40"></div>

                      {/* Category badge */}
                      <div className="absolute top-3 left-3 px-3 py-1 bg-indigo-50 rounded-full text-indigo-600 text-xs font-medium capitalize">
                        {step.category}
                      </div>

                      <h3 className="relative z-10 text-indigo-900 text-[1.3rem] md:text-[1.6rem] font-bold mb-3 md:mb-4 mt-4">
                        {step.title}
                      </h3>
                      <p className="relative z-10 text-gray-700 text-[0.95rem] md:text-[1.05rem] leading-[1.6] md:leading-[1.8]">
                        {step.description}
                      </p>

                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Animated particles along the path */}
            <style >{`
              .path-particle {
                position: absolute;
                width: 10px;
                height: 10px;
                background: #6366f1;
                border-radius: 50%;
                transform: translate(-50%, -50%);
                filter: blur(2px);
                z-index: 2;
                animation: pulse 2s infinite;
              }
              
              @keyframes pulse {
                0% { opacity: 0.4; transform: translate(-50%, -50%) scale(0.8); }
                50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
                100% { opacity: 0.4; transform: translate(-50%, -50%) scale(0.8); }
              }
            `}</style>
          </div>
        )}

        {/* Mobile vertical timeline layout with enhanced styling */}
        {isMobile && (
          <div className="max-w-[95%] mx-auto md:hidden">
            <div className="relative">
              {/* Vertical line with gradient */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 z-[1]" style={{
                background: "linear-gradient(to bottom, #4338ca, #6366f1)"
              }}></div>

              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="relative z-[2] mb-12 flex flex-col items-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  onTouchStart={() => setActiveStep(index)}
                  onTouchEnd={() => setActiveStep(null)}
                >
                  {/* Step number */}
                  <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-indigo-100 rounded-full text-indigo-700 font-bold text-sm z-20">
                    {index + 1}
                  </div>

                  {/* Icon with enhanced styling */}
                  <motion.div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl mb-6 z-[3]"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}, #6366f1)`,
                      boxShadow: `0 8px 25px -4px ${step.color}80`
                    }}
                    whileHover={{ scale: 1.1 }}
                    animate={{
                      boxShadow: activeStep === index
                        ? [`0 0 20px 5px ${step.color}60`, `0 15px 35px -5px ${step.color}90`]
                        : `0 8px 25px -4px ${step.color}80`
                    }}
                  >
                    {step.icon}
                  </motion.div>

                  {/* Content Card with enhanced styling */}
                  <motion.div
                    className="bg-white p-6 rounded-xl w-full shadow-lg border border-indigo-50"
                    style={{
                      background: `linear-gradient(to bottom right, white, ${getStepBackgroundColor(step, index)})`
                    }}
                    whileHover={{ y: -5 }}
                    animate={{
                      boxShadow: activeStep === index
                        ? '0 20px 50px -10px rgba(67, 56, 202, 0.3)'
                        : '0 10px 30px -5px rgba(67, 56, 202, 0.15)'
                    }}
                  >
                    {/* Category badge */}
                    <div className="mb-3 inline-block px-3 py-1 bg-indigo-50 rounded-full text-indigo-600 text-xs font-medium capitalize">
                      {step.category}
                    </div>

                    <h3 className="text-xl font-bold text-indigo-900 mb-3">{step.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{step.description}</p>

                    <div className="mt-4 flex justify-end">
                      <a href="#" className="text-indigo-600 font-medium flex items-center text-sm group">
                        Learn more
                        <svg
                          className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Call to action section */}
        <motion.div
          className="text-center mt-16 md:mt-75 pt-5 md:pt-16 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-indigo-900 mb-4">Ready to get started?</h3>
          <p className="max-w-2xl mx-auto text-gray-600 mb-8">Join thousands of vendors and buyers already using Marbo Global to connect, sell, and shop globally.</p>

          <div className="flex flex-col md:flex-row justify-center gap-4">
            <motion.a
              href="#"
              className="px-8 py-4 bg-indigo-600 text-white rounded-full font-medium shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign Up Now
            </motion.a>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;