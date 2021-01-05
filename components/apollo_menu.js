import React from 'react'
import { useQuery, gql } from '@apollo/client'
import close from '../public/close.svg'

/**
 * <NavMenu>
 * 
 * Just a typical menu you might see on a CMS-driven site. It takes in a couple of props to move state around.
 * 
 * @param { boolean } menuState - lifted state true/false toggle for menu opening/closing
 * @param { function } handleMenu - lifted state changer for menuState, handles click event
 */

const NAV_MENU_DATA = gql`
  query NavMenu($uid: String!, $lang: String!) {
    nav_menu(uid: $uid, lang: $lang) {
      main_menu_items {
        item {
          ... on Landing_page {
            title
            _linkType
            _meta {
              uid
              id
            }
          }
        }
      }
    }
  }
`

const NavMenu = ({ menuState, handleMenu }) => {
  // Query for nav menu from Apollo, this is where you pass in your GraphQL variables
  const { loading, error, data } = useQuery(NAV_MENU_DATA, {
    variables: {
      "uid": "nav-menu",
      "lang": "en-us"
    }
  })
  
  if (loading) return `<p>Loading...</p>`;
  if (error) return `Error! ${error}`;

  // Destructuring the data object
  const { nav_menu: { main_menu_items } } = data

  // `menuState` checks just make sure out menu was turned on
  if (data) return(
    <>
      <section menuState={ menuState }>
        <div>
          { menuState === true && (
            <div>Explore</div>
          )}
          <div onClick={ handleMenu }>
          { menuState === true && (
            <svg src={ close } />
          )}
          </div>
        </div>
        { menuState === true && (
          <ul>
            { data.map( (item) => {
              return (
                <li link={ item }>
                  { item.title }
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </>
  )
}

export default NavMenu