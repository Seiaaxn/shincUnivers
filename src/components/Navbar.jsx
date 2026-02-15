import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faNewspaper, faFire, faBookOpen, faChartLine, faHistory, faInfinity, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const location = useLocation()

    const navLinks = [
        { name: 'Home', path: '/', icon: faHome },
        { name: 'Terbaru', path: '/terbaru', icon: faNewspaper },
        { name: 'Trending', path: '/trending', icon: faFire },
        { name: 'Pustaka', path: '/pustaka', icon: faBookOpen },
        { name: 'All Comic', path: '/unlimited', icon: faInfinity },
        { name: 'Statistics', path: '/statistics', icon: faChartLine },
        { name: 'History', path: '/history', icon: faHistory },
    ].filter(link => {
        const isProduction = import.meta.env.PROD;
        if (isProduction && link.path === '/statistics') return false;
        return true;
    });

    const isActive = (path) => location.pathname === path

    return (
        <nav id="navbar" className="bg-white dark:bg-zinc-900 fixed w-full z-50 top-0 start-0 border-b border-zinc-200 dark:border-zinc-800">
            <div className="max-w-screen-xl mx-auto px-3 flex flex-wrap items-center justify-between py-2">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-md bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h1 className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        ShinVerse
                    </h1>
                </Link>

                {/* Right side buttons */}
                <div className="flex md:order-2 items-center space-x-2">
                    {/* Search toggle */}
                    <button
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-zinc-700 rounded-lg hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-700"
                    >
                        <FontAwesomeIcon icon={isSearchOpen ? faTimes : faSearch} className="w-4 h-4" />
                    </button>
                    {/* Theme Toggle */}
                    <ThemeToggle />
                    {/* Mobile menu toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-zinc-700 rounded-lg md:hidden hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-700"
                    >
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>

                {/* Desktop nav */}
                <div className={`items-center justify-between ${isMenuOpen ? 'flex' : 'hidden'} w-full md:flex md:w-auto md:order-1`}>
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-zinc-300 rounded-lg bg-zinc-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-zinc-800 md:dark:bg-zinc-900 dark:border-zinc-700">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`navbar-link-item flex items-center gap-1.5 ${isActive(link.path) ? 'active' : ''}`}
                                >
                                    <FontAwesomeIcon icon={link.icon} className="w-3.5 h-3.5" />
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Search bar dropdown */}
            {isSearchOpen && (
                <div className="border-t border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
                    <div className="max-w-screen-xl mx-auto px-3 py-3">
                        <div className="max-w-2xl mx-auto">
                            <div className="flex">
                                <input
                                    type="search"
                                    autoFocus
                                    className="block p-2.5 w-full z-20 text-sm text-zinc-900 bg-zinc-50 rounded-l-lg border border-zinc-300 focus:ring-orange-500 focus:border-orange-500 dark:bg-zinc-800 dark:border-zinc-600 dark:text-white dark:focus:border-orange-500 outline-none"
                                    placeholder="Cari komik..."
                                />
                                <button
                                    type="button"
                                    className="p-2.5 text-sm font-medium text-white bg-orange-600 rounded-r-lg border border-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-orange-300"
                                >
                                    <FontAwesomeIcon icon={faSearch} className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
