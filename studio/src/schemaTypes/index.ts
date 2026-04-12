import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {project} from './documents/project'
import {service} from './documents/service'
import {pricingItem} from './documents/pricingItem'
import {testimonial} from './documents/testimonial'
import {clientLogo} from './documents/clientLogo'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {homePage} from './singletons/homePage'
import {aboutPage} from './singletons/aboutPage'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import button from './objects/button'
import {blockContentTextOnly} from './objects/blockContentTextOnly'
import {localizedString} from './objects/localizedString'
import {localizedBlockContent} from './objects/localizedBlockContent'
import {socialLinks} from './objects/socialLinks'
import {stat} from './objects/stat'

export const schemaTypes = [
  // Singletons
  settings,
  homePage,
  aboutPage,
  // Documents
  page,
  post,
  person,
  project,
  service,
  pricingItem,
  testimonial,
  clientLogo,
  // Objects
  button,
  blockContent,
  blockContentTextOnly,
  infoSection,
  callToAction,
  link,
  localizedString,
  localizedBlockContent,
  socialLinks,
  stat,
]
