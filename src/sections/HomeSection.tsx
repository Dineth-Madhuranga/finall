"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const HomeSection = () => {
  // Image slider for frames section
  const frameImages = [
    "https://i.postimg.cc/j5X8rb2K/2.png",
    "https://i.postimg.cc/zBpVg1Sd/12.png",
    "https://i.postimg.cc/X7yVCDFc/26.png",
  ]

  // Image slider for collages section
  const collageImages = [
    "https://i.postimg.cc/cJvYH2mL/10x12-2.jpg",
    "https://i.postimg.cc/9Fzcv2F0/Grey-and-Blue-Y2k-Collage-Influencer-Blog-About-Me-Facts-Instagram-Post-12-x-18-in-10-x-12-in.jpg",
    "https://i.postimg.cc/jd9RT1LX/My-sweet-little-girl-You-have-made-us-proud-in-every-way-possible-Happy-Birthday-Honey-18-x-12.jpg",
    "https://i.postimg.cc/htPVFfQx/Pink-Grey-Creative-Feminine-Fashion-Quote-Instagram-Post-18-x-12-in-18-x-12-in-12-x-10-in-10.jpg",
  ]

  // Material images
  const materialImages = [
    "https://i.postimg.cc/pLKss98H/2.png",
    "https://i.postimg.cc/Prg6bbCy/3.png",
    "https://i.postimg.cc/g0dNQYq6/5.png",
  ]

  const [currentFrameIndex, setCurrentFrameIndex] = useState(0)
  const [currentCollageIndex, setCurrentCollageIndex] = useState(0)
  const [currentMaterialIndex, setCurrentMaterialIndex] = useState(0)
  const [direction, setDirection] = useState(1) // 1 for right, -1 for left
  const [frameAnimationPhase, setFrameAnimationPhase] = useState("display")
  const [materialAnimationPhase, setMaterialAnimationPhase] = useState("display")

  // Enhanced auto slider effect for frames with beautiful transformations
  useEffect(() => {
    const interval = setInterval(() => {
      // Display phase for 2 seconds
      setFrameAnimationPhase("display")

      setTimeout(() => {
        // Start beautiful transformation
        setFrameAnimationPhase("transforming")
      }, 2000)

      setTimeout(() => {
        // Change to next image
        setCurrentFrameIndex((prevIndex) => (prevIndex === frameImages.length - 1 ? 0 : prevIndex + 1))
        setFrameAnimationPhase("morphing")
      }, 3500)

      setTimeout(() => {
        // Beautiful entrance of new image
        setFrameAnimationPhase("entering")
      }, 4000)

      setTimeout(() => {
        // Return to display state
        setFrameAnimationPhase("display")
      }, 4800)
    }, 6000) // Total cycle time

    return () => clearInterval(interval)
  }, [frameImages.length])

  // Enhanced auto slider effect for materials with beautiful transformations
  useEffect(() => {
    const interval = setInterval(() => {
      // Display phase for 2 seconds
      setMaterialAnimationPhase("display")

      setTimeout(() => {
        // Start beautiful transformation
        setMaterialAnimationPhase("transforming")
      }, 2000)

      setTimeout(() => {
        // Change to next image
        setCurrentMaterialIndex((prevIndex) => (prevIndex === materialImages.length - 1 ? 0 : prevIndex + 1))
        setMaterialAnimationPhase("morphing")
      }, 3500)

      setTimeout(() => {
        // Beautiful entrance of new image
        setMaterialAnimationPhase("entering")
      }, 4000)

      setTimeout(() => {
        // Return to display state
        setMaterialAnimationPhase("display")
      }, 4800)
    }, 6500) // Total cycle time (slightly different from frames)

    return () => clearInterval(interval)
  }, [materialImages.length])

  // Auto slider effect for collages - slow horizontal slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCollageIndex((prevIndex) => {
        if (prevIndex === collageImages.length - 1) {
          return 0
        }
        return prevIndex + 1
      })
    }, 5000) // Slower transition (5 seconds per image)

    return () => clearInterval(interval)
  }, [collageImages.length])

  const nextCollageImage = () => {
    setDirection(1)
    setCurrentCollageIndex((prevIndex) => (prevIndex === collageImages.length - 1 ? 0 : prevIndex + 1))
  }

  const prevCollageImage = () => {
    setDirection(-1)
    setCurrentCollageIndex((prevIndex) => (prevIndex === 0 ? collageImages.length - 1 : prevIndex - 1))
  }

  // Variants for horizontal slide animation
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  // Beautiful transformation variants for frames
  const frameTransformVariants = {
    display: {
      scale: 1,
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px) brightness(1)",
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    transforming: {
      scale: [1, 1.1, 0.8, 1.2, 0.6],
      opacity: [1, 0.9, 0.7, 0.5, 0.2],
      x: [0, -20, 20, -15, 0],
      y: [0, -30, 15, -20, 10],
      filter: [
        "blur(0px) brightness(1)",
        "blur(2px) brightness(1.1)",
        "blur(4px) brightness(0.9)",
        "blur(6px) brightness(1.2)",
        "blur(8px) brightness(0.7)",
      ],
      transition: {
        duration: 1.5,
        times: [0, 0.25, 0.5, 0.75, 1],
        ease: "easeInOut",
      },
    },
    morphing: {
      scale: [0.6, 0.3, 0.1, 0.3, 0.8],
      opacity: [0.2, 0.1, 0, 0.3, 0.7],
      filter: [
        "blur(8px) brightness(0.7)",
        "blur(12px) brightness(0.5)",
        "blur(15px) brightness(0.3)",
        "blur(8px) brightness(0.8)",
        "blur(3px) brightness(1.1)",
      ],
      transition: {
        duration: 0.5,
        times: [0, 0.25, 0.5, 0.75, 1],
        ease: "easeInOut",
      },
    },
    entering: {
      scale: [0.8, 1.15, 0.95, 1.05, 1],
      opacity: [0.7, 0.9, 1, 1, 1],
      x: [0, -10, 5, -3, 0],
      y: [10, -15, 8, -5, 0],
      filter: [
        "blur(3px) brightness(1.1)",
        "blur(1px) brightness(1.05)",
        "blur(0.5px) brightness(1.02)",
        "blur(0.2px) brightness(1.01)",
        "blur(0px) brightness(1)",
      ],
      transition: {
        duration: 0.8,
        times: [0, 0.3, 0.6, 0.8, 1],
        ease: "easeOut",
      },
    },
  }

  // Beautiful transformation variants for materials (different pattern)
  const materialTransformVariants = {
    display: {
      scale: 1,
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px) brightness(1) saturate(1)",
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    transforming: {
      scale: [1, 0.9, 1.3, 0.7, 1.1],
      opacity: [1, 0.8, 0.6, 0.4, 0.2],
      x: [0, 25, -30, 20, -10],
      y: [0, -25, 20, -35, 15],
      filter: [
        "blur(0px) brightness(1) saturate(1)",
        "blur(3px) brightness(1.2) saturate(1.1)",
        "blur(5px) brightness(0.8) saturate(1.3)",
        "blur(7px) brightness(1.1) saturate(0.9)",
        "blur(10px) brightness(0.6) saturate(1.2)",
      ],
      transition: {
        duration: 1.5,
        times: [0, 0.25, 0.5, 0.75, 1],
        ease: "easeInOut",
      },
    },
    morphing: {
      scale: [1.1, 0.4, 0.2, 0.5, 0.9],
      opacity: [0.2, 0.1, 0, 0.4, 0.8],
      x: [-10, 0, 0, 0, 0],
      y: [15, 0, 0, 0, 0],
      filter: [
        "blur(10px) brightness(0.6) saturate(1.2)",
        "blur(15px) brightness(0.4) saturate(1.5)",
        "blur(20px) brightness(0.2) saturate(2)",
        "blur(10px) brightness(0.9) saturate(1.1)",
        "blur(4px) brightness(1.1) saturate(1)",
      ],
      transition: {
        duration: 0.5,
        times: [0, 0.25, 0.5, 0.75, 1],
        ease: "easeInOut",
      },
    },
    entering: {
      scale: [0.9, 1.2, 0.98, 1.08, 1],
      opacity: [0.8, 1, 1, 1, 1],
      x: [0, 15, -8, 4, 0],
      y: [0, -20, 12, -6, 0],
      filter: [
        "blur(4px) brightness(1.1) saturate(1)",
        "blur(2px) brightness(1.05) saturate(1.02)",
        "blur(1px) brightness(1.03) saturate(1.01)",
        "blur(0.5px) brightness(1.01) saturate(1)",
        "blur(0px) brightness(1) saturate(1)",
      ],
      transition: {
        duration: 0.8,
        times: [0, 0.25, 0.5, 0.75, 1],
        ease: "easeOut",
      },
    },
  }

  return (
    <div>
      {/* SECTION 1: Logo Cover with White Background - UPDATED */}
      <section className="min-h-[60vh] md:min-h-[70vh] relative overflow-hidden flex items-center justify-center bg-white">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md px-4 py-8">
          <img
            src="https://i.postimg.cc/h4bxZ9ZM/Black-White-Minimalist-Initials-Monogram-Jewelry-Logo-removebg-preview.png"
            alt="The Artistic Unity Logo"
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* SECTION 2: We Are - Side by Side Layout */}
      <section className="bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 md:grid-cols-2 gap-4 md:gap-6 items-center">
            <div className="pr-2 md:pr-0 col-span-3">
              <h1 className="text-lg md:text-3xl font-bold mb-2 md:mb-4">We are,</h1>
              <p className="text-gray-300 mb-4 md:mb-6 leading-relaxed text-xs md:text-base">
                A group of entrepreneurs "The Artistic Unity". We wish to touch the sky with the effort of providing a
                satisfactory service to our customers through hard work and innovation.
              </p>
            </div>
            <div className="overflow-hidden rounded-lg pl-2 md:pl-0 h-[200px] md:h-[300px] col-span-1">
              <img src="https://i.postimg.cc/Gh3WtMnq/5.png" alt="About Us" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Our Products - Beautiful Transform Animation */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 md:grid-cols-2 gap-4 md:gap-6 items-center">
            <div className="pr-2 md:pr-0 col-span-3">
              <h1 className="text-lg md:text-3xl font-bold mb-2 md:mb-4 italic">Our Products</h1>
              <p className="text-gray-700 mb-4 md:mb-6 leading-relaxed text-xs md:text-base">
                We at The Artistic Unity offer a wide range of framing solutions and collage designs. Our products are
                crafted with precision and care to bring your memories to life in the most elegant way.
              </p>
            </div>
            <div className="relative h-[200px] md:h-[450px] overflow-visible pl-2 md:pl-0 flex items-center justify-center col-span-1">
              <motion.div
                key={`frame-${currentFrameIndex}-${frameAnimationPhase}`}
                variants={frameTransformVariants}
                initial="display"
                animate={frameAnimationPhase}
                className="absolute flex items-center justify-center"
                style={{
                  width: "90%",
                  height: "90%",
                }}
              >
                <img
                  src={frameImages[currentFrameIndex] || "/placeholder.svg"}
                  alt={`Frame Product ${currentFrameIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>

              {/* Beautiful ambient glow effect */}
              {(frameAnimationPhase === "transforming" || frameAnimationPhase === "morphing") && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.4, 0.6, 0.3, 0],
                    scale: [1, 1.1, 1.2, 1.1, 1],
                  }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 via-blue-100/20 to-transparent rounded-full" />
                  <div className="absolute inset-4 bg-gradient-to-r from-blue-300/20 via-transparent to-transparent rounded-full" />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: We Appreciate Premium Materials - Beautiful Transform Animation */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 md:grid-cols-2 gap-4 md:gap-6 items-center">
            <div className="relative h-[200px] md:h-[450px] overflow-visible pr-2 md:pr-0 flex items-center justify-center col-span-1">
              <motion.div
                key={`material-${currentMaterialIndex}-${materialAnimationPhase}`}
                variants={materialTransformVariants}
                initial="display"
                animate={materialAnimationPhase}
                className="absolute flex items-center justify-center"
                style={{
                  width: "90%",
                  height: "90%",
                }}
              >
                <img
                  src={materialImages[currentMaterialIndex] || "/placeholder.svg"}
                  alt={`Premium Material ${currentMaterialIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>

              {/* Beautiful ambient glow effect */}
              {(materialAnimationPhase === "transforming" || materialAnimationPhase === "morphing") && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.5, 0.7, 0.4, 0],
                    scale: [1, 1.15, 1.25, 1.1, 1],
                  }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-200/40 via-amber-100/25 to-transparent rounded-full" />
                  <div className="absolute inset-4 bg-gradient-to-r from-amber-300/25 via-transparent to-transparent rounded-full" />
                </motion.div>
              )}
            </div>
            <div className="pl-2 md:pl-0 col-span-3">
              <h2 className="text-lg md:text-3xl font-bold mb-2 md:mb-4 italic">
                We Appreciate <span className="text-amber-800">premium materials.</span>
              </h2>
              <p className="text-gray-700 mb-4 md:mb-6 leading-relaxed text-xs md:text-base">
                We have imported the finest materials from around the world to ensure that our frames not only look
                beautiful but also stand the test of time. Our commitment to quality is evident in every piece we
                create.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Select from multiple collage designs - UPDATED */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center italic">
            Select from multiple <span className="text-indigo-600">collage designs</span>
          </h2>

          <div className="relative overflow-hidden">
            {/* Horizontal Slider Container */}
            <div className="relative w-full overflow-hidden" style={{ height: "450px" }}>
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentCollageIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "tween", duration: 1.2, ease: "easeInOut" },
                    opacity: { duration: 0.8 },
                  }}
                  className="absolute w-full flex justify-center"
                >
                  <div className="w-[90%] max-w-md rounded-lg overflow-hidden shadow-md border border-gray-200">
                    <img
                      src={collageImages[currentCollageIndex] || "/placeholder.svg"}
                      alt={`Collage design ${currentCollageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {collageImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentCollageIndex ? 1 : -1)
                      setCurrentCollageIndex(index)
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${currentCollageIndex === index ? "bg-indigo-600 w-4" : "bg-indigo-300"
                      }`}
                    aria-label={`Go to collage ${index + 1}`}
                  />
                ))}
              </div>

              {/* Left/Right Navigation Arrows */}
              <button
                onClick={prevCollageImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 z-10"
                aria-label="Previous collage"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextCollageImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 z-10"
                aria-label="Next collage"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 text-center">
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomeSection
