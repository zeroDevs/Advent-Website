import React from 'react'
import Helmet from 'react-helmet'
import config from '../../utils/siteConfig'

const MetaTags = () => {
    let title
    let description
    let image
    let pageUrl
    title = config.siteTitle
    description = config.siteDescription
    image = config.shareImage
    pageUrl = config.siteUrl
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="image" content={image} />
            <meta name="description" content={description} />
            <meta name="msapplication-TileImage" content={pageUrl} /> 

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content='900' />
            <meta property="og:image:height" content='600' />
            <meta property="og:url" content={pageUrl} />
            <meta property="og:site_name" content={title} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:url" content={pageUrl} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image:alt" content="Ascii Christmas Tree" />
        </Helmet>
    )
}

export default MetaTags