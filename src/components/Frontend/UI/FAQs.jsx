"use client";
import Link from 'next/link';
import React, { useState } from 'react';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [visibleCount , setVisibleCount] = useState(5);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const showMore = () => {
    setVisibleCount((prevCount) => prevCount + 5)
  }

  const faqs = [
    {
      question: 'Is Flying Alpha Hotel couples friendly?',
      answer: 'Yes, Flying Alpha Hotel offers a private and comfortable stay with premium amenities, making it ideal for couples.',
    },
    {
      question: 'What dining options are available at the hotel?',
      answer: 'Guests can enjoy delicious multi-cuisine meals available 24/7. Additionally, a complimentary breakfast is served daily from 8 AM to 10 PM.',
    },
    {
      question: 'What types of rooms are available at Flying Alpha Hotel?',
      answer: 'We offer two types of rooms: Executive and Deluxe, both designed to provide comfort and elegance for our guests.',
    },
    {
      question: 'Is there an extra charge for additional guests in a room?',
      answer: 'Yes, for every extra person after two in a room, a charge of ₹600 per person will be applied.',
    },
    {
      question: 'Is the hotel suitable for families with children?',
      answer: 'Absolutely. Flying Alpha Hotel is family-friendly, offering spacious rooms and family suites. We also provide safe play areas and special services tailored for children.',
    },
    {
      question: 'Does the hotel offer event and party arrangements?',
      answer: 'Yes, we provide exclusive event and party arrangements, allowing guests to celebrate special moments with personalized services.',
    },
    {
      question: 'What amenities can guests expect during their stay?',
      answer: 'Guests can enjoy a range of amenities, including air conditioning (AC), free Wi-Fi, television, geyser, power backup, and daily housekeeping services, ensuring a comfortable and convenient stay.',
    },
    {
      question: 'How can I book a room at Flying Alpha Hotel?',
      answer: 'To book a room, visit our website and fill out the reservation form with your name and email. Alternatively, you can contact our support team at support@hotelflyingalpha.com.',
    },
    {
      question: 'What are some nearby attractions to the hotel?',
      answer: 'Nearby attractions include Golghar, Patna Museum, and Buddha Smriti Park. For dining, options like Annapurna Bhandar, Bikaner Sweet Shop, and Giani’s are in close proximity.',
    },
    {
      question: 'How can I contact customer support?',
      answer: 'Our customer support team is available 24/7 to assist you. You can reach us at support@hotelflyingalpha.com.',
    },
  ];
  
  

  return (
    <div>
      <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Frequently Asked Questions</h2>
            <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">Find answers to the most common questions about our products, shipping, payments, and more.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
            {faqs.slice(0, visibleCount).map((faq, index) => (
              <div key={index} className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50">
                <button
                  type="button"
                  className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="flex text-lg font-semibold text-black">{faq.question}</span>

                  <svg
                    className={`w-6 h-6 text-gray-400 transform ${openIndex === index ? 'rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className={`px-4 pb-5 sm:px-6 sm:pb-6 ${openIndex === index ? 'block' : 'hidden'}`}>
                  <p dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </div>
              </div>
            ))}
          </div>

          {visibleCount < faqs.length && (
            <div className="text-center mt-6">
              <button
                onClick={showMore}
                className="px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Show More
              </button>
            </div>
          )}

          <p className="text-center text-gray-600 textbase mt-9">
            Didn’t find the answer you are looking for?{' '}
            <Link href="/contactUs" className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline">
              Contact our support
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default FAQs;