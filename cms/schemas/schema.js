// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import blockContent from './blockContent'
import blockContentBare from './blockContentBare'
import resident from './resident'
import ep from './ep'
import homePage from './homePage'
import radioPage from './radioPage'
import barPage from './barPage'
import festivalPage from './festivalPage'
import studioPage from './studioPage'
import labelPage from './labelPage'
import liveEventsLandingPage from './liveEventsLandingPage'
import contactPage from './contactPage'
import siteSettings from './siteSettings'
import liveEvents from './liveEvents'
import popupButtonRight from './popupButtonRight'
import popupButtonLeft from './popupButtonLeft'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    resident,
    ep,
    homePage,
    radioPage,
    barPage,
    festivalPage,
    studioPage,
    labelPage,
    contactPage,
    siteSettings,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
    blockContentBare,
    liveEvents,
    liveEventsLandingPage,
    popupButtonRight,
    popupButtonLeft
  ]),
})
