import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const PERSPECTIVE = 1000;
const DEPTH_SPACING = 10;

const DEFAULT_TRANSITION = { type: 'spring', stiffness: 300, damping: 30 };

/**
 * Swipe card stack (Originkit / Framer CardStack).
 */
export default function CardStack({
  images = [],
  cardWidth = 220,
  cardHeight = 280,
  cardRadius = 8,
  swipeThreshold = 50,
  tiltAngle = -45,
  tiltAngleStart = 0,
  xOffset = 120,
  transition = DEFAULT_TRANSITION,
  className = '',
  style,
}) {
  const imgs = Array.isArray(images) && images.length > 0 ? images : [];
  const count = imgs.length;

  const [cards, setCards] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      imageIndex: i,
    }))
  );
  const [isPressed, setIsPressed] = useState(false);
  const [shouldReturnToCenter, setShouldReturnToCenter] = useState(false);

  useEffect(() => {
    setCards(
      Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        imageIndex: i,
      }))
    );
  }, [count]);

  const handleDragEnd = (_event, info) => {
    setIsPressed(false);
    const { offset } = info;
    const distance = Math.sqrt(offset.x * offset.x + offset.y * offset.y);
    if (distance > swipeThreshold) {
      setCards((prev) => {
        const [top, ...rest] = prev;
        return [...rest, top];
      });
    } else {
      setShouldReturnToCenter(true);
      setTimeout(() => setShouldReturnToCenter(false), 1000);
    }
  };

  const getCardStyle = (index) => {
    const total = cards.length;
    const stackOffset = index * 8;
    const scaleValue = 1 - index * 0.05;
    const rotationValue =
      total > 1
        ? tiltAngleStart +
          (index / (total - 1)) * (tiltAngle - tiltAngleStart)
        : tiltAngleStart;
    const xOffsetValue = total > 1 ? (index / (total - 1)) * xOffset : 0;
    const depthOffset = index * DEPTH_SPACING;
    const isTop = index === 0;
    const shouldReturn = isTop && shouldReturnToCenter;

    return {
      zIndex: cards.length - index,
      scale: scaleValue,
      x: shouldReturn ? 0 : xOffsetValue,
      y: shouldReturn ? 0 : -stackOffset,
      rotate: shouldReturn ? 0 : rotationValue,
      z: -depthOffset,
      opacity: 1,
    };
  };

  const radiusPx =
    (cardRadius / 20) * (Math.min(cardWidth, cardHeight) / 2);

  if (count === 0) return null;

  return (
    <div
      className={className}
      style={{
        ...style,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        perspective: `${PERSPECTIVE}px`,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: cardWidth,
          height: cardHeight,
        }}
      >
        {cards.map((card, index) => {
          const isTop = index === 0;
          const cardStyle = getCardStyle(index);
          const image = imgs[card.imageIndex];
          const src = typeof image === 'string' ? image : image?.src;

          return (
            <motion.div
              key={card.id}
              drag={isTop}
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.7}
              dragMomentum={false}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
              onMouseDown={isTop ? () => setIsPressed(true) : undefined}
              onMouseUp={isTop ? () => setIsPressed(false) : undefined}
              onDragEnd={isTop ? handleDragEnd : undefined}
              animate={cardStyle}
              transition={{
                x: transition,
                y: transition,
                rotate: transition,
                scale: transition,
                zIndex: { duration: 0.3, ease: 'easeOut' },
                z: { duration: 0.3, ease: 'easeOut' },
              }}
              whileDrag={{
                scale: 1.05,
                rotate: tiltAngleStart,
                zIndex: 1000,
              }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: radiusPx,
                backgroundImage: src ? `url(${src})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: src ? 'transparent' : 'var(--panel)',
                overflow: 'hidden',
                cursor: isTop ? (isPressed ? 'grabbing' : 'grab') : 'default',
                userSelect: 'none',
                boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
              }}
              aria-hidden={!isTop}
            />
          );
        })}
      </div>
    </div>
  );
}
