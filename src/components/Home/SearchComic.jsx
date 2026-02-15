import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons'

const SearchComic = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([])
            setError(null)
            return
        }
        setLoading(true)
        setError(null)
        const debounceTimer = setTimeout(async () => {
            try {
                const response = await axios.get(`https://www.sankavollerei.com/comic/search?q=${encodeURIComponent(searchQuery)}`)
                const processedResults = response.data.data.map(comic => {
                    const slug = comic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
                    return { ...comic, processedLink: comic.href, slug }
                })
                setSearchResults(processedResults)
            } catch (err) {
                setError('Terjadi kesalahan saat mencari komik')
            } finally {
                setLoading(false)
            }
        }, 500)
        return () => { clearTimeout(debounceTimer); setLoading(false) }
    }, [searchQuery])

    const handleComicDetail = (comic) => {
        const processedLink = comic.href.replace('/detail-komik/', '')
        navigate(`/detail-comic/${comic.slug}`, {
            state: {
                comic: { title: comic.title, image: comic.thumbnail, chapter: comic.description || 'Chapter Terbaru', source: comic.type, link: comic.href, popularity: comic.genre || '-' },
                processedLink
            }
        })
    }

    return (
        <div className="w-full">
            {/* Hero */}
            <div className="text-center mb-6 py-6 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900">
                <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white mb-1">ShinVerse</h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-5">Temukan dan baca ribuan komik favorit Anda</p>

                {/* Search box */}
                <div className="max-w-2xl mx-auto px-4">
                    <div className="flex">
                        <div className="relative w-full">
                            <input
                                type="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="block p-2.5 w-full z-20 text-sm text-zinc-900 bg-zinc-50 rounded-l-lg border border-zinc-300 focus:ring-orange-500 focus:border-orange-500 dark:bg-zinc-800 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:border-orange-500 outline-none"
                                placeholder="Cari komik berdasarkan judul..."
                            />
                        </div>
                        <button
                            type="button"
                            className="p-2.5 text-sm font-medium text-white bg-orange-600 rounded-r-lg border border-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 flex items-center gap-1.5 px-4"
                        >
                            {loading
                                ? <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 animate-spin" />
                                : <FontAwesomeIcon icon={faSearch} className="w-4 h-4" />
                            }
                            <span className="hidden sm:inline">Cari</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
                    {error}
                </div>
            )}

            {/* Search Results */}
            {searchResults.length > 0 && (
                <div className="mt-4">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="font-bold text-zinc-800 dark:text-zinc-100">
                            Hasil Pencarian ({searchResults.length})
                        </h2>
                        <button
                            onClick={() => { setSearchResults([]); setSearchQuery('') }}
                            className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 text-xs flex items-center gap-1"
                        >
                            <FontAwesomeIcon icon={faTimes} /> Tutup
                        </button>
                    </div>
                    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                        {searchResults.map((comic) => (
                            <div key={comic.title} className="card-comic">
                                <div className="relative overflow-hidden rounded-t-lg">
                                    <img
                                        src={comic.thumbnail} alt={comic.title}
                                        loading="lazy"
                                        className="card-comic-img"
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450?text=Cover' }}
                                    />
                                    <span className="badge-chapter">{comic.type}</span>
                                </div>
                                <div className="p-2">
                                    <h3 className="text-center line-clamp-2 text-sm text-zinc-600 dark:text-zinc-200 font-bold mb-2">{comic.title}</h3>
                                    <button
                                        onClick={() => handleComicDetail(comic)}
                                        className="btn-primary"
                                    >
                                        Lihat Detail
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default SearchComic
