import { useStaticQuery, graphql } from 'gatsby'
import { LandingConfig } from './types';

export default function useLandingConfig(): LandingConfig {
    const data = useStaticQuery<{ contentJson:{landing: LandingConfig} }>(query);
    return data.contentJson.landing
}

const query = graphql`
    query LandingConfigQuery {
        contentJson {
            landing {
                background
            }
        }
    }
`