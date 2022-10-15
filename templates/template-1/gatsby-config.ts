import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Pernikahan A & B",
    description: "This is description",
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-material-ui",
    "gatsby-transformer-json",
    // "gatsby-plugin-emotion",
    /*{
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        "trackingId": ""
      }
    }, {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/images/icon.png"
      }
    },*/
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
      },
    }
  ]
};

export default config;
