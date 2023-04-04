import React from 'react'
import { PrismicRichText, PrismicLink } from '@prismicio/react'

/**
 * @typedef {import("@prismicio/client").Content.FindUsOnSlice} FindUsOnSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<FindUsOnSlice>} FindUsOnProps
 * @param { FindUsOnProps }
 */
const FindUsOn = ({ slice }) => (
  <section>
    <div className='wrapper'> 
      <span>
        {
          slice.primary.title &&
          <PrismicRichText field={slice.primary.title} />
        }
      </span>
      <span className='linksWrapper'>
      {
        slice?.items?.map((item, i) =>
        <div className='link'>
          <PrismicLink  field={item.link}>
            <span >{ item.link_title }</span>
          </PrismicLink>
        </div>
        )
      }
      </span>
    </div>
    <style jsx>{`
        section {
          background-color: rgb(239, 239, 239);
          text-align: center;
        }
        .wrapper{
          max-width: 1024px;
          padding: 4em;
          margin: 0 auto;
        }
        .linksWrapper{
          margin-top: 30px;
          display: flex;
          width: 100%;
        }
        .link{
          text-align: center;
          flex-basis: 150px;
          flex-grow: 1;
        }
    `}</style>
  </section>
)

export default FindUsOn