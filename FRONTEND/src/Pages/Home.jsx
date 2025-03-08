import React, { useContext } from "react";
import { motion } from "framer-motion";
import { StoreContext } from "../Context";
import potterImg from "../assets/potterImgv.jpg";
import Hero from "../Components/Hero";
import Category from "../Components/Category";
import FeaturedProducts from "../Components/FeaturedProducts";
import AboutUs from "../Components/AboutUs";
import Testimonials from "../Components/Testimonial";
import MeetTheArtisans from "../Components/MeetTheArtisans";
import CTASection from "../Components/CTASection";

function Home() {
  const { url } = useContext(StoreContext);

  return (
    <div className="container mx-auto py-30 px-6 md:px-12">
      <Hero />
      <div className="py-16">
        <Category />
      </div>
      <div className="py-16">
        <FeaturedProducts/>
      </div>
      <div className="py-16">
        <AboutUs/>
      </div>
      <div className="py-16">
        <Testimonials/>
      </div>
      <div className="py-16">
        <MeetTheArtisans/>
      </div>
      <div className="py-16">
        <CTASection/>
      </div>
    </div>
  );
}

export default Home;
