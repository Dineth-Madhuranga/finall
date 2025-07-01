"use client"

import { Link } from "react-router-dom"

const GallerySection = () => {
  const frames = [
    {
      id: 103,
      name: "Mount Frame",
      type: "General",
      image: "https://i.postimg.cc/sXyn8XVw/1.png",
    },
    {
      id: 102,
      name: "Traditional Frame",
      type: "General",
      image: "https://i.postimg.cc/t4ZFzjHJ/7.png",
    },
    {
      id: 301,
      name: "Rotating Frame",
      type: "Modern",
      image: "https://i.postimg.cc/B6PpL07x/31.png",
    },
    {
      id: 202,
      name: "Plymount Frame",
      type: "Boarderless",
      image: "https://i.postimg.cc/6Qr7BZ7x/13.png",
    },
    {
      id: 302,
      name: "Floating Frame",
      type: "Modern",
      image: "https://i.postimg.cc/RFpdq0TC/27.png",
    },
    {
      id: 303,
      name: "Display Frame",
      type: "Modern",
      image: "https://i.postimg.cc/s2qndXzP/Whats-App-Image-2025-06-21-at-2-57-27-PM.jpg",
    },
    {
      id: 203,
      name: "Embossed Frame",
      type: "Boarderless",
      image: "https://i.postimg.cc/QdLxVtZ8/18.png",
    },
    {
      id: 204,
      name: "Compound Frame",
      type: "Boarderless",
      image: "https://i.postimg.cc/MGvbNwSh/22.png",
    },
  ]

  // Group frames by category
  const groupedFrames = frames.reduce((acc: { [key: string]: typeof frames }, frame) => {
    if (!acc[frame.type]) {
      acc[frame.type] = []
    }
    acc[frame.type].push(frame)
    return acc
  }, {})

  // Get categories in a specific order
  const categoryOrder = ["General", "Boarderless", "Modern"]
  const orderedCategories = categoryOrder.filter((category) => groupedFrames[category])

  return (
    <div className="w-full">
      {/* Black background title section */}
      <section className="w-full bg-black py-16 flex flex-col items-center justify-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center text-white mb-0 tracking-wide" style={{ letterSpacing: '0.04em' }}>
          PRODUCT <span style={{ color: '#e74c3c' }}>G</span><span style={{ color: '#27ae60' }}>A</span><span style={{ color: '#3498db' }}>L</span><span style={{ color: '#f1c40f' }}>L</span><span style={{ color: '#9b59b6' }}>E</span><span style={{ color: '#e67e22' }}>R</span><span style={{ color: '#f9ca24' }}>Y</span>.
        </h2>
      </section>

      {/* Frame categories */}
      <section className="w-full bg-white py-12 flex flex-col items-center justify-center">
        {orderedCategories.map((category) => {
          const framesArr = groupedFrames[category] as typeof frames;
          // For odd number of frames, center the last one
          const rows = [];
          for (let i = 0; i < framesArr.length; i += 2) {
            if (i + 1 < framesArr.length) {
              rows.push([framesArr[i], framesArr[i + 1]]);
            } else {
              rows.push([framesArr[i]]);
            }
          }
          return (
            <div key={category} className="w-full max-w-5xl mb-20 px-4">
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 tracking-wide uppercase">{category} FRAMES</h3>
              <div className="flex flex-col gap-12">
                {rows.map((row, rowIdx) => (
                  <div key={rowIdx} className={`grid grid-cols-1 md:grid-cols-2 gap-12 justify-items-center ${row.length === 1 ? 'md:grid-cols-1' : ''}`}>
                    {row.map((frame: typeof frames[0], idx: number) => (
                      <div key={frame.id} className="flex flex-col items-center w-full max-w-xs">
                        <Link to={`/purchase/${frame.id}`} className="w-full flex flex-col items-center group">
                          <div className="w-64 h-64 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center shadow-md transition-shadow group-hover:shadow-xl mb-4">
                            <img src={frame.image} alt={frame.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                          </div>
                          <div className="text-2xl font-serif text-black text-center w-full">{frame.name}</div>
                        </Link>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  )
}

export default GallerySection
