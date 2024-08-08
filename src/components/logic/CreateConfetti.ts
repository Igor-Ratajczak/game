interface Confetti {
  x: number
  y: number
  width: number
  height: number
  r: number
  line_x: number
  line_y: number
  color: string
  tilt: number
  speed: number
  direction: 'up' | 'down'
  figures: string
}
/**
 * Confetti Animation
 */
export class ConfettiAnimation {
  private canvasWidth = window.innerWidth
  private canvasHeight = window.innerHeight
  private confettis: Confetti[] = []
  private canvas: HTMLCanvasElement =
    document.querySelector('canvas') || document.createElement('canvas')
  private ctx = this.canvas.getContext('2d')
  private animationFrameId: number | null = null

  constructor() {
    this.canvas.width = this.canvasWidth
    this.canvas.height = this.canvasHeight
    if (!document.body.contains(this.canvas)) {
      document.body.appendChild(this.canvas)
    }
    window.addEventListener('resize', this.onResize)
  }
  // Start animation
  public start = () => {
    this.createConfettis()
    if (this.animationFrameId === null) {
      this.animate()
    }
  }
  // Create confettis
  public createConfettis = () => {
    for (let index = 0; index < 300; index++) {
      this.confettis.push(this.createConfetti())
    }
  }
  // Create confetti
  private createConfetti = (): Confetti => {
    const colors = ['#FFC107', '#FF3D00', '#4CAF50', '#2196F3']
    const figures = ['triangle', 'rectangle', 'circle']

    return {
      x: this.canvasWidth / 2,
      y: this.canvasHeight / 2,
      width: Math.random() * 20,
      height: Math.random() * 20,
      line_x: Math.random() * 2,
      line_y: Math.random() * 2,
      r: Math.PI * 3 * Math.random(),
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 30 - 15,
      speed: Math.random() * 3 + 5,
      direction: 'up',
      figures: figures[Math.floor(Math.random() * figures.length)],
    }
  }
  // Animate
  private animate = () => {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
      this.confettis.forEach((confetti) => {
        if (this.ctx) {
          switch (confetti.figures) {
            case 'triangle':
              this.ctx.beginPath()
              this.ctx.moveTo(confetti.x, confetti.y - confetti.height) // Top vertex
              this.ctx.lineTo(
                confetti.x - confetti.width / 2,
                confetti.y + confetti.height / 2
              ) // Bottom left vertex
              this.ctx.lineTo(
                confetti.x + confetti.width / 2,
                confetti.y + confetti.height / 2
              ) // Bottom right vertex
              this.ctx.closePath()
              this.ctx.lineWidth = 1
              this.ctx.stroke()
              this.ctx.fillStyle = confetti.color
              this.ctx.fill()
              break
            case 'rectangle':
              this.ctx.beginPath()
              this.ctx.fillRect(
                confetti.x,
                confetti.y,
                confetti.width,
                confetti.height
              )
              this.ctx.fillStyle = confetti.color
              this.ctx.fill()
              break
            case 'circle':
              this.ctx.beginPath()
              this.ctx.arc(confetti.x, confetti.y, confetti.r, 0, Math.PI * 2)
              this.ctx.fillStyle = confetti.color
              this.ctx.fill()
              break
          }

          // this.ctx.rect(confetti.x, confetti.y, confetti.width, confetti.height)

          if (confetti.direction === 'up') {
            confetti.y -= confetti.speed
            confetti.speed -= 0.1
            confetti.tilt += Math.random() * 0.01
            confetti.x += Math.cos(confetti.tilt) * 3

            if (confetti.speed < 0) {
              confetti.direction = 'down'
              confetti.speed = Math.random() * 3 + 2
              confetti.tilt += Math.random() * 0.01
              confetti.x += Math.sin(confetti.tilt) * 3
            }
          } else {
            confetti.y += confetti.speed
            confetti.tilt += Math.random() * 0.01
            confetti.x += Math.sin(confetti.tilt) * 3
          }
        }
      })
      this.animationFrameId = requestAnimationFrame(this.animate)
    }
  }
  // On resize change canvas size
  private onResize = () => {
    this.canvasWidth = window.innerWidth
    this.canvasHeight = window.innerHeight
    this.canvas.width = this.canvasWidth
    this.canvas.height = this.canvasHeight
  }
}

const startConfetti = new ConfettiAnimation()
/**
 * Function to show confetti animation
 */

export const showConfetti = () => {
  startConfetti.start()
}
