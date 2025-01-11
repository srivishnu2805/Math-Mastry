"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import MouseTrail from "./components/MouseTrail"
import LoadingAnimation from "./components/LoadingAnimation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FractionDecimalMastery from "./components/FractionDecimalMastery"
import AlgebraGame from "./components/AlgebraGame"
import GeometryVisualizer from "./components/GeometryVisualizer"
import WordProblemPuzzles from "./components/WordProblemPuzzles"
import ProgressTracker from "./components/ProgressTracker"

export default function MathMasteryApp() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const updateProgress = (newProgress: number) => {
    setProgress((prevProgress) => Math.min(100, prevProgress + newProgress))
  }

  if (isLoading) {
    return <LoadingAnimation />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-200 py-8 px-4 sm:px-6 lg:px-8">
      <MouseTrail />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-between items-center p-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white"
        >
          <h1 className="text-3xl sm:text-4xl font-bold">Math Mastery Adventure</h1>
        </motion.div>
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <ProgressTracker progress={progress} />
          </motion.div>
          <Tabs defaultValue="fractions" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              <TabsTrigger value="fractions" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-600">
                Fractions & Decimals
              </TabsTrigger>
              <TabsTrigger value="algebra" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600">
                Algebra Game
              </TabsTrigger>
              <TabsTrigger value="geometry" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-600">
                Geometry Visualizer
              </TabsTrigger>
              <TabsTrigger value="wordproblems" className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-600">
                Word Problem Puzzles
              </TabsTrigger>
            </TabsList>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <TabsContent value="fractions">
                <FractionDecimalMastery onProgressUpdate={updateProgress} />
              </TabsContent>
              <TabsContent value="algebra">
                <AlgebraGame onProgressUpdate={updateProgress} />
              </TabsContent>
              <TabsContent value="geometry">
                <GeometryVisualizer onProgressUpdate={updateProgress} />
              </TabsContent>
              <TabsContent value="wordproblems">
                <WordProblemPuzzles onProgressUpdate={updateProgress} />
              </TabsContent>
            </motion.div>
          </Tabs>
        </div>
      </motion.div>
    </div>
  )
}

