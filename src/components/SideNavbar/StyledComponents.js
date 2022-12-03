import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const TextItemContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${props => props.isActive};
  width: 83%;
  cursor: pointer;
  border-radius: 10px;
  padding-left: 15px;
`
export const ItemText = styled.p`
  font-family: 'Roboto';
  color: ${props => props.color};
  width: 150px;
  margin-left: 20px;
`

export const BottomText = styled.p`
  font-family: 'Roboto';
  color: ${props => props.color};
  //   width: 140px;
  font-weight: bold;
  font-size: 15px;
`

export const NavLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  //   margin-bottom: 10px;
  color: ${props => props.color};
`
