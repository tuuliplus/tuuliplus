'use client'

import '../styles/globals.css'
import Script from 'next/script'

declare global {
  interface Window {
    dataLayer: [{}]
  }
}
const dataLayerPush = (dataLayerProps: object) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(dataLayerProps)
  }
}

const tagManagerArgs = {
  gtmId: 'GTM-MQVMJ9DT',
  auth: 'PTESP_F5asjpQoSGphT-sw',
  preview: 'env-3',
}
if (process.env.NODE_ENV == 'production') {
  tagManagerArgs.auth = 'SKC1vuH3pPle9Z24vgro8w'
  tagManagerArgs.preview = 'env-1'
}
const gtmUrl = tagManagerArgs
  ? `https://www.googletagmanager.com/gtm.js?id=${tagManagerArgs.gtmId}&gtm_auth=${tagManagerArgs.auth}&gtm_preview=${tagManagerArgs.preview}&gtm_cookies_win=x`
  : undefined

const simpleAnalyticsUrl = 'https://scripts.simpleanalyticscdn.com/latest.js'
const simpleAnalyticsDisregardDnt = 'true'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          data-collect-dnt={simpleAnalyticsDisregardDnt}
          async
          defer
          src={simpleAnalyticsUrl}
        />
        <Script
          async
          src={gtmUrl}
          onLoad={() => {
            dataLayerPush({
              event: 'gtm.js',
              'gtm.start': new Date().getTime(),
            })
          }}
        />
      </body>
    </html>
  )
}
