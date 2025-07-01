"use client"

import { useState, Suspense } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import FrameViewer from "../components/FrameViewer"

interface Frame {
  id: number
  name: string
  image: string
}

interface Category {
  id: number
  name: string
  description: string
  frames: Frame[]
}

const CategoriesSection = () => {
  const [selectedFrame, setSelectedFrame] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [expandedImage, setExpandedImage] = useState<string | null>(null)

  const categories: Category[] = [
    {
      id: 1,
      name: "General",
      description: "Clean lines and minimalist designs for contemporary spaces",
      frames: [
        {
          id: 103,
          name: "Mount Frame",
          image: "https://i.postimg.cc/HxdRbj5Q/10.png",
        },
        {
          id: 102,
          name: "Glass Frame",
          image: "https://i.postimg.cc/t4ZFzjHJ/7.png",
        },
      ],
    },
    {
      id: 2,
      name: "Borderless",
      description: "Timeless designs that never go out of style",
      frames: [
        {
          id: 202,
          name: "Plymount Frame",
          image: "https://i.postimg.cc/3JT1RzXv/14.png",
        },
        {
          id: 203,
          name: "Embossed Frame",
          image: "https://i.postimg.cc/4NQ5hwPF/20.png",
        },
        {
          id: 204,
          name: "Compound Frame",
          image: "https://i.postimg.cc/MGvbNwSh/22.png",
        },
      ],
    },
    {
      id: 3,
      name: "Modern",
      description: "Ornate designs with intricate details for a touch of elegance",
      frames: [
        {
          id: 301,
          name: "Rotating Frame",
          image: "https://i.postimg.cc/B6PpL07x/31.png",
        },
        {
          id: 302,
          name: "Floating Frame",
          image: "https://i.postimg.cc/RFpdq0TC/27.png",
        },
      ],
    },
  ]

  const openFrameViewer = (frameId: number) => {
    setSelectedFrame(frameId)
  }

  const closeFrameViewer = () => {
    setSelectedFrame(null)
  }

  // Find the selected frame data
  const getSelectedFrameData = () => {
    if (!selectedFrame) return null

    for (const category of categories) {
      const frame = category.frames.find((f) => f.id === selectedFrame)
      if (frame) return frame
    }

    return null
  }

  const selectedFrameData = getSelectedFrameData()

  // Image lightbox functions
  const openLightbox = (imageUrl: string) => {
    setExpandedImage(imageUrl)
  }

  const closeLightbox = () => {
    setExpandedImage(null)
  }

  // Get all frames for lightbox navigation
  const getAllFrames = () => {
    return categories.flatMap((category) => category.frames)
  }

  const allFrames = getAllFrames()

  // Lightbox navigation
  const navigateLightbox = (direction: "next" | "prev") => {
    if (!expandedImage) return

    const currentFrameIndex = allFrames.findIndex((frame) => frame.image === expandedImage)
    if (currentFrameIndex === -1) return

    let newIndex
    if (direction === "next") {
      newIndex = (currentFrameIndex + 1) % allFrames.length
    } else {
      newIndex = (currentFrameIndex - 1 + allFrames.length) % allFrames.length
    }

    setExpandedImage(allFrames[newIndex].image)
    setCurrentImageIndex(newIndex)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">Frame Categories</h1>
        <p className="text-gray-600 text-center mb-8 sm:mb-12 max-w-2xl mx-auto">
          Explore our diverse range of photo frame categories. Each category offers unique styles to suit different
          tastes and interior designs.
        </p>

        <div className="space-y-12 sm:space-y-16">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">{category.name} Frames</h2>
                <p className="text-gray-600 mb-6">{category.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {category.frames.map((frame) => (
                    <motion.div
                      key={frame.id}
                      whileHover={{ y: -5 }}
                      className="relative overflow-hidden rounded-lg shadow-md group"
                    >
                      <div className="aspect-w-1 aspect-h-1 bg-gray-100">
                        <motion.img
                          src={frame.image}
                          alt={frame.name}
                          className="w-full h-full object-contain cursor-pointer"
                          animate={{ scale: 1 }}
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                          onClick={() => openLightbox(frame.image)}
                        />
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex flex-col justify-end">
                        <div className="p-4 sm:p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="text-white font-semibold text-lg sm:text-xl mb-2">{frame.name}</h3>
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => openFrameViewer(frame.id)}
                              className="bg-white text-indigo-600 px-4 py-2 rounded text-sm font-medium hover:bg-indigo-50 transition-colors"
                            >
                              View in 3D
                            </button>
                            <Link
                              to={`/purchase/${frame.id}`}
                              className="bg-indigo-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-indigo-700 transition-colors"
                            >
                              Buy Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3D Frame Viewer Modal - Mobile Optimized */}
      {selectedFrame && selectedFrameData && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl overflow-hidden relative">
            <button
              onClick={closeFrameViewer}
              className="absolute right-4 top-4 bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{selectedFrameData.name}</h3>
              <p className="text-gray-600 mb-4">Interact with the 3D model by dragging to rotate and scrolling to zoom.</p>
            </div>

            <div className="h-[50vh] sm:h-[60vh] bg-gray-100">
              <Suspense fallback={<div className="h-full flex items-center justify-center">Loading 3D model...</div>}>
                <FrameViewer imageUrl={selectedFrameData.image} />
              </Suspense>
            </div>

            <div className="p-6 bg-gray-50 flex justify-end">
              <Link
                to={`/purchase/${selectedFrame}`}
                className="bg-indigo-600 text-white px-6 py-3 rounded font-medium hover:bg-indigo-700 transition-colors"
              >
                Proceed to Purchase
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Full-size Image Lightbox */}
      {expandedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors z-10 text-white"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={() => navigateLightbox("prev")}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors z-10 text-white"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => navigateLightbox("next")}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors z-10 text-white"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Full-size Image */}
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={expandedImage || "/placeholder.svg"}
              alt="Expanded view"
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
          </div>

          {/* Frame Name */}
          {allFrames[currentImageIndex] && (
            <div className="absolute bottom-8 left-0 right-0 text-center text-white">
              <h3 className="text-xl font-semibold">{allFrames[currentImageIndex].name}</h3>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CategoriesSection

