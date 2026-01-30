import { motion } from 'framer-motion';
import { useThemeStore } from '@/store/themeStore';

export function AIRobotIllustration() {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  
  // Theme colors
  const primaryColor = isDark ? 'hsl(158, 35%, 42%)' : 'hsl(158, 40%, 35%)';
  const accentColor = isDark ? 'hsl(18, 45%, 52%)' : 'hsl(18, 50%, 45%)';
  const bgColor = isDark ? 'hsl(220, 20%, 12%)' : 'hsl(40, 15%, 96%)';
  const borderColor = isDark ? 'hsl(220, 15%, 20%)' : 'hsl(220, 15%, 80%)';
  const glowColor = isDark ? 'hsl(158, 35%, 42%)' : 'hsl(158, 40%, 35%)';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="absolute top-1/2 -translate-y-1/2 right-1/4 -translate-x-1/2 z-[2] pointer-events-none hidden lg:block"
      style={{ 
        opacity: 0.15,
        filter: 'blur(1px)',
      }}
    >
      <motion.div
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-[400px] h-[400px] lg:w-[500px] lg:h-[500px]"
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 blur-3xl opacity-30"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            width: '400px',
            height: '400px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Robot Head */}
          <motion.g
            animate={{
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Head base */}
            <rect
              x="100"
              y="80"
              width="100"
              height="100"
              rx="20"
              fill={bgColor}
              stroke={primaryColor}
              strokeWidth="2"
              opacity="0.9"
            />
            
            {/* Head gradient overlay */}
            <rect
              x="100"
              y="80"
              width="100"
              height="100"
              rx="20"
              fill={`url(#headGradient)`}
              opacity="0.3"
            />
            
            {/* Eyes */}
            <motion.circle
              cx="130"
              cy="120"
              r="12"
              fill={primaryColor}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.circle
              cx="170"
              cy="120"
              r="12"
              fill={primaryColor}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.1,
              }}
            />
            
            {/* Eye highlights */}
            <circle cx="130" cy="120" r="6" fill="white" opacity="0.8" />
            <circle cx="170" cy="120" r="6" fill="white" opacity="0.8" />
            
            {/* Antenna */}
            <motion.line
              x1="150"
              y1="80"
              x2="150"
              y2="60"
              stroke={accentColor}
              strokeWidth="3"
              strokeLinecap="round"
              animate={{
                y2: [60, 55, 60],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.circle
              cx="150"
              cy="55"
              r="5"
              fill={accentColor}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Mouth/Display */}
            <motion.rect
              x="125"
              y="145"
              width="50"
              height="20"
              rx="10"
              fill={primaryColor}
              opacity="0.4"
              animate={{
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Decorative lines */}
            <line
              x1="110"
              y1="100"
              x2="120"
              y2="100"
              stroke={borderColor}
              strokeWidth="1.5"
              opacity="0.5"
            />
            <line
              x1="180"
              y1="100"
              x2="190"
              y2="100"
              stroke={borderColor}
              strokeWidth="1.5"
              opacity="0.5"
            />
          </motion.g>
          
          {/* Body */}
          <motion.g
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          >
            {/* Body base */}
            <rect
              x="110"
              y="180"
              width="80"
              height="80"
              rx="15"
              fill={bgColor}
              stroke={primaryColor}
              strokeWidth="2"
              opacity="0.9"
            />
            
            {/* Body gradient */}
            <rect
              x="110"
              y="180"
              width="80"
              height="80"
              rx="15"
              fill={`url(#bodyGradient)`}
              opacity="0.3"
            />
            
            {/* Chest panel */}
            <rect
              x="125"
              y="195"
              width="50"
              height="35"
              rx="8"
              fill={primaryColor}
              opacity="0.2"
            />
            
            {/* Chest display lines */}
            <motion.line
              x1="135"
              y1="205"
              x2="165"
              y2="205"
              stroke={primaryColor}
              strokeWidth="2"
              opacity="0.6"
              animate={{
                pathLength: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.line
              x1="135"
              y1="215"
              x2="165"
              y2="215"
              stroke={primaryColor}
              strokeWidth="2"
              opacity="0.6"
              animate={{
                pathLength: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
            />
            <motion.line
              x1="135"
              y1="225"
              x2="155"
              y2="225"
              stroke={accentColor}
              strokeWidth="2"
              opacity="0.6"
              animate={{
                pathLength: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
            />
            
            {/* Side panels */}
            <rect
              x="115"
              y="200"
              width="8"
              height="20"
              rx="4"
              fill={accentColor}
              opacity="0.4"
            />
            <rect
              x="177"
              y="200"
              width="8"
              height="20"
              rx="4"
              fill={accentColor}
              opacity="0.4"
            />
          </motion.g>
          
          {/* Arms */}
          <motion.g
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Left arm */}
            <rect
              x="80"
              y="195"
              width="25"
              height="50"
              rx="12"
              fill={bgColor}
              stroke={primaryColor}
              strokeWidth="2"
              opacity="0.9"
            />
            <circle
              cx="92.5"
              cy="220"
              r="8"
              fill={primaryColor}
              opacity="0.5"
            />
            
            {/* Right arm */}
            <rect
              x="195"
              y="195"
              width="25"
              height="50"
              rx="12"
              fill={bgColor}
              stroke={primaryColor}
              strokeWidth="2"
              opacity="0.9"
            />
            <circle
              cx="207.5"
              cy="220"
              r="8"
              fill={primaryColor}
              opacity="0.5"
            />
          </motion.g>
          
          {/* Legs */}
          <motion.g
            animate={{
              y: [0, 2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Left leg */}
            <rect
              x="120"
              y="260"
              width="30"
              height="35"
              rx="15"
              fill={bgColor}
              stroke={primaryColor}
              strokeWidth="2"
              opacity="0.9"
            />
            
            {/* Right leg */}
            <rect
              x="150"
              y="260"
              width="30"
              height="35"
              rx="15"
              fill={bgColor}
              stroke={primaryColor}
              strokeWidth="2"
              opacity="0.9"
            />
            
            {/* Feet */}
            <ellipse
              cx="135"
              cy="295"
              rx="20"
              ry="8"
              fill={accentColor}
              opacity="0.6"
            />
            <ellipse
              cx="165"
              cy="295"
              rx="20"
              ry="8"
              fill={accentColor}
              opacity="0.6"
            />
          </motion.g>
          
          {/* Floating particles/indicators */}
          <motion.circle
            cx="70"
            cy="140"
            r="4"
            fill={primaryColor}
            opacity="0.6"
            animate={{
              y: [0, -10, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.circle
            cx="230"
            cy="160"
            r="4"
            fill={accentColor}
            opacity="0.6"
            animate={{
              y: [0, -10, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
          <motion.circle
            cx="80"
            cy="250"
            r="3"
            fill={primaryColor}
            opacity="0.5"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.circle
            cx="220"
            cy="240"
            r="3"
            fill={accentColor}
            opacity="0.5"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          
          {/* Gradients */}
          <defs>
            <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} stopOpacity="0.3" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} stopOpacity="0.2" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </motion.div>
  );
}
