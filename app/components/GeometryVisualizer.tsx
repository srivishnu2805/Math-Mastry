"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function GeometryVisualizer({ onProgressUpdate }: { onProgressUpdate: (progress: number) => void }) {
  const [shape, setShape] = useState("square")
  const [size, setSize] = useState(100)
  const [quizMode, setQuizMode] = useState(false)
  const [quizQuestion, setQuizQuestion] = useState({ shape: '', size: 0 })
  const [quizAnswer, setQuizAnswer] = useState('')
  const [quizFeedback, setQuizFeedback] = useState('')
  const [quizScore, setQuizScore] = useState(0)

  const renderShape = () => {
    switch (shape) {
      case "square":
        return (
          <motion.rect
            width={size}
            height={size}
            fill="#22c55e"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        )
      case "circle":
        return (
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2}
            fill="#ef4444"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        )
      case "triangle":
        return (
          <motion.polygon
            points={`${size / 2},0 0,${size} ${size},${size}`}
            fill="#3b82f6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        )
      default:
        return null
    }
  }

  const generateQuizQuestion = () => {
    const shapes = ['square', 'circle', 'triangle']
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)]
    const randomSize = Math.floor(Math.random() * 100) + 50
    setQuizQuestion({ shape: randomShape, size: randomSize })
    setShape(randomShape)
    setSize(randomSize)
    setQuizAnswer('')
    setQuizFeedback('')
  }

  const checkQuizAnswer = () => {
    let correctAnswer
    switch (quizQuestion.shape) {
      case 'square':
        correctAnswer = quizQuestion.size * quizQuestion.size
        break
      case 'circle':
        correctAnswer = Math.PI * (quizQuestion.size / 2) * (quizQuestion.size / 2)
        break
      case 'triangle':
        correctAnswer = (quizQuestion.size * quizQuestion.size) / 2
        break
    }
    const userAnswer = parseFloat(quizAnswer)
    if (Math.abs(userAnswer - correctAnswer) < 0.1 * correctAnswer) {
      setQuizFeedback('Correct!')
      setQuizScore(quizScore + 1)
      if (quizScore + 1 >= 5) {
        onProgressUpdate(10)
        setQuizScore(0)
      }
      generateQuizQuestion()
    } else {
      setQuizFeedback(`Not quite. The correct answer is ${correctAnswer.toFixed(2)}.`)
    }
  }

  return (
    <Card className="bg-green-50 border-green-200">
      <CardHeader>
        <CardTitle className="text-2xl text-green-700">Geometry Visualizer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <Button onClick={() => setQuizMode(!quizMode)} variant="outline" className="text-green-600 border-green-300">
            {quizMode ? 'Exit Quiz' : 'Enter Quiz Mode'}
          </Button>
          {quizMode && (
            <motion.p
              className="text-xl font-semibold text-green-700"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5 }}
            >
              Quiz Score: {quizScore}
            </motion.p>
          )}
        </div>
        <div className="flex space-x-4 justify-center">
          <Select onValueChange={(value) => setShape(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a shape" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="square">Square</SelectItem>
              <SelectItem value="circle">Circle</SelectItem>
              <SelectItem value="triangle">Triangle</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="number"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            placeholder="Size"
            className="w-24"
          />
        </div>
        {quizMode ? (
          <div className="space-y-4">
            <p className="text-lg text-green-700 text-center">Calculate the area of the {quizQuestion.shape}:</p>
            <Input
              type="number"
              value={quizAnswer}
              onChange={(e) => setQuizAnswer(e.target.value)}
              placeholder="Enter your answer"
            />
            <Button onClick={checkQuizAnswer} className="bg-green-500 hover:bg-green-600 w-full">
              Submit Answer
            </Button>
            {quizFeedback && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg text-green-600 text-center"
              >
                {quizFeedback}
              </motion.p>
            )}
          </div>
        ) : (
          <div className="flex justify-center">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
              {renderShape()}
            </svg>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

