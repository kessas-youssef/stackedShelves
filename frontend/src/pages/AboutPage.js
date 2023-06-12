import React from 'react';
import picture from '../img/golden_stackedShelves_black_leather.png';
import '../style/aboutUs.css';

function AboutPage() {
  return (
    <>

      <img className='aboutus__backgroundImg' src={picture} alt='golden Stacked Shelves black leather' />
      <p className='aboutus__intro'>
        Welcome to Stacked Shelves, your ultimate book cataloguer! Our passion for books and organization has inspired us to create a platform that helps book lovers like you effortlessly manage and explore your personal library.<br/><br/>

        At Stacked Shelves, we understand the joy and excitement that comes with building a collection of books. Whether you're an avid reader, a book collector, or simply someone who loves to keep track of your reading progress, our user-friendly app is designed to streamline the process and enhance your book cataloguing experience.<br/><br/>

        We believe that enquiring books should be a delightful and personalized experience. That's why we provide customizable options, such as adding your own reviews, to help you make your collection truly yours. You can also engage in meaningful discussions within a vibrant community.<br/>

        Stacked Shelves is continuously evolving to meet your needs and improve your book cataloguing adventure. We value your feedback and suggestions, and our dedicated team is committed to delivering an exceptional user experience.
      </p>
    </>

  )
}

export default AboutPage