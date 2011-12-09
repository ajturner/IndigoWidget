/*

Copyright _ 2005, Apple Computer, Inc.  All rights reserved.
NOTE:  Use of this source code is subject to the terms of the Software
License Agreement for Mac OS X, which accompanies the code.  Your use
of this source code signifies your agreement to such license terms and
conditions.  Except as expressly granted in the Software License Agreement
for Mac OS X, no other copyright, patent, or other intellectual property
license or right is granted, either expressly or by implication, by Apple.

*/

/**************************/
// General live-resize code
// This code shows how to implement live-resizing in a widget
/**************************/

var lastPos;		// tracks where the last mouse position was throughout the drag

// The mouseDown function is called the user clicks on the growbox.  It prepares the
// widget to be resized and registers handlers for the resizing operations
function mouseDownResizer(event)
{

	var x = event.x + window.screenX;		// the placement of the click
	var y = event.y + window.screenY;
	
	document.addEventListener("mousemove", mouseMoveResizer, true);  	// begin tracking the move
	document.addEventListener("mouseup", mouseUpResizer, true);		// and notify when the drag ends

	lastPos = {x:x, y:y};		// track where the initial mouse down was, for later comparisons
								// the mouseMoveResizer function

	event.stopPropagation();
	event.preventDefault();
}


// mouseMoveResizer performs the actual resizing of the widget.  It is called after mouseDown
// activates it and every time the mouse moves.
function mouseMoveResizer(event)
{
	
	var screenX = event.x + window.screenX;		// retrieves the current mouse position
	var screenY = event.y + window.screenY;
		
	var deltaX = 0;		// will hold the change since the last mouseMoveResizer event
	var deltaY = 0;

	if ( (window.outerWidth + (screenX - lastPos.x)) >= 350 ) { 		// sets a minimum width constraint
		deltaX = screenX - lastPos.x;								// if we're greater than the constraint,
		lastPos.x = screenX;										// save the change and update our past position
	}

	if ( (window.outerHeight + (screenY - lastPos.y)) >= 150 ) {		// setting contrains for the height
		deltaY = screenY - lastPos.y;
		lastPos.y = screenY;
	}
	
	window.resizeBy(deltaX, deltaY);	// resizes the widget to follow the mouse movement
	with (getObj("content")) {	// resizes the container
		style.height = offsetHeight - 2 + deltaY + "px";
	}
	with (getObj("drawer-left")) {	// resizes the container
		style.height = offsetHeight + deltaY + "px";
	}
	with (getObj("myScrollBar")) {	// resizes the scrollbar
		style.height = offsetHeight + deltaY + "px";
	}
	calculateAndShowThumb(getObj("contents"));

	event.stopPropagation();
	event.preventDefault();
}


// mouseUp is called when the user stops resizing the widget.  It removes the mouseMoveResizer and
// mouseUp event handlers, so that the widget doesn't continute resizing (because the mouse
// button is now up
function mouseUpResizer(event)
{
	document.removeEventListener("mousemove", mouseMoveResizer, true);
	document.removeEventListener("mouseup", mouseUpResizer, true);	

	event.stopPropagation();
	event.preventDefault();
}