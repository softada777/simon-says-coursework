import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

interface GameResult {
  date: string
  score: number
}

export default function StatsPage() {
  const [stats, setStats] = useState<GameResult[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('simon_stats') || '[]')
    setStats(saved.reverse())
  }, [])

  const clearStats = () => {
    localStorage.removeItem('simon_stats')
    setStats([])
  }

  return (
    <div className="game-container">
      <button className="back-btn" onClick={() => navigate('/')}>← На главную</button>
      <h1>Статистика</h1>

      {stats.length === 0 ? (
        <p style={{ fontSize: '18px', color: '#888' }}>Пока нет сыгранных игр.</p>
      ) : (
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: '300px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: '#555' }}>Дата</th>
                <th style={{ padding: '12px', textAlign: 'right', color: '#555' }}>Рекорд</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((s, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '12px', color: '#333' }}>{s.date}</td>
                  <td style={{ padding: '12px', fontWeight: 'bold', textAlign: 'right', color: '#2ecc71' }}>{s.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {stats.length > 0 && (
        <button className="start-btn btn-danger" onClick={clearStats}>
          Очистить историю
        </button>
      )}
    </div>
  )
}