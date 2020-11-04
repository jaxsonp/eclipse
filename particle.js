function Particle(x, y) {
  
  this.pos = createVector(x, y)
  this.lastPos = this.pos.copy()
  this.vel = p5.Vector.random2D()//createVector(0, 0)
  this.acc = createVector(0, 0)
  this.maxVel = 3//random(2.5, 3)

  this.update = function() {
  
    if (dist(this.pos.x, this.pos.y, width / 2, height / 2) < 100) {
      let f = createVector(this.pos.x - width / 2, this.pos.y - height / 2)
      f.setMag(100 - dist(this.pos.x, this.pos.y, width / 2, height / 2))
      this.applyForce(f)
    }

    this.vel.add(this.acc)
    this.vel.limit(this.maxVel)
    this.lastPos = this.pos.copy()
    this.pos.add(this.vel)
    this.acc.mult(0)

    if (this.pos.x > width) {
      this.pos.x = 0
      this.lastPos = this.pos.copy()
    }
    if (this.pos.x < 0) {
      this.pos.x = width
      this.lastPos = this.pos.copy()
    }
    if (this.pos.y > height) {
      this.pos.y = 0
      this.lastPos = this.pos.copy()
    }
    if (this.pos.y < 0) {
      this.pos.y = height
      this.lastPos = this.pos.copy()
    }
  }

  this.applyForce = function(force) {
    try {
      force.add(p5.Vector.random2D().mult(0.01))
    } catch (TypeError) { }
    this.acc.add(force)
  }

  this.display = function() {
    let col = colRef[floor(noise(this.pos.x * 0.01, this.pos.y * 0.01, colorOff) * colRef.length)]
    stroke(red(col), green(col), blue(col), 25)
    strokeWeight(1)
    line(this.pos.x, this.pos.y, this.lastPos.x, this.lastPos.y)
  }

  this.follow = function(ff) {
    let x = floor(this.pos.x / scl)
    let y = floor(this.pos.y / scl)
    let index = x + y * cols
    let v = ff[x + y * cols]
    this.applyForce(ff[index])
  }
}