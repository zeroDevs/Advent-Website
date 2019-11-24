import React from 'react'
import Helmet from 'react-helmet'
import config from '../../utils/siteConfig'

const MetaTags = ({ title, description, pageUrl }) => {
   
    let dTitle = config.siteTitle
    let dDescription = config.siteDescription
    let dPageUrl = config.siteUrl
    let image = config.shareImage
    return (
        <Helmet>
            <title>{title ? title : dTitle}</title>
            <meta name="image" content={image} />
            <meta name="description" content={description ? description : dDescription} />
            <meta name="msapplication-TileImage" content={pageUrl ? pageUrl : dPageUrl} /> 

            <meta property="og:title" content={title ? title : dTitle} />
            <meta property="og:description" content={description ? description : dDescription} />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content='900' />
            <meta property="og:image:height" content='600' />
            <meta property="og:url" content={pageUrl ? pageUrl : dPageUrl} />
            <meta property="og:site_name" content={title ? title : dTitle} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title ? title : dTitle} />
            <meta name="twitter:url" content={pageUrl ? pageUrl : dPageUrl} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:description" content={description ? description : dDescription} />
            <meta name="twitter:image:alt" content="Ascii Christmas Tree" />
        </Helmet>
    )
}

export default MetaTags