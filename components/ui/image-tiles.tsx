'use client';
import { motion, Variants } from 'framer-motion';
import React from 'react';

type ImageRevealVariant = 'fan' | 'single';

const tilePlaceholderImage =
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80';

interface ImageRevealProps {
  leftImage?: string;
  middleImage?: string;
  rightImage?: string;
  variant?: ImageRevealVariant;
  className?: string;
  tileClassName?: string;
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

const placeholderStyle = {
  backgroundColor: 'var(--tile-fill)',
} as const;

const framedTileClassName =
  'overflow-hidden rounded-[12px] p-[4px] isolate';

function TileMedia({
  image,
  alt,
  placeholderClassName,
}: {
  image?: string;
  alt: string;
  placeholderClassName?: string;
}) {
  const mediaImage = image ?? tilePlaceholderImage;

  return (
    <div
      role="img"
      aria-label={alt}
      className={joinClasses(
        'h-full w-full overflow-hidden rounded-[8px] bg-cover bg-center bg-no-repeat',
        !image && placeholderClassName,
      )}
      style={{
        ...placeholderStyle,
        backgroundImage: `url("${mediaImage}")`,
        clipPath: 'inset(0 round 8px)',
      }}
    />
  );
}

export default function ImageReveal({
  leftImage,
  middleImage,
  rightImage,
  variant = 'fan',
  className,
  tileClassName,
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
      x: 0,
      y: 10,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 12,
      },
    },
    hover: {
      rotate: 1,
      x: -10,
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
      x: 0,
      y: 20,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 12,
      },
    },
    hover: {
      rotate: 3,
      x: 0,
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
            `aspect-[19/14] w-full ${framedTileClassName}`,
            tileClassName,
          )}
          style={{ ...tileFrameStyle, clipPath: 'inset(0 round 12px)' }}
        >
          <TileMedia
            image={middleImage ?? leftImage ?? rightImage}
            alt="Preview tile"
            placeholderClassName={placeholderClassName}
          />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={joinClasses(
        'relative my-12 h-[20rem] w-[34rem] max-w-full',
        className,
      )}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className={joinClasses(
          `absolute left-0 top-0 aspect-square w-48 origin-bottom-right ${framedTileClassName}`,
          tileClassName,
        )}
        variants={leftImageVariants}
        whileHover="hover"
        animate="animate"
        style={{
          ...tileFrameStyle,
          zIndex: 30,
          clipPath: 'inset(0 round 12px)',
        }}
      >
          <TileMedia
            image={leftImage}
            alt="Left image"
            placeholderClassName={placeholderClassName}
          />
        </motion.div>

      <motion.div
        className={joinClasses(
          `absolute left-[150px] top-0 aspect-square w-48 origin-bottom-left ${framedTileClassName}`,
          tileClassName,
        )}
        variants={middleImageVariants}
        whileHover="hover"
        animate="animate"
        style={{
          ...tileFrameStyle,
          zIndex: 20,
          clipPath: 'inset(0 round 12px)',
        }}
      >
          <TileMedia
            image={middleImage}
            alt="Middle image"
            placeholderClassName={placeholderClassName}
          />
        </motion.div>

      <motion.div
        className={joinClasses(
          `absolute left-[334px] top-0 aspect-square w-48 origin-bottom-right ${framedTileClassName}`,
          tileClassName,
        )}
        variants={rightImageVariants}
        whileHover="hover"
        animate="animate"
        style={{
          ...tileFrameStyle,
          zIndex: 10,
          clipPath: 'inset(0 round 12px)',
        }}
      >
          <TileMedia
            image={rightImage}
            alt="Right image"
            placeholderClassName={placeholderClassName}
          />
        </motion.div>
    </motion.div>
  );
}
