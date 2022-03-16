import React, { useContext, useEffect } from 'react'
import { MenuContext } from '../../../contexts/MenuContext'
import MenuItem from '../MenuItem/index'
import './style.css'

const MenuList = () => {
  const {
    menuState: { find_drink, menu, menuLoading },
    getMenu,
  } = useContext(MenuContext)


	useEffect(() => {
    getMenu()
  }, [])
  

  let menuBody = null
  if(menu){
    menuBody = (
      <>
        {menu.map(single => (
          <MenuItem drink={single} key={single._id}/>
        ))}
      </>
    )
  }

  return (
    <div className='menulist'>
        {menuBody}
    </div>
  )
}

export default MenuList