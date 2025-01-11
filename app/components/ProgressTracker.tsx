"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Progress } from "@/components/ui/progress"

export default function ProgressTracker({ progress }: { progress: number }) {
  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2 text-purple-700">Your Learning Progress</h2>
      <div className="flex items-center space-x-4">
        <Progress value={progress} className="flex-grow h-4" />
        <motion.p 
          className="text-sm font-medium text-purple-600 w-12 text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {progress}%
        </motion.p>
      </div>
    </div>
  )
}

