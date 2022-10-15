import { useStaticQuery, graphql } from 'gatsby'

interface SiteMetadata {
    title: string
    description: string
    siteUrl: string
}

export default function useSiteMetadata(): SiteMetadata {
    const data = useStaticQuery<{site:{siteMetadata: SiteMetadata}}>(query);
    return data.site.siteMetadata
}

const query = graphql`
    query MetadataQuery {
        site {
            siteMetadata {
                title,
                description,
                siteUrl
            }
        }
    }
`