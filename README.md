# Swarm

A beautiful swarm of pixels in your browser using Javascript!

![Swarm](screenshot.gif?raw=true)

## Install

Install Swarm by cloning / downloading this repository and then move the Swarm.js (or Swarm.min.js) file to your project's folder.

## Usage

To use swarm include the script and create a new Swarm:

```javascript
<script src="path/to/Swarm.min.js"></script>
  <script>
    var swarm = new Swarm({
      element: document.getElementById('swarmContainer'),
      backgroundColor: '#000',
      numberOfParticles: 500,
      colors: ['#105B63', '#FFD34E', '#DB9E36', '#BD4932', '#FFFFFF'],
      speed: 1,
      minSize: 3,
      maxSize: 5
    });
  </script>
```

See the example directory for a working Swarm.

## Arguments

### element
```javascript
Type: Element
Default: body
The element in which the swarm should be placed.
```

### backgroundColor
```javascript
Type: String
Default: '#000000'
The background color on which the swarm moves.
```

### numberOfParticles
```javascript
Type: Integer
Default: 100
The number of particles.
```

### colors
```javascript
Type: Array
Default: ['#105B63', '#FFD34E', '#DB9E36', '#BD4932']
The possible particle colors as strings in an array.
```

### speed
```javascript
Type: Integer
Default: 1
The movement speed of the particles.
```

### minSize
```javascript
Type: Integer
Default: 1
The minimum particle size.
```

### maxSize
```javascript
Type: Integer
Default: 5
The maximum particle size.
```
