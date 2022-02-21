import React from 'react'

const ThemeContext = React.createContext({
  isDark: '',
  changeTheme: () => {},
})

export default ThemeContext
