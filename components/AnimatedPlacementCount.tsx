import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect, useState } from "react"

export function AnimatedPlacementCount({ count, label }: { count: number, label: string }) {
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, latest => Math.floor(latest))
  const [displayCount, setDisplayCount] = useState(0)

  useEffect(() => {
    const controls = animate(motionValue, count, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayCount(Math.floor(latest)),
    })
    return () => controls.stop()
  }, [count])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center gap-2 text-2xl font-bold text-primary"
    >
      <span>⚡</span>
      <span>
        {displayCount.toLocaleString()}+ {label}
      </span>
    </motion.div>
  )
} 