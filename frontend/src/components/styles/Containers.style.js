import React from 'react'
import styled from 'styled-components'
// import {StyledBody, StyledContainer} from './styles/Body.style'



export const StyledFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

 
`



export const StyledFlexRow = styled.div`
  display: flex;
  flex-direction: row;
  overflow: auto;
  flex:1;

  @media only screen and (max-width: 640px){
    flex-direction: column;
    height: auto;
  }
`

export const StyledMain = styled.section`
  flex: 1 1 auto;
  overflow: auto;
`

export const StyledFlexDiv = styled.div`
  display:  ${({$display})=> $display? `${$display}`: 'flex' };
  flex: ${({$flex})=> $flex? `${$flex}`: '0 1 auto' };
  text-align:  ${({$textAlign})=> $textAlign? `${$textAlign}`: 'start' };

  justify-content: ${({$justifyContent})=> $justifyContent? `${$justifyContent}`: 'normal' };
  justify-items: ${({$justifyItems})=> $justifyItems? `${$justifyItems}`: 'legacy' };
  justify-self: ${({$justifySelf})=> $justifySelf? `${$justifySelf}`: 'auto' };
  align-content: ${({$alignContent})=> $alignContent? `${$alignContent}`: 'normal' };
  align-items: ${({$alignItems})=> $alignItems? `${$alignItems}`: 'normal' };
  align-self: ${({$alignSelf})=> $alignSelf? `${$alignSelf}`: 'auto' };
  flex-wrap: ${({$flexWrap})=> $flexWrap? `${$flexWrap}`: 'nowrap' };
  

  padding-top: ${({$paddingTop})=> $paddingTop? `${$paddingTop}`: '0' };
  padding-bottom: ${({$paddingBottom})=> $paddingBottom? `${$paddingBottom}`: '0' };
  padding-left: ${({$paddingLeft})=> $paddingLeft? `${$paddingLeft}`: '0' };
  padding-right: ${({$paddingRight})=> $paddingRight? `${$paddingRight}`: '0' };

  width:  ${({$width})=> $width? `${$width}`: '' };
  height:  ${({$height})=> $height? `${$height}`: '' };
  
`

export const StyledDiv = styled.div`
  display:  ${({$display})=> $display? `${$display}`: 'block' };
  text-align:  ${({$textAlign})=> $textAlign? `${$textAlign}`: 'start' };

  margin-top: ${({$marginTop})=> $marginTop? `${$marginTop}`: '0' };
  margin-bottom: ${({$marginBottom})=> $marginBottom? `${$marginBottom}`: '0' };
  margin-left: ${({$marginLeft})=> $marginLeft? `${$marginLeft}`: '0' };
  margin-right: ${({$marginRight})=> $marginRight? `${$marginRight}`: '0' };
  padding-top: ${({$paddingTop})=> $paddingTop? `${$paddingTop}`: '0' };
  padding-bottom: ${({$paddingBottom})=> $paddingBottom? `${$paddingBottom}`: '0' };
  padding-left: ${({$paddingLeft})=> $paddingLeft? `${$paddingLeft}`: '0' };
  padding-right: ${({$paddingRight})=> $paddingRight? `${$paddingRight}`: '0' };

  width:  ${({$width})=> $width? `${$width}`: '100%' };
  height:  ${({$height})=> $height? `${$height}`: '100%' };


`


export const StyledLineBreak = styled.div`
    width:  ${({$width})=> $width? `${$width}`: '10px' };
    background-color: ${({theme})=>theme.colors.accent};
    height: ${({$height})=> $height? `${$height}`: '1px' };
    text-align: center;
    margin: auto;
    margin-top: ${({$marginTop})=> $marginTop? `${$marginTop}`: '' };
    margin-bottom: ${({$marginBottom})=> $marginBottom? `${$marginBottom}`: '' };
    
`
