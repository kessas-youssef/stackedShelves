import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import Typewriter from "typewriter-effect";

const WhyRead = () => {
    const [whyReadAnim, setWhyReadAnim] = useState(false);

    useEffect(() => {
        const whyReadObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setWhyReadAnim(true);
              return;
            }
    
            setWhyReadAnim(false);
          });
        });

        whyReadObserver.observe(document.querySelector('.whyRead__content'));


    // Cleanup function to disconnect the observer when the component unmounts
    return () => {
      whyReadObserver.disconnect();
    };
  }, []);
  return (
    <section className='whyRead' onMouseOver={() => setWhyReadAnim(true)}>
        <h1 className='whyRead__title'>
          {
            whyReadAnim
            &&
            <Typewriter
              onInit={(typewriter) => {

                typewriter
                  .typeString("Why would you read ?")

                  .pauseFor(1000)
                  .deleteChars(6)
                  .typeString("addict reading ?")

                  .start();
              }}
            />
          }
        </h1>
        <div className='whyRead__content'>
          <div className='whyRead__element'>
            <FontAwesomeIcon icon={icon({ name: 'gem' })} />
            <p className='whyRead__text'>The most healing of pleasures</p>
          </div>
          <div className='whyRead__element'>
            <FontAwesomeIcon icon={icon({ name: 'lightbulb' })} />
            <p className='whyRead__text'>Aspire insightful ideas</p>
          </div>
          <div className='whyRead__element'>
            <FontAwesomeIcon icon={icon({ name: 'circle-check' })} />
            <p className='whyRead__text'>Live in success</p>
          </div>
        </div>
      </section >
  )
}

export default WhyRead;