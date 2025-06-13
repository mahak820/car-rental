import { useState, useEffect, useRef } from 'react';
import { Search, Calendar, MapPin, ChevronDown, Star, Smile, Users, Car } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const videoRef = useRef(null);
  const {user} = useSelector(state => state.auth)
  const navigate = useNavigate()
  
  // Animation that runs on component mount
  useEffect(() => {
    setIsLoaded(true);
    
    // Animation progress for car movement
    const animationInterval = setInterval(() => {
      setAnimationProgress(prev => {
        if (prev >= 100) return 0;
        return prev + 0.5;
      });
    }, 50);
    
    return () => clearInterval(animationInterval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchTerm);
    if (!user) {
      navigate('/register'); 
      console.log("object") // not logged in → go to register
    }
  };

  return (
    <section className="relative pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        {/* Video would be replaced with actual car driving footage */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src="/api/placeholder/1920/1080" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Animated Cars */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        {/* Moving car 1 - bottom of screen */}
        <div 
          className="absolute bottom-10 transition-all duration-1000"
          style={{ 
            left: `${-20 + animationProgress * 1.2}%`,
            transform: `scale(${animationProgress > 80 ? (100 - animationProgress) / 20 : 1})`
          }}
        >
          <Car size={60} className="text-white/30" strokeWidth={1} />
        </div>
        
        {/* Moving car 2 - middle right to left */}
        <div 
          className="absolute top-1/3 transition-all duration-1000"
          style={{ 
            right: `${-20 + animationProgress * 1.2}%`,
            transform: `scale(${animationProgress > 80 ? (100 - animationProgress) / 20 : 1}) scaleX(-1)`
          }}
        >
          <Car size={48} className="text-white/20" strokeWidth={1} />
        </div>
        
        {/* Moving car 3 - top of screen */}
        <div 
          className="absolute top-20 transition-all duration-1000"
          style={{ 
            left: `${-10 + animationProgress}%`,
            transform: `scale(${animationProgress > 90 ? (100 - animationProgress) / 10 : 1})`
          }}
        >
          <Car size={36} className="text-white/15" strokeWidth={1} />
        </div>
        
        {/* Happy customer icons */}
        <div 
          className="absolute top-40 right-20 opacity-0 transition-opacity duration-1000"
          style={{ opacity: animationProgress > 30 && animationProgress < 70 ? 1 : 0 }}
        >
          <div className="flex items-center bg-white/10 backdrop-blur-sm p-2 rounded-full">
            <Smile size={24} className="text-yellow-400 mr-2" />
            <Users size={20} className="text-white/70" />
          </div>
        </div>
        
        <div 
          className="absolute bottom-40 left-1/4 opacity-0 transition-opacity duration-1000"
          style={{ opacity: animationProgress > 50 && animationProgress < 90 ? 1 : 0 }}
        >
          <div className="flex items-center bg-white/10 backdrop-blur-sm p-2 rounded-full">
            <Star size={24} className="text-yellow-400 mr-2" />
            <span className="text-white text-sm">5.0</span>
          </div>
        </div>
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-0"></div>

      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10">
        <div 
          className={`text-center max-w-3xl mx-auto mb-10 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="block">Find Your Perfect</span>
            <span className="text-blue-400">Rental Car</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Discover the best deals from top rental companies with our easy booking system.
            Fast, reliable, and hassle-free.
          </p>
        </div>

        {/* Search Bar */}
        <div 
          className={`max-w-4xl mx-auto transition-all duration-1000 delay-300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-gray-800/90 backdrop-blur-sm p-4 md:p-6 rounded-xl shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <MapPin className="text-gray-400" size={18} />
                    </div>
                    <select 
                      className="block w-full rounded-lg border-gray-600 bg-gray-700 text-white pl-10 pr-4 py-3"
                      defaultValue=""
                    >
                      <option value="" disabled>Select Location</option>
                      <option value="new-york">New York</option>
                      <option value="los-angeles">Los Angeles</option>
                      <option value="chicago">Chicago</option>
                      <option value="miami">Miami</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="text-gray-400" size={18} />
                  </div>
                  <input
                    type="text"
                    className="block w-full rounded-lg border-gray-600 bg-gray-700 text-white pl-10 pr-4 py-3"
                    placeholder="Search by car model, brand..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center py-3 px-6 rounded-lg transition-colors" onClick={handleSubmit}>
                  <Search className="mr-2" size={18} />
                  <span>Search</span>
                </button>
              </div>
              
              {/* Advanced Options */}
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center">
                  <Calendar className="text-blue-400 mr-2" size={18} />
                  <span className="text-gray-300 text-sm">Need it for multiple days? <a href="#" className="text-blue-400 hover:underline">Set dates</a></span>
                </div>
                <div className="ml-auto">
                  <a href="#featured-cars" className="text-blue-400 hover:underline text-sm flex items-center">
                    View all available cars
                    <ChevronDown className="ml-1 transform rotate-[-90deg]" size={16} />
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { value: '500+', label: 'Luxury Cars', delay: 400 },
            { value: '24/7', label: 'Customer Support', delay: 500 },
            { value: '100+', label: 'Pickup Locations', delay: 600 },
            { value: '4.8/5', label: 'Customer Rating', delay: 700 }
          ].map((stat, index) => (
            <div 
              key={index}
              className={`bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg transform transition-all duration-1000`}
              style={{ 
                transitionDelay: `${stat.delay}ms`,
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              <p className="text-2xl md:text-3xl font-bold text-blue-400">{stat.value}</p>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute bottom-10 right-10 z-20 hidden md:block">
        <div 
          className={`bg-white/10 backdrop-blur-sm p-3 rounded-full text-white flex items-center transition-all duration-1000 delay-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Car size={24} className="text-blue-400 mr-2" />
          <span className="text-sm font-medium">Ready to drive</span>
        </div>
      </div>
      
      {/* Custom keyframe animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;