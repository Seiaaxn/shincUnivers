import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import SearchComic from '../components/Home/SearchComic'
import CardTerbaruComic from '../components/Home/CardTerbaruComic'
import CardTrendingComic from '../components/Home/CardTrendingComic'
import SEO from '../components/SEO'

const Home = () => {
  return (
    <>
      <SEO
        title="ShinVerse - Baca Komik Gratis Bahasa Indonesia Terbaru"
        description="Baca komik online gratis di ShinVerse. Koleksi lengkap komik terbaru, trending, dan populer dalam bahasa Indonesia. Update setiap hari!"
        keywords="komik indonesia, baca komik gratis, komik online, manga indonesia, manhwa indonesia"
        url="https://juju-manhwa-2-0.vercel.app/"
      />
      <div className="relative bg-zinc-100 dark:bg-zinc-950 min-h-screen text-zinc-900 dark:text-zinc-50">
        {/* Content */}
        <div className="max-w-screen-xl mx-auto px-3 pt-4 pb-8">
          {/* Hero Search */}
          <SearchComic />

          {/* Terbaru Section */}
          <div className="mt-6">
            <CardTerbaruComic />
          </div>

          {/* Trending Section */}
          <div className="mt-8">
            <CardTrendingComic />
          </div>

          {/* Pustaka CTA */}
          <div className="mt-10 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={faBookOpen} className="text-white text-lg" />
                </div>
                <div>
                  <h2 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg">Pustaka Komik</h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Jelajahi koleksi lengkap ribuan judul komik</p>
                </div>
              </div>
              <Link
                to="/pustaka"
                className="flex items-center gap-2 text-white bg-amber-700 hover:bg-amber-800 font-medium rounded-lg text-sm px-4 py-2.5 transition-colors whitespace-nowrap"
              >
                Lihat Semua
                <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 mt-8">
          <div className="max-w-screen-xl mx-auto px-3 py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                © {new Date().getFullYear()} <strong>ShinVerse™</strong>. All Rights Reserved.
              </span>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 sm:mt-0">
                Platform baca komik online terbaik
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Home
              
