import config from '../../content/config.json'

export type Config = typeof config



export type LandingConfig = Config['landing']
export type BridegroomConfig = Config['bridegroom']
export type InvitationConfig = Config['invitation']