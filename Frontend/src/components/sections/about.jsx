import { ArrowRight, Check, Package, Truck, Shield, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <div className="max-w-full lg:h-[80vh] mx-auto lg:mx-10 bg-[#141824] shadow-2xl lg:rounded-lg overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 h-80 lg:h-[80vh] relative bg-white">
          <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(59,130,246,0.2)] to-[rgba(99,102,241,0.2)] z-10 mix-blend-overlay"></div>
          <img
            src="https://img.freepik.com/premium-photo/diverse-team-young-software-programmers-using-computers-writing-code-while-collaborating-project-it-development-studio-copy-space_236854-29533.jpg"
            alt="Business team collaborating"
            className="absolute inset-0 w-full h-full object-cover filter grayscale-[15%] brightness-90"
          />
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-1/2 lg:h-[80vh] bg-[#1a1f2b] p-8 md:p-10 relative lg:flex lg:gap-1 lg:flex-col lg:justify-center">
          <div className="h-1 w-full absolute top-0 left-0 bg-gradient-to-r from-indigo-500 to-indigo-700"></div>

          <div className="lg:flex lg:flex-col">
            <h2 className="text-3xl font-bold mt-2 mb-4 lg:mb-2 text-white">
              <span className="bg-gradient-to-r from-indigo-500 to-indigo-700 bg-clip-text text-transparent">Revolutionize</span> Your Services with Marbo Global
            </h2>

            <p className="text-gray-300 mb-8">
              Your one-stop destination for exceptional services and innovative solutions. Connect, collaborate, and excel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg shadow-md">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Quality Service</h3>
                <p className="text-gray-400 text-sm">Experience our commitment to delivering unparalleled service excellence.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg shadow-md">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Expert Services</h3>
                <p className="text-gray-400 text-sm">Access a network of skilled professionals ready to serve your needs.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg shadow-md">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Secure Transactions</h3>
                <p className="text-gray-400 text-sm">Engage in safe and reliable service engagements with complete confidence.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg shadow-md">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Global Network</h3>
                <p className="text-gray-400 text-sm">Connect with top service providers from around the globe.</p>
              </div>
            </div>
          </div>

          <Link
            to={'/services'}
            className="inline-flex items-center w-fit px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            Explore Services Now
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>

          <div className="mt-6 flex items-center text-gray-400 text-sm">
            <Check className="mr-2 text-blue-700 w-4 h-4" />
            Trusted by Thousands of Clients Worldwide
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
