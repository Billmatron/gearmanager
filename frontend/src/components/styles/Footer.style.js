import styled from "styled-components"

export const StyledFooter = styled.footer`
    background-color: ${({theme}) => theme.colors.accent};
    grid-area: footer;
    min-height: 50px;
    max-height: 100px;
`