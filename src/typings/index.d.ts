declare module 'react-country-flag';

declare module 'named-urls' {
  interface Routes { [path: string]: string | Routes }
  interface ReverseParams { [path: string]: number | string }

  function include<Routes>(base: string, routes: Routes): {
    [P in keyof Routes]: Routes[P]
  } & { toString(): string };
  function reverse(pattern: string, params?: ReverseParams): string;
  function reverseForce(pattern: string, params?: ReverseParams): string;
}
