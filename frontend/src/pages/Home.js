import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import "../style/home.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import Typewriter from "typewriter-effect";
import WhyRead from '../components/whyRead'




function Home() {

  
  const [sloganAnim, setSloganAnim] = useState(false);

  useEffect(() => {

    const sloganObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setSloganAnim(true);
          return;
        }

        setSloganAnim(false);
      });
    });

    sloganObserver.observe(document.querySelector('.slogan__main'));


    // Cleanup function to disconnect the observer when the component unmounts
    return () => {
      sloganObserver.disconnect();
    };
  }, []);


  return (
    <>
      <section className='slogan'>
        <h1 className='slogan__main'>
          <span className='slogan__main'>
            {
              sloganAnim
              &&
              <Typewriter
                onInit={(typewriter) => {

                  typewriter
                    .typeString("Expand your mind, read a book")

                    .pauseFor(1000)
                    .deleteChars(6)
                    .typeString("lots of books !")
                    .start();
                }}
              />
            }
          </span>
        </h1>
        <hr className='slogan__hr' />
        <p className='solgan__secondary'>We help you know what to read next</p>
      </section>

      <section className='signinCallToAction'>
        <div className='signinCallToAction__textSection'>
          <p className='signinCallToAction__text'>Stacked Shelves is here to guide you and give you feedback on your next read, Is it worth it ?</p>
          <p className='signinCallToAction__text'>
            Well let's find out !
          </p>
          <div className='signinCallToAction__btn'><NavLink to='/auth/?mode=signin'>Sign in</NavLink></div>
        </div>
        <div className='signinCallToAction__icon'><FontAwesomeIcon icon={icon({ name: 'book' })} /></div>
      </section >

      <section className='aboutusCallToAction'>
        <div className='aboutusCallToAction__textSection'>
          <p className='aboutusCallToAction__text'>Get to know us and our services</p>
          <div className='aboutusCallToAction__btn'><NavLink to='/about'>About Us</NavLink></div>
        </div>
      </section >
      <WhyRead/>
      
    </>
  )
}

export default Home