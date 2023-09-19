import styled from 'styled-components'

export const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: max-content;
  grid-template-areas: 'menu content';
`

export const OutletContainer = styled.div`
  grid-area: content;
`
