import { useStaticQuery, graphql } from 'gatsby'
import { InvitationConfig } from './types';

export default function useInvitationConfig(): InvitationConfig {
    const data = useStaticQuery<{ contentJson:{invitation: InvitationConfig} }>(query);
    return data.contentJson.invitation
}

const query = graphql`
    query InvitationConfigQuery {
        contentJson {
            invitation {
                text
                background
                events {
                    name
                    place {
                        name
                        latitude
                        longitude
                    }
                    from
                    to
                }
                gallery {
                    src
                    caption
                }
            }
        }
    }
`