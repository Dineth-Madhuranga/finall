import React, { useState, useEffect } from 'react';

// TypeScript interfaces
interface GalleryImage {
  id: string;
  src: string;
  alt?: string;
  size: '18×12' | '12×18' | '12×10' | '10×12';
  style: 'minimalistic' | 'artistic' | 'shape inspired frames';
}

interface CategoryGroup {
  size: string;
  style: string;
  images: GalleryImage[];
}

// Mock data
const images: GalleryImage[] = [
  // 18×12 - Minimalistic
  { id: '1', src: '/api/placeholder/400/300', alt: 'Minimalistic 18×12 photo 1', size: '18×12', style: 'minimalistic' },
  { id: '2', src: '/api/placeholder/400/300', alt: 'Minimalistic 18×12 photo 2', size: '18×12', style: 'minimalistic' },
  { id: '3', src: '/api/placeholder/400/300', alt: 'Minimalistic 18×12 photo 3', size: '18×12', style: 'minimalistic' },
  { id: '4', src: '/api/placeholder/400/300', alt: 'Minimalistic 18×12 photo 4', size: '18×12', style: 'minimalistic' },

  // 18×12 - Artistic
  { id: '5', src: '/api/placeholder/400/300', alt: 'Artistic 18×12 photo 1', size: '18×12', style: 'artistic' },
  { id: '6', src: '/api/placeholder/400/300', alt: 'Artistic 18×12 photo 2', size: '18×12', style: 'artistic' },
  { id: '7', src: '/api/placeholder/400/300', alt: 'Artistic 18×12 photo 3', size: '18×12', style: 'artistic' },
  { id: '8', src: '/api/placeholder/400/300', alt: 'Artistic 18×12 photo 4', size: '18×12', style: 'artistic' },

  // 18×12 - Shape Inspired Frames
  { id: '9', src: '/api/placeholder/400/300', alt: 'Shape Inspired Frames 18×12 photo 1', size: '18×12', style: 'shape inspired frames' },
  { id: '10', src: '/api/placeholder/400/300', alt: 'Shape Inspired Frames 18×12 photo 2', size: '18×12', style: 'shape inspired frames' },
  { id: '11', src: '/api/placeholder/400/300', alt: 'Shape Inspired Frames 18×12 photo 3', size: '18×12', style: 'shape inspired frames' },
  { id: '12', src: '/api/placeholder/400/300', alt: 'Shape Inspired Frames 18×12 photo 4', size: '18×12', style: 'shape inspired frames' },

  // 12×18 - Minimalistic
  { id: '13', src: '/api/placeholder/300/400', alt: 'Minimalistic 12×18 photo 1', size: '12×18', style: 'minimalistic' },
  { id: '14', src: '/api/placeholder/300/400', alt: 'Minimalistic 12×18 photo 2', size: '12×18', style: 'minimalistic' },
  { id: '15', src: '/api/placeholder/300/400', alt: 'Minimalistic 12×18 photo 3', size: '12×18', style: 'minimalistic' },
  { id: '16', src: '/api/placeholder/300/400', alt: 'Minimalistic 12×18 photo 4', size: '12×18', style: 'minimalistic' },

  // 12×18 - Artistic
  { id: '17', src: '/api/placeholder/300/400', alt: 'Artistic 12×18 photo 1', size: '12×18', style: 'artistic' },
  { id: '18', src: '/api/placeholder/300/400', alt: 'Artistic 12×18 photo 2', size: '12×18', style: 'artistic' },
  { id: '19', src: '/api/placeholder/300/400', alt: 'Artistic 12×18 photo 3', size: '12×18', style: 'artistic' },
  { id: '20', src: '/api/placeholder/300/400', alt: 'Artistic 12×18 photo 4', size: '12×18', style: 'artistic' },

  // 12×18 - Shape Inspired Frames
  { id: '21', src: '/api/placeholder/300/400', alt: 'Shape Inspired Frames 12×18 photo 1', size: '12×18', style: 'shape inspired frames' },
  { id: '22', src: '/api/placeholder/300/400', alt: 'Shape Inspired Frames 12×18 photo 2', size: '12×18', style: 'shape inspired frames' },
  { id: '23', src: '/api/placeholder/300/400', alt: 'Shape Inspired Frames 12×18 photo 3', size: '12×18', style: 'shape inspired frames' },
  { id: '24', src: '/api/placeholder/300/400', alt: 'Shape Inspired Frames 12×18 photo 4', size: '12×18', style: 'shape inspired frames' },

  // 12×10 - Minimalistic
  { id: '25', src: '/api/placeholder/360/300', alt: 'Minimalistic 12×10 photo 1', size: '12×10', style: 'minimalistic' },
  { id: '26', src: '/api/placeholder/360/300', alt: 'Minimalistic 12×10 photo 2', size: '12×10', style: 'minimalistic' },
  { id: '27', src: '/api/placeholder/360/300', alt: 'Minimalistic 12×10 photo 3', size: '12×10', style: 'minimalistic' },
  { id: '28', src: '/api/placeholder/360/300', alt: 'Minimalistic 12×10 photo 4', size: '12×10', style: 'minimalistic' },

  // 12×10 - Artistic
  { id: '29', src: '/api/placeholder/360/300', alt: 'Artistic 12×10 photo 1', size: '12×10', style: 'artistic' },
  { id: '30', src: '/api/placeholder/360/300', alt: 'Artistic 12×10 photo 2', size: '12×10', style: 'artistic' },
  { id: '31', src: '/api/placeholder/360/300', alt: 'Artistic 12×10 photo 3', size: '12×10', style: 'artistic' },
  { id: '32', src: '/api/placeholder/360/300', alt: 'Artistic 12×10 photo 4', size: '12×10', style: 'artistic' },

  // 12×10 - Shape Inspired Frames
  { id: '33', src: '/api/placeholder/360/300', alt: 'Shape Inspired Frames 12×10 photo 1', size: '12×10', style: 'shape inspired frames' },
  { id: '34', src: '/api/placeholder/360/300', alt: 'Shape Inspired Frames 12×10 photo 2', size: '12×10', style: 'shape inspired frames' },
  { id: '35', src: '/api/placeholder/360/300', alt: 'Shape Inspired Frames 12×10 photo 3', size: '12×10', style: 'shape inspired frames' },
  { id: '36', src: '/api/placeholder/360/300', alt: 'Shape Inspired Frames 12×10 photo 4', size: '12×10', style: 'shape inspired frames' },

  // 10×12 - Minimalistic
  { id: '37', src: '/api/placeholder/300/360', alt: 'Minimalistic 10×12 photo 1', size: '10×12', style: 'minimalistic' },
  { id: '38', src: '/api/placeholder/300/360', alt: 'Minimalistic 10×12 photo 2', size: '10×12', style: 'minimalistic' },
  { id: '39', src: '/api/placeholder/300/360', alt: 'Minimalistic 10×12 photo 3', size: '10×12', style: 'minimalistic' },
  { id: '40', src: '/api/placeholder/300/360', alt: 'Minimalistic 10×12 photo 4', size: '10×12', style: 'minimalistic' },

  // 10×12 - Artistic
  { id: '41', src: '/api/placeholder/300/360', alt: 'Artistic 10×12 photo 1', size: '10×12', style: 'artistic' },
  { id: '42', src: '/api/placeholder/300/360', alt: 'Artistic 10×12 photo 2', size: '10×12', style: 'artistic' },
  { id: '43', src: '/api/placeholder/300/360', alt: 'Artistic 10×12 photo 3', size: '10×12', style: 'artistic' },
  { id: '44', src: '/api/placeholder/300/360', alt: 'Artistic 10×12 photo 4', size: '10×12', style: 'artistic' },

  // 10×12 - Shape Inspired Frames
  { id: '45', src: '/api/placeholder/300/360', alt: 'Shape Inspired Frames 10×12 photo 1', size: '10×12', style: 'shape inspired frames' },
  { id: '46', src: '/api/placeholder/300/360', alt: 'Shape Inspired Frames 10×12 photo 2', size: '10×12', style: 'shape inspired frames' },
  { id: '47', src: '/api/placeholder/300/360', alt: 'Shape Inspired Frames 10×12 photo 3', size: '10×12', style: 'shape inspired frames' },
  { id: '48', src: '/api/placeholder/300/360', alt: 'Shape Inspired Frames 10×12 photo 4', size: '10×12', style: 'shape inspired frames' },
];

// Component for filter pill
const FilterPill: React.FC<{
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ label, active, onClick }) => (
  <button
    className={`rounded-full px-4 py-2 border text-sm font-medium transition-colors ${active ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
      }`}
    onClick={onClick}
  >
    {label}
  </button>
);

// Modal component for full-size image view
const ImageModal: React.FC<{
  image: GalleryImage | null;
  onClose: () => void;
}> = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="max-w-4xl max-h-full relative" onClick={e => e.stopPropagation()}>
        <button
          className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img
          src={image.src}
          alt={image.alt || `${image.style} ${image.size} photo`}
          className="max-h-screen max-w-full object-contain"
        />
        <div className="mt-2 text-white text-center">
          <p>{image.alt}</p>
          <p className="text-sm opacity-75">{`${image.size} - ${image.style.charAt(0).toUpperCase() + image.style.slice(1)}`}</p>
        </div>
      </div>
    </div>
  );
};

// Component for image card
const ImageCard: React.FC<{
  image: GalleryImage;
  onClick: (image: GalleryImage) => void;
}> = ({ image, onClick }) => (
  <div
    className="aspect-square rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
    onClick={() => onClick(image)}
  >
    <img
      src={image.src}
      alt={image.alt || `${image.style} ${image.size} photo`}
      className="w-full h-full object-cover"
      loading="lazy"
    />
  </div>
);

// Placeholder component for empty slots
const PlaceholderCard: React.FC = () => (
  <div className="aspect-square rounded-lg bg-gray-100 shadow-md flex items-center justify-center">
    <div className="text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  </div>
);

// Main Gallery Component
const PhotoGallery: React.FC = () => {
  // Size and style filters
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  // Grouped and filtered images
  const [groupedImages, setGroupedImages] = useState<CategoryGroup[]>([]);

  // Selected image for modal
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Available filter options
  const sizeOptions = ['18×12', '12×18', '12×10', '10×12'];
  const styleOptions = ['minimalistic', 'artistic', 'shape inspired frames'];

  // Filter toggle handlers
  const toggleSizeFilter = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const toggleStyleFilter = (style: string) => {
    setSelectedStyles(prev =>
      prev.includes(style)
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  const clearFilters = () => {
    setSelectedSizes([]);
    setSelectedStyles([]);
  };

  const openImageModal = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  // Helper function to format style names for display
  const formatStyle = (style: string): string => {
    return style
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Group and filter images based on selected filters
  useEffect(() => {
    const filteredImages = images.filter(img => {
      const sizeMatch = selectedSizes.length === 0 || selectedSizes.includes(img.size);
      const styleMatch = selectedStyles.length === 0 || selectedStyles.includes(img.style);
      return sizeMatch && styleMatch;
    });

    // Group images by size and style
    const groups: CategoryGroup[] = [];

    // Filter sizes based on selection or use all
    const sizesToShow = selectedSizes.length > 0 ? selectedSizes : sizeOptions;

    // Filter styles based on selection or use all
    const stylesToShow = selectedStyles.length > 0 ? selectedStyles : styleOptions;

    // Create groups for each combination
    sizesToShow.forEach(size => {
      stylesToShow.forEach(style => {
        const categoryImages = filteredImages.filter(
          img => img.size === size && img.style === style
        );

        // Only add groups that have images or if no style filter is active
        if (categoryImages.length > 0) {
          groups.push({
            size,
            style,
            images: categoryImages
          });
        }
      });
    });

    setGroupedImages(groups);
  }, [selectedSizes, selectedStyles]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filter Controls */}
      <div className="mb-8">
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Size</h3>
          <div className="flex flex-wrap gap-2">
            {sizeOptions.map(size => (
              <FilterPill
                key={size}
                label={size}
                active={selectedSizes.includes(size)}
                onClick={() => toggleSizeFilter(size)}
              />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Style</h3>
          <div className="flex flex-wrap gap-2">
            {styleOptions.map(style => (
              <FilterPill
                key={style}
                label={formatStyle(style)}
                active={selectedStyles.includes(style)}
                onClick={() => toggleStyleFilter(style)}
              />
            ))}
          </div>
        </div>

        {(selectedSizes.length > 0 || selectedStyles.length > 0) && (
          <button
            className="mt-4 px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Gallery Display */}
      {groupedImages.length === 0 ? (
        <div className="empty-state p-12 text-center bg-gray-50 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-600 text-lg">No images match your filters</p>
        </div>
      ) : (
        <div className="space-y-12">
          {groupedImages.map(group => (
            <div key={`${group.size}-${group.style}`} className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {`${group.size} (${formatStyle(group.style)})`}
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Show actual images */}
                {group.images.map(image => (
                  <ImageCard
                    key={image.id}
                    image={image}
                    onClick={openImageModal}
                  />
                ))}

                {/* Add placeholders if needed (less than 4 images) */}
                {Array.from({ length: Math.max(0, 4 - group.images.length) }).map((_, index) => (
                  <PlaceholderCard key={`placeholder-${index}`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full-size image modal */}
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={closeImageModal} />
      )}
    </div>
  );
};

export default PhotoGallery;