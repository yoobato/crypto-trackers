// *.d.ts Typescript의 Declaration 파일

// Import original module declarations
import "styled-components";

// Extend StyledComponents
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    cardBgColor: string;
  }
}
