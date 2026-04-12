import {getTranslations} from 'next-intl/server'
import ContactForm from '@/app/components/contact/ContactForm'

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'contact'})
  return {
    title: `${t('title')} — DotDeep Design`,
    description: t('subtitle'),
  }
}

export default async function ContactPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <ContactForm locale={locale} />
      </div>
    </section>
  )
}
