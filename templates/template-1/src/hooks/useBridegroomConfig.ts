import { useStaticQuery, graphql } from 'gatsby'
import { BridegroomConfig } from './types';

export default function useBridegroomConfig(): BridegroomConfig {
    const data = useStaticQuery<{ contentJson:{bridegroom: BridegroomConfig} }>(query);
    return data.contentJson.bridegroom
}

const query = graphql`
    query BridegroomConfigQuery {
        contentJson {
            bridegroom {
                name
                fullname
                image
                text
                parents {
                    name
                }
            }
        }
    }
`