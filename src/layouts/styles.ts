import styled from 'styled-components'

export const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(5rem, 20rem) 2fr;
  grid-template-areas: 'menu content';
`

export const OutletContainer = styled.div`
  max-width: 120rem;
  min-width: 32rem;

  grid-area: content;
`
