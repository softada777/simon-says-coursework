// Модуль для расчета таймингов показа (в будущем здесь может быть requestAnimationFrame)
export const calculateShowDuration = (level: number): number => {
  // Чем выше уровень, тем быстрее показываем цвета
  const baseTime = 800;
  const minTime = 300;
  const duration = baseTime - (level * 50);
  return Math.max(duration, minTime);
}