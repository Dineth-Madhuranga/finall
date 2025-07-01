"use client"

import { useState, useEffect, type ChangeEvent, type FormEvent } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Check, ImageIcon, Upload, X } from "lucide-react"
import { submitOrder } from "../utils/api"
import toast from "react-hot-toast"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

type Orientation = "portrait" | "landscape"
type CollageCategory = "Artistic collages" | "Minimalistic collages" | "Shape inspired collages"

interface UploadedImage {
  name: string
  size: number
  type: string
  data: string | ArrayBuffer | null
  preview: string
  originalSize: number
}

const PurchasePage = () => {
  const { frameId } = useParams()
  const navigate = useNavigate()
  // Update the selectedSize state to use the first collage size by default
  const [selectedSize, setSelectedSize] = useState("6x8")
  const [quantity, setQuantity] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    whatsapp: "",
    requests: "",
  })
  const [previewImage, setPreviewImage] = useState("")
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [frameNotFound, setFrameNotFound] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  // New state for user uploaded images
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [uploadError, setUploadError] = useState("")
  // Collage Gallery States
  const [collageSize, setCollageSize] = useState<string | null>(null)
  const [collageCategory, setCollageCategory] = useState<CollageCategory | null>(null)
  const [orientation, setOrientation] = useState<Orientation>("portrait") // Default to portrait
  const [selectedCollageImage, setSelectedCollageImage] = useState<string | null>(null) // New state for selected collage
  // Frame Customization States
  const [selectedFrameImage, setSelectedFrameImage] = useState(null)
  const [selectedFrameCategory, setSelectedFrameCategory] = useState<string | null>(null)
  const [selectedGeneralFrameType, setSelectedGeneralFrameType] = useState<string | null>(null)
  const [selectedMountFrameType, setSelectedMountFrameType] = useState<string | null>(null)
  // Add a state for special size selection
  const [specialSizeSelected, setSpecialSizeSelected] = useState(false)

  // Collage data with sizes available in both orientations
  const collageSizes = [
    { size: "6x8", price: 2500 },
    { size: "8x6", price: 2500 }, // Landscape version
    { size: "8x10", price: 3000 },
    { size: "10x8", price: 3000 }, // Landscape version
    { size: "8x12", price: 3400 },
    { size: "12x8", price: 3400 }, // Landscape version
    { size: "10x12", price: 3400 },
    { size: "12x10", price: 3400 }, // Landscape version
    { size: "10x15", price: 4000 },
    { size: "15x10", price: 4000 }, // Landscape version
    { size: "12x15", price: 4000 },
    { size: "15x12", price: 4000 }, // Landscape version
    { size: "12x18", price: 4300 },
    { size: "18x12", price: 4300 }, // Landscape version
    { size: "16x24", price: 8500 },
    { size: "24x16", price: 8500 }, // Landscape version
    { size: "20x30", price: 11500 },
    { size: "30x20", price: 11500 }, // Landscape version
  ]

  // Helper function to determine if a size is portrait or landscape
  const getSizeOrientation = (size: string): Orientation => {
    const [width, height] = size.split("x").map(Number)
    return width < height ? "portrait" : "landscape"
  }

  // Filter sizes by orientation
  const getFilteredSizes = () => {
    return collageSizes.filter((item) => getSizeOrientation(item.size) === orientation)
  }

  const collageCategories: CollageCategory[] = ["Artistic collages", "Minimalistic collages", "Shape inspired collages"]

  // Collage Images - organized by size and category
  type CollageImages = {
    [size: string]: {
      [category: string]: string[]
    }
  }

  const collageImages: CollageImages = {
    // Portrait sizes
    "6x8": {
      "Artistic collages": [
        "/images/Collage_Gallery/10 x 12/Artistic Collages/10 x 12.jpg",
        "/images/Collage_Gallery/10 x 12/Artistic Collages/10x12.jpg",
        "/images/Collage_Gallery/10 x 12/Artistic Collages/10x12n.jpg",
        "/images/Collage_Gallery/10 x 12/Artistic Collages/Happy Birthday Facebook Post (18 x 12 in) (12 x 10 in) (10 x 12 in) (2).jpg",
      ],
      "Minimalistic collages": [
        "/images/Collage_Gallery/10 x 12/MInimalistic Collages/10x12 (2).jpg",
        "/images/Collage_Gallery/10 x 12/MInimalistic Collages/Grey and Blue Y2k Collage Influencer Blog About Me Facts Instagram Post (12 x 18 in) (10 x 12 in).jpg",
        "/images/Collage_Gallery/10 x 12/MInimalistic Collages/My sweet little girl. You have made us proud in every way [possible. Happy Birthday Honey. (18 x 12 in) (12 x 10 in) (10 x 12 in).jpg",
        "/images/Collage_Gallery/10 x 12/MInimalistic Collages/Pink Grey Creative Feminine Fashion Quote Instagram Post (18 x 12 in) (18 x 12 in) (12 x 10 in) (10 x 12 in).jpg",
      ],
      "Shape inspired collages": [
        "/images/Collage_Gallery/10 x 12/Shape inspired Photos/Red Collage Wedding Instagram Reel (12 x 18 in) (12 x 18 in) (10 x 12 in).jpg",
        "/images/Collage_Gallery/10 x 12/Shape inspired Photos/Untitled (10 x 12 in).jpg",
        "/images/Collage_Gallery/10 x 12/Shape inspired Photos/Untitled (12 x 18 in) (10 x 12 in) (12 x 10 in) (12 x 18 in) (10 x 12 in).jpg",
        "/images/Collage_Gallery/10 x 12/Shape inspired Photos/Untitled (12 x 18 in) (10 x 12 in).jpg",
      ],
    },
    "8x6": {
      // Landscape version
      "Artistic collages": [
        "/images/Collage_Gallery/12 x 10/Artistic Collages/12 x10.jpg",
        "/images/Collage_Gallery/12 x 10/Artistic Collages/12x10.jpg",
        "/images/Collage_Gallery/12 x 10/Artistic Collages/12x10 n.jpg",
        "/images/Collage_Gallery/12 x 10/Artistic Collages/Happy Birthday Facebook Post (18 x 12 in) (12 x 10 in).jpg",
      ],
      "Minimalistic collages": [
        "/images/Collage_Gallery/12 x 10/Minimalistic collages/12x10.jpg",
        "/images/Collage_Gallery/12 x 10/Minimalistic collages/Grey and Blue Y2k Collage Influencer Blog About Me Facts Instagram Post (12 x 18 in) (10 x 12 in) (12 x 10 in).jpg",
        "/images/Collage_Gallery/12 x 10/Minimalistic collages/My sweet little girl. You have made us proud in every way [possible. Happy Birthday Honey. (18 x 12 in) (12 x 10 in).jpg",
        "/images/Collage_Gallery/12 x 10/Minimalistic collages/Pink Grey Creative Feminine Fashion Quote Instagram Post (18 x 12 in) (18 x 12 in) (12 x 10 in).jpg",
      ],
      "Shape inspired collages": [
        "/images/Collage_Gallery/12 x 10/Shape Inspired collages/Red Collage Wedding Instagram Reel (12 x 18 in) (12 x 18 in) (10 x 12 in) (10 x 12 in) (12 x 10 in).jpg",
        "/images/Collage_Gallery/12 x 10/Shape Inspired collages/Untitled (10 x 12 in) (12 x 10 in) (1).jpg",
        "/images/Collage_Gallery/12 x 10/Shape Inspired collages/Untitled (12 x 18 in) (10 x 12 in) (12 x 10 in) (12 x 18 in) (10 x 12 in) (12 x 10 in).jpg",
        "/images/Collage_Gallery/12 x 10/Shape Inspired collages/Untitled (12 x 18 in) (10 x 12 in) (12 x 10 in).jpg",
      ],
    },
    "8x10": {
      "Artistic collages": [
        "/images/Collage_Gallery/12 x 10/Artistic Collages/12 x10.jpg",
        "/images/Collage_Gallery/12 x 10/Artistic Collages/12x10.jpg",
        "/images/Collage_Gallery/12 x 10/Artistic Collages/12x10 n.jpg",
        "/images/Collage_Gallery/12 x 10/Artistic Collages/Happy Birthday Facebook Post (18 x 12 in) (12 x 10 in).jpg",
      ],
      "Minimalistic collages": [
        "/images/Collage_Gallery/12 x 10/Minimalistic collages/12x10.jpg",
        "/images/Collage_Gallery/12 x 10/Minimalistic collages/Grey and Blue Y2k Collage Influencer Blog About Me Facts Instagram Post (12 x 18 in) (10 x 12 in) (12 x 10 in).jpg",
        "/images/Collage_Gallery/12 x 10/Minimalistic collages/My sweet little girl. You have made us proud in every way [possible. Happy Birthday Honey. (18 x 12 in) (12 x 10 in).jpg",
        "/images/Collage_Gallery/12 x 10/Minimalistic collages/Pink Grey Creative Feminine Fashion Quote Instagram Post (18 x 12 in) (18 x 12 in) (12 x 10 in).jpg",
      ],
      "Shape inspired collages": [
        "/images/Collage_Gallery/12 x 10/Shape Inspired collages/Red Collage Wedding Instagram Reel (12 x 18 in) (12 x 18 in) (10 x 12 in) (10 x 12 in) (12 x 10 in).jpg",
        "/images/Collage_Gallery/12 x 10/Shape Inspired collages/Untitled (10 x 12 in) (12 x 10 in) (1).jpg",
        "/images/Collage_Gallery/12 x 10/Shape Inspired collages/Untitled (12 x 18 in) (10 x 12 in) (12 x 10 in) (12 x 18 in) (10 x 12 in) (12 x 10 in).jpg",
        "/images/Collage_Gallery/12 x 10/Shape Inspired collages/Untitled (12 x 18 in) (10 x 12 in) (12 x 10 in).jpg",
      ],
    },
    "10x8": {
      // Landscape version
      "Artistic collages": [
        "/images/Collage_Gallery/12x 18/Artistic Collages/12 x 18.jpg",
        "/images/Collage_Gallery/12x 18/Artistic Collages/12x18.png",
        "/images/Collage_Gallery/12x 18/Artistic Collages/12x18 n.jpg",
        "/images/Collage_Gallery/12x 18/Artistic Collages/Happy Birthday Facebook Post (18 x 12 in) (12 x 10 in) (10 x 12 in) (12 x 18 in).jpg",
      ],
      "Minimalistic collages": [
        "/images/Collage_Gallery/12x 18/minimalistic collages/12x18.jpg",
        "/images/Collage_Gallery/12x 18/minimalistic collages/Grey and Blue Y2k Collage Influencer Blog About Me Facts Instagram Post (12 x 18 in).jpg",
        "/images/Collage_Gallery/12x 18/minimalistic collages/My sweet little girl. You have made us proud in every way [possible. Happy Birthday Honey. (18 x 12 in) (12 x 10 in) (10 x 12 in) (12 x 18 in).jpg",
        "/images/Collage_Gallery/12x 18/minimalistic collages/Pink Grey Creative Feminine Fashion Quote Instagram Post (18 x 12 in) (18 x 12 in) (12 x 10 in) (10 x 12 in) (12 x 18 in).jpg",
      ],
      "Shape inspired collages": [
        "/images/Collage_Gallery/12x 18/Shape Inspired photos/Red Collage Wedding Instagram Reel (12 x 18 in) (12 x 18 in).jpg",
        "/images/Collage_Gallery/12x 18/Shape Inspired photos/Untitled (12 x 18 in) (10 x 12 in) (12 x 10 in) (12 x 18 in).jpg",
        "/images/Collage_Gallery/12x 18/Shape Inspired photos/Untitled (12 x 18 in).jpg",
        "/images/Collage_Gallery/12x 18/Shape Inspired photos/Untitled design (3).jpg",
      ],
    },
    "8x12": {
      "Artistic collages": [
        "/images/Collage_Gallery/12x 18/Artistic Collages/12 x 18.jpg",
        "/images/Collage_Gallery/12x 18/Artistic Collages/12x18.png",
        "/images/Collage_Gallery/12x 18/Artistic Collages/12x18 n.jpg",
        "/images/Collage_Gallery/12x 18/Artistic Collages/Happy Birthday Facebook Post (18 x 12 in) (12 x 10 in) (10 x 12 in) (12 x 18 in).jpg",
      ],
      "Minimalistic collages": [
        "/images/Collage_Gallery/12x 18/minimalistic collages/12x18.jpg",
        "/images/Collage_Gallery/12x 18/minimalistic collages/Grey and Blue Y2k Collage Influencer Blog About Me Facts Instagram Post (12 x 18 in).jpg",
        "/images/Collage_Gallery/12x 18/minimalistic collages/My sweet little girl. You have made us proud in every way [possible. Happy Birthday Honey. (18 x 12 in) (12 x 10 in) (10 x 12 in) (12 x 18 in).jpg",
        "/images/Collage_Gallery/12x 18/minimalistic collages/Pink Grey Creative Feminine Fashion Quote Instagram Post (18 x 12 in) (18 x 12 in) (12 x 10 in) (10 x 12 in) (12 x 18 in).jpg",
      ],
      "Shape inspired collages": [
        "/images/Collage_Gallery/12x 18/Shape Inspired photos/Red Collage Wedding Instagram Reel (12 x 18 in) (12 x 18 in).jpg",
        "/images/Collage_Gallery/12x 18/Shape Inspired photos/Untitled (12 x 18 in) (10 x 12 in) (12 x 10 in) (12 x 18 in).jpg",
        "/images/Collage_Gallery/12x 18/Shape Inspired photos/Untitled (12 x 18 in).jpg",
        "/images/Collage_Gallery/12x 18/Shape Inspired photos/Untitled design (3).jpg",
      ],
    },
    "12x8": {
      // Landscape version
      "Artistic collages": [
        "/images/Collage_Gallery/18 x 12/Artistic Collages/18 x 12.jpg",
        "/images/Collage_Gallery/18 x 12/Artistic Collages/18x12.jpg",
        "/images/Collage_Gallery/18 x 12/Artistic Collages/18x12n.jpg",
        "/images/Collage_Gallery/18 x 12/Artistic Collages/Happy Birthday Facebook Post (18 x 12 in) (1).jpg",
      ],
      "Minimalistic collages": [
        "/images/Collage_Gallery/18 x 12/minimalistic collages/18x12.jpg",
        "/images/Collage_Gallery/18 x 12/minimalistic collages/Grey and Blue Y2k Collage Influencer Blog About Me Facts Instagram Post (12 x 18 in) (10 x 12 in) (12 x 10 in) (18 x 12 in).jpg",
        "/images/Collage_Gallery/18 x 12/minimalistic collages/My sweet little girl. You have made us proud in every way [possible. Happy Birthday Honey. (18 x 12 in).jpg",
        "/images/Collage_Gallery/18 x 12/minimalistic collages/Pink Grey Creative Feminine Fashion Quote Instagram Post (18 x 12 in) (18 x 12 in).jpg",
      ],
      "Shape inspired collages": [
        "/images/Collage_Gallery/18 x 12/Shape Inspired Frames/1.jpg",
        "/images/Collage_Gallery/18 x 12/Shape Inspired Frames/2.jpg",
        "/images/Collage_Gallery/18 x 12/Shape Inspired Frames/3.jpg",
        "/images/Collage_Gallery/18 x 12/Shape Inspired Frames/4.jpg",
      ],
    },
    "12x18": {
      "Artistic collages": [
        "/images/Collage_Gallery/18 x 12/Artistic Collages/18 x 12.jpg",
        "/images/Collage_Gallery/18 x 12/Artistic Collages/18x12.jpg",
        "/images/Collage_Gallery/18 x 12/Artistic Collages/18x12n.jpg",
        "/images/Collage_Gallery/18 x 12/Artistic Collages/Happy Birthday Facebook Post (18 x 12 in) (1).jpg",
      ],
      "Minimalistic collages": [
        "/images/Collage_Gallery/18 x 12/minimalistic collages/18x12.jpg",
        "/images/Collage_Gallery/18 x 12/minimalistic collages/Grey and Blue Y2k Collage Influencer Blog About Me Facts Instagram Post (12 x 18 in) (10 x 12 in) (12 x 10 in) (18 x 12 in).jpg",
        "/images/Collage_Gallery/18 x 12/minimalistic collages/My sweet little girl. You have made us proud in every way [possible. Happy Birthday Honey. (18 x 12 in).jpg",
        "/images/Collage_Gallery/18 x 12/minimalistic collages/Pink Grey Creative Feminine Fashion Quote Instagram Post (18 x 12 in) (18 x 12 in).jpg",
      ],
      "Shape inspired collages": [
        "/images/Collage_Gallery/18 x 12/Shape Inspired Frames/1.jpg",
        "/images/Collage_Gallery/18 x 12/Shape Inspired Frames/2.jpg",
        "/images/Collage_Gallery/18 x 12/Shape Inspired Frames/3.jpg",
        "/images/Collage_Gallery/18 x 12/Shape Inspired Frames/4.jpg",
      ],
    },
    "18x12": {
      // Landscape version
      "Artistic collages": [
        "/images/Collage_Gallery/10 x 12/Artistic Collages/10 x 12.jpg",
        "/images/Collage_Gallery/10 x 12/Artistic Collages/10x12.jpg",
        "/images/Collage_Gallery/10 x 12/Artistic Collages/10x12n.jpg",
        "/images/Collage_Gallery/10 x 12/Artistic Collages/Happy Birthday Facebook Post (18 x 12 in) (12 x 10 in) (10 x 12 in) (2).jpg",
      ],
      "Minimalistic collages": [
        "/images/Collage_Gallery/10 x 12/MInimalistic Collages/10x12 (2).jpg",
        "/images/Collage_Gallery/10 x 12/MInimalistic Collages/Grey and Blue Y2k Collage Influencer Blog About Me Facts Instagram Post (12 x 18 in) (10 x 12 in).jpg",
        "/images/Collage_Gallery/10 x 12/MInimalistic Collages/My sweet little girl. You have made us proud in every way [possible. Happy Birthday Honey. (18 x 12 in) (12 x 10 in) (10 x 12 in).jpg",
        "/images/Collage_Gallery/10 x 12/MInimalistic Collages/Pink Grey Creative Feminine Fashion Quote Instagram Post (18 x 12 in) (18 x 12 in) (12 x 10 in) (10 x 12 in).jpg",
      ],
      "Shape inspired collages": [
        "/images/Collage_Gallery/10 x 12/Shape inspired Photos/Red Collage Wedding Instagram Reel (12 x 18 in) (12 x 18 in) (10 x 12 in).jpg",
        "/images/Collage_Gallery/10 x 12/Shape inspired Photos/Untitled (10 x 12 in).jpg",
        "/images/Collage_Gallery/10 x 12/Shape inspired Photos/Untitled (12 x 18 in) (10 x 12 in) (12 x 10 in) (12 x 18 in) (10 x 12 in).jpg",
        "/images/Collage_Gallery/10 x 12/Shape inspired Photos/Untitled (12 x 18 in) (10 x 12 in).jpg",
      ],
    },
    // Add more sizes as needed with their respective images
  }

  // Frame images for customization section - Updated with new organized images
  const frameCustomizationImages = {
    // Mount Frame images
    mount: {
      thin: {
        "12x18": {
          landscape: [
            "/images/frame_customization/Mount Frames/mount thin frames/12x18/landscape/1.png",
            "/images/frame_customization/Mount Frames/mount thin frames/12x18/landscape/2.png",
            "/images/frame_customization/Mount Frames/mount thin frames/12x18/landscape/3.png",
            "/images/frame_customization/Mount Frames/mount thin frames/12x18/landscape/4.png",
            "/images/frame_customization/Mount Frames/mount thin frames/12x18/landscape/5.png",
            "/images/frame_customization/Mount Frames/mount thin frames/12x18/landscape/6.PNG",
          ],
          portrait: [
            "/images/frame_customization/Mount Frames/mount thin frames/12x18/portrait/1.png",
            "/images/frame_customization/Mount Frames/mount thin frames/12x18/portrait/2.png",
            "/images/frame_customization/Mount Frames/mount thin frames/12x18/portrait/3.png",
            "/images/frame_customization/Mount Frames/mount thin frames/12x18/portrait/4.png",
            "/images/frame_customization/Mount Frames/mount thin frames/12x18/portrait/5.png",
            "/images/frame_customization/Mount Frames/mount thin frames/12x18/portrait/6.PNG",
          ],
        },
        "10x12": {
          landscape: [
            "/images/frame_customization/Mount Frames/mount thin frames/10x12/landscape/1.png",
            "/images/frame_customization/Mount Frames/mount thin frames/10x12/landscape/2.png",
            "/images/frame_customization/Mount Frames/mount thin frames/10x12/landscape/3.png",
            "/images/frame_customization/Mount Frames/mount thin frames/10x12/landscape/4.png",
            "/images/frame_customization/Mount Frames/mount thin frames/10x12/landscape/5.png",
            "/images/frame_customization/Mount Frames/mount thin frames/10x12/landscape/6.png",
          ],
          portrait: [
            "/images/frame_customization/Mount Frames/mount thin frames/10x12/portrait/1.png",
            "/images/frame_customization/Mount Frames/mount thin frames/10x12/portrait/2.png",
            "/images/frame_customization/Mount Frames/mount thin frames/10x12/portrait/3.png",
            "/images/frame_customization/Mount Frames/mount thin frames/10x12/portrait/4.png",
            "/images/frame_customization/Mount Frames/mount thin frames/10x12/portrait/5.png",
            "/images/frame_customization/Mount Frames/mount thin frames/10x12/portrait/6.png",
          ],
        },
      },
      mix: {
        "12x18": {
          landscape: [
            "/images/frame_customization/Mount Frames/mount Mix frames/12x18/landscape/1.png",
            "/images/frame_customization/Mount Frames/mount Mix frames/12x18/landscape/2.png",
            "/images/frame_customization/Mount Frames/mount Mix frames/12x18/landscape/3.png",
            "/images/frame_customization/Mount Frames/mount Mix frames/12x18/landscape/4.png",
          ],
          portrait: [
            "/images/frame_customization/Mount Frames/mount Mix frames/12x18/portrait/1.png",
            "/images/frame_customization/Mount Frames/mount Mix frames/12x18/portrait/2.png",
            "/images/frame_customization/Mount Frames/mount Mix frames/12x18/portrait/3.png",
            "/images/frame_customization/Mount Frames/mount Mix frames/12x18/portrait/4.png",
          ],
        },
        "10x12": {
          landscape: [
            "/images/frame_customization/Mount Frames/mount Mix frames/10x12/landscape/10.png",
            "/images/frame_customization/Mount Frames/mount Mix frames/10x12/landscape/7.png",
            "/images/frame_customization/Mount Frames/mount Mix frames/10x12/landscape/8.png",
            "/images/frame_customization/Mount Frames/mount Mix frames/10x12/landscape/9.png",
          ],
          portrait: [
            "/images/frame_customization/Mount Frames/mount Mix frames/10x12/portrait/10.png",
            "/images/frame_customization/Mount Frames/mount Mix frames/10x12/portrait/7.png",
            "/images/frame_customization/Mount Frames/mount Mix frames/10x12/portrait/8.png",
            "/images/frame_customization/Mount Frames/mount Mix frames/10x12/portrait/9.png",
          ],
        },
      },
      fat: {
        "12x18": {
          landscape: [
            "/images/frame_customization/Mount Frames/Mount Fat frames/12x18/Landscape/1.png",
            "/images/frame_customization/Mount Frames/Mount Fat frames/12x18/Landscape/2.png",
            "/images/frame_customization/Mount Frames/Mount Fat frames/12x18/Landscape/3.png",
            "/images/frame_customization/Mount Frames/Mount Fat frames/12x18/Landscape/4.png",
            "/images/frame_customization/Mount Frames/Mount Fat frames/12x18/Landscape/5.png",
            "/images/frame_customization/Mount Frames/Mount Fat frames/12x18/Landscape/6.png",
          ],
          portrait: [
            "/images/frame_customization/Mount Frames/Mount Fat frames/12x18/portrait/1.png",
            "/images/frame_customization/Mount Frames/Mount Fat frames/12x18/portrait/2.png",
            "/images/frame_customization/Mount Frames/Mount Fat frames/12x18/portrait/3.png",
            "/images/frame_customization/Mount Frames/Mount Fat frames/12x18/portrait/4.png",
            "/images/frame_customization/Mount Frames/Mount Fat frames/12x18/portrait/5.png",
            "/images/frame_customization/Mount Frames/Mount Fat frames/12x18/portrait/6.png",
          ],
        },
        "10x12": {
          landscape: [
            "/images/frame_customization/Mount Frames/Mount Fat frames/10x12/Landscape/1.png",
            "/images/frame_customization/Mount Frames/Mount Fat frames/10x12/Landscape/2.png",
            "/images/frame_customization/Mount Frames/Mount Fat frames/10x12/Landscape/3.png",
            "/images/frame_customization/Mount Frames/Mount Fat frames/10x12/Landscape/4.png",
            "/images/frame_customization/Mount Frames/Mount Fat frames/10x12/Landscape/5.png",
            "/images/frame_customization/Mount Frames/Mount Fat frames/10x12/Landscape/6.png",
          ],
          portrait: [
            "/images/frame_customization/Mount Frames/Mount Fat frames/10x12/portrait/1.png",
            "/images/frame_customization/Mount Frames/Mount Fat frames/10x12/portrait/2.png",
            "/images/frame_customization/Mount Frames/Mount Fat frames/10x12/portrait/3.png",
            "/images/frame_customization/Mount Frames/Mount Fat frames/10x12/portrait/4.png",
            "/images/frame_customization/Mount Frames/Mount Fat frames/10x12/portrait/5.png",
            "/images/frame_customization/Mount Frames/Mount Fat frames/10x12/portrait/6.png",
          ],
        },
      },
    },
    // Traditional Frame images
    General: {
      thin: {
        "12x18": {
          landscape: [
            "/images/frame_customization/General Frames/general thin 12x18 (1)/12x18/landscape/1.png",
            "/images/frame_customization/General Frames/general thin 12x18 (1)/12x18/landscape/2.png",
            "/images/frame_customization/General Frames/general thin 12x18 (1)/12x18/landscape/3.png",
            "/images/frame_customization/General Frames/general thin 12x18 (1)/12x18/landscape/4.png",
            "/images/frame_customization/General Frames/general thin 12x18 (1)/12x18/landscape/5.png",
            "/images/frame_customization/General Frames/general thin 12x18 (1)/12x18/landscape/6.png",
          ],
          portrait: [
            "/images/frame_customization/General Frames/general thin 12x18 (1)/12x18/portrait/1.png",
            "/images/frame_customization/General Frames/general thin 12x18 (1)/12x18/portrait/2.png",
            "/images/frame_customization/General Frames/general thin 12x18 (1)/12x18/portrait/3.png",
            "/images/frame_customization/General Frames/general thin 12x18 (1)/12x18/portrait/4.png",
            "/images/frame_customization/General Frames/general thin 12x18 (1)/12x18/portrait/5.png",
            "/images/frame_customization/General Frames/general thin 12x18 (1)/12x18/portrait/6.png",
          ],
        },
        "10x12": {
          landscape: [
            "/images/frame_customization/General Frames/general thin 12x18 (1)/10x12/landscape/1.png",
            "/images/frame_customization/General Frames/general thin 12x18 (1)/10x12/landscape/2.png",
            "/images/frame_customization/General Frames/general thin 12x18 (1)/10x12/landscape/3.png",
            "/images/frame_customization/General Frames/general thin 12x18 (1)/10x12/landscape/4.png",
            "/images/frame_customization/General Frames/general thin 12x18 (1)/10x12/landscape/5.png",
            "/images/frame_customization/General Frames/general thin 12x18 (1)/10x12/landscape/6.png",
          ],
          portrait: [
            "/images/frame_customization/General Frames/general thin 12x18 (1)/10x12/portrait/1.png",
            "/images/frame_customization/General Frames/general thin 12x18 (1)/10x12/portrait/2.png",
            "/images/frame_customization/General Frames/general thin 12x18 (1)/10x12/portrait/3.png",
            "/images/frame_customization/General Frames/general thin 12x18 (1)/10x12/portrait/4.png",
            "/images/frame_customization/General Frames/general thin 12x18 (1)/10x12/portrait/5.png",
            "/images/frame_customization/General Frames/general thin 12x18 (1)/10x12/portrait/6.png",
          ],
        },
      },
      mix: {
        "12x18": {
          landscape: [
            "/images/frame_customization/General Frames/general mix frame/12x18/Landscape/1.png",
            "/images/frame_customization/General Frames/general mix frame/12x18/Landscape/2.png",
            "/images/frame_customization/General Frames/general mix frame/12x18/Landscape/3.png",
            "/images/frame_customization/General Frames/general mix frame/12x18/Landscape/4.png",
          ],
          portrait: [
            "/images/frame_customization/General Frames/general mix frame/12x18/portrait/1.png",
            "/images/frame_customization/General Frames/general mix frame/12x18/portrait/2.png",
            "/images/frame_customization/General Frames/general mix frame/12x18/portrait/3.png",
            "/images/frame_customization/General Frames/general mix frame/12x18/portrait/4.png",
          ],
        },
        "10x12": {
          landscape: [
            "/images/frame_customization/General Frames/general mix frame/10x12/Landscape/1.png",
            "/images/frame_customization/General Frames/general mix frame/10x12/Landscape/2.png",
            "/images/frame_customization/General Frames/general mix frame/10x12/Landscape/3.png",
            "/images/frame_customization/General Frames/general mix frame/10x12/Landscape/4.png",
          ],
          portrait: [
            "/images/frame_customization/General Frames/general mix frame/10x12/Portrait/1.png",
            "/images/frame_customization/General Frames/general mix frame/10x12/Portrait/2.png",
            "/images/frame_customization/General Frames/general mix frame/10x12/Portrait/3.png",
            "/images/frame_customization/General Frames/general mix frame/10x12/Portrait/4.png",
          ],
        },
      },
      fat: {
        "12x18": {
          landscape: [
            "/images/frame_customization/General Frames/General fat frame/12x18/landscape/1.PNG",
            "/images/frame_customization/General Frames/General fat frame/12x18/landscape/2.PNG",
            "/images/frame_customization/General Frames/General fat frame/12x18/landscape/3.PNG",
            "/images/frame_customization/General Frames/General fat frame/12x18/landscape/4.png",
            "/images/frame_customization/General Frames/General fat frame/12x18/landscape/5.PNG",
            "/images/frame_customization/General Frames/General fat frame/12x18/landscape/6.PNG",
          ],
          portrait: [
            "/images/frame_customization/General Frames/General fat frame/12x18/portrait/1.PNG",
            "/images/frame_customization/General Frames/General fat frame/12x18/portrait/2.PNG",
            "/images/frame_customization/General Frames/General fat frame/12x18/portrait/3.PNG",
            "/images/frame_customization/General Frames/General fat frame/12x18/portrait/4.png",
            "/images/frame_customization/General Frames/General fat frame/12x18/portrait/5.PNG",
            "/images/frame_customization/General Frames/General fat frame/12x18/portrait/6.PNG",
          ],
        },
        "10x12": {
          landscape: [
            "/images/frame_customization/General Frames/General fat frame/10x12/Landscape/1.PNG",
            "/images/frame_customization/General Frames/General fat frame/10x12/Landscape/2.PNG",
            "/images/frame_customization/General Frames/General fat frame/10x12/Landscape/3.PNG",
            "/images/frame_customization/General Frames/General fat frame/10x12/Landscape/4.PNG",
            "/images/frame_customization/General Frames/General fat frame/10x12/Landscape/5.PNG",
            "/images/frame_customization/General Frames/General fat frame/10x12/Landscape/6.PNG",
          ],
          portrait: [
            "/images/frame_customization/General Frames/General fat frame/10x12/portrait/1.PNG",
            "/images/frame_customization/General Frames/General fat frame/10x12/portrait/2.PNG",
            "/images/frame_customization/General Frames/General fat frame/10x12/portrait/3.PNG",
            "/images/frame_customization/General Frames/General fat frame/10x12/portrait/4.PNG",
            "/images/frame_customization/General Frames/General fat frame/10x12/portrait/5.PNG",
            "/images/frame_customization/General Frames/General fat frame/10x12/portrait/6.PNG",
          ],
        },
      },
    },
    // Floating frame images
    floating: {
      landscape: [
        "/images/frame_customization/Floating frame/landscape/floating frame kimona new  copy.png",
        "/images/frame_customization/Floating frame/landscape/mix floating .png",
        "/images/frame_customization/Floating frame/landscape/vgv copy.PNG",
      ],
      portrait: [
        "/images/frame_customization/Floating frame/portrait/floating black .PNG",
        "/images/frame_customization/Floating frame/portrait/Untitled (12 x 18 in) ( 4 copy.PNG",
        "/images/frame_customization/Floating frame/portrait/white frame floating .png",
      ],
    },
    // Display frame images
    display: [
      "/images/frame_customization/display frame/1.png",
      "/images/frame_customization/display frame/2.png",
      "/images/frame_customization/display frame/4.png",
      "/images/frame_customization/display frame/5.png",
      "/images/frame_customization/display frame/meeka wage danna prices tika ayye.png",
    ],
    // Compound frame images
    compound: [
      "/images/frame_customization/compound frame/compound frame ssf.png",
      "/images/frame_customization/compound frame/Logo Artistic Unity  (12 x 18 in) (3).png",
    ],
    // Emboss frame images
    emboss: [
      "/images/frame_customization/Embossed frame/4.png",
      "/images/frame_customization/Embossed frame/5.png",
      "/images/frame_customization/Embossed frame/6.png",
      "/images/frame_customization/Embossed frame/7 copy.png",
      "/images/frame_customization/Embossed frame/Logo Artistic Unity  (12 x 18 in).png",
    ],
  }

  // Function to get images for a size, with fallbacks
  const getCollageImages = (size: string | null, category: string | null) => {
    if (!size || !category) {
      return []
    }
    // If images exist for this size and category, return them
    if (collageImages[size] && collageImages[size][category]) {
      return collageImages[size][category]
    }
    // Otherwise, check if we can use the equivalent orientation size
    const sizeOrientation = getSizeOrientation(size)
    // Find a fallback size with the same orientation that has images
    const fallbackSize = Object.keys(collageImages).find((s) => {
      return getSizeOrientation(s) === sizeOrientation && collageImages[s] && collageImages[s][category]
    })
    if (fallbackSize) {
      return collageImages[fallbackSize][category]
    }
    // Last resort: return some default placeholder images
    return [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ]
  }

  // Function to get frame images based on frame type and user selections
  const getFrameImages = (): { [key: string]: string[] } => {
    if (!selectedFrameData) return {}
    const frameCategory = selectedFrameData.category.toLowerCase()
    const frameName = selectedFrameData.name.toLowerCase()
    switch (frameCategory) {
      case "general":
        // For General frames (Mount and Glass), filter based on collage selection
        if (collageSize && orientation) {
          const frameType = frameName.includes("mount") ? "mount" : "General"
          const frameImages = frameCustomizationImages[frameType as "mount" | "General"]
          // Get the appropriate size key (convert collageSize to match our structure)
          const sizeKey =
            collageSize === "12x18" || collageSize === "18x12"
              ? "12x18"
              : collageSize === "10x12" || collageSize === "12x10"
                ? "10x12"
                : null
          if (sizeKey && frameImages) {
            return {
              [`${frameType.charAt(0).toUpperCase() + frameType.slice(1)} Thin`]:
                frameImages.thin[sizeKey as "12x18" | "10x12"]?.[orientation] || [],
              [`${frameType.charAt(0).toUpperCase() + frameType.slice(1)} Mix`]:
                frameImages.mix[sizeKey as "12x18" | "10x12"]?.[orientation] || [],
              [`${frameType.charAt(0).toUpperCase() + frameType.slice(1)} Fat`]:
                frameImages.fat[sizeKey as "12x18" | "10x12"]?.[orientation] || [],
            }
          }
        }
        return {}
      case "modern":
        // Check if it's floating frame
        if (frameName.includes("floating")) {
          // For Floating frames, only use orientation selection
          if (orientation) {
            return {
              "Floating Frames": frameCustomizationImages.floating[orientation] || [],
            }
          }
          return {}
        }
        // For Display frames, show all images without filtering
        if (frameName.includes("display")) {
          return { "Display Frames": frameCustomizationImages.display }
        }
        return {}
      case "borderless":
        // Check if it's compound frame
        if (frameName.includes("compound")) {
          // For Compound frames, show all images without filtering
          return { "Compound Frames": frameCustomizationImages.compound }
        }
        // For Emboss frames, filter using user selection
        if (frameName.includes("emboss")) {
          if (collageSize && orientation) {
            return { "Emboss Frames": frameCustomizationImages.emboss }
          }
          return {}
        }
        return {}
      default:
        return {}
    }
  }

  // All available frames with updated prices in LKR
  const frames = [
    {
      id: "103",
      name: "Mount Frame",
      category: "General",
      image: "https://i.postimg.cc/sXyn8XVw/1.png",
      images: [
        "https://i.postimg.cc/sXyn8XVw/1.png",
        "https://i.postimg.cc/j5X8rb2K/2.png",
        "https://i.postimg.cc/63wRw444/4.png",
        "https://i.postimg.cc/Gh3WtMnq/5.png",
      ],
      prices: {
        "6x8": 1300,
        "8x6": 1300,
        "8x10": 2000,
        "10x8": 2000,
        "8x12": 2500,
        "12x8": 2500,
        "10x12": 3000,
        "12x10": 3000,
        "10x15": 3400,
        "15x10": 3400,
        "12x15": 4000,
        "15x12": 4000,
        "12x18": 4300,
        "18x12": 4300,
        "16x24": 8500,
        "24x16": 8500,
        "20x30": 11500,
        "30x20": 11500,
      },
      description:
        "A sleek general-style frame designed for clean, modern spaces. Ideal for showcasing minimalist artwork or photography.",
    },
    {
      id: "102",
      name: "Traditional Frame",
      category: "General",
      image: "https://i.postimg.cc/t4ZFzjHJ/7.png",
      images: [
        "https://i.postimg.cc/t4ZFzjHJ/7.png",
        "https://i.postimg.cc/cJf9XYNv/8.png",
        "https://i.postimg.cc/zfTW9Fv1/9.png",
        "https://i.postimg.cc/kGYtxj1W/Untitled-12-x-18-in-12-x-16-in.png",
      ],
      prices: {
        "6x8": 1300,
        "8x6": 1300,
        "8x10": 2000,
        "10x8": 2000,
        "8x12": 2500,
        "12x8": 2500,
        "10x12": 3000,
        "12x10": 3000,
        "10x15": 3400,
        "15x10": 3400,
        "12x15": 4000,
        "15x12": 4000,
        "12x18": 4300,
        "18x12": 4300,
        "16x24": 8500,
        "24x16": 8500,
        "20x30": 11500,
        "30x20": 11500,
      },
      description:
        "The glass front adds a polished look while protecting your artwork or photo. Ideal for those seeking a traditional yet refined style.",
    },
    {
      id: "202",
      name: "Plymount Frame",
      category: "Borderless",
      image: "https://i.postimg.cc/jj0wVcSh/11.png",
      images: [
        "https://i.postimg.cc/jj0wVcSh/11.png",
        "https://i.postimg.cc/zBpVg1Sd/12.png",
        "https://i.postimg.cc/6Qr7BZ7x/13.png",
        "https://i.postimg.cc/dVTkSpw1/15.png",
      ],
      prices: {
        "6x8": 1000,
        "8x6": 1000,
        "8x10": 1900,
        "10x8": 1900,
        "8x12": 2250,
        "12x8": 2250,
        "10x12": 2500,
        "12x10": 2500,
        "10x15": 3100,
        "15x10": 3100,
        "12x15": 3500,
        "15x12": 3500,
        "12x18": 3800,
        "18x12": 3800,
        "16x24": 7900,
        "24x16": 7900,
        "20x30": 9000,
        "30x20": 9000,
      },
      description:
        "This plymount frame blends subtle edges and a borderless feel for a timeless look that enhances any print.",
    },
    {
      id: "203",
      name: "Embossed Frame",
      category: "Borderless",
      image: "https://i.postimg.cc/d3kwVMWZ/16.png",
      images: [
        "https://i.postimg.cc/d3kwVMWZ/16.png",
        "https://i.postimg.cc/vmhQPtgT/17.png",
        "https://i.postimg.cc/QdLxVtZ8/18.png",
        "https://i.postimg.cc/1zrzkZT9/19.png",
        "https://i.postimg.cc/jjb53jMg/20.png",
      ],
      prices: {
        "6x8": 1300,
        "8x6": 1300,
        "8x10": 2000,
        "10x8": 2000,
        "8x12": 2500,
        "12x8": 2500,
        "10x12": 3000,
        "12x10": 3000,
        "10x15": 3400,
        "15x10": 3400,
        "12x15": 4000,
        "15x12": 4000,
        "12x18": 4300,
        "18x12": 4300,
        "16x24": 8500,
        "24x16": 8500,
        "20x30": 11000,
        "30x20": 11000,
        Special: 2500, // Special size option
      },
      description:
        "A classy embossed frame featuring soft textures and a seamless profile. Great for family photos or art prints.",
      hasSpecialSize: true,
    },
    {
      id: "204",
      name: "Compound Frame",
      category: "Borderless",
      image: "https://i.postimg.cc/L4YJsGgV/22.png",
      images: [
        "https://i.postimg.cc/L4YJsGgV/22.png",
        "https://i.postimg.cc/L4cngvzF/23.png",
        "https://i.postimg.cc/c4f6RYmg/24.png",
      ],
      prices: {
        "10x15": 6000,
        "15x10": 6000,
        "12x18": 7500,
        "18x12": 7500,
        "16x24": 9000,
        "24x16": 9000,
        "20x30": 11000,
        "30x20": 11000,
      },
      description:
        "This compound frame features layered design elements for added depth while maintaining a clean, frameless aesthetic.",
    },
    {
      id: "301",
      name: "Rotating Frame",
      category: "Modern",
      image: "https://i.postimg.cc/8Cc10rhb/32.png",
      images: [
        "https://i.postimg.cc/8Cc10rhb/32.png",
        "https://i.postimg.cc/6pwfsC5n/30.png",
        "https://i.postimg.cc/BnkHCzwS/31.png",
      ],
      prices: {
        "6x8": 2500,
        "8x6": 2500,
      },
      description:
        "An innovative rotating frame that adds motion and uniqueness to any piece. Ideal for modern, dynamic interiors.",
    },
    {
      id: "302",
      name: "Floating Frame",
      category: "Modern",
      image: "https://i.postimg.cc/DwrnCJxS/25.png",
      images: [
        "https://i.postimg.cc/DwrnCJxS/25.png",
        "https://i.postimg.cc/X7yVCDFc/26.png",
        "https://i.postimg.cc/7Znb5W8t/27.png",
        "https://i.postimg.cc/g2WnkP56/28.png",
        "https://i.postimg.cc/FH5hggVt/29.png",
      ],
      prices: {
        "6x8": 2300,
        "8x6": 2300,
        "8x12": 2500,
        "12x8": 2500,
      },
      description:
        "Designed to give the illusion of art suspended in air, this floating frame offers a bold and elegant presentation.",
    },
    {
      id: "303",
      name: "Display Frame",
      category: "Modern",
      image: "https://i.postimg.cc/s2qndXzP/Whats-App-Image-2025-06-21-at-2-57-27-PM.jpg",
      images: [
        "https://i.postimg.cc/s2qndXzP/Whats-App-Image-2025-06-21-at-2-57-27-PM.jpg",
        "https://i.postimg.cc/g2MSssBT/Whats-App-Image-2025-06-21-at-2-57-27-PM-1.jpg",
        "https://i.postimg.cc/9frxn96F/Whats-App-Image-2025-06-21-at-2-57-27-PM-2.jpg",
        "https://i.postimg.cc/Z5Ys62jN/Whats-App-Image-2025-06-21-at-2-57-28-PM.jpg",
        "https://i.postimg.cc/jqN1TzLD/Whats-App-Image-2025-06-21-at-2-57-28-PM-1.jpg",
      ],
      prices: {
        "6x8": 2400,
        "8x6": 2400,
        "8x10": 2800,
        "10x8": 2800,
        "8x12": 3200,
        "12x8": 3200,
        "10x12": 3600,
        "12x10": 3600,
        "10x15": 4200,
        "15x10": 4200,
        "12x15": 4800,
        "15x12": 4800,
        "12x18": 5200,
        "18x12": 5200,
        "16x24": 8800,
        "24x16": 8800,
        "20x30": 12000,
        "30x20": 12000,
      },
      description:
        "A contemporary display frame featuring clean lines and modern aesthetics. Perfect for showcasing artwork, photographs, or important documents in professional and home environments.",
    },
  ]

  // Find the selected frame data
  const selectedFrameData = frames.find((frame) => frame.id === frameId)

  // Add a function to check if the frame has a special size option
  const hasSpecialSize = () => {
    return selectedFrameData?.hasSpecialSize || false
  }

  // Update the getAvailableSizes function to handle special sizes
  const getAvailableSizes = () => {
    if (!selectedFrameData) return []
    const sizes = Object.keys(selectedFrameData.prices)
      .filter((size) => size !== "Special") // Filter out the special size for normal listing
      .map((size) => {
        return {
          size,
          price: selectedFrameData.prices[size as keyof typeof selectedFrameData.prices],
        }
      })
      .filter((item) => item.price !== undefined)
    return sizes
  }

  // Handle form input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Add image compression function before the handleImageUpload function
  const compressImage = (file: File, maxWidth = 1200, quality = 0.8): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()
      if (!ctx) {
        return reject(new Error("Failed to get canvas context"))
      }
      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
        canvas.width = width
        canvas.height = height
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height)
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error("Canvas to Blob conversion failed"))
            }
          },
          "image/jpeg",
          quality,
        )
      }
      img.onerror = (err) => {
        reject(err)
      }
      img.src = URL.createObjectURL(file)
    })
  }

  // Update the handleImageUpload function to include compression
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    setUploadError("")
    // Validate files
    const maxSize = 5 * 1024 * 1024 // 5MB (before compression)
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
    const maxFiles = 10
    if (uploadedImages.length + files.length > maxFiles) {
      setUploadError(`You can upload maximum ${maxFiles} images`)
      return
    }
    const validFiles = files.filter((file) => {
      if (!allowedTypes.includes(file.type)) {
        setUploadError(`${file.name} is not a supported image format`)
        return false
      }
      if (file.size > maxSize) {
        setUploadError(`${file.name} is too large. Maximum size is 5MB`)
        return false
      }
      return true
    })
    if (validFiles.length === 0) return
    try {
      // Compress and convert files to base64
      const promises = validFiles.map(async (file) => {
        // Compress the image first
        const compressedFile = await compressImage(file)
        return new Promise<UploadedImage>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = (event) => {
            if (event.target?.result) {
              resolve({
                name: file.name,
                size: compressedFile.size, // Use compressed size
                type: "image/jpeg", // Always JPEG after compression
                data: event.target.result,
                preview: event.target.result as string,
                originalSize: file.size, // Keep track of original size
              })
            } else {
              reject(new Error("File reading failed"))
            }
          }
          reader.onerror = reject
          reader.readAsDataURL(compressedFile)
        })
      })
      const results = await Promise.all(promises)
      setUploadedImages((prev) => [...prev, ...results])
      const totalCompression = results.reduce((acc, result) => acc + result.originalSize, 0)
      const totalCompressed = results.reduce((acc, result) => acc + result.size, 0)
      const compressionRatio =
        totalCompression > 0 ? (((totalCompression - totalCompressed) / totalCompression) * 100).toFixed(1) : "0"
      toast.success(`${results.length} image(s) uploaded and compressed (${compressionRatio}% size reduction)`)
    } catch (error) {
      console.error("Error uploading images:", error)
      setUploadError("Error uploading images. Please try again.")
    }
  }

  // Remove uploaded image
  const removeUploadedImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  // Handle form submission with comprehensive order details
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedFrameData) {
      toast.error("Frame data not found. Please go back and select a frame.")
      return
    }
    try {
      const orderData = {
        // Customer Information
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        customerAddress: formData.address,
        customerWhatsapp: formData.whatsapp,
        customerRequests: formData.requests,
        // Frame Information
        frame: {
          id: selectedFrameData.id,
          name: selectedFrameData.name,
          category: selectedFrameData.category,
          description: selectedFrameData.description,
        },
        // Size and Pricing
        size: selectedSize,
        isSpecialSize: selectedSize === "Special",
        unitPrice:
          selectedSize === "Special"
            ? selectedFrameData?.prices["Special"]
            : selectedFrameData?.prices[selectedSize as keyof typeof selectedFrameData.prices] || 0,
        quantity,
        totalPrice: calculateTotal(),
        // Collage Selection Details
        collageDetails: {
          size: collageSize,
          orientation: orientation,
          category: collageCategory || "Not selected",
          selectedImage: selectedCollageImage || "Not selected",
        },
        // Frame Customization Details
        frameCustomization: {
          selectedFrameImage: selectedFrameImage || "Not selected",
          frameType: selectedFrameData?.name || "Not specified",
        },
        // User uploaded images
        userImages: uploadedImages,
        // Order Summary
        orderSummary: {
          frameType: selectedFrameData?.name,
          frameCategory: selectedFrameData?.category,
          collageSize: collageSize,
          collageOrientation: orientation,
          collageCategory: collageCategory,
          hasCollageSelected: !!selectedCollageImage,
          hasFrameDesignSelected: !!selectedFrameImage,
          hasUserImages: uploadedImages.length > 0,
          userImagesCount: uploadedImages.length,
          orderDate: new Date().toISOString(),
        },
        // Additional metadata for email
        metadata: {
          orderTimestamp: new Date().toLocaleString(),
          browserInfo: navigator.userAgent,
          orderSource: "Website Purchase Form",
        },
      }
      await submitOrder(orderData)
      setFormSubmitted(true)
      toast.success("Order submitted successfully! Check your email for confirmation.")
    } catch (error) {
      console.error("Error submitting order:", error)
      toast.error("Failed to submit order. Please try again.")
    }
  }

  // Calculate total price
  const calculateTotal = () => {
    if (!selectedFrameData) return "0"
    // Get the price for the selected size
    let price = 0
    if (selectedSize === "Special") {
      price = selectedFrameData.prices["Special"] || 0
    } else {
      price = selectedFrameData.prices[selectedSize as keyof typeof selectedFrameData.prices] || 0
    }
    return (price * quantity).toFixed(0)
  }

  // If frame not found, redirect to home
  useEffect(() => {
    if (!selectedFrameData) {
      setFrameNotFound(true)
      navigate("/")
    } else {
      setFrameNotFound(false)
      // Set default size to the first available size for this frame
      const availableSizes = Object.keys(selectedFrameData.prices)
      if (availableSizes.length > 0) {
        setSelectedSize(availableSizes[0])
      }
    }
  }, [])

  useEffect(() => {
    let isMounted = true
    if (selectedFrameData && selectedFrameData.images.length > 0 && isMounted) {
      setPreviewImage(selectedFrameData.images[0])
    }
    return () => {
      isMounted = false
    }
  }, [])

  // Update collageSize when orientation changes
  useEffect(() => {
    // Find the first size that matches the selected orientation
    const filteredSizes = getFilteredSizes()
    if (filteredSizes.length > 0) {
      setCollageSize(filteredSizes[0].size)
      setSelectedSize(filteredSizes[0].size)
    }
  }, [orientation])

  // Add this useEffect after the other useEffect hooks
  useEffect(() => {
    if (collageCategory) {
      // When a category is selected,
      setFormData((prev) => ({
        ...prev,
        collageCategory: collageCategory,
      }))
    }
  }, [collageCategory])

  if (frameNotFound) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        {/* Frame Preview Section - Full width at top */}
        {!formSubmitted && (
          <div className="mb-16 flex flex-col items-center">
            {/* Top left back arrow and label */}
            <div className="w-full flex items-center mb-8">
              <button onClick={() => navigate(-1)} className="flex items-center group focus:outline-none">
                <span className="inline-block mr-2">
                  <svg width="60" height="32" viewBox="0 0 60 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="12" width="48" height="8" rx="4" fill="#F87171" />
                    <polygon points="0,16 16,4 16,28" fill="#F87171" />
                  </svg>
                </span>
                <span className="text-3xl font-serif font-medium text-black group-hover:text-red-500 transition-colors duration-200 select-none">
                  Select another frame
                </span>
              </button>
            </div>

            {/* Main frame preview with shadow */}
            <div className="relative flex flex-col items-center">
              <div className="relative z-10">
                <div className="w-[340px] h-[420px] sm:w-[400px] sm:h-[500px] bg-white rounded-xl shadow-2xl flex items-center justify-center overflow-hidden border-8 border-[#c2b09b]">
                  <img src={previewImage || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
                </div>
                {/* Optional: hands holding frame can be added here if images are available */}
              </div>
              {/* Shadow under frame */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[-30px] w-[220px] h-8 bg-black opacity-10 rounded-full blur-md z-0" />
            </div>

            {/* Thumbnail images - horizontal scroll */}
            <div className="mt-12 mb-8 w-full flex justify-center">
              <div className="flex overflow-x-auto gap-6 px-2 py-2 bg-white rounded-xl border border-gray-200 shadow-inner max-w-2xl">
                {selectedFrameData?.images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setPreviewImage(img)}
                    className={`relative cursor-pointer flex-shrink-0 transition-all duration-200 ${previewImage === img ? "ring-4 ring-red-400 scale-105" : "hover:scale-105"}`}
                    style={{ borderRadius: "12px" }}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`${selectedFrameData?.name} ${index + 1}`}
                      className="w-16 h-20 sm:w-20 sm:h-28 object-cover rounded-xl border border-gray-300"
                    />
                    {previewImage === img && (
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Frame name/title at the bottom */}
            <div className="mt-8 text-center">
              <h2 className="text-5xl font-serif font-medium text-black tracking-wide">
                {selectedFrameData?.name || "General Frame"}
              </h2>
            </div>
          </div>
        )}

        {/* Beautiful Collage Gallery Section - Reordered steps */}
        <div className="mb-16 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6 text-white">
            <h2 className="text-3xl font-bold mb-2 text-center">Collage Gallery</h2>
            <p className="text-center text-white opacity-90 max-w-2xl mx-auto">
              Create stunning memories with our premium collage frames. Select your preferred size, style, and design to
              find the perfect collage for your space.
            </p>
          </div>
          <div className="p-8">
            {/* Step 1: Size & Price Selection (moved to first) */}
            <div className="mb-10">
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-center mb-10 tracking-wide uppercase">
                Please select your desired size and the price.
              </h3>
              <div className="grid grid-cols-3 gap-y-8 gap-x-4 justify-center">
                {(() => {
                  // Find the max width and height in the list for scaling
                  const maxW = Math.max(...collageSizes.map(s => Number(s.size.split("x")[0])))
                  const maxH = Math.max(...collageSizes.map(s => Number(s.size.split("x")[1])))
                  const maxBoxHeight = 140
                  const upscaleFactor = 1.3
                  const firstThreeRowsFactor = 1.4
                  const lastRowSizes = ["24x16", "20x30", "30x20"]
                  return collageSizes.map((item, idx) => {
                    // Parse width and height from size string
                    const [w, h] = item.size.split("x").map(Number)
                    // Calculate scale for orientation
                    let boxHeight = h ? Math.round(h * (maxBoxHeight / maxH)) : maxBoxHeight
                    let boxWidth = w ? Math.round(w * (maxBoxHeight / maxH)) : maxBoxHeight
                    // Upscale only 1st, 2nd, 3rd row (indexes 0-8)
                    if (idx < 9 && !lastRowSizes.includes(item.size)) {
                      boxWidth = Math.round(boxWidth * firstThreeRowsFactor)
                      boxHeight = Math.round(boxHeight * firstThreeRowsFactor)
                    } else if (!lastRowSizes.includes(item.size)) {
                      boxWidth = Math.round(boxWidth * upscaleFactor)
                      boxHeight = Math.round(boxHeight * upscaleFactor)
                    }
                    // Font scaling based on box height (or min of width/height)
                    const fontScale = Math.max(0.7, Math.min(1.2, (Math.min(boxWidth, boxHeight) / maxBoxHeight)))
                    // Find old price if available (simulate with a 20% markup for demo)
                    const oldPrice = Math.round(item.price * 1.25)
                    return (
                      <div
                        key={item.size}
                        className={`border-4 border-black flex flex-col justify-center items-center cursor-pointer transition-all select-none bg-white ${selectedSize === item.size && !specialSizeSelected ? "ring-4 ring-green-400 scale-105" : "hover:scale-105"}`}
                        style={{ width: boxWidth, height: boxHeight, minWidth: 48, minHeight: 48, padding: '0.5rem' }}
                        onClick={() => {
                          setCollageSize(item.size)
                          setSelectedSize(item.size)
                          setSpecialSizeSelected(false)
                          setOrientation(getSizeOrientation(item.size))
                        }}
                      >
                        <span style={{ fontSize: `${fontScale * 1.1}rem`, lineHeight: 1.1 }} className="font-extrabold text-black mb-1 font-serif uppercase tracking-wide text-center leading-tight">{item.size}</span>
                        <span style={{ fontSize: `${fontScale * 0.95}rem`, color: '#7B3F00', lineHeight: 1.1 }} className="font-extrabold mb-0.5 text-center leading-tight">
                          Rs.{item.price.toLocaleString()}
                        </span>
                        <span style={{ fontSize: `${fontScale * 0.7}rem`, color: '#7B3F00', lineHeight: 1.1 }} className="line-through text-center leading-tight">
                          Rs.{oldPrice.toLocaleString()}
                        </span>
                      </div>
                    )
                  })
                })()}
              </div>
            </div>

            {/* Step 2: Orientation Selection (moved to second) */}
            {collageSize && (
              <div className="mb-10">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="bg-indigo-600 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">
                    2
                  </span>
                  Select Orientation
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
                  <div
                    className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${orientation === "portrait"
                      ? "border-indigo-600 bg-indigo-50 scale-105"
                      : "border-gray-200 hover:border-indigo-300"
                      }`}
                    onClick={() => setOrientation("portrait")}
                  >
                    <div className="flex justify-center mb-2">
                      <div className="w-16 h-24 border-2 border-gray-300 flex items-center justify-center">
                        <ImageIcon className="w-10 h-10 text-gray-400" />
                      </div>
                    </div>
                    <div className="font-medium">Portrait</div>
                  </div>
                  <div
                    className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${orientation === "landscape"
                      ? "border-indigo-600 bg-indigo-50 scale-105"
                      : "border-gray-200 hover:border-indigo-300"
                      }`}
                    onClick={() => setOrientation("landscape")}
                  >
                    <div className="flex justify-center mb-2">
                      <div className="w-24 h-16 border-2 border-gray-300 flex items-center justify-center">
                        <ImageIcon className="w-10 h-10 text-gray-400" />
                      </div>
                    </div>
                    <div className="font-medium">Landscape</div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Collage Category (moved to third) */}
            {collageSize && orientation && (
              <div className="mb-10">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="bg-indigo-600 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">
                    3
                  </span>
                  Choose Collage Category
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {collageCategories.map((category) => (
                    <div
                      key={category}
                      className={`border rounded-lg p-6 text-center cursor-pointer transition-all ${collageCategory === category
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-200 hover:border-indigo-300"
                        }`}
                      onClick={() => setCollageCategory(category)}
                    >
                      <div className="font-medium">{category}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Gallery Images (collage selection) - Updated to show full size and select on click */}
            {collageSize && orientation && (
              <div className="mb-16">
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-center mb-10 tracking-wide">
                  Please select the collages of your choice
                </h3>
                {collageCategories.map((category) => (
                  <div key={category} className="mb-16">
                    <h4 className="text-2xl md:text-3xl font-serif font-bold text-center mb-8 uppercase">{category}</h4>
                    <div className="w-full max-w-md mx-auto">
                      <Swiper
                        modules={[Pagination, EffectFade]}
                        pagination={{ clickable: true }}
                        effect="fade"
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        spaceBetween={-40}
                        className="rounded-2xl shadow-lg"
                        style={{ minHeight: 320 }}
                        breakpoints={{
                          640: { slidesPerView: 2, centeredSlides: false, spaceBetween: 20 },
                          768: { slidesPerView: 3, centeredSlides: false, spaceBetween: 20 },
                        }}
                      >
                        {getCollageImages(collageSize, category).map((image, index) => (
                          <SwiperSlide key={index} style={{ width: '70%', maxWidth: 320, minWidth: 180 }}>
                            <div
                              className={`relative flex flex-col items-center justify-center cursor-pointer transition-all duration-500`}
                              onClick={() => { setSelectedCollageImage(image); setCollageCategory(category); }}
                              style={{ width: '100%', height: 320, background: '#fff', border: '1.5px solid #eee', borderRadius: 18 }}
                            >
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`${category} ${index + 1}`}
                                className="w-full h-full object-cover rounded-[18px]"
                                style={{ maxHeight: 320, minHeight: 320 }}
                              />
                              {selectedCollageImage === image && (
                                <span className="absolute -top-4 -left-4 w-12 h-12 rounded-full border-4 border-black bg-white flex items-center justify-center z-10">
                                  <img src={image || "/placeholder.svg"} alt="selected thumb" className="w-8 h-8 object-cover rounded-full" />
                                </span>
                              )}
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Updated Frame Customization Section - Matching the UI Design */}
        {collageSize && orientation && (
          <div className="mb-16 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              {/* Main heading matching the design */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Let's decide which <span className="text-blue-600">Frame Design</span> you like the most.......
                </h2>
              </div>

              {(() => {
                const frameImages = getFrameImages()
                const frameImageKeys = Object.keys(frameImages)

                if (frameImageKeys.length === 0) {
                  return (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Please complete your collage selection to view frame options.</p>
                    </div>
                  )
                }

                // Get the currently selected frame type or default to first
                const currentFrameType = selectedFrameCategory || frameImageKeys[0]
                const currentImages = frameImages[currentFrameType] || []

                return (
                  <div>
                    {/* Large preview area with real frame image */}
                    <div className="flex flex-col items-center mb-8">
                      <div className="relative">
                        {/* Main preview frame with real image */}
                        <div className="w-80 h-96 bg-white rounded-lg shadow-2xl flex items-center justify-center relative overflow-hidden border-4 border-gray-200">
                          {selectedFrameImage ? (
                            <img
                              src={selectedFrameImage || "/placeholder.svg"}
                              alt="Selected Frame Preview"
                              className="w-full h-full object-contain"
                            />
                          ) : currentImages.length > 0 ? (
                            <img
                              src={currentImages[0] || "/placeholder.svg"}
                              alt="Frame Preview"
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                              <span className="text-gray-400">No frame selected</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Frame type selector cards */}
                      <div className="mt-8 flex flex-wrap justify-center gap-2 md:gap-4 overflow-x-auto pb-2">
                        {frameImageKeys.map((frameType, index) => {
                          const isSelected =
                            selectedFrameCategory === frameType || (!selectedFrameCategory && index === 0)

                          return (
                            <div
                              key={frameType}
                              className={`cursor-pointer transition-all duration-300 flex-shrink-0 ${isSelected ? "transform scale-105" : "hover:scale-102"
                                }`}
                              onClick={() => {
                                setSelectedFrameCategory(frameType)
                                // Auto-select first image of the new type
                                if (frameImages[frameType] && frameImages[frameType].length > 0) {
                                  setSelectedFrameImage(frameImages[frameType][0])
                                }
                              }}
                            >
                              {/* Card with landscape thumbnails - Compact for mobile */}
                              <div
                                className={`flex items-center bg-blue-100 rounded-full p-1.5 md:p-2 border-2 min-w-0 ${isSelected ? "border-blue-500 bg-blue-200" : "border-gray-300"
                                  }`}
                              >
                                {/* Small landscape thumbnails */}
                                <div className="flex space-x-0.5 md:space-x-1 mr-2 md:mr-3">
                                  {[1, 2, 3].map((thumb) => (
                                    <div
                                      key={thumb}
                                      className="w-4 h-3 md:w-6 md:h-4 bg-gradient-to-b from-blue-200 to-green-300 rounded-sm border border-gray-300 relative overflow-hidden"
                                    >
                                      {/* Mini landscape */}
                                      <div className="absolute inset-0">
                                        <div className="w-full h-1/2 bg-gradient-to-b from-blue-200 to-blue-100"></div>
                                        <div className="w-full h-1/2 bg-gradient-to-t from-green-400 to-green-200">
                                          <div className="absolute bottom-0 left-0 w-full h-1">
                                            <svg viewBox="0 0 24 4" className="w-full h-full">
                                              <path d="M0,4 Q6,1 12,2 T24,1.5 L24,4 Z" fill="#22c55e" />
                                            </svg>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {/* Frame type label */}
                                <div className="px-2 md:px-4 py-1 md:py-2">
                                  <span
                                    className={`text-sm md:text-lg font-bold whitespace-nowrap ${isSelected ? "text-blue-800" : "text-gray-800"}`}
                                  >
                                    {frameType}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Frame options grid with real images */}
                    <div className="flex justify-center">
                      <div className="flex md:grid md:grid-cols-2 md:sm:grid-cols-3 md:md:grid-cols-5 gap-4 max-w-4xl overflow-x-auto md:overflow-x-visible pb-4 md:pb-0">
                        {currentImages.slice(0, 5).map((image: string, index: number) => (
                          <div
                            key={index}
                            className={`relative cursor-pointer transition-all duration-300 flex-shrink-0 ${selectedFrameImage === image
                              ? "transform scale-110 ring-4 ring-blue-400"
                              : "hover:transform hover:scale-105"
                              }`}
                            onClick={() => setSelectedFrameImage(image)}
                          >
                            {/* Real frame image preview */}
                            <div className="w-20 h-24 rounded-lg overflow-hidden border-4 border-gray-300 bg-white shadow-md">
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`Frame ${index + 1}`}
                                className="w-full h-full object-contain"
                              />

                              {selectedFrameImage === image && (
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        )}

        {/* Order Summary - Moved to bottom of page */}
        {!formSubmitted && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="flex items-center mb-4">
                <img
                  src={selectedFrameData?.image || "/placeholder.svg"}
                  alt={selectedFrameData?.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <h3 className="font-medium">{selectedFrameData?.name}</h3>
                  <p className="text-sm text-gray-500">{selectedFrameData?.category}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Size:</span>
                    <span className="font-medium">
                      {selectedSize === "Special" ? "Special Custom Size" : `${selectedSize} inches`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Orientation:</span>
                    <span className="font-medium capitalize">{orientation}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{collageCategory || "Not selected"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Collage Design:</span>
                    <span className="font-medium">{selectedCollageImage ? "Selected" : "Not selected"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Frame Design:</span>
                    <span className="font-medium">{selectedFrameImage ? "Selected" : "Not selected"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Your Images:</span>
                    <span className="font-medium">
                      {uploadedImages.length > 0 ? `${uploadedImages.length} uploaded` : "None"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium">
                      LKR{" "}
                      {selectedFrameData?.prices[
                        selectedSize as keyof typeof selectedFrameData.prices
                      ]?.toLocaleString() || "0"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-medium">{quantity}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-semibold">Total:</span>
                    <span className="font-semibold text-indigo-600">LKR {calculateTotal()}</span>
                  </div>
                </div>
                <div>
                  {/* Quantity Selection */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold mb-4">Choose Quantity</h3>
                    <div>
                      <label className="block text-gray-700 mb-2">Quantity</label>
                      <div className="flex items-center">
                        <button
                          className="border border-gray-300 rounded-l-md px-4 py-2 hover:bg-gray-100 transition-colors"
                          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                          className="border-t border-b border-gray-300 px-4 py-2 w-16 text-center focus:outline-none"
                        />
                        <button
                          className="border border-gray-300 rounded-r-md px-4 py-2 hover:bg-gray-100 transition-colors"
                          onClick={() => setQuantity((prev) => prev + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowForm(true)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-md transition-colors flex items-center justify-center"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Order Confirmation */}
        {formSubmitted && (
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for your order. We will contact you shortly to confirm your purchase.
              </p>
              {/* Update the order confirmation details to show special size information */}
              <div className="bg-gray-50 p-4 rounded-md text-left mb-6">
                <h3 className="font-semibold mb-2">Order Details:</h3>
                <p>
                  <span className="text-gray-600">Frame:</span> {selectedFrameData?.name}
                </p>
                <p>
                  <span className="text-gray-600">Size:</span>{" "}
                  {selectedSize === "Special" ? "Special Custom Size" : `${selectedSize} inches`}
                </p>
                <p>
                  <span className="text-gray-600">Orientation:</span> <span className="capitalize">{orientation}</span>
                </p>
                <p>
                  <span className="text-gray-600">Category:</span> {collageCategory || "Not selected"}
                </p>
                <p>
                  <span className="text-gray-600">Collage Design:</span>{" "}
                  {selectedCollageImage ? "Selected" : "Not selected"}
                </p>
                <p>
                  <span className="text-gray-600">Frame Design:</span>{" "}
                  {selectedFrameImage ? "Selected" : "Not selected"}
                </p>
                <p>
                  <span className="text-gray-600">Your Images:</span>{" "}
                  {uploadedImages.length > 0 ? `${uploadedImages.length} uploaded` : "None"}
                </p>
                <p>
                  <span className="text-gray-600">Quantity:</span> {quantity}
                </p>
                <p>
                  <span className="text-gray-600">Total:</span> LKR {calculateTotal()}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setSelectedSize("8x10")
                    setQuantity(1)
                    setShowForm(false)
                    setFormSubmitted(false)
                    setCollageCategory(null)
                    setSelectedCollageImage(null)
                    setSelectedFrameImage(null)
                    setUploadedImages([])
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
                >
                  Place Another Order
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-md transition-colors"
                >
                  Return to Home
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Checkout Form */}
        {showForm && !formSubmitted && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Complete Your Order</h2>
                <p className="text-gray-600 mb-6">Please provide your details for cash-on-delivery.</p>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Delivery Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">WhatsApp Number</label>
                      <input
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Same as phone number if applicable"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Any Special Requests</label>
                      <textarea
                        name="requests"
                        value={formData.requests}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                        placeholder="Any special instructions or requests for your order"
                      ></textarea>
                    </div>
                    {/* NEW IMAGE UPLOAD FIELD */}
                    <div>
                      <label className="block text-gray-700 mb-1">Upload Your Images (Optional)</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-indigo-400 transition-colors">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="form-image-upload"
                        />
                        <label htmlFor="form-image-upload" className="cursor-pointer flex flex-col items-center">
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <p className="text-sm font-medium text-gray-700 mb-1">Click to upload images</p>
                          <p className="text-xs text-gray-500">JPEG, PNG, GIF, WebP (Max 5MB each, up to 10 images)</p>
                        </label>
                      </div>
                      {uploadError && (
                        <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                          {uploadError}
                        </div>
                      )}
                      {/* Uploaded Images Preview in Form */}
                      {uploadedImages.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm text-gray-600 mb-2">Uploaded Images ({uploadedImages.length}/10):</p>
                          <div className="grid grid-cols-3 gap-2">
                            {uploadedImages.map((image, index) => (
                              <div key={index} className="relative group">
                                <div className="aspect-square bg-gray-100 rounded overflow-hidden">
                                  <img
                                    src={image.preview || "/placeholder.svg"}
                                    alt={image.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeUploadedImage(index)}
                                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
                    >
                      Place Order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PurchasePage
