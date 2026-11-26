import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' // Для перехода назад
import { SignalPanel, ProgressIndicator } from '@my-app/ui-library'
import type { SignalColor } from '@my-app/ui-library'
// Импортируем стили (возможно, их придется немного поправить)
import '../App.css' 

const COLORS: SignalColor[] = ['red', 'green', 'blue', 'yellow']

export default function GamePage() {
  const [sequence, setSequence] = useState<SignalColor[]>([])
  const [userSequence, setUserSequence] = useState<SignalColor[]>([])
  const [isShowing, setIsShowing] = useState(false)
  const [activeColor, setActiveColor] = useState<SignalColor | null>(null)
  const [level, setLevel] = useState(1)
  const [record, setRecord] = useState(0)
  const [gameStatus, setGameStatus] = useState<'idle' | 'playing' | 'gameover'>('idle')
  
  const navigate = useNavigate()

  const getRandomColor = (): SignalColor => {
    return COLORS[Math.floor(Math.random() * COLORS.length)]
  }

  useEffect(() => {
    if (isShowing && sequence.length > 0) {
      let i = 0
      const interval = setInterval(() => {
        setActiveColor(sequence[i])
        setTimeout(() => setActiveColor(null), 300)
        i++
        if (i >= sequence.length) {
          clearInterval(interval)
          setTimeout(() => setIsShowing(false), 400)
        }
      }, 600)
      return () => clearInterval(interval)
    }
  }, [isShowing, sequence])

  const startGame = () => {
    const newSequence = [getRandomColor()]
    setSequence(newSequence)
    setUserSequence([])
    setLevel(1)
    setGameStatus('playing')
    setIsShowing(true)
  }

  const handleColorClick = (color: SignalColor) => {
    if (isShowing || gameStatus !== 'playing') return
    const newUserSeq = [...userSequence, color]
    const currentStepIndex = newUserSeq.length - 1

    if (color !== sequence[currentStepIndex]) {
      setGameStatus('gameover')
      const newRecord = Math.max(record, sequence.length - 1)
      setRecord(newRecord)
      
      // Сохраняем рекорд в LocalStorage для страницы статистики
      const savedStats = JSON.parse(localStorage.getItem('simon_stats') || '[]')
      savedStats.push({ date: new Date().toLocaleString(), score: newRecord })
      localStorage.setItem('simon_stats', JSON.stringify(savedStats))
      
      return
    }

    setUserSequence(newUserSeq)

    if (newUserSeq.length === sequence.length) {
      setTimeout(() => {
        setLevel(prev => prev + 1)
        const nextSequence = [...sequence, getRandomColor()]
        setSequence(nextSequence)
        setUserSequence([])
        setIsShowing(true)
      }, 1000)
    }
  }

  return (
    <div className="game-container">
      {/* Кнопка возврата на главную */}
      <button className="back-btn" onClick={() => navigate('/')}>← На главную</button>
      
      <h1>Simon Says</h1>
      
      <ProgressIndicator level={level} sequenceLength={sequence.length} record={record} />

      <div className="status-text">
        {gameStatus === 'idle' && 'Нажми "Начать игру", чтобы играть'}
        {gameStatus === 'playing' && (isShowing ? 'Смотри и запоминай!' : 'Твой ход!')}
        {gameStatus === 'gameover' && 'Игра окончена! Нажми "Начать игру", чтобы попробовать снова'}
      </div>

      <SignalPanel
        activeColor={activeColor}
        disabled={isShowing || gameStatus !== 'playing'}
        onColorClick={handleColorClick}
      />

      {(gameStatus === 'idle' || gameStatus === 'gameover') && (
        <button className="start-btn" onClick={startGame}>
          {gameStatus === 'idle' ? 'Начать игру' : 'Играть снова'}
        </button>
      )}
    </div>
  )
}