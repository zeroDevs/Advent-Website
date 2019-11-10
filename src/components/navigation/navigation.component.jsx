import React, { useState, useEffect } from "react"




import { NavigationContainer, NavContentContainer, NavLogo } from "./navigation.styles"

export default () => {
  const [float, setFloat] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) setFloat(true)
      else if (window.scrollY === 0) setFloat(false)
    }
    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <NavigationContainer float={float} role="navigation">
      <NavContentContainer>
        <NavLogo>Advent of Code</NavLogo>
      </NavContentContainer>
    </NavigationContainer>
  )
}
