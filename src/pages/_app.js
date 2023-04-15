import '@/styles/globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Nunito_Sans } from 'next/font/google'

const nunitoSans = Nunito_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['200', '300', '400', '600', '700', '800', '900'],
  variable: '--font-nunito-sans'
})

export default function App({ Component, pageProps }) {
  return (
    <div className={`${nunitoSans.variable}`}>
      <Component {...pageProps} />
    </div>
  )
}
