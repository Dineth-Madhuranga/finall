import React from 'react';
import { Parallax } from 'react-parallax';
import { cn } from '../../utils/cn';

interface ParallaxSectionProps {
  imageUrl: string;
  height?: string;
  strength?: number;
  overlay?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  imageUrl,
  height = 'h-[60vh]',
  strength = 200,
  overlay = true,
  className,
  children
}) => {
  return (
    <Parallax
      blur={0}
      bgImage={imageUrl}
      bgImageAlt="Parallax Background"
      strength={strength}
      className={cn(height, 'relative w-full', className)}
    >
      {overlay && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      )}
      <div className="relative h-full z-10">
        {children}
      </div>
    </Parallax>
  );
};