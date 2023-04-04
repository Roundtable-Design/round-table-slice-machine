import React from 'react'
import { PrismicRichText, PrismicLink} from '@prismicio/react'
/**
 * @typedef {import("@prismicio/client").Content.CallToActionSlice} CallToActionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<CallToActionSlice>} CallToActionProps
 * @param { CallToActionProps }
 */
const CallToAction = ({ slice }) => (
  <section>
    <div className="wrapper">
      <div className="textWrapper">
        <PrismicRichText field={slice.primary.title} />
        <PrismicRichText field={slice.primary.description} />
      </div>
      <div className='button'>
        <PrismicLink  field={slice.primary.button_link} >
          <span >{ slice.primary.button_text }</span>
        </PrismicLink>
      </div>
    </div>

    <style jsx>{`
        section {
          background-color: rgb(239, 239, 239);
        }
        .wrapper{
          max-width: 1024px;
          padding: 4em;
          margin: 0 auto;
        }
        .button{
          text-align: right;
          margin-top: 30px;
        }
        .textWrapper {
          max-width: 500px;
        }
    `}</style>
  </section>
)

export default CallToAction