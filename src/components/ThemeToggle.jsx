import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from '../contexts/ThemeContext'

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            onClick={toggleTheme}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-zinc-700 rounded-lg hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <FontAwesomeIcon icon={faMoon} className="w-4 h-4 text-amber-400" />
            ) : (
                <FontAwesomeIcon icon={faSun} className="w-4 h-4 text-amber-500" />
            )}
        </button>
    )
}

export default ThemeToggle
