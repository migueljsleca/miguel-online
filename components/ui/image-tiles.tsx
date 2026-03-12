'use client';
/* eslint-disable @next/next/no-img-element */

import { motion, Variants } from 'framer-motion';
import React from 'react';

type ImageRevealVariant = 'fan' | 'single';

const tilePlaceholderImage =
  'https://plus.unsplash.com/premium_photo-1681578990806-c0f5dd8984bd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

interface ImageRevealProps {
  leftImage?: string;
  middleImage?: string;
  rightImage?: string;
  variant?: ImageRevealVariant;
  className?: string;
  tileClassName?: string;
  imageClassName?: string;
  placeholderClassName?: string;
}

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

const tileFrameStyle = {
  backgroundColor: 'var(--tile-bg)',
  boxShadow:
    '0 24px 60px color-mix(in srgb, var(--black) 16%, transparent)',
  border: '1px solid var(--tile-stroke)',
} as const;

const fanTileStyle = {
  backgroundColor: 'var(--tile-bg)',
  boxShadow:
    '0 18px 34px color-mix(in srgb, var(--black) 14%, transparent)',
  border: '1px solid var(--tile-stroke)',
} as const;

const placeholderStyle = {
  backgroundColor: 'var(--tile-fill)',
} as const;

function TileMedia({
  image,
  alt,
  imageClassName,
  placeholderClassName,
}: {
  image?: string;
  alt: string;
  imageClassName?: string;
  placeholderClassName?: string;
}) {
  const isPlaceholder = !image;

  return (
    <div
      className={joinClasses(
        'h-full w-full overflow-hidden rounded-[8px]',
        isPlaceholder && placeholderClassName,
      )}
      style={isPlaceholder ? placeholderStyle : undefined}
    >
      <img
        src={image ?? tilePlaceholderImage}
        alt={alt}
        className={imageClassName}
      />
    </div>
  );
}

export default function ImageReveal({
  leftImage,
  middleImage,
  rightImage,
  variant = 'fan',
  className,
  tileClassName,
  imageClassName,
  placeholderClassName,
}: ImageRevealProps) {
  const containerVariants: Variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.2,
        staggerChildren: 0.2,
      },
    },
  };

  const leftImageVariants: Variants = {
    initial: { rotate: 0, x: 0, y: 0 },
    animate: {
      rotate: -8,
      x: -150,
      y: 10,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 12,
      },
    },
    hover: {
      rotate: 1,
      x: -160,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    },
  };

  const middleImageVariants: Variants = {
    initial: { rotate: 0, x: 0, y: 0 },
    animate: {
      rotate: 6,
      x: 0,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 12,
      },
    },
    hover: {
      rotate: 0,
      x: 0,
      y: -10,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    },
  };

  const rightImageVariants: Variants = {
    initial: { rotate: 0, x: 0, y: 0 },
    animate: {
      rotate: -6,
      x: 200,
      y: 20,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 12,
      },
    },
    hover: {
      rotate: 3,
      x: 200,
      y: 10,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    },
  };

  if (variant === 'single') {
    return (
      <div
        className={joinClasses(
          'relative flex w-[200px] items-center justify-center',
          className,
        )}
      >
        <div
          className={joinClasses(
            'aspect-[19/14] w-full overflow-hidden rounded-[12px] p-[4px]',
            tileClassName,
          )}
          style={tileFrameStyle}
        >
          <TileMedia
            image={middleImage ?? leftImage ?? rightImage}
            alt="Preview tile"
            imageClassName={joinClasses(
              'h-full w-full rounded-[8px] object-cover',
              imageClassName,
            )}
            placeholderClassName={placeholderClassName}
          />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={joinClasses(
        'relative my-12 flex h-64 w-64 items-center justify-center',
        className,
      )}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className={joinClasses(
          'absolute h-48 w-48 origin-bottom-right overflow-hidden rounded-xl',
          tileClassName,
        )}
        variants={leftImageVariants}
        whileHover="hover"
        animate="animate"
        style={{ ...fanTileStyle, zIndex: 30 }}
      >
        <TileMedia
          image={leftImage}
          alt="Left image"
            imageClassName={joinClasses(
              'h-full w-full object-cover p-2',
              imageClassName,
            )}
            placeholderClassName={placeholderClassName}
        />
      </motion.div>

      <motion.div
        className={joinClasses(
          'absolute h-48 w-48 origin-bottom-left overflow-hidden rounded-xl',
          tileClassName,
        )}
        variants={middleImageVariants}
        whileHover="hover"
        animate="animate"
        style={{ ...fanTileStyle, zIndex: 20 }}
      >
        <TileMedia
          image={middleImage}
          alt="Middle image"
            imageClassName={joinClasses(
              'h-full w-full object-cover p-2',
              imageClassName,
            )}
            placeholderClassName={placeholderClassName}
        />
      </motion.div>

      <motion.div
        className={joinClasses(
          'absolute h-48 w-48 origin-bottom-right overflow-hidden rounded-xl',
          tileClassName,
        )}
        variants={rightImageVariants}
        whileHover="hover"
        animate="animate"
        style={{ ...fanTileStyle, zIndex: 10 }}
      >
        <TileMedia
          image={rightImage}
          alt="Right image"
            imageClassName={joinClasses(
              'h-full w-full object-cover p-2',
              imageClassName,
            )}
            placeholderClassName={placeholderClassName}
        />
      </motion.div>
    </motion.div>
  );
}
