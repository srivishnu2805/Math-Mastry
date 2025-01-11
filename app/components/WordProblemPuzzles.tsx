"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const wordProblems = [
  {
    problem: "Sarah has 5 apples. She gives 2 to her friend. How many apples does Sarah have left?",
    answer: 3,
    hint: "Think about subtraction: start with the total and take away what was given."
  },
  {
    problem: "A train travels 60 miles per hour. How far will it travel in 2 hours?",
    answer: 120,
    hint: "Use multiplication: speed multiplied by time gives you distance."
  },
  {
    problem: "Tom has $15. He wants to buy a book that costs $8 and a pen that costs $3. How much money will he have left?",
    answer: 4,
    hint: "Add up the total cost of items, then subtract from the initial amount."
  },
]

export default function WordProblemPuzzles({ onProgressUpdate }: { onProgressUpdate: (progress: number) => void }) {
  const [currentProblem, setCurrentProblem] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [feedback, setFeedback] = useState("")
  const [hint, setHint] = useState('')
  const [hintUsed, setHintUsed] = useState(false)

  const checkAnswer = () => {
    if (parseInt(userAnswer) === wordProblems[currentProblem].answer) {
      setFeedback("Correct! You're a problem-solving pro!")
      onProgressUpdate(hintUsed ? 5 : 10)
      if (currentProblem < wordProblems.length - 1) {
        setTimeout(() => {
          setCurrentProblem(currentProblem + 1)
          setUserAnswer("")
          setFeedback("")
          setHint("")
          setHintUsed(false)
        }, 1500)
      } else {
        setFeedback("Congratulations! You've solved all the puzzles!")
      }
    } else {
      setFeedback("Not quite. Try again!")
    }
  }

  const showHint = () => {
    setHint(wordProblems[currentProblem].hint)
    setHintUsed(true)
  }

  return (
    <Card className="bg-orange-50 border-orange-200">
      <CardHeader>
        <CardTitle className="text-2xl text-orange-700">Word Problem Puzzles</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <Button onClick={showHint} variant="outline" className="text-orange-600 border-orange-300">
            Show Hint
          </Button>
          <motion.p
            className="text-lg font-semibold text-orange-700"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5 }}
          >
            Problem {currentProblem + 1} of {wordProblems.length}
          </motion.p>
        </div>
        {hint && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-orange-600 italic"
          >
            Hint: {hint}
          </motion.p>
        )}
        <motion.div
          key={currentProblem}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-lg text-orange-800"
        >
          {wordProblems[currentProblem].problem}
        </motion.div>
        <Input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Your answer"
        />
        <Button onClick={checkAnswer} className="bg-orange-500 hover:bg-orange-600 w-full">
          Check Answer
        </Button>
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-lg text-orange-600 text-center"
            >
              {feedback}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

