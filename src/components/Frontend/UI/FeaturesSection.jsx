import React from "react";
import { BiSupport, BiLineChart, BiUserCheck, BiCube, BiBarChart, BiRocket } from "react-icons/bi";

const FeaturesSection = () => {
  return (
    <div>
      <section className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-5xl font-pj">
              Make every step user-centric
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-8 font-pj">
              Lorem ipsum dolor sit amet, consectetur adipis elit
            </p>
          </div>

          <div className="grid grid-cols-1 mt-10 text-center sm:mt-16 sm:grid-cols-2 sm:gap-x-12 gap-y-12 md:grid-cols-3 md:gap-0 xl:mt-24">
            
            {/* Support */}
            <div className="md:p-8 lg:p-14">
              <BiSupport className="mx-auto text-gray-900 text-6xl" />
              <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">Support</h3>
              <p className="mt-5 text-base text-gray-600 font-pj">
                Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a.
              </p>
            </div>

            {/* Sales */}
            <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200">
              <BiLineChart className="mx-auto text-gray-900 text-6xl" />
              <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">Sales</h3>
              <p className="mt-5 text-base text-gray-600 font-pj">
                Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a.
              </p>
            </div>

            {/* Onboarding */}
            <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200">
              <BiUserCheck className="mx-auto text-gray-900 text-6xl" />
              <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">Onboarding</h3>
              <p className="mt-5 text-base text-gray-600 font-pj">
                Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a.
              </p>
            </div>

            {/* Product */}
            <div className="md:p-8 lg:p-14 md:border-t md:border-gray-200">
              <BiCube className="mx-auto text-gray-900 text-6xl" />
              <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">Product</h3>
              <p className="mt-5 text-base text-gray-600 font-pj">
                Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a.
              </p>
            </div>

            {/* Analytics */}
            <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 md:border-t">
              <BiBarChart className="mx-auto text-gray-900 text-6xl" />
              <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">Analytics</h3>
              <p className="mt-5 text-base text-gray-600 font-pj">
                Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a.
              </p>
            </div>

            {/* Growth */}
            <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 md:border-t">
              <BiRocket className="mx-auto text-gray-900 text-6xl" />
              <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">Growth</h3>
              <p className="mt-5 text-base text-gray-600 font-pj">
                Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesSection;
