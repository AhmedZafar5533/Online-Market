import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const titleRef = useRef(null);
  const searchInputRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  // Handle window resize for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    const text = "Empowering Global Connections";
    let index = 0;

    if (titleRef.current) {
      titleRef.current.innerText = "";
    }

    const typeWriter = () => {
      if (index <= text.length && titleRef.current) {
        titleRef.current.innerText = text.substring(0, index);
        index++;
        setTimeout(() => requestAnimationFrame(typeWriter), 40);
      } else {
        // After typing is complete, add the period with a fade-in effect
        const periodSpan = document.createElement('span');
        periodSpan.className = 'animate-fadeIn opacity-0 font-bold';
        periodSpan.textContent = '.';
      }
    };

    const animationDelay = setTimeout(() => {
      requestAnimationFrame(typeWriter);
    }, 200);

    // Focus animation for search input
    if (searchInputRef.current) {
      searchInputRef.current.addEventListener('focus', () => {
        searchInputRef.current.parentElement.classList.add('transform', '-translate-y-1.5', 'shadow-lg');
      });

      searchInputRef.current.addEventListener('blur', () => {
        if (!searchInputRef.current.value) {
          searchInputRef.current.parentElement.classList.remove('transform', '-translate-y-1.5', 'shadow-lg');
        }
      });
    }

    return () => clearTimeout(animationDelay);
  }, []);


  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchValue);
  };

  // Floating profiles for larger screens
  const renderFloatingProfiles = () => {
    const profiles = [
      { top: '20%', left: '10%', bg: 'bg-[#2C3E50]', img: 'https://randomuser.me/api/portraits/women/3.jpg', delay: '0s' },
      { top: '70%', left: '15%', bg: 'bg-[#E74C3C]', img: 'https://randomuser.me/api/portraits/men/7.jpg', delay: '1s' },
      { top: '30%', right: '15%', bg: 'bg-[#3498DB]', img: 'https://randomuser.me/api/portraits/men/9.jpg', delay: '2s' },
      { top: '65%', right: '10%', bg: 'bg-[#2ECC71]', img: 'https://randomuser.me/api/portraits/women/11.jpg', delay: '1.5s' },
      { top: '10%', left: '30%', bg: 'bg-[#9B59B6]', img: 'https://randomuser.me/api/portraits/men/13.jpg', delay: '0.5s' },
      { top: '75%', right: '25%', bg: 'bg-[#F39C12]', img: 'https://randomuser.me/api/portraits/women/5.jpg', delay: '2.5s' }
    ];

    return profiles.map((profile, index) => (
      <div
        key={index}
        className="absolute w-20 h-20 rounded-full bg-cover bg-center border-4 border-white shadow-md transition-transform duration-300 ease-in-out hover:scale-110 hover:z-[2] animate-float hidden md:block"
        style={{
          top: profile.top,
          left: profile.left,
          right: profile.right,
          backgroundImage: `url(${profile.img})`,
          backgroundSize: 'cover',
          animationDelay: profile.delay,
          backgroundColor: 'transparent'
        }}
      />
    ));
  };

  // Static profile layout for smaller screens
  const renderStaticProfiles = () => {
    // Selected diverse profile images for mobile display
    const mobileProfiles = [
      'https://randomuser.me/api/portraits/women/3.jpg',
      'https://randomuser.me/api/portraits/men/9.jpg'
    ];

    return (
      <div className="flex justify-center -mb-4 mt-4 md:hidden">
        {mobileProfiles.map((img, index) => (
          <div
            key={index}
            className={`w-16 h-16 rounded-full bg-cover bg-center border-4 border-white shadow-md mx-2 ${index === 0 ? '-mt-4' : 'mt-4'
              }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover'
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="relative py-12 md:py-16 lg:py-[120px] px-4 md:px-5 text-center rounded-xl overflow-hidden min-h-[80vh] flex flex-col justify-center">
      {/* Floating profiles for medium+ screens */}
      <div className="absolute w-full h-full top-0 left-0 z-[1] ">
        {renderFloatingProfiles()}
      </div>

      <div className="relative z-[3] max-w-[1200px] mx-auto px-4 sm:px-5 mt-6 md:mt-15">
        {/* Static profile display for mobile */}
        {renderStaticProfiles()}

        <div className="heading-container mt-8 md:mt-0">
          <h1
            ref={titleRef}
            id="animatedTitle"
            className="inline-block text-3xl sm:text-4xl md:text-5xl font-bold font-['Playfair_Display'] tracking-wider leading-tight bg-[#2C3E50] bg-clip-text text-transparent"
          ></h1>
        </div>

        <p className="text-base sm:text-lg md:text-xl font-['alergy'] text-[#34495E] mb-6 md:mb-10 max-w-[700px] mx-auto leading-relaxed">
          Build your network, grow your business, and support your community with our global marketplace
        </p>

        <form onSubmit={handleSearchSubmit} className="mb-6 md:mb-[30px] max-w-[600px] mx-auto">
          <div className="relative flex flex-col sm:flex-row bg-white rounded-tl-xl rounded-br-xl shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 p-1.5 pl-5">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="What are you looking for today?"
              value={searchValue}
              onChange={handleSearchChange}
              className="flex-1 py-3 border-none outline-none text-base bg-transparent text-[#2C3E50] w-full"
            />
            <button
              type="submit"
              className="bg-indigo-700 text-white px-6 py-2.5 mt-2 sm:mt-0 rounded-xl flex items-center justify-center gap-2 font-semibold hover:bg-gradient-to-r from-[#2980B9] to-[#3498DB] transition-colors w-full sm:w-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              Search
            </button>
          </div>
        </form>

        <div className="flex flex-col sm:flex-row justify-center font-['alergy'] gap-4 sm:gap-5 flex-wrap mt-5">
          <Link
            to="/market"
            className="no-underline relative overflow-hidden px-5 sm:px-7 py-3 sm:py-3.5 rounded-full uppercase font-semibold text-sm sm:text-base cursor-pointer bg-indigo-700 text-[#f5f5f5] rounded-tl-lg rounded-br-lg hover:shadow-xl hover:-translate-y-1.5 group w-full sm:w-auto text-center"
          >
            <span className="absolute top-0 left-[-100%] w-full h-full bg-white/20 group-hover:left-0 transition-all duration-400 z-[-1]"></span>
            Sart Exploring 
          </Link>
          <Link
            to="/redirect"
            className="no-underline relative overflow-hidden px-5 sm:px-7 py-3 sm:py-3.5 rounded-full uppercase font-semibold text-sm sm:text-base cursor-pointer bg-white text-indigo-700 rounded-tl-xl rounded-br-xl hover:shadow-xl hover:-translate-y-1.5 group border border-indigo-700 w-full sm:w-auto text-center"
          >
            <span className="absolute top-0 left-[-100%] w-full h-full bg-white/20 group-hover:left-0 transition-all duration-400 z-[-1]"></span>
           Join Now 
          </Link>
        </div>
      </div>

      <div className="mt-10 md:mt-[60px] relative z-[3]">
        <p className="text-xs sm:text-sm text-[#7F8C8D] mb-3 sm:mb-5 uppercase tracking-wider">Trusted by top businesses worldwide</p>
        <div className="flex justify-center items-center gap-4 sm:gap-[30px] flex-wrap px-4">
          {[1, 2, 3, 4, 5].map((logo) => (
            <div
              key={logo}
              className="w-16 sm:w-24 md:w-[120px] h-6 sm:h-8 md:h-10 bg-[#BDC3C7]/20 rounded-md opacity-70 hover:opacity-100 transition-opacity"
            />
          ))}
        </div>
      </div>

      <style>
        {`
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    .animate-float {
      animation: float 8s infinite ease-in-out;
    }
    .animate-fadeIn {
      animation: fadeIn 0.5s forwards 0.3s;
    }
  `}
      </style>

    </section>
  );
};

export default HeroSection;