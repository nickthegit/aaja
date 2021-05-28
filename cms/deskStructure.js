import S from '@sanity/desk-tool/structure-builder'

// import { MdWebAsset as icon } from 'react-icons/md'

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .id('website')
        .title('Site')
        .child(
          S.list()
            .id('site')
            .title('Site')
            .items([
              S.listItem()
                .title('Site Settings')
                // .icon(FaGlobeAmericas)
                .child(
                  S.editor()
                    .title('Site Settings')
                    .id('siteSettings')
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                ),
              S.listItem()
                .title('Radio Page')
                // .icon(FaGlobeAmericas)
                .child(
                  S.editor()
                    .title('Radio Page')
                    .id('radioPage')
                    .schemaType('radioPage')
                    .documentId('radioPage')
                ),
              S.listItem()
                .title('Bar Page')
                // .icon(FaGlobeAmericas)
                .child(
                  S.editor()
                    .title('Bar Page')
                    .id('barPage')
                    .schemaType('barPage')
                    .documentId('barPage')
                ),
              S.listItem()
                .title('Label Page')
                // .icon(FaGlobeAmericas)
                .child(
                  S.editor()
                    .title('Label Page')
                    .id('labelPage')
                    .schemaType('labelPage')
                    .documentId('labelPage')
                ),
              S.listItem()
                .title('Channel 2 Page')
                // .icon(FaGlobeAmericas)
                .child(
                  S.editor()
                    .title('Channel 2 Page')
                    .id('channel2Page')
                    .schemaType('channel2Page')
                    .documentId('channel2Page')
                ),
              S.listItem()
                .title('Contact Page')
                // .icon(FaGlobeAmericas)
                .child(
                  S.editor()
                    .title('Contact Page')
                    .id('contactPage')
                    .schemaType('contactPage')
                    .documentId('contactPage')
                ),
            ])
        ),
      // Add a visual divider (optional)
      S.divider(),
      // List out the rest of the document types, but filter out the config type
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'siteSettings',
            'radioPage',
            'barPage',
            'labelPage',
            'channel2Page',
            'contactPage',
          ].includes(listItem.getId())
      ),
    ])
