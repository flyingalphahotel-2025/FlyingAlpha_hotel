import Image from "next/image";
import { FaSwimmer, FaShieldAlt, FaCalendarAlt, FaStar } from "react-icons/fa";
import couplesImg from "../../../../public/Features/couples.jpg";

const WhyChooseUs = () => {
  return (
    <section className="bg-gray-100 py-12 px-6 md:px-20">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left Side Content */}
        <div>
          <h3 className="text-orange-500 font-bold text-lg uppercase">
            Why Choose Us
          </h3>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-2">
            We Care About You & <br />
            Fulfill Your Needs for <br />
            A Perfect Stay
          </h2>

          {/* Features List */}
          <div className="mt-6 space-y-6">
            {/* Feature 1 */}
            <div className="flex items-start space-x-4">
              <div className="bg-orange-500 p-3 rounded-full text-white">
                <FaSwimmer size={20} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-black">Relaxing Stay</h4>
                <p className="text-gray-600">
                  Enjoy a peaceful and luxurious stay with premium amenities.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start space-x-4">
              <div className="bg-orange-500 p-3 rounded-full text-white">
                <FaShieldAlt size={20} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-black">High Security & Privacy</h4>
                <p className="text-gray-600">
                  Your safety and privacy are our top priorities.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start space-x-4">
              <div className="bg-orange-500 p-3 rounded-full text-white">
                <FaCalendarAlt size={20} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-black">Exclusive Events & Parties</h4>
                <p className="text-gray-600">
                  Celebrate special moments with personalized arrangements.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="relative">
          <Image
            src={couplesImg}
            alt="Couple in Hotel"
            className="rounded-lg shadow-lg"
            layout="responsive"
            width={500} // Set your actual image width
            height={350} // Set your actual image height
          />
          {/* Badge */}
          <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-2 rounded-bl-lg text-sm font-bold flex items-center">
            <FaStar className="mr-2" />
            Popular Features
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
