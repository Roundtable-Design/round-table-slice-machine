import React from 'react'
import { PrismicRichText } from '@prismicio/react'

/**
 * @typedef {import("@prismicio/client").Content.HeroSlice} HeroSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HeroSlice>} HeroProps
 * @param { HeroProps }
 */
const Hero = ({ slice }) => (
  <section>
    <div className="wrapper">
      <div className="textWrapper">
        <span className="title">
          {
            slice.primary.title ?
            <PrismicRichText field={slice.primary.title}/>
            : <h2>Template slice, update me!</h2>
          }
        </span>
        <span className="description">
        {
          slice.primary.description ?
          <PrismicRichText field={slice.primary.description}/>
          : <p>start by editing this slice from inside Slice Machine!</p>
        }
        </span>
      </div>
        <div className="teamWrapper">
            {
              slice?.items?.map((item, i) =>
                <span className="content">
                  <div className='image'>
                    <img width='200px' height='200px' src={item.image.url} alt={item.image.alt} />
                  </div>
                  <PrismicRichText style={{margin:0}} field={item.name} />
                  <PrismicRichText field={item.role} />
                </span>
              )
            }
        </div>
    </div>
    <style jsx>{`
        section {
          background-color: #1f1f1f;
        }
        .wrapper{
          max-width: 1024px;
          padding: 4em;
          margin: 0 auto;
          overflow: hidden;
        }
        .textWrapper{
          width: 40%;
          margin-bottom: 35px;
        }
        .teamWrapper{
          color: white;

          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          width: auto;
          gap: 1em;

        }
        .content{
          width: 200px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          
        }
        .image{
          width: 200px;
          height: 200px;
          overflow: hidden;

        }
        .img{
          width: 100%;
          height: 100%;

          object-position: center center;
          object-fit: cover;
          
        }
        .title {
          color: white;
        }
        .description{
          color: white;
        }
        @media screen and (max-width: 719px) {
          .textWrapper{
            width: 100%;
          }
          .teamWrapper{
            flex-direction: column;
          }
        }
    `}</style>
  </section>
)

export default Hero