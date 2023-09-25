import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
      font-size: 62.5%;
  }

  :focus {
      outline: 0;
      box-shadow: 0 0 0 2px ${(props) => props.theme['purple-500']};
    }

    body {
      background-color: ${(props) => props.theme['gray-800']};
      color: ${(props) => props.theme['gray-100']};
      -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
      font: 400 1.6rem Roboto, sans-serif;
    }

  ::-webkit-scrollbar {
    width: 1rem;
    padding: 1rem;
  } 

/* Track */
  ::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme['gray-800']};
    padding: 1rem;
  } 

/* Handle */
 ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme['purple-300']};
    border-radius: 6px;
 
  } 

/* Handle on hover */
 ::-webkit-scrollbar-thumb:hover {
  background-color: ${(props) => props.theme['purple-500']};
  } 
`
