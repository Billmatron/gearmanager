import styled from "styled-components"

export const StyledFooter = styled.footer`
    background-color: ${({theme}) => theme.accent};
    grid-area: footer;
    min-height: 50px;
    max-height: 100px;
`
export const StyledShadow = styled.div`
  width: 100vw;
  box-shadow: 5px 5px 10px gray;
`

