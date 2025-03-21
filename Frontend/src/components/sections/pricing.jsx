import { ArrowRight } from 'lucide-react';

const VendorLandingSection = () => {
  return (
    <div className='lg:flex lg:w-full lg:justify-center mt-1 lg:mt-20 lg:mb-20'>
      <div className="flex flex-col md:flex-row min-h-[600px] overflow-hidden rounded-md font-inter lg:shadow-md  lg:w-[90%]">
        <div className="w-full md:w-1/2 bg-gray-100">
          <img
            src="https://images.unsplash.com/photo-1448932223592-d1fc686e76ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFuJTIwd29ya2luZyUyMG9uJTIwbGFwdG9wfGVufDB8fDB8fHww"
            alt="Vendor working on business growth"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 bg-white text-slate-800 p-12 md:p-12 sm:p-6 flex items-center">
          <div className="max-w-md mx-auto">
            <span className="block uppercase tracking-wider text-sm opacity-70 mb-4 text-indigo-700">
              For Vendors
            </span>

            <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
              Grow Your Business Effortlessly
            </h2>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Unlock flexible pricing plans designed to scale your business with zero overhead and maximum potential.
            </p>

            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-700 bg-opacity-10 rounded-full w-10 h-10 flex items-center justify-center">
                <ArrowRight className="text-white w-5 h-5" />
                </div>
                <span>Transparent, Scalable Pricing</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-indigo-700 bg-opacity-10 rounded-full w-10 h-10 flex items-center justify-center">
                  <ArrowRight className="text-white w-5 h-5" />
                </div>
                <span>24/7 Premium Support</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-indigo-700 bg-opacity-10 rounded-full w-10 h-10 flex items-center justify-center">
                <ArrowRight className="text-white w-5 h-5" />
                </div>
                <span>No Hidden Fees</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="inline-flex items-center bg-indigo-700 text-white rounded-full py-2 px-6 transition duration-300 ease-in-out shadow-lg hover:-translate-y-1 hover:shadow-xl">
                <div className="mr-3 flex items-center">
                  <ArrowRight className="w-5 h-5" />
                </div>
                <button className="bg-transparent border-0 text-white font-semibold cursor-pointer">
                  View Pricing Plans
                </button>
              </div>
            </div>

            <div className="text-sm text-slate-600 flex items-center">
              <span className="mr-2 text-blue-500">✓</span>
              Trusted by 500+ Successful Vendors
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorLandingSection;