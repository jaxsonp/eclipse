
let zoff = 0
let colorOff = 0
let inc = 0.1
let scl = 10
let cols, rows
let particles = []
let flowFeild = []
let colRef = new Array(150)

function setup() {
  
  createCanvas(400, 400)
  pixelDensity(1)
  frameRate(60)

  cols = floor(width / scl)
  rows = floor(height / scl)
  flowFeild = new Array(cols * rows)
  for (let i = 0; i < 1000; i++) {
    particles[i] = new Particle(random(width), random(height))
  }
  for (let i = 0; i < 15; i++) {
    colRef[i] = color(0, 145, 255)
  }
  for (let i = 0; i < 35; i++) {
    colRef[i + 15] = lerpColor(color(0, 145, 255), color(255, 188, 64), i / 35)
  }
  for (let i = 0; i < 100; i++) {
    colRef[i + 50] = lerpColor(color(255, 188, 64), color(255, 34, 34), i / 100)
  }
  background(15)
}

function draw() {

  background(0, 10)
  //print(frameRate())
  let yoff = 0
  for (let y = 0; y < cols; y++) {
    let xoff = 0
    for (let x = 0; x < rows; x++) {
      let index = x + y * cols
      let ang = noise(xoff, yoff, zoff) * TWO_PI + HALF_PI
      let v = p5.Vector.fromAngle(ang)
      v.mag(0.02)
      flowFeild[index] = v
      xoff += inc
    }
    yoff += inc
  }
  zoff += 0.03

  let rand = floor(random(particles.length))
  particles[rand] = new Particle(random(width), random(height))
  while(dist(particles[rand].pos.x, particles[rand].pos.y, width / 2, height / 2) < 100) {
    particles[rand] = new Particle(random(width), random(height))
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].update()
    particles[i].follow(flowFeild)
    particles[i].display()
  }
  colorOff += 0.02

  if (mouseIsPressed) {
    //saveCanvas('Img', 'png')
  }
}
