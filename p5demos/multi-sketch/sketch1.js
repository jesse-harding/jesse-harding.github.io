let sketch = function(p) {
  
  p.setup = function() {
    
    var cnv = p.createCanvas(200, 200);
    cnv.parent('sketch1');
    cnv.position(150, 100);
  };

  p.draw = function() {
    p.background(0);
    p.fill(200);
    p.rect(p.width/2-25, p.height/2-25, 50, 50);
  };
};

new p5(sketch);
