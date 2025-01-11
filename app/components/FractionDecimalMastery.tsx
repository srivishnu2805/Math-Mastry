"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FractionDecimalMastery({ onProgressUpdate }: { onProgressUpdate: (progress: number) => void }) {
  const [fraction, setFraction] = useState({ numerator: 1, denominator: 2 })
  const [userAnswer, setUserAnswer] = useState("")
  const [feedback, setFeedback] = useState("")
  const [streak, setStreak] = useState(0)
  const [totalAttempts, setTotalAttempts] = useState(0)

  const generateFraction = () => {
    const numerator = Math.floor(Math.random() * 10) + 1
    const denominator = Math.floor(Math.random() * 10) + numerator
    setFraction({ numerator, denominator })
    setUserAnswer("")
    setFeedback("")
  }

  const checkAnswer = () => {
    const correctAnswer = fraction.numerator / fraction.denominator
    const userDecimal = parseFloat(userAnswer)
    setTotalAttempts(totalAttempts + 1)
    if (Math.abs(correctAnswer - userDecimal) < 0.01) {
      setStreak(streak + 1)
      setFeedback("Correct! Great job!")
      if (streak + 1 >= 5) {
        onProgressUpdate(10)
        setStreak(0)
      }
    } else {
      setStreak(0)
      setFeedback(`Not quite. The correct answer is ${correctAnswer.toFixed(2)}.`)
    }
  }

  return (
    <Card className="bg-purple-50 border-purple-200">
      <CardHeader>
        <CardTitle className="text-2xl text-purple-700">Fraction to Decimal Converter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div
          className="text-4xl font-bold text-center"
          key={`${fraction.numerator}-${fraction.denominator}`}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {fraction.numerator} / {fraction.denominator}
        </motion.div>
        <Input
          type="number"
          step="0.01"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Enter decimal equivalent"
        />
        <motion.p
          className="text-lg text-purple-600 text-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.5 }}
        >
          Current Streak: {streak}
        </motion.p>
        <div className="flex space-x-2 justify-center">
          <Button onClick={checkAnswer} className="bg-purple-500 hover:bg-purple-600">
            Check Answer
          </Button>
          <Button onClick={generateFraction} variant="outline" className="text-purple-600 border-purple-300">
            New Fraction
          </Button>
        </div>
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-lg text-purple-700 text-center"
            >
              {feedback}
            </motion.div>
          )}
        </AnimatePresence>
        {totalAttempts >= 20 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-2 bg-purple-100 rounded-md text-purple-700 text-center"
          >
            Great job! You've completed 20 attempts. Keep practicing to master fractions and decimals!
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

