import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  imageUrl: string;
}

export const HoverCard: React.FC<HoverCardProps> = ({
  children,
  className,
  imageUrl
}) => {
  return (
    <motion.div
      className={cn(
        'group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl',
        className
      )}
      whileHover={{ y: -5 }}
    >
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={imageUrl}
          alt="Card Image"
          className="h-full w-full object-cover"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
      </div>
      <div className="relative z-10 p-6">
        {children}
      </div>
    </motion.div>
  );
};