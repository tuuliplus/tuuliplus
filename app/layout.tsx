'use client'

import '../styles/globals.css'
import Script from 'next/script'

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
          async
          src={gtmUrl}
          onLoad={() => {
            dataLayerPush({
              event: 'gtm.js',
              'gtm.start': new Date().getTime(),
            })
          }}
        />
        <Script
          async
          src={matomoUrl + '?c=' + mtmCacheParam()}
          onLoad={() => {
            matomoTagManagerPush({
              'mtm.startTime': new Date().getTime(),
              event: 'mtm.Start',
            })
          }}
        />
      </body>
    </html>
  )
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
const gtmUrl = `https://www.googletagmanager.com/gtm.js?id=${tagManagerArgs.gtmId}&gtm_auth=${tagManagerArgs.auth}&gtm_preview=${tagManagerArgs.preview}&gtm_cookies_win=x`

const matomoProdUrl =
  'https://cdn.matomo.cloud/tuulipus.matomo.cloud/container_XSXBfSjg.js'
const matomoDevUrl =
  'https://cdn.matomo.cloud/tuulipus.matomo.cloud/container_XSXBfSjg_dev_833a9fdc11fde15b67c5ed11.js'
const matomoUrl =
  process.env.NODE_ENV == 'production' ? matomoProdUrl : matomoDevUrl

declare global {
  interface Window {
    dataLayer: [{}]
    _mtm: [{}]
  }
}
const dataLayerPush = (dataLayerEvent: object) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(dataLayerEvent)
  }
}

const matomoTagManagerPush = (matomoDataLayerEvent: object) => {
  if (typeof window !== 'undefined') {
    window._mtm = window._mtm || []
    window._mtm.push(matomoDataLayerEvent)
  }
}

const mtmCacheParam = () => {
  const now = new Date()
  return (
    now.getUTCFullYear() +
    '-' +
    (now.getUTCMonth() + 1).toString().padStart(2 | 0) +
    '-' +
    now
      .getUTCDate()
      .toString()
      .padStart(2 | 0) +
    '-' +
    (now.getUTCHours() + 1).toString().padStart(2 | 0)
  )
}
