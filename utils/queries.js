export const headerQuery = `*[_type == "siteSettings"][0] {
  "socials": [
    {
    	"icon": "Facebook",
      "slug": 'facebook',
			"link": coalesce(facebook, false),
      "_id" : _rev + 'facebook'
  	},
    {
    	"icon": "Instagram",
      "slug": 'instagram',
			"link": coalesce(instagram, false),
      "_id" : _rev + 'instagram'
  	},
    {
    	"icon": "Mixcloud",
      "slug": 'mixcloud',
			"link": coalesce(mixcloud, false),
      "_id" : _rev + 'mixcloud'
  	},
    {
    	"icon": "Twitter",
      "slug": 'twitter',
			"link": coalesce(twitter, false),
      "_id" : _rev + 'twitter'
  	},
    {
    	"name": "Soundcloud",
      "slug": 'soundcloud',
			"link": coalesce(soundcloud, false),
      "_id" : _rev + 'soundcloud'
  	}
  ],
}`

export const footerQuery = `*[_type == "siteSettings"] {
  "_id": _rev,
  "email": coalesce(email, false),
  "socials": [
    {
    	"name": "Facebook",
			"link": coalesce(facebook, false),
      "_id" : _rev + 'facebook'
  	},
    {
    	"name": "Instagram",
			"link": coalesce(instagram, false),
      "_id" : _rev + 'instagram'
  	},
    {
    	"name": "Mixcloud",
			"link": coalesce(mixcloud, false),
      "_id" : _rev + 'mixcloud'
  	},
    {
    	"name": "Twitter",
			"link": coalesce(twitter, false),
      "_id" : _rev + 'twitter'
  	},
    {
    	"name": "Soundcloud",
			"link": coalesce(soundcloud, false),
      "_id" : _rev + 'soundcloud'
  	}
  ],
}`

export const radioPageQuery = `*[_type == "radioPage"] {
  _id,
	_rev,
	_type,
  "community": community[]->,
  "spotlight": spotlight[]->,
  "heading": coalesce(heading, "Aaja Radio<br />on air", false),
  "subHeading": coalesce(subHeading, "Listen live or explore our music archive", false),
  "communityHeading": coalesce(communityHeading, "aaja community", false),
	"communityTitle": coalesce(communityTitle, "Meet the family", false),
  "communityText": coalesce(communityText, false),
  "spotlightHeading": coalesce(spotlightHeading, "Spotlight", false),
  "spotlightSubHeading": coalesce(spotlightSubHeading, "Updated weekly, dip into our recommended sounds", false),
}`

export const barPageQuery = `*[_type == "barPage"] {
  "heading": coalesce(heading, "aaja music record Label", false),
  booking,
  images,
  intro,
  "menu": menu.asset->url,
  opening
}`

export const festivalPageQuery = `*[_type == "festivalPage"] {
  "heading": coalesce(heading, "Creekside Festival!", false),
  subHeading,
  headingIntro,
  festivalHero,
  images
}`

export const buttonPopupQuery = `*[_type == "popupButton"] {
  isEnabled,
  shouldShake,
  shouldSpin,
  shouldPopup,
  shouldBlendWithBackground,
  popupWidth,
  popupHeight,
  buttonLink,
  logo
}`


export const labelPageQuery = `*[_type == "labelPage"] {
  "heading": coalesce(heading, "Aaja Bar", false),
  intro,
  "eps": eps[]->
}`

export const homePageQuery = `*[_type == "homePage"] {
  _id,
  "homeNewsBanner": homeNewsBanner[] {
    _key,
    "content":  coalesce(content, false),
    "date":  coalesce(date, false),
    feature_image,
    title,
    "feature_image_mobile":  coalesce(feature_image_mobile,feature_image, false),
  }
}`

export const liveEventSlugPageQuery = (slug) => `*[_type == "liveEvents" && slug.current == "${slug}"][0] {
    _id,
    _rev,
    "feature_image": coalesce(feature_image, false),
    name,
    slot,
    slug,
    intro,
    eventLink,
    ctaTitle,
    backgroundColor,
    audioStreamingLink,
    iframeLink,
    eventDate,
    eventDateTime,
    eventDateText,
    eventLocation
  }`


export const residentSlugPageQuery = (
  slug
) => `*[_type == "resident" && slug.current == "${slug}"][0] {
  _id,
  _rev,
  "bio": coalesce(bioText, false),
  "feature_image": coalesce(feature_image, spotlight_image, false),
  mixcloud_url,
  soundcloud_url,
  name,
  short_bio,
  slot,
  slug,
  spotlight_image,
  website,
  "soundcloud_embed" : coalesce(soundcloud_embed, false),
  "socials": [
    {
    	"icon": "Facebook",
      "slug": 'facebook',
			"link": coalesce(socials.facebook, false),
      "_id" : _id + 'facebook'
  	},
    {
    	"icon": "Instagram",
      "slug": 'instagram',
			"link": coalesce(socials.instagram, false),
      "_id" : _id + 'instagram'
  	},
    {
    	"icon": "Mixcloud",
      "slug": 'mixcloud',
			"link": coalesce(mixcloud_url, false),
      "_id" : _id + 'mixcloud'
  	},
    {
    	"icon": "Twitter",
      "slug": 'twitter',
			"link": coalesce(socials.twitter, false),
      "_id" : _id + 'twitter'
  	},
    {
    	"name": "Soundcloud",
      "slug": 'soundcloud',
			"link": coalesce(soundcloud_url, false),
      "_id" : _rev + 'soundcloud'
  	}
  ]
}`

export const residentAllQuery = `*[_type == "resident"] | order(name asc) {
  _id,
  "short_bio": coalesce(short_bio, bio, false),
  "slug": slug.current,
	"image": coalesce(feature_image, spotlight_image, false),
  name,
}`

// `*[_type == 'video' && references(*[_type == "category"]._id)] {
// 		  category,
//       "_key": _id,
//     "slug": slug.current,
//     "src": coalesce(url, 'https://vimeo.com/502163294'),
//     poster,
//     "client" : coalesce(client->name, false),
//     "job_name": coalesce(title, 'title needed'),
//     "meta" : [
//       {"key":"Art Direction", "val": coalesce(credits.art_direction, false), "id": _id+'art_direction'},
//       {"key":"Colour and VFX", "val": coalesce(credits.colour_and_vfx, false), "id": _id+'colour_and_vfx'},
//       {"key":"Director", "val": coalesce(credits.director, false), "id": _id+'director'},
//       {"key":"Editor", "val": coalesce(credits.editor, false), "id": _id+'editor'},
//       {"key":"Production", "val": coalesce(credits.production, false), "id": _id+'production'},
//       {"key":"Sound Mix", "val": coalesce(credits.sound_mix, false), "id": _id+'sound_mix'}
//     ],
//     additionalCredits
// }`
