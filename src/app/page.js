import FAQs from '@/components/Frontend/UI/FAQs'
import FeaturesSection from '@/components/Frontend/UI/FeaturesSection'
import HeroSection from '@/components/Frontend/UI/HeroSection'
import HotelBookingForm from '@/components/Frontend/UI/HotelBookingForm'
import Testimonial from '@/components/Frontend/UI/Testimonial'
import React from 'react'

const page = () => {
  return (
    <div>
      <HeroSection/>
      <HotelBookingForm/>
      {/* <FeaturesSection/> */}
      <Testimonial/>
      <FAQs/>
    </div>
  )
}

export default page