export type NavigationConfig = {
  persistNavigation: 'always' | 'dev' | 'prod' | 'never'
}

const navigatorConfig: NavigationConfig = {
  // This feature is particularly useful in development mode, but
  // can be used in production as well if you prefer.
  // persistNavigation: "dev",

  /**
   ** Enable this if you needed navigation persist disable
   */
  persistNavigation: 'dev',
}

export default navigatorConfig
