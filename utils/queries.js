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
  "spotlight": spotlight[]->
}`

export const barPageQuery = `*[_type == "barPage"] {
  booking,
  images,
  intro,
  "menu": menu.asset->url,
  opening
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
