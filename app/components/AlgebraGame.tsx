"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AlgebraGame({ onProgressUpdate }: { onProgressUpdate: (progress: number) => void }) {
  const [equation, setEquation] = useState({ x: 0, y: 0, result: 0 })
  const [userAnswer, setUserAnswer] = useState("")
  const [feedback, setFeedback] = useState("")
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [level, setLevel] = useState(1)
  const [isRunning, setIsRunning] = useState(false)

  const generateEquation = useCallback(() => {
    const x = Math.floor(Math.random() * (5 * level)) + 1
    const y = Math.floor(Math.random() * (5 * level)) + 1
    const result = x + y
    setEquation({ x, y, result })
    setUserAnswer("")
    setFeedback("")
  }, [level])

  useEffect(() => {
    generateEquation()
  }, [generateEquation])

  useEffect(() => {
    if (timeLeft > 0 && isRunning) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setIsRunning(false)
      onProgressUpdate(5)
    }
  }, [timeLeft, isRunning, onProgressUpdate])

  const checkAnswer = () => {
    if (parseInt(userAnswer) === equation.x) {
      setFeedback("Correct! You're a math wizard!")
      setScore(score + 1)
      if (score + 1 >= 5 * level) {
        setLevel(level + 1)
        onProgressUpdate(10)
      }
      generateEquation()
    } else {
      setFeedback(`Not quite. Try again!`)
    }
  }

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="text-2xl text-blue-700">Algebra Adventure</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <motion.p
            className="text-xl font-semibold text-blue-700"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5 }}
          >
            Level: {level}
          </motion.p>
          <motion.p
            className="text-xl font-semibold text-blue-700"
            animate={{ scale: timeLeft <= 10 ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 0.5, repeat: timeLeft <= 10 ? Infinity : 0 }}
          >
            Time: {timeLeft}s
          </motion.p>
        </div>
        {!isRunning && timeLeft > 0 && (
          <Button onClick={() => setIsRunning(true)} className="bg-blue-500 hover:bg-blue-600 w-full">
            Start Game
          </Button>
        )}
        <motion.div
          className="text-4xl font-bold text-center"
          key={`${equation.x}-${equation.y}-${equation.result}`}
          initial={{ rotateX: 90 }}
          animate={{ rotateX: 0 }}
          transition={{ duration: 0.5 }}
        >
          x + {equation.y} = {equation.result}
        </motion.div>
        <Input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="What is x?"
          disabled={!isRunning || timeLeft === 0}
        />
        <Button
          onClick={checkAnswer}
          className="bg-blue-500 hover:bg-blue-600 w-full"
          disabled={!isRunning || timeLeft === 0}
        >
          Check Answer
        </Button>
        <div className="text-center">
          <motion.p
            className="text-xl font-semibold text-blue-700"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5 }}
          >
            Score: {score}
          </motion.p>
          <AnimatePresence>
            {feedback && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-lg text-blue-600 mt-2"
              >
                {feedback}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}


