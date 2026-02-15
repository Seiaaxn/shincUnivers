import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import SkeletonLoader from '../SkeletonLoader'

const CardTerbaruComic = () => {
    const [comics, setComics] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const fetchComics = async () => {
        try {
            const response = await axios.get('https://www.sankavollerei.com/comic/terbaru')
            const rawComics = response.data.comics || []
            const filteredComics = rawComics.filter(item =>
                !item.title.toLowerCase().includes('apk') &&
                !item.chapter.toLowerCase().includes('download')
            )
            const processedComics = filteredComics.map(comic => {
                const slug = comic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
                const link = comic.link.replace('/manga/', '/').replace('/plus/', '/')
                const imageUrl = comic.image && !comic.image.includes('lazy.jpg') ? comic.image : 'https://via.placeholder.com/300x450?text=Cover+Terbaru'
                return { ...comic, image: imageUrl, processedLink: link, slug, source: 'Terbaru', popularity: 'N/A' }
            })
            setComics(processedComics)
            setLoading(false)
        } catch (err) {
            setError(err)
            setLoading(false)
        }
    }

    useEffect(() => { fetchComics() }, [])

    const handleComicDetail = (comic) => {
        navigate(`/detail-comic/${comic.slug}`, {
            state: {
                comic: { title: comic.title, image: comic.image, chapter: comic.chapter, source: comic.source, popularity: comic.popularity },
                processedLink: comic.processedLink
            }
        })
    }

    const SectionHeader = () => (
        <div className="widget-title-bar">
            <h2 className="section-title flex items-center gap-2">
                <span className="w-1 h-5 bg-gradient-to-b from-sky-500 to-sky-700 rounded-full inline-block"></span>
                Terbaru Hari Ini
            </h2>
            <button className="more-btn">More →</button>
            <hr className="w-full border-zinc-300 dark:border-zinc-700" />
        </div>
    )

    if (loading) return (
        <div>
            <SectionHeader />
            <SkeletonLoader count={12} type="card" />
        </div>
    )

    if (error) return (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400 text-center">
            Gagal memuat data. Coba lagi nanti.
        </div>
    )

    return (
        <div>
            <div className="flex justify-between items-center gap-4 mb-2">
                <h2 className="section-title flex items-center gap-2">
                    <span className="w-1 h-5 bg-gradient-to-b from-sky-500 to-sky-700 rounded-full inline-block"></span>
                    Terbaru Hari Ini
                </h2>
                <button className="more-btn">More →</button>
            </div>
            <hr className="border-zinc-300 dark:border-zinc-700 mb-4" />

            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {comics.map((comic) => (
                    <div key={comic.title} className="card-comic">
                        <div className="relative overflow-hidden rounded-t-lg">
                            <img
                                src={comic.image} alt={comic.title}
                                loading="lazy"
                                className="card-comic-img"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450?text=Cover' }}
                            />
                            <span className="badge-chapter">{comic.chapter}</span>
                        </div>
                        <div className="p-2">
                            <h3 className="text-center line-clamp-2 text-sm text-zinc-600 dark:text-zinc-200 font-bold mb-2 min-h-[2.5rem]">{comic.title}</h3>
                            <button onClick={() => handleComicDetail(comic)} className="btn-primary">
                                Baca Komik
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CardTerbaruComic
