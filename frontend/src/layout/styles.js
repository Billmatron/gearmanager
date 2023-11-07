import styled from 'styled-components'
import {v} from '../styles/variables'

export const SLayoutFixedHeader = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;

`

export const SMain = styled.div`
    padding: ${v.smSpacing};
    flex: 1 1 auto;
    overflow: auto;
`

export const SLayoutSidebarBody = styled.div`
    display: flex;
    flex-direction: row;
    overflow: auto;
    flex:1;

  @media only screen and (max-width: 640px){
    flex-direction: column;
    height: auto;
  }
`