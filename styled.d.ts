import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      cream: string
      blueWater: string
      error: string
    }
    breakpoints: {
      mobile: string
      tablet: string
      desktop: string
    }
    padding: {
      container: {
        mobile: string
        tablet: string
        desktop: string
      }
    }
  }
}
