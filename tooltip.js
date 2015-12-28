//------------------------------------------------------------------
// Tooltip
// Require tooltip.css
// Usage:
// In <head>
//		<link href="tooltip.css" type=text/css rel=stylesheet>
//		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
//		<script type="text/javascript" src="tooltip.js"></script>
//	For elements which needs tooltip (for example):
//		<img class='tooltip' tooltipText='text' src='xxx.jpg'>
//------------------------------------------------------------------
var tooltip = document.createElement("div");
tooltip.id = "tooltip";
$().ready (
	function(){
		$('.tooltip').tooltip();
	}
);
$(window).unload (
	function(){
		$('.tooltip').tooltip('destroy');
	}
);
(function($){
	
	var methods = {
		init:function(options) {
			return this.each(function(){
				$(this).bind('mouseover', event,  methods.show);
				$(this).bind('mouseout', methods.hide);
			});
		},
		destroy:function() {
			return this.each(function(){
				$(this).unbind('.tooltip');
			});
		},
		show : function() { 
			$(this).bind('mousemove', event,  update);
			document.body.appendChild(tooltip);
			tooltip.innerHTML = $(this).attr('tooltipText');
			update();
		},
		hide : function() {
			document.body.removeChild(tooltip);
			$(this).unbind('mousemove', update);
		}
	};
	
	function getCursorPosition() {
		var rez = Array(2);
		if(document.all) {
			rez[0] = event.clientX + document.body.scrollLeft;
			rez[1] = event.clientY + document.body.scrollTop;
		}
		else {
			rez[0] = event.pageX;
			rez[1] = event.pageY;
		}
		return rez;
	}
	
	function update() {
		var pos = getCursorPosition();
		tooltip.style.left = pos[0];
		tooltip.style.top = pos[1];
	}

	$.fn.tooltip = function(method) {
		if(methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else if(typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		}
		else {
			$.error('Undefined method: ' +  method);
		}
	};
}
)(jQuery);
