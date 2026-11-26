import { useNavigate } from 'react-router-dom'
import '../App.css'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="game-container">
      <h1>Simon Says</h1>
      <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px', textAlign: 'center' }}>
        Проверь свою память! Запоминай последовательность цветов и повторяй её.
      </p>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <button className="start-btn" onClick={() => navigate('/game')}>
          Начать играть
        </button>
        
        <button className="start-btn btn-secondary" onClick={() => navigate('/stats')}>
          Статистика
        </button>
      </div>
    </div>
  )
}