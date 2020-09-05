//var Grid = require('./Grid');

var GOL = (function($) {
    var canvas, ctx, width, height, blockSize, rows, cols, timer, drawing, speed = 50;
    var running = false;

    var init = function() {
        Grid.setConfig({ rows : 40, cols : 40, speed : speed });
        Grid.create();
        Grid.applyPattern({ x : 12, y : 10, code : "b3o7bo$b2o2bob2ob2o$3b3o4bob$bo2bobo3bob$o4bo4bob$o4bo4bob$bo2bobo3bob$3b3o4bob$b2o2bob2ob2o$b3o7bo!"}); // RLE file format
        setUpCanvas();
        drawGrid();
        drawCells();
    };

    var setUpCanvas = function() {
        canvas    = document.getElementById("canvas"),
            ctx       = canvas.getContext("2d"),
            width     = canvas.getAttribute("width"),
            height    = canvas.getAttribute("height"),
            rows      = Grid.getRows(),
            cols      = Grid.getCols(),
            blockSize = Math.floor(width / rows);

        $('#run').click(run);
        $('#clear').click(clear);
        $('#step').click(step);
        /*$('#slider').slider(slider);*/
        $('#randomize').click(randomize);
        $('#canvas').mousedown(onmousedown);
        $('#canvas').mousemove(onmousemove);
        $('#canvas').mouseup(onmouseup);
    }

    var run = function() {
        if (!running) {
            running = true;
            tick();
            $(this).text('Stop');
            $('#step').attr('disabled', true);
        } else {
            pause(this);
        }
    };

    var pause = function(that) {
        running = false;
        clearTimeout(timer);
        $(that).text('Run');
        $('#step').attr('disabled', false).removeClass('ui-state-disabled');
    };

    var tick = function() {
        Grid.evolve();
        drawCells();
        timer = setTimeout(tick, Grid.getSpeed());
    };

    var step = function() {
        Grid.evolve();
        drawCells();
    };

    var clear = function() {
        Grid.clear();
        drawGrid();
    };

    var randomize = function() {
        Grid.create();
        drawGrid();
        drawCells();
    };

    var slider = {
        value : 500 - speed,
        min   : 0,
        max   : 500,
        step  : 25,
        slide : function(e, ui) {
            Grid.setSpeed(500 - ui.value);
        }
    };

    var onmousedown = function(e) {
        drawing = true;
        var x = Math.floor(e.offsetX / blockSize),
            y = Math.floor(e.offsetY / blockSize);
        drawCell(x, y, 'green', 'alive');
        Grid.update(x, y);
    };

    var onmouseup = function(e) {
        drawing = false;
    };

    var onmousemove = function(e) {
        var x = Math.floor(e.offsetX / blockSize),
            y = Math.floor(e.offsetY / blockSize);
        if (drawing) {
            drawCell(x, y, 'green', 'alive');
            Grid.update(x, y);
        }
    };

    var drawGrid = function() {
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                ctx.strokeStyle = 'rgba(242, 198, 65, 0.1)';
                ctx.strokeRect(i * blockSize, j*blockSize, blockSize, blockSize);
                ctx.fillStyle = 'rgb(38,38,38)';
                ctx.fillRect(i*blockSize, j*blockSize, blockSize, blockSize);
            }
        }
    };

    var drawCells = function() {
        var grid = Grid.getGrid();
        for (var i = 0; i < rows*cols; i++) {
            drawCell(grid[i].y, grid[i].x , 'green', grid[i].state);
        }
    };

    var drawCell = function(x, y, color, state) {
        ctx.fillStyle = (state === 'alive') ? color : 'rgb(38, 38, 38)';
        ctx.fillRect(x * blockSize, y * blockSize , blockSize - 1, blockSize - 1);
    };

    var drawLine = function(x1, y1, x2, y2, color) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    };

    return {
        init: init
    };
})(jQuery);

$(function() {
    GOL.init();
});