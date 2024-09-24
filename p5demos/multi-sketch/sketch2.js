let sketch2 = function(p) {

  p.setup = function() {
    var cnv = p.createCanvas(200, 200);
    cnv.parent('sketch2')
  };

  p.draw = function() {
    p.background(200);
    p.fill(0);
    p.rect(p.width/2-25, p.height/2-25, 50, 50);
  };
};

new p5(sketch2);
