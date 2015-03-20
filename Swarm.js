/*
  Swarm
  version: 1.0
  author: @dennispassway
  url: https://github.com/dennispassway/swarm
*/

var Swarm = function (options) {

  numberOfParticles = options.numberOfParticles || 100;

  backgroundColor = options.backgroundColor || '#000000';

  element = options.element || document.body;

  _draw = function () {
    window.requestAnimationFrame(_draw);

    this.canvasContext.fillStyle = backgroundColor;
    this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(function (particle) {
      particle.drawInCanvas(this.canvasContext);

      if (this.mouseIsPressed) {
        particle.moveToPosition(this.targetPosition, Math.random() * particle.maximumMovementSpeed);
      } else {
        particle.moveToRandomPosition(Math.random() * (particle.maximumMovementSpeed * 5));
      }
    }.bind(this));
  }.bind(this);

  _initializeCanvas = function () {
    this.canvas = document.createElement('canvas');
    this.canvas.width = Utils.getElementWidth();
    this.canvas.height = Utils.getElementHeight();

    element.innerHTML = '';
    element.appendChild(this.canvas);

    this.canvasContext = this.canvas.getContext('2d');
    this.canvasContext.fillStyle = backgroundColor;
    this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }.bind(this);

  _initializeParticles = function (options) {
    this.particles = [];

    for (var i = 0; i < numberOfParticles; i ++) {
      this.particles.push(new Particle(options));
    }
  }.bind(this);

  _initializeTargetPosition = function () {
    this.targetPosition = {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2
    };
  }.bind(this);

  _mouseMoveHandler = function (evt) {
    this.targetPosition.x = evt.offsetX;
    this.targetPosition.y = evt.offsetY;
  }.bind(this);

  _mouseClickHandler = function (evt) {
    if (evt.type == 'mousedown') {
      this.mouseIsPressed = true;
    } else if (evt.type == 'mouseup') {
      this.mouseIsPressed = false;
    }
  }.bind(this);

  _resizeHandler = function () {
    this.canvas.width = Utils.getElementWidth();
    this.canvas.height = Utils.getElementWidth();
  }.bind(this);

  initialize = function (options) {
    _initializeCanvas();
    _initializeParticles(options);
    _initializeTargetPosition();

    window.addEventListener('resize', this._resizeHandler);

    this.canvas.addEventListener('mousemove', _mouseMoveHandler);
    this.canvas.addEventListener('mousedown', _mouseClickHandler);
    this.canvas.addEventListener('mouseup', _mouseClickHandler);

    _draw();
  }.bind(this);

  var checkOptionsForErrors = function(options) {
    if (options.backgroundColor && typeof options.backgroundColor != 'string') {
      console.error("Swarm: 'backgroundColor' must be a string!");
    }

    [
      options.numberOfParticles,
      options.speed,
      options.minSize,
      options.maxSize
    ].forEach(function (number) {
      if (number && typeof number != 'number') {
        console.error("Swarm: '" + number + "' is not an integer!");
      }
    });

    if (options.colors && typeof options.colors != 'object') {
      console.error("Swarm: colors must be an array!");
    }
  };

  checkOptionsForErrors(options);

  initialize(options);

  particle = new Particle(options);

  return {
    element: element,
    numberOfParticles: numberOfParticles,
    backgroundColor: backgroundColor,
    colors: particle.colors,
    speed: particle.maximumMovementSpeed,
    minSize: particle.minimumSize,
    maxSize: particle.maximumSize
  };
};

var Particle = function (options) {
  this.colors = options.colors || ['#105B63', '#FFD34E', '#DB9E36', '#BD4932', '#FFFFFF'];
  this.maximumMovementSpeed = options.speed || 1;
  this.minimumSize = options.minSize || 2;
  this.maximumSize = options.maxSize || 10;

  this.drawInCanvas = function (canvasContext) {
    canvasContext.fillStyle = this.color;
    canvasContext.fillRect(this.position.x, this.position.y, this.size, this.size);
  };

  this.moveToPosition = function (targetPosition, time) {
    var fps = 30;

    var xDifference = Math.abs(this.position.x - targetPosition.x);
    var yDifference = Math.abs(this.position.y - targetPosition.y);

    var xMove = xDifference / (time * fps);
    var yMove = yDifference / (time * fps);

    if (this.position.x > targetPosition.x) {
      this.position.x = this.position.x - xMove;
    } else {
      this.position.x = this.position.x + xMove;
    }

    if (this.position.y > targetPosition.y) {
      this.position.y = this.position.y - yMove;
    } else {
      this.position.y = this.position.y + yMove;
    }
  };

  this.moveToRandomPosition = function (time) {
    var targetPosition = {
      x: Utils.randomXPositionInWindow(),
      y: Utils.randomYPositionInWindow()
    };

    this.moveToPosition(targetPosition, time);
  };

  this._getRandomSize = function () {
    return (Math.random() * this.maximumSize) + this.minimumSize;
  };

  this._getRandomParticleColor = function () {
    var index = Math.floor(Math.random() * this.colors.length);
    return this.colors[index];
  };

  this.size = this._getRandomSize();
  this.position = {
    x: Utils.randomXPositionInWindow(),
    y: Utils.randomYPositionInWindow()
  };
  this.color = this._getRandomParticleColor();
};

var Utils = {
  randomXPositionInWindow: function () {
    return Math.floor(Math.random() * this.getElementWidth());
  },

  randomYPositionInWindow: function () {
    return Math.floor(Math.random() * this.getElementHeight());
  },

  getElementWidth: function () {
    return element.clientWidth;
  },

  getElementHeight: function () {
    return element.clientHeight;
  }
};