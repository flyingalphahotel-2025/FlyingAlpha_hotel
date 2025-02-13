import React from 'react';
import { FaStar } from 'react-icons/fa';

const Testimonial = () => {
  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <p className="text-lg font-medium text-gray-600">2,157 people have said how good Rareblocks</p>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl">
            Our happy clients say about us
          </h2>
        </div>
        
        <div className="mt-8 text-center md:mt-16">
          <a href="#" className="pb-2 text-base font-bold text-gray-900 border-b-2 border-gray-900 hover:border-gray-600">
            Check all 2,157 reviews
          </a>
        </div>
        
        <div className="relative mt-10 md:mt-24">
          <div className="grid max-w-lg grid-cols-1 gap-6 mx-auto md:max-w-none lg:gap-10 md:grid-cols-3">
            <div className="flex flex-col overflow-hidden shadow-xl bg-white p-6 rounded-lg">
              <div className="flex flex-col justify-between flex-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} className="text-[#FDB241] w-5 h-5" />
                  ))}
                </div>
                
                <blockquote className="flex-1 mt-8">
                  <p className="text-lg leading-relaxed text-gray-900">
                    “You made it so simple. My new site is so much faster and easier to work with than my old site.”
                  </p>
                </blockquote>
              </div>
              
              <div className="flex items-center mt-8">
                <img className="flex-shrink-0 object-cover rounded-full w-11 h-11" 
                     src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png" 
                     alt="" />
                <div className="ml-4">
                  <p className="text-base font-bold text-gray-900">Leslie Alexander</p>
                  <p className="text-sm text-gray-600">CEO, Rareblocks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
