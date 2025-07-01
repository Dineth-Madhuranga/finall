"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Award, Clock, Palette } from "lucide-react"

const ProductShowcase = () => {
    const productSlides = [
        {
            id: 1,
            title: "Premium Frames",
            icon: <Award className="w-12 h-12 text-amber-600" />,
            mainStat: "100+",
            mainLabel: "unique frame designs",
            subStat: "5x",
            subLabel: "more durable than standard frames",
            highlight: "Premium Quality",
            highlightValue: "materials",
            description:
                "Crafted with precision using imported premium materials. Our frames are designed to preserve your memories for generations with unmatched durability and elegance.",
            image: "https://i.postimg.cc/j5X8rb2K/2.png",
            bgGradient: "from-amber-50 to-orange-50",
        },
        {
            id: 2,
            title: "Custom Collages",
            icon: <Palette className="w-12 h-12 text-indigo-600" />,
            mainStat: "50+",
            mainLabel: "collage templates",
            subStat: "3x",
            subLabel: "faster design process",
            highlight: "Up to",
            highlightValue: "24 photos",
            description:
                "Transform your memories into stunning collages. Our expert designers create personalized layouts that tell your unique story with artistic flair.",
            image: "https://i.postimg.cc/cJvYH2mL/10x12-2.jpg",
            bgGradient: "from-indigo-50 to-purple-50",
        },
        {
            id: 3,
            title: "Express Service",
            icon: <Clock className="w-12 h-12 text-green-600" />,
            mainStat: "24hrs",
            mainLabel: "express delivery",
            subStat: "2x",
            subLabel: "faster than competitors",
            highlight: "Same day",
            highlightValue: "pickup available",
            description:
                "Rush order? No problem. Our streamlined process ensures your framed memories are ready when you need them, without compromising on quality.",
            image: "https://i.postimg.cc/pLKss98H/2.png",
            bgGradient: "from-green-50 to-emerald-50",
        },
    ]

    const [currentSlide, setCurrentSlide] = useState(0)
    const [direction, setDirection] = useState(1)

    // Auto-advance slides
    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1)
            setCurrentSlide((prev) => (prev + 1) % productSlides.length)
        }, 5000)

        return () => clearInterval(timer)
    }, [productSlides.length])

    const nextSlide = () => {
        setDirection(1)
        setCurrentSlide((prev) => (prev + 1) % productSlides.length)
    }

    const prevSlide = () => {
        setDirection(-1)
        setCurrentSlide((prev) => (prev - 1 + productSlides.length) % productSlides.length)
    }

    const goToSlide = (index: number) => {
        setDirection(index > currentSlide ? 1 : -1)
        setCurrentSlide(index)
    }

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? "100%" : "-100%",
            opacity: 0,
        }),
    }

    const current = productSlides[currentSlide]

    return (
        <section className="py-16 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Premium Services</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Experience the difference with our professional framing and design services
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Main Slide Container */}
                    <div className="relative h-[600px] md:h-[500px] overflow-hidden rounded-2xl shadow-2xl">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={currentSlide}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 },
                                }}
                                className={`absolute inset-0 bg-gradient-to-br ${current.bgGradient}`}
                            >
                                <div className="h-full flex flex-col md:flex-row">
                                    {/* Content Side */}
                                    <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                                        {/* Header */}
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="p-3 bg-white rounded-xl shadow-lg">{current.icon}</div>
                                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{current.title}</h3>
                                        </div>

                                        {/* Main Stat */}
                                        <div className="mb-6">
                                            <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">{current.mainStat}</div>
                                            <div className="text-lg text-gray-600">{current.mainLabel}</div>
                                        </div>

                                        {/* Sub Stat */}
                                        <div className="mb-6">
                                            <div className="text-3xl md:text-4xl font-bold text-gray-700 mb-1">{current.subStat}</div>
                                            <div className="text-sm text-gray-500">{current.subLabel}</div>
                                        </div>

                                        {/* Highlight */}
                                        <div className="mb-8">
                                            <div className="text-lg text-gray-600 mb-1">{current.highlight}</div>
                                            <div className="text-2xl md:text-3xl font-bold text-green-600">{current.highlightValue}</div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-gray-600 leading-relaxed">{current.description}</p>
                                    </div>

                                    {/* Image Side */}
                                    <div className="flex-1 relative p-8 md:p-12 flex items-center justify-center">
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.3, duration: 0.5 }}
                                            className="relative w-full max-w-sm"
                                        >
                                            <div className="bg-white rounded-2xl shadow-xl p-4 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                                                <img
                                                    src={current.image || "/placeholder.svg"}
                                                    alt={current.title}
                                                    className="w-full h-64 object-contain rounded-lg"
                                                />
                                            </div>
                                            {/* Floating elements */}
                                            <motion.div
                                                animate={{ y: [0, -10, 0] }}
                                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                                className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-3 shadow-lg"
                                            >
                                                <Star className="w-6 h-6 text-white" />
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex justify-center items-center gap-4 mt-8">
                        <button
                            onClick={prevSlide}
                            className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 hover:bg-gray-50"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-600" />
                        </button>

                        {/* Slide Indicators */}
                        <div className="flex gap-2">
                            {productSlides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentSlide ? "bg-indigo-600 w-8" : "bg-gray-300 hover:bg-gray-400"
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextSlide}
                            className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 hover:bg-gray-50"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductShowcase
