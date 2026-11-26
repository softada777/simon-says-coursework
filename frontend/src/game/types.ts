// Типы для будущей игровой физики
export type Color = 'red' | 'green' | 'blue' | 'yellow'

export interface GameConfig {
  baseSpeed: number
  maxSpeed: number
}

export interface GameState {
  sequence: Color[]
  userSequence: Color[]
  currentLevel: number
  record: number
  isShowing: boolean
}