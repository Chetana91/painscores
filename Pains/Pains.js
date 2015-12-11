//
// SAGE2 application: Pains
// by: Stuti and Chetana 
//
// Copyright (c) 2015
//

//menu variables

var menuSVG;

var w = 100;
var h = 100;	

var menuWidth = 600;
var menuHeight = 900;
var menuMargin = {
	top: 20, left: 20
};

var xPositionButton1 = 30;
var yPositionButton1 = 70;
var buttonWidth = 250;
var buttonHeight = 80;
var xPositionButton2 = 320;
var yPositionButton2 = 70;

var buttonCurve = 10;
var baseGap = 100;

// end of menu variables

//group variables
var groupSVG;
var marginGroup = {
	  	top: 100, right: 50, bottom: 50, left: 100, smallleft: 0.1, smallright: 0.1
	};
var groupWidth = 7200;
var groupHeight = 900;

var circleRadius = 5;

// end of group variables

//pattern variables
var patternSVG;
var marginPattern = {
	  	top: 100, right: 30, bottom: 80, left: 100, smallleft: 0.1, smallright: 0.1
	};
var patternWidth = 6000;
var patternHeight = 900;
//end of pattern variables

//individual variables
var individualSVG;
var individualWidth = 1800;
var individualHeight = 900;

var marginIndividual = {top: 100, right: 50, bottom: 170, left: 100};

//end of individual variables

var fontSize = "50px";
var fontWeight = "90";
var tickSize = 10;
var tickPadding = 10;
var legendSize = 50;

var maxID = 4851;
var prevID = -1;

function addCSS( url, callback ) {
    var fileref = document.createElement("link")
	if( callback ) fileref.onload = callback;
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", url)
	document.head.appendChild( fileref );
}

var PainScoresFinal = SAGE2_App.extend( {
	init: function(data) {
	// Create div into the DOM
	this.SAGE2Init("div", data);
	// Set the background to black
	this.element.style.backgroundColor = 'black';

	// move and resize callbacks
	this.resizeEvents = "onfinish";
	this.moveEvents   = "onfinish";

	// SAGE2 Application Settings
	//
	// Control the frame rate for an animation application
	this.maxFPS = 2.0;
	// Not adding controls but making the default buttons available
	this.controls.finishedAddingControls();
	this.enableControls = true;

	addCSS(this.resrcPath + "css/style.css");
	menuSVG = d3.select(this.element);
	groupSVG = d3.select(this.element);
	this.initializeWidgets();
	this.group();
	this.pattern(1414);
	this.individual(1234);

	},

	load: function(date) {
	console.log('Pains> Load with state value', this.state.value);
	this.refresh(date);
	},

	draw: function(date) {
	console.log('Pains> Draw with state value', this.state.value);
	var clientHeight = this.element.clientHeight;
	var clientWidth = this.element.clientWidth; 
	
	console.log(clientHeight+"Client height");
	console.log(clientWidth+"Client width");
	if((clientWidth < 600) && (clientHeight < 400)) {
	console.log("Inside the re-draw");
	

	
	}

	/*if(this.element.clientHeight > 300 && this.element.clientWidth >400) {
	d3.selectAll(this.element).remove();
	this.button(200,200,400,300);
	}*/
	},

	resize: function(date) {
	this.refresh(date);
	},
	move: function(date) {
	this.refresh(date);
	},

	quit: function() {
	// Make sure to delete stuff (timers, ...)
	},

	event: function(eventType, position, user_id, data, date) {
	if (eventType === "pointerPress" && (data.button === "left")) {
	this.handleMousePress(position,data,date);
	}
	else if (eventType === "pointerMove" && this.dragging) {
	}
	else if (eventType === "pointerRelease" && (data.button === "left")) {
	}

	// Scroll events for zoom
	else if (eventType === "pointerScroll") {
	}
	else if (eventType === "widgetEvent"){
	switch (data.identifier) {
	case "PatientID":
	console.log(data.text);
	// data validate
	if(this.validatePatientID(data.text))
	this.codePatientID(data.text, date);
	else
	console.log("Invalid ID");
	break;
	default:
	console.log("No handler for:", data.identifier);
	}
	}
	else if (eventType === "keyboard") {
	if (data.character === "m") {
	this.refresh(date);
	}
	}
	else if (eventType === "specialKey") {
	if (data.code === 37 && data.state === "down") { // left
	this.refresh(date);
	}
	else if (data.code === 38 && data.state === "down") { // up
	this.refresh(date);
	}
	else if (data.code === 39 && data.state === "down") { // right
	this.refresh(date);
	}
	else if (data.code === 40 && data.state === "down") { // down
	this.refresh(date);
	}
	}
	},

	handleMousePress: function(position, data, date, groupData) {
		console.log("Button Clicked "+position.x+" * "+ position.y + "*"+date);

		if( ((position.x >= xPositionButton1 + menuMargin.left) && (position.x <= xPositionButton1 + buttonWidth + menuMargin.left))
			&& ((position.y >= yPositionButton1 + menuMargin.top) && (position.y <= yPositionButton1 + buttonHeight + menuMargin.top)) ) {
			console.log("1111 Button Clicked "+position.x+" * "+ position.y + "*"+date);
			this.pattern(1111);	
		}
		// yPositionButton1 + baseGap * (gap1-1)
		else if( ((position.x >= xPositionButton1 + menuMargin.left) && (position.x <= xPositionButton1 + buttonWidth + menuMargin.left))
			&& ((position.y >= yPositionButton1 + baseGap + menuMargin.top) && (position.y <= yPositionButton1 + menuMargin.top + buttonHeight + baseGap)) ) {
			console.log("1141 Button Clicked "+position.x+" * "+ position.y + "*"+date);
			this.pattern(1141);	
		}
		else if( ((position.x >= xPositionButton1 + menuMargin.left) && (position.x <= xPositionButton1 + buttonWidth + menuMargin.left))
			&& ((position.y >= yPositionButton1 + 2*baseGap + menuMargin.top) && (position.y <= yPositionButton1 + menuMargin.top + buttonHeight + 2*baseGap)) ) {
			console.log("1411 Button Clicked "+position.x+" * "+ position.y + "*"+date);
			this.pattern(1411);	
		}
		else if( ((position.x >= xPositionButton1 + menuMargin.left) && (position.x <= xPositionButton1 + buttonWidth + menuMargin.left))
			&& ((position.y >= yPositionButton1 + 3*baseGap + menuMargin.top) && (position.y <= yPositionButton1 + menuMargin.top + buttonHeight + 3*baseGap)) ) {
			console.log("Button Clicked "+position.x+" * "+ position.y + "*"+date);
			this.pattern(1441);	
		}
		else if( ((position.x >= xPositionButton1 + menuMargin.left) && (position.x <= xPositionButton1 + buttonWidth + menuMargin.left))
			&& ((position.y >= yPositionButton1 + 4*baseGap + menuMargin.top) && (position.y <= yPositionButton1 + menuMargin.top + buttonHeight + 4*baseGap)) ) {
			console.log("Button Clicked "+position.x+" * "+ position.y + "*"+date);
			this.pattern(4111);	
		}
		else if( ((position.x >= xPositionButton1 + menuMargin.left) && (position.x <= xPositionButton1 + buttonWidth + menuMargin.left))
			&& ((position.y >= yPositionButton1 + 5*baseGap + menuMargin.top) && (position.y <= yPositionButton1 + menuMargin.top + buttonHeight + 5*baseGap)) ) {
			console.log("Button Clicked "+position.x+" * "+ position.y + "*"+date);
			this.pattern(4141);	
		}
		else if( ((position.x >= xPositionButton1 + menuMargin.left) && (position.x <= xPositionButton1 + buttonWidth + menuMargin.left))
			&& ((position.y >= yPositionButton1 + 6*baseGap + menuMargin.top) && (position.y <= yPositionButton1 + menuMargin.top + buttonHeight + 6*baseGap)) ) {
			console.log("Button Clicked "+position.x+" * "+ position.y + "*"+date);
			this.pattern(4411);	
		}
		else if( ((position.x >= xPositionButton1 + menuMargin.left) && (position.x <= xPositionButton1 + buttonWidth + menuMargin.left))
			&& ((position.y >= yPositionButton1 + 7*baseGap + menuMargin.top) && (position.y <= yPositionButton1 + menuMargin.top + buttonHeight + 7*baseGap)) ) {
			console.log("Button Clicked "+position.x+" * "+ position.y + "*"+date);
			this.pattern(4441);	
		}
		if( ((position.x >= xPositionButton2 + menuMargin.left) && (position.x <= xPositionButton2 + buttonWidth + menuMargin.left))
			&& ((position.y >= yPositionButton2 + menuMargin.top) && (position.y <= yPositionButton2 + buttonHeight + menuMargin.top)) ) {
			console.log("Button Clicked "+position.x+" * "+ position.y + "*"+date);
			this.pattern(1114);	
		}
		else if( ((position.x >= xPositionButton2 + menuMargin.left) && (position.x <= xPositionButton2 + buttonWidth + menuMargin.left))
			&& ((position.y >= yPositionButton2 + baseGap + menuMargin.top) && (position.y <= yPositionButton2 + menuMargin.top + buttonHeight + baseGap)) ) {
			console.log("Button Clicked "+position.x+" * "+ position.y + "*"+date);
			this.pattern(1144);	
		}
		else if( ((position.x >= xPositionButton2 + menuMargin.left) && (position.x <= xPositionButton2 + buttonWidth + menuMargin.left))
			&& ((position.y >= yPositionButton2 + 2*baseGap + menuMargin.top) && (position.y <= yPositionButton2 + menuMargin.top + buttonHeight + 2*baseGap)) ) {
			console.log("Button Clicked "+position.x+" * "+ position.y + "*"+date);
			this.pattern(1414);	
		}
		else if( ((position.x >= xPositionButton2 + menuMargin.left) && (position.x <= xPositionButton2 + buttonWidth + menuMargin.left))
			&& ((position.y >= yPositionButton2 + 3*baseGap + menuMargin.top) && (position.y <= yPositionButton2 + menuMargin.top + buttonHeight + 3*baseGap)) ) {
			console.log("Button Clicked "+position.x+" * "+ position.y + "*"+date);
			this.pattern(1444);
	
		}
		else if( ((position.x >= xPositionButton2 + menuMargin.left) && (position.x <= xPositionButton2 + buttonWidth + menuMargin.left))
			&& ((position.y >= yPositionButton2 + 4*baseGap + menuMargin.top) && (position.y <= yPositionButton2 + menuMargin.top + buttonHeight + 4*baseGap)) ) {
			console.log("Button Clicked "+position.x+" * "+ position.y + "*"+date);
			this.pattern(4114);
	
		}
		else if( ((position.x >= xPositionButton2 + menuMargin.left) && (position.x <= xPositionButton2 + buttonWidth + menuMargin.left))
			&& ((position.y >= yPositionButton2 + 5*baseGap + menuMargin.top) && (position.y <= yPositionButton2 + menuMargin.top + buttonHeight + 5*baseGap)) ) {
			console.log("Button Clicked "+position.x+" * "+ position.y + "*"+date);
			this.pattern(4144);
		}
		else if( ((position.x >= xPositionButton2 + menuMargin.left) && (position.x <= xPositionButton2 + buttonWidth + menuMargin.left))
			&& ((position.y >= yPositionButton2 + 6*baseGap + menuMargin.top) && (position.y <= yPositionButton2 + menuMargin.top + buttonHeight + 6*baseGap)) ) {
			console.log("Button Clicked "+position.x+" * "+ position.y + "*"+date);
			this.pattern(4414);
		}
		else if( ((position.x >= xPositionButton2 + menuMargin.left) && (position.x <= xPositionButton2 + buttonWidth + menuMargin.left))
			&& ((position.y >= yPositionButton2 + 7*baseGap + menuMargin.top) && (position.y <= yPositionButton2 + menuMargin.top + buttonHeight + 7*baseGap)) ) {
			console.log("Button Clicked "+position.x+" * "+ position.y + "*"+date);
			this.pattern(4444);
		}
		else
			console.log("Clicked outside the button");
	
	}, // end of handleMousePress
     //Group starting
     group: function() {

     	// SVG for MENUS

     	var menuSelection = menuSVG.append("svg")
                                .attr("width", menuWidth)
                                .attr("height", menuHeight)
                                .attr("x",0)
                                .attr("y",0)
                                .attr("class","menu")
                                .attr("style", "outline: thin solid grey;");


        var menuBar = menuSelection.append("rect")
         	.attr("x", 0)
         	.attr("y", 0)
         	.attr("width", 300)
         	.attr("height", 28)
         	.style("fill","black");
       
	
	var width = groupWidth - marginGroup.left - marginGroup.right;
	var height = groupHeight - marginGroup.top - marginGroup.bottom;

	var barPadding = 0.3;
	//console.log(width);

	var xdomain = d3.range(1,257);
	var x = d3.scale.ordinal()
	        .domain(xdomain)
	        .rangeBands([0, width], barPadding);

	var y = d3.scale.linear()
	       .rangeRound([height/2, 0]);
	//****
	var x2 = d3.scale.linear()
	
	.domain([1,257])
	.range([0, width]);

	var y2 = d3.scale.linear()
	       .rangeRound([0, height/2]);

	var color = d3.scale.ordinal()
	.range(["#FFADAD", "#FF5C5C", "#E00000", "#660000"]);

	var groups = d3.scale.ordinal()
	             .range(["#FFADAD", "#FF5C5C", "#E00000", "#660000"]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom")
	.tickSize(tickSize)
	.tickPadding(tickPadding);

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left")
	    .ticks(4);

	//****
	var y2Axis = d3.svg.axis()
	    .scale(y2)
	    .orient("left")
	    .ticks(10);

	groupSVG= d3.select(this.element).append("svg")
	    .attr("width", width + marginGroup.left + marginGroup.right)
	    .attr("height", height + marginGroup.top + marginGroup.bottom)
	    .attr("class","group")
	    .attr("x", 0)
	    .attr("y",0)
	    .attr("style", "outline: thin solid grey;")
	      .append("g")
	      .attr("transform", "translate(" + marginGroup.left + "," + marginGroup.top + ")");
	  
	groupSVG.append("text")
	   .attr("x",(width/4))
	   .attr("y",0-(marginGroup.top / 2))
	   .attr("text-anchor","middle")
	   .style("font-size", fontSize)
	   .style("fill","white")
	   .style("font-weight", fontWeight)
	   .style("text-decoration", "underline")
	   .text("Grouped Pain Scores");
	
	var count = 0;
	var gap1 = 0;
	var gap2 = 0;
	

	d3.csv(this.resrcPath + "/data/count3.csv", function(error, data) {
	  	if (error) throw error;

var buttonSelection;

	// Text on the menuSelection (Pattern Buttons)
	menuSelection.append("text")

	.attr("x", menuWidth/3.5)
 	.attr("y", yPositionButton1/1.6)
	.append("tspan")
 	.style("fill","white")
 	.style("font-size",fontSize)
 	.style("font-weight",fontWeight)
 	.text("Pattern Buttons" );
	
	data.forEach(function(d) {
    //console.log("Displaying category");
    //console.log(d.category);
    var category = d.category;
	if(d.count != 0) {
	count = count + 1;
	
	
	//console.log(count);



      if(! (count % 2 == 0)) {
      	gap1 = gap1 + 1;
	 buttonSelection = menuSelection.append("rect")
 	   	.attr("x", xPositionButton1)
 	   	.attr("y", yPositionButton1 + (gap1-1)*baseGap)
 	   	.attr("rx", buttonCurve)
 	   	.attr("ry", buttonCurve)
                                   .attr("width", buttonWidth)
                                   .attr("height", buttonHeight)
                                  .style("fill", "grey");
        console.log("PATTERN: "+d.category+", x: "+xPositionButton1+" y: "+(yPositionButton1 + (gap1-1)*baseGap));
        console.log(baseGap);
        console.log(gap1-1);
        console.log((gap1-1)*baseGap);
        console.log("PATTERN: "+d.category+", width: "+(xPositionButton1+buttonWidth)+" height: "+(buttonHeight + yPositionButton1 + baseGap * (gap1-1))) ;

        	menuSelection.append("text")

	.attr("x", xPositionButton1+ buttonWidth/5)
 	.attr("y",  yPositionButton1 + (gap1-1)*baseGap + buttonHeight/2.5 )
	.append("tspan")
 	.style("fill","white")
 	.text("Pattern:" + d.category)
	.style("font-size","30px")

	.append("tspan")
	.attr("x", xPositionButton1 + buttonWidth/5)
 	.attr("y",  yPositionButton1 + (gap1-1)*baseGap +buttonHeight/1.2 )
	.text("Count:" + d.count)
	.style("font-size","30px");
	} // end of if

	else {
	gap2 = gap2 + 1;
	buttonSelection = menuSelection.append("rect")
	.attr("x", xPositionButton2)
 	   	.attr("y", yPositionButton2 + baseGap * (gap2-1))
 	   	.attr("rx", buttonCurve)
 	   	.attr("ry", buttonCurve)
                                   	.attr("width", buttonWidth)
                                   	.attr("height", buttonHeight)
                                   	.attr("transform", "translate(0, 0 )")
                                  	.style("fill", "grey");
        

        	menuSelection.append("text")
	
	.attr("x", xPositionButton2 + buttonWidth/5)
 	.attr("y", yPositionButton2 + (gap2-1)*baseGap + buttonHeight/2.5)
 	.attr("transform", "translate(0, 0)")
        	/*.attr("x", xPositionButton2)
        	.attr("y", (yPositionButton2 * gap2) - yPositionButton1/2 )*/
	.append("tspan")
 	.style("fill","white")
 	.text("Pattern:" + d.category)
	.style("font-size","30px")

	.append("tspan")
	.attr("x", xPositionButton2 + buttonWidth/5)
 	.attr("y", yPositionButton2 + (gap2-1)*baseGap + buttonHeight/1.2 )
 	.attr("transform", "translate(0, 0)")
	/*.attr("x", xPositionButton2)
	.attr("y", yPositionButton2 * gap2)*/
	.text("Count:" + d.count)
	.style("font-size","30px");
	}
	
	}

  });  //end of dynamic buttons generation */


	  color.domain(d3.keys(data[0]).filter(function(key) {
	    return key=="cat1" || key == "cat2" || key == "cat3" || key == "cat4";
	  }));

	  groups.domain(["[0,4]", "(4,6]", "(6,8]", "(8,10]"]);



	  data.forEach(function(d) {
	    var y0 = 0;
	    d.scores = color.domain().map(function(name) { return {name: d.category, y0: y0, y1: y0 += 0.5, 0: d.cat1, 1: d.cat2, 2: d.cat3, 3: d.cat4}; });
	  });
	  y.domain([0, 2]);


	  //****
	  var max = d3.max(data, function(d) { return +d.count;} );
	  y2.domain([0, max]);

	  groupSVG.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      /*.call(xAxis)
	      
	      .selectAll("text")  
	            .style("text-anchor", "end")
	            .style("font", "10px sans-serif")
	            .attr("dx", "-.8em")
	            .attr("dy", ".15em")
	            .attr("transform", "rotate(-80)" )*/;

	  groupSVG.append("g")
	      .attr("class", "y axis")
	      .call(yAxis)

	  groupSVG.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      /*.call(xAxis)
	      
	      .selectAll("text")  
	            .style("text-anchor", "end")
	            .style("font", "10px sans-serif")
	            .style("fill","white")
	            .attr("dx", "-.8em")
	            .attr("dy", ".15em")
	            .attr("transform", "rotate(-80)" )*/;

	  groupSVG.append("g")
	      .attr("class", "y axis")
	      .call(yAxis);

	//****

	  groupSVG.append("g")
	      .attr("class", "y axis")
	      .attr("transform", "translate(0," + (height/2) + ")")
	      .call(y2Axis);

            groupSVG.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("x", function(d) {
                    return x2(d.NO);  // Location of x
                })
                .attr("y", function(d) {
                    return y2(d.count)+height/2;  // Location of y
                })
                .attr("r", circleRadius)  // Radius
                .attr("cx", function(d) {
                  
                  //console.log("cx "+x2(d.NO))
                    return x2(d.NO);  // Returns scaled circle x
                })
                .attr("cy", function(d) {
                    return y2(d.count)+height/2;  // Returns scaled circle y
                })
                .style("fill","white")
                /*.attr("transform", "translate(0,-500)")*/;



                var lineFunc = d3.svg.line()
                  .x(function (d) {
                    return x2(d.NO);
                  })
                  .y(function (d) {
                    return y2(d.count)+height/2;
                  })
                  .interpolate('monotone');

                groupSVG.append("svg:path")
                  .attr("d", lineFunc(data))
                  .attr("stroke", "blue")
                  .attr("stroke-width", 5)
                  .attr("fill", "none");

	  var no = groupSVG.selectAll(".no")
	      .data(data)
	      .enter().append("g")
	        .attr("class", "g")
	        .attr("transform", function(d) {
	            return "translate(" + x(d.NO) + ",0)";
	        });

	  no.selectAll("rect")
	      .data(function(d) { return d.scores; })
	      .enter().append("rect")
	        .attr("width", x.rangeBand())
	        .attr("y", function(d) { return y(d.y1); })
	        .attr("height", function(d) { return y(d.y0) - y(d.y1); })
	        .attr("transform", "translate(-10,0)")
	        .style("fill", function (d, i) {

	        /*AHA MY TRICK GOES HERE
*/	        return color(d[i]);
	      });
	  

	  var legend = groupSVG.selectAll(".legend")
	      .data(groups.domain().slice())
	      .enter().append("g")
	        .attr("class", "legend")
	        .attr("transform", function(d, i) { return "translate("+ ((i * 150) + (width/2)-50)  +"," + (-marginGroup.top ) + ")"; });

	  legend.append("rect")
	      .attr("width", legendSize)
	      .attr("height", legendSize)
	      .style("fill", function (d, i) {
	        return color(i+1);
	      });

	  legend.append("text")
	    .attr("dx", -1)
	    .attr("dy", ".8em")
	    .style("text-anchor", "end")
	    .style("fill","white")
	    .text(function(d) { return d; });

	    groupSVG.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+-marginGroup.left/2 +","+(groupHeight/4 +marginIndividual.top - marginIndividual.bottom)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
            .style("fill","white")
            .text("Days(hr) -->")
			.attr("class", "axisText");

            groupSVG.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+-marginGroup.left/1.4 +","+(groupHeight/2 +marginIndividual.top + marginIndividual.bottom/4)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
            .style("fill","white")
            .text("<--Patient Counts")
			.attr("class", "axisText");

            groupSVG.append("text")
            .attr("text-anchor", "middle") 
            .style("fill","white")
            .attr("transform", "translate("+ (groupWidth/2 - marginGroup.left - marginGroup.right) +","+ (groupHeight - marginGroup.top - marginGroup.bottom + 40)+")")  // centre below axis
            .text("Patient ID -->")
			.attr("class", "axisText");


	});      

	}, //end of the Group Graph

/*---------------------------------------------------------------------------------------------------------------------------------------------------*/

pattern: function(category) {
	
	d3.selectAll(".pattern").remove();
	d3.selectAll(".individual").remove();

    var width = patternWidth - marginPattern.left - marginPattern.right; //*** 6000
    var height = patternHeight - marginPattern.top - marginPattern.bottom; //*** 1500	 

    var barPadding = 0.3;

    var x = d3.scale.ordinal()
      .rangeBands([0, width], barPadding);

    var y = d3.scale.linear()
      .rangeRound([height, 0]);

    var color = d3.scale.ordinal()
    	.range(["#FFADAD", "#FF5C5C", "#E00000", "#660000"]);

    var groups = d3.scale.ordinal()
      .range(["#FFADAD", "#FF5C5C", "#E00000", "#660000"]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickSize(10)
      .tickPadding(10);

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickSize(10)
      .tickPadding(15)
      .tickValues([0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2])
      .tickFormat(d3.format(".3g"));

    patternSVG = d3.select(this.element).append("svg")
	   .attr("class","pattern")
      	   .attr("width", width + marginPattern.left + marginPattern.right)
      	   .attr("height", height + marginPattern.top + marginPattern.bottom)
      	   .attr("x",0)
      	   .attr("y",0)
      	   .attr("style", "outline: thin solid grey;")
      	   //.attr("class","pattern")
      	   .append("g")
      	   .attr("transform", "translate(" + marginPattern.left + "," + marginPattern.top + ")");
	  
	patternSVG.append("text")
	   .attr("x",(width/4))
	   .attr("y",0-(marginPattern.top / 2))
	   .attr("text-anchor","middle")
	   .style("font-size", fontSize)
	   .style("font-weight", fontWeight)
	   .style("fill","white")
	   .style("text-decoration", "underline")
	   .text("Pain Scores for Pattern: "+category);

	  var fileName =this.resrcPath +"data/avg_" + category +".csv";
    d3.csv(fileName, function(error, data) {

      if (error) throw error;

      color.domain(d3.keys(data[0]).filter(function(key) { 
        return key == "Zero" || key == "Point25" || key == "Point5" || key == "Point75" || key == "One" || key == "OnePoint25" || key == "OnePoint5" || key == "OnePoint75";

      }));

      groups.domain(["[0,4]", "(4,6]", "(6,8]", "(8,10]"]);



      data.forEach(function(d) {

        var y0 = 0;
    //console.log(d);
    d.scores = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += 0.25, 0: d.Zero, 1: d.Point25, 2: d.Point5, 3: d.Point75, 4: d.One, 5: d.OnePoint25, 6: d.OnePoint5, 7: d.OnePoint75}; });
   
    d.total = d.scores[d.scores.length - 1].y1;
    //console.log(d.total);
      });

      x.domain(data.map(function(d) { return d.ID; }));
      var maxX = d3.max(data, function(d) { return +d.NO; })
      var minX = d3.min(data, function(d) { return +d.NO; })
      //console.log("maxX "+maxX);
      y.domain([0, 2]);

      patternSVG.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)

      .selectAll("text")
        .style("text-anchor", "end")
        .style("font", "10px sans-serif")
        .attr("dx", "-.8em")
        .attr("dy", "-1em")
        .attr("transform", "rotate(-80)");

      patternSVG.append("g")
        .attr("class", "y axis")
        .call(yAxis)
    
      var id = patternSVG.selectAll(".id")
        .data(data)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform", function(d) {
          //console.log("being translated: " + x(d.ID));
          return "translate(" + x(d.ID) + ",0)";
        });

      id.selectAll("rect")
        .data(function(d) {
          return d.scores;
        })
        .enter().append("rect")
        .attr("width", x.rangeBand())
        .attr("y", function(d) {
          return y(d.y1);
        })
        .attr("height", function(d) {
          return y(d.y0) - y(d.y1);
        })
        .style("fill", function(d, i) {
          if (d[i]>=0 && d[i]<=4) {
          //console.log("case 0-4");
          return color(0);
        }
        else if (d[i]>4 && d[i]<=6) {
          //console.log("case 4-6");
          return color(1);
        }
        else if (d[i]>6 && d[i]<=8) {
          //console.log("case 6-8");
          return color(2);
        }
        else if (d[i]>8 && d[i]<=10) {
          return color(3);
        }
        });

        console.log(color.range());
        console.log(color(0));
        console.log(color(1));
        console.log(color(2));
        console.log(color(3));

        patternSVG.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+-marginPattern.left/1.5 +","+(patternHeight/2 -marginPattern.top - marginPattern.bottom)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
            .style("fill","white")
            .text("Time (in hours) -->")
			.attr("class", "axisText");

            patternSVG.append("text")
            .attr("text-anchor", "middle") 
            .style("fill","white")
            .attr("transform", "translate("+ (patternWidth/2 - marginPattern.left - marginPattern.right) +","+ (patternHeight - marginPattern.top - marginPattern.bottom + 50)+")")  // centre below axis
            .text("Patient ID -->")
			.attr("class", "axisText");

      var legend = patternSVG.selectAll(".legend")
        .data(groups.domain().slice())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) {
          return "translate(" + ((i * 150) + (width / 2) - 50) + "," + (-marginPattern.top) + ")";
        });
      legend.append("rect")
        .attr("width", legendSize)
        .attr("height", legendSize)
        .style("fill", function(d, i) {
          //console.log(i + " - " + groups(i));
          return color(i);
        });
      legend.append("text")
        .attr("dx", -2)
        .attr("dy", ".8em")
        .style("fill","white")
        .style("text-anchor", "end")
        .text(function(d) {
          return d;
        });
    });
	
	if(prevID != -1) {
		this.individual(prevID);
	}
  },

  
   initializeWidgets: function() {
	this.controls.addTextInput({value: "", label: "Enter ID", identifier: "PatientID"});
	},
  
  // Individual starts here 

  individual: function(currID) {
	  prevID = currID;
	    width = individualWidth - marginIndividual.left - marginIndividual.right,
	    height = individualHeight - marginIndividual.top - marginIndividual.bottom;

	xRange = d3.scale.linear()
	  .range([0, width])
	  .domain([0,2]),

	yRange = d3.scale.linear()
	  .range([height, 0])
	  .domain([0,10]),

	xAxis1 = d3.svg.axis()
	  .scale(xRange)
	  .orient("bottom")
	  .innerTickSize(-height)
	  .outerTickSize(10)
	  .tickSubdivide(true)
	  .tickPadding(15);

	yAxis1 = d3.svg.axis()
	  .scale(yRange)
	  .orient("left")
	  .innerTickSize(-width)
	  .outerTickSize(10)
	  .tickSubdivide(true)
	  .tickPadding(15);

	  d3.selectAll(".individual").remove();

	svgIndividual = d3.select(this.element).append("svg")
	.attr("class","individual")
	  .attr("width", width + marginIndividual.left + marginIndividual.right)
	  .attr("height", height + marginIndividual.top + marginIndividual.bottom)
	  .attr("style", "outline: thin solid grey;")
	  .append("g")
	  .attr("transform", "translate(" + marginIndividual.left + "," + marginIndividual.top + ")");
	  
	  svgIndividual.append("text")
	   .attr("x",(width/3))
	   .attr("y",0-(marginIndividual.top / 2))
	   .attr("text-anchor","middle")
	   .style("font-size", fontSize)
	   .style("font-weight", fontWeight)
	   .style("text-decoration", "underline")
	   .style("fill","white")
	   .text("Pain Trajectory for Patient ID: "+currID);

	svgIndividual.append("svg:g")
	  .attr("class", "x axis")
	  .attr("transform", "translate(0," + height + ")")
	  .call(xAxis1);

	svgIndividual.append("svg:g")
	  .attr("class", "y axis")
	  .call(yAxis1);


	var info = svgIndividual.append("rect").
            	attr("width",400).
            	attr("height",100).
            	style("fill", "black").
            	style("stroke","grey").
            	attr("transform", "translate("+ (0) +","+ (individualHeight - marginIndividual.top - marginIndividual.bottom + marginIndividual.bottom/3 )+")");


	d3.csv(this.resrcPath + "data/cs522_simulateddata.csv", function(error, allData) {
	  if (error) throw error;
	  var data;

	  data = allData.filter(function(d) {
	        return d.ID == currID;
	    })
	
	  var individualMedication = data[0].MedStatus;
	  var individualAgeGroup = data[0].AgeGroup;
	  var med;

	  if(individualMedication == 1) 
	  	med = "Opioids";
	  else if(individualMedication == 2)
	  	med = "No Opioids";
	  else
	  	med = "No Medication";


	  maxID = d3.max(allData, function(d) { return +d.ID;} );

	  
	  //console.log("maxID: "+maxID);

	  svgIndividual.selectAll("circle")
	    .data(data)
	    .enter()
	    .append("circle")
	    .attr("x", function(d) { //console.log(d.Days);
	     return xRange(d.Days); })
	    .attr("y", function(d) { return yRange(d.Score); })
	    .attr("r", 6)  // Radius
	    .attr("cx", function(d) { return xRange(d.Days); })
	    .attr("cy", function(d) { return yRange(d.Score); })
	    .style("fill","blue");

	  var lineFunc = d3.svg.line()
	    .x( function (d) { return xRange(d.Days); })
	    .y( function (d) { return yRange(d.Score); })
	    .interpolate('monotone');

	  svgIndividual.append("svg:path")
	    .attr("d", lineFunc(data))
	    .attr("stroke", "#47B3DD")
	    .attr("stroke-width", 4)
	    .attr("fill", "none");

	    svgIndividual.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+-marginIndividual.left/2 +","+(individualHeight/1.3 -marginIndividual.top - marginIndividual.bottom)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
            .style("fill","white")
            .text("Pain Score -->")
			.attr("class", "axisText");

            svgIndividual.append("text")
            .attr("text-anchor", "middle") 
            .style("fill","white")
            .attr("transform", "translate("+ (individualWidth/2 - marginIndividual.left - marginIndividual.right) +","+ (individualHeight - marginIndividual.top - marginIndividual.bottom + 50)+")")  // centre below axis
            .text("Time (in hours) --->")
			.attr("class", "axisText");


	  console.log(individualMedication + "Med");
	  console.log(individualAgeGroup + "Age");
            svgIndividual.append("text")
        	.attr("x", 0)
 	.attr("y",  -5)
 	.style("fill","white")
	.attr("transform", "translate("+ (0) +","+ (individualHeight - marginIndividual.top - marginIndividual.bottom + marginIndividual.bottom/3 )+")")
 	.text("Patient Details:")
	.attr("class", "axisText")


        	.append("tspan")
 	.attr("x", 0)
 	.attr("y",  30)
 	.style("fill","white")
 	.text("Age Group (in years):  " + individualAgeGroup)
		//.attr("transform", "translate("+ (0) +","+ (individualHeight - marginIndividual.top - marginIndividual.bottom + marginIndividual.bottom/2 )+")")
	.attr("class", "axisText")

 	.append("tspan")
 	.attr("x", 0)
 	.attr("y",80)
	.text("Medication:  " + med)
	//.attr("transform", "translate(20,"+ (individualHeight - marginIndividual.top - marginIndividual.bottom + marginIndividual.bottom/3 )+")")
	.attr("class", "axisText");


	});

	},
	// ---------------------------------END OF INDIVIDUAL FUNTION----------------------
	codePatientID: function(text) {
	console.log("Function to redraw the line graph "+text);
	this.individual(text);

	},
	validatePatientID: function(text) {
	// console.log("Function to redraw the line graph "+text);
	// boolean result = /^\+?\d+$/.test(text);
	// console.log("test 1 "+result);
	// if(result) {
	if(text.length<5) {
	var id = ~~Number(text);
	if(id>0&&id<=maxID) {
	return true;
	}
	else {
	return false;
	}
	}
	else {
	return false;
	}
	// }
	// return false;
	}
});