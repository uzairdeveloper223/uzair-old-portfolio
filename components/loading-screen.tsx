'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const neonGreen = '#00ff9d';
const neonGreenSoft = '#00d18a';

export default function LoadingScreen() {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Different timings for mobile and desktop
    const loadingDuration = isMobile ? 8000 : 3500; // 8 seconds for mobile, 3.5 for desktop

    const timer = setTimeout(() => {
      // Only close loading screen on desktop or after extended time on mobile
      setIsLoading(false);
    }, loadingDuration);

    return () => clearTimeout(timer);
  }, [isMobile]);

  if (!isLoading) return null;

  const getRandomPosition = () => ({
    x: Math.random() * dimensions.width,
    y: Math.random() * dimensions.height,
  });

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: '#000000' }}
        >
          <div className="relative h-screen w-screen overflow-hidden">
            {/* Left Panel */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: '-100%' }}
              transition={{ duration: 1.5, delay: 2 }}
              className="absolute left-0 top-0 h-full w-1/2"
              style={{
                backgroundImage: `url('/panel_left.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRight: `2px solid ${neonGreen}`,
                boxShadow: `0 0 20px ${neonGreen}, 0 0 40px ${neonGreen}`,
                filter: 'brightness(1.2) contrast(1.1)',
              }}
            >
              {/* Neon Overlay */}
              <div 
                className="absolute inset-0" 
                style={{
                  background: `linear-gradient(90deg, transparent, ${neonGreen}40)`,
                  mixBlendMode: 'overlay',
                }}
              />
            </motion.div>

            {/* Right Panel */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.5, delay: 2 }}
              className="absolute right-0 top-0 h-full w-1/2"
              style={{
                backgroundImage: `url('/panel_right.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderLeft: `2px solid ${neonGreen}`,
                boxShadow: `0 0 20px ${neonGreen}, 0 0 40px ${neonGreen}`,
                filter: 'brightness(1.2) contrast(1.1)',
              }}
            >
              {/* Neon Overlay */}
              <div 
                className="absolute inset-0" 
                style={{
                  background: `linear-gradient(-90deg, transparent, ${neonGreen}40)`,
                  mixBlendMode: 'overlay',
                }}
              />
            </motion.div>

            {/* Welcome Text and Mobile Warning */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4"
            >
              <div
                className="text-6xl font-bold"
                style={{
                  color: neonGreen,
                  textShadow: `0 0 10px ${neonGreen}, 0 0 20px ${neonGreen}, 0 0 40px ${neonGreen}`,
                }}
              >
                WELCOME!
              </div>
              {isMobile && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                  className="text-center px-4 flex flex-col gap-3"
                >
                  <p 
                    className="text-sm md:text-base font-medium"
                    style={{
                      color: neonGreen,
                      textShadow: `0 0 5px ${neonGreen}, 0 0 10px ${neonGreen}`,
                    }}
                  >
                    For the best experience, please open my portfolio on desktop
                  </p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{ 
                      delay: 3,
                      duration: 4,
                      repeat: Infinity,
                      times: [0, 0.1, 0.9, 1]
                    }}
                    className="text-xs text-center"
                    style={{
                      color: neonGreenSoft,
                      textShadow: `0 0 3px ${neonGreenSoft}`,
                    }}
                  >
                    Continuing to mobile version in a few seconds...
                  </motion.div>
                </motion.div>
              )}
            </motion.div>

            {/* Particles Effect */}
            <div className="absolute inset-0">
            {dimensions.width > 0 && [...Array(20)].map((_, i) => {
                const pos = getRandomPosition();
                const newPos = getRandomPosition();
                return (
                  <motion.div
                    key={i}
                    initial={{
                      x: pos.x,
                      y: pos.y,
                    }}
                    animate={{
                      x: newPos.x,
                      y: newPos.y,
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      position: 'absolute',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 255, 157, 0.1)',
                      border: `1px solid ${neonGreen}`,
                      boxShadow: `0 0 20px ${neonGreen}, 0 0 40px ${neonGreen}`,
                    }}
                  />
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
