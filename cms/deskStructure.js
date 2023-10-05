import S from '@sanity/desk-tool/structure-builder'

import { CgWebsite, CgRecord } from 'react-icons/cg'
import { FiSettings, FiRadio } from 'react-icons/fi'
import { BiDrink } from 'react-icons/bi'
import { GrChannel } from 'react-icons/gr'
import { RiContactsLine, RiHome4Line } from 'react-icons/ri'
import { GiPartyPopper } from 'react-icons/gi'

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .id('website')
        .title('Site')
        .icon(CgWebsite)
        .child(
          S.list()
            .id('site')
            .title('Site')
            .items([
              S.listItem()
                .title('Site Settings')
                .icon(FiSettings)
                .child(
                  S.editor()
                    .title('Site Settings')
                    .id('siteSettings')
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                ),
              S.divider(),
              S.listItem()
                .title('Home Page')
                .icon(RiHome4Line)
                .child(
                  S.editor()
                    .title('Home Page')
                    .id('homePage')
                    .schemaType('homePage')
                    .documentId('homePage')
                ),
              S.listItem()
                .title('Radio Page')
                .icon(FiRadio)
                .child(
                  S.editor()
                    .title('Radio Page')
                    .id('radioPage')
                    .schemaType('radioPage')
                    .documentId('radioPage')
                ),
              S.listItem()
                .title('Bar Page')
                .icon(BiDrink)
                .child(
                  S.editor()
                    .title('Bar Page')
                    .id('barPage')
                    .schemaType('barPage')
                    .documentId('barPage')
                ),
              S.listItem()
                .title('Festival Page')
                .icon(GiPartyPopper)
                .child(
                  S.editor()
                    .title('Festival Page')
                    .id('festivalPage')
                    .schemaType('festivalPage')
                    .documentId('festivalPage')
                ),
              S.listItem()
                .title('Label Page')
                .icon(CgRecord)
                .child(
                  S.editor()
                    .title('Label Page')
                    .id('labelPage')
                    .schemaType('labelPage')
                    .documentId('labelPage')
                ),
              S.listItem()
                .title('Channel 2 Page')
                .icon(GrChannel)
                .child(
                  S.editor()
                    .title('Channel 2 Page')
                    .id('channel2Page')
                    .schemaType('channel2Page')
                    .documentId('channel2Page')
                ),
              S.listItem()
                .title('Contact Page')
                .icon(RiContactsLine)
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
            'homePage',
            'radioPage',
            'barPage',
            'labelPage',
            'channel2Page',
            'contactPage',
          ].includes(listItem.getId())
      ),
    ])
