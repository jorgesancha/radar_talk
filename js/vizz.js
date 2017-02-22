
var width = 900, height = 600;
var centerCoords = [width/2, height/2];

var padding = 60;
var radius = d3.min([width - padding, height - padding])/2;
var svg, radar, data, angle;

var RADIAN_OFFSET = Math.PI/2;

var measureScale = d3.scaleLinear()
    .domain([0, 20])
    .range([0, radius]);

var X_1 = function(i) {
  return Math.cos(angle(i)) * radius;
}

var Y_1 = function(i) {
  return Math.sin(angle(i)) * radius;
}

var X_2 = function(i, offset) {
  if (offset === undefined) offset = 0;
  return Math.cos(angle(i) - RADIAN_OFFSET) * (radius + offset);
}

var Y_2 = function(i, offset) {
  if (offset === undefined) offset = 0;
  return Math.sin(angle(i) - RADIAN_OFFSET) * (radius + offset);
}

var X_3 = function(i, r, offset) {
  if (offset === undefined) offset = 0;
  if (r === undefined) r = radius;
  return Math.cos(angle(i) - RADIAN_OFFSET) * (r + offset);
}

var Y_3 = function(i, r, offset) {
  if (offset === undefined) offset = 0;
  if (r === undefined) r = radius;
  return Math.sin(angle(i) - RADIAN_OFFSET) * (r + offset);
}

var labelAnchor = function(d, i) {
  var topAngle = 0 - Math.PI/2;
  var bottomAngle = 0 + Math.PI/2;
  var the_angle = angle(i) - RADIAN_OFFSET;
  var anchor = "";
  if (the_angle == topAngle || the_angle == bottomAngle)
    anchor = "middle"
  else if(the_angle > topAngle && the_angle < bottomAngle)
    anchor = "start"
  else
    anchor = "end"
  return anchor;
}

function index(id) {
  data = [
    {attribute: 'Bulk Apperception', value: 14},
    {attribute: 'Candor', value: 19},
    {attribute: 'Vivacity', value: 17},
    {attribute: 'Coordination', value: 10},
    {attribute: 'Meekness', value: 2},
    {attribute: 'Humility', value: 3},
    {attribute: 'Cruelty', value: 1},
    {attribute: 'Self-Preservation', value: 10},
    {attribute: 'Patience', value: 3},
    {attribute: 'Decisiveness', value: 14},
    {attribute: 'Imagination', value: 13},
    {attribute: 'Curiosity', value: 8},
    {attribute: 'Aggression', value: 5},
    {attribute: 'Loyalty', value: 16},
    {attribute: 'Empathy', value: 9},
    {attribute: 'Tenacity', value: 17},
    {attribute: 'Courage', value: 15},
    {attribute: 'Sensuality', value: 18},
    {attribute: 'Charm', value: 18},
    {attribute: 'Humor', value: 9}
  ]

  angle = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, 2 * Math.PI])

  var chart = d3.select("[data-state=" + id +"]");
  chart.html("");

  svg = chart.selectAll("svg")
    .data([{}]).enter()
    .append("svg")
    .attr("height", height)
    .attr("width", width);

  radar = svg.append('g')
    .attr('transform',"translate(" + centerCoords[0] + "," + centerCoords[1] + ")");

  eval(id + "()")

}

function index_0() {
  var angles = d3.range(0,360,45);

  radar.append('circle')
    .classed('initial',true)
    .attr('cx',0)
    .attr('cy',0)
    .attr('r', radius);

  radar.selectAll('line.initial')
    .data(angles).enter()
    .append('line')
    .classed('initial',true)
    .attr('x0',0)
    .attr('y0',0)
    .attr('x1',function(d) { return Math.cos(d) * radius})
    .attr('y1',function(d) { return Math.sin(d) * radius});

}

function index_1() {
  var angles = d3.range(0,360,45).map(function(a) { return a * Math.PI / 180});

  radar.append('circle')
    .classed('initial',true)
    .attr('cx',0)
    .attr('cy',0)
    .attr('r', radius);

  radar.selectAll('line.initial')
    .data(angles).enter()
    .append('line')
    .classed('initial',true)
    .attr('x0',0)
    .attr('y0',0)
    .attr('x1',function(d) { return Math.cos(d) * radius})
    .attr('y1',function(d) { return Math.sin(d) * radius});
}

function index_2() {
    var angleInRadians = (360 / data.length) * Math.PI / 180;

    radar.selectAll('line.axis')
      .data(data).enter()
      .append('line')
      .classed('axis',true)
      .attr('x0',0)
      .attr('y0',0)
      .attr('x1',function(d,i) { return Math.cos(angleInRadians * i) * radius})
      .attr('y1',function(d,i) { return Math.sin(angleInRadians * i) * radius})
}

function index_3() {
  radar.selectAll('line.axis')
    .data(data).enter()
    .append('line')
    .classed('axis',true)
    .attr('x0',0)
    .attr('y0',0)
    .attr('x1',function(d,i) { return Math.cos(angle(i)) * radius})
    .attr('y1',function(d,i) { return Math.sin(angle(i)) * radius})
}

function index_4() {
  radar.selectAll('line.axis')
    .data(data).enter()
    .append('line')
    .classed('axis',true)
    .attr('x0',0)
    .attr('y0',0)
    .attr('x1',function(d,i) { return X_1(i)})
    .attr('y1',function(d,i) { return Y_1(i)})

  radar.selectAll('text.label')
    .data(data).enter()
    .append('text')
    .classed('label',true)
    .attr('x', function(d,i) { return X_1(i) })
    .attr('y', function(d,i) { return Y_1(i) })
    .text(function(d) {
      return d.attribute.toUpperCase() + " [" + d.value +"]";
    })
}

function index_41() {
  radar.selectAll('line.axis')
    .data(data).enter()
    .append('line')
    .classed('axis',true)
    .attr('x0',0)
    .attr('y0',0)
    .attr('x1',function(d,i) { return X_2(i)})
    .attr('y1',function(d,i) { return Y_2(i)})

  radar.selectAll('text.label')
    .data(data).enter()
    .append('text')
    .classed('label',true)
    .attr('x', function(d,i) { return X_2(i, 20)})
    .attr('y', function(d,i) { return Y_2(i, 20)})
    .style("text-anchor", labelAnchor)
    .text(function(d) {
      return d.attribute.toUpperCase() + " [" + d.value +"]";
    })
}

function index_5() {
  radar.selectAll('circle.ring')
    .data(data).enter()
    .append('circle')
    .classed('ring',true)
    .attr('cx',0)
    .attr('cy',0)
    .attr('r', function(d,i) {
      return measureScale(i + 1);
    })

  index_41();
}

function index_6() {
  index_5();
  radar.selectAll('polygon.area')
    .data([data]).enter()
    .append('polygon')
    .classed('area',true)
    .attr('points', function(d) {
      return d.map(function(d,i) {
        var rad = measureScale(d.value);
        return [X_3(i, rad), Y_3(i, rad)];
      }).join(' ');
    })
}

function index_7() {
  index_6();

  radar.selectAll('circle.point')
    .data(data).enter()
    .append('circle')
    .classed('point',true)
    .attr('cx',function(d,i) { return X_3(i,measureScale(d.value))})
    .attr('cy',function(d,i) { return Y_3(i,measureScale(d.value))})
    .attr('r', 7)

}

function index_71() {
  index_5();
  var areas = radar.selectAll('polygon.area')
    .data([data]).enter()

  areas.append('polygon')
    .classed('area',true)
    .attr('points', function(d) {
      return d.map(function() {
        return [0,0]
      }).join(' ')
    })
  .merge(areas)
    .transition()
    .duration(2500)
    .attr('points', function(d) {
      return d.map(function(d,i) {
        var rad = measureScale(d.value);
        return [X_3(i, rad), Y_3(i, rad)];
      }).join(' ');
    })

  var points = radar.selectAll('circle.point')
    .data(data).enter()

  points.append('circle')
    .classed('point',true)
    .attr('r', 7)
    .attr('cx',0)
    .attr('cy',0)
  .merge(points)
    .transition()
    .duration(2500)
    .attr('cx',function(d,i) { return X_3(i,measureScale(d.value))})
    .attr('cy',function(d,i) { return Y_3(i,measureScale(d.value))})
}

function index_72() {
  index_71();
}

Reveal.addEventListener( 'slidechanged', function( event ) {
  var state = event.currentSlide.getAttribute('data-state');
  if (state != undefined && state.indexOf('index') > -1) {
    index(state);
  }
});
