//var Cell = require('./Cell');

var Grid = (function() {
    var overpopulation = [0, 1, 4, 5, 6, 7, 8], // rule: B3/S23
        grid           = [],
        nextGrid       = [],
        adjacents      = [[-1, -1], [-1, 0], [-1, 1],
            [0,  -1],          [0,  1],
            [1,  -1], [1,  0], [1,  1]],
        cols, rows, size, speed;

    var setConfig = function(config) {
        cols  = config.cols;
        rows  = config.rows;
        size  = rows * cols;
        speed = config.speed; // ms
    };

    var create = function() {
        for (var i = 0; i < size; i++) {
            var random  = Math.round(Math.random());
            grid[i]     = new Cell(Math.floor(i / rows), i % cols, random);
            nextGrid[i] = new Cell(Math.floor(i / rows), i % cols, random);
        }
    };

    var clear = function() {
        for (var i = 0; i < size; i++) {
            grid[i]     = new Cell(Math.floor(i / rows), i % cols, 0);
            nextGrid[i] = new Cell(Math.floor(i / rows), i % cols, 0);
        }
    };

    var neighbours = function(cell) {
        var count = 0;
        for (var i = 0, length = adjacents.length; i < length; i++) {
            if (typeof   grid[value(adjacents[i], cell)] != 'undefined') {
                count += grid[value(adjacents[i], cell)].value;
            }
        }
        return count;
    };

    var value = function(adjacents, cell) {
        if ((cell.x + adjacents[0] >= 0) && (cell.x + adjacents[0] < rows) &&
            (cell.y + adjacents[1] >= 0) && (cell.y + adjacents[1] < cols)) {
            return (cell.x + adjacents[0]) * cols + (cell.y + adjacents[1]);
        }
    };

    var applyPattern = function(pattern) { // Apply RLE file format
        nextGrid.forEach(function(cell, i, nextGrid) {
            cell.setState('dead');
        });
        grid.forEach(function(cell, i, grid) {
            cell.setState('dead');
        });

        var code = pattern.code.replace(/[\\!]/g, '').replace(/(\d+)([\w\$])/g,
            function(match, n, letter) {
                return new Array(parseInt(n, 10) + 1).join(letter);
            }),
            cells = code.replace(/b/g, 0).replace(/o/g, 1),
            offset = Math.floor(rows / 2 - pattern.x / 2); // center the pattern

        for (var j = 0, k = 0, i = 0; j <= pattern.x; j++, k++) {
            if (cells[k] == "$") {
                i++; j = -1;
            } else {
                grid[(i + offset) * cols + j + offset]     = new Cell(i + offset, j + offset, +cells[k]);
                nextGrid[(i + offset) * cols + j + offset] = new Cell(i + offset, j + offset, +cells[k]);
                if (isNaN(grid[(i + offset) * cols + j + offset].value)) {
                    grid[(i + offset) * cols + j + offset]     = new Cell(i + offset, j + offset, 0);
                    nextGrid[(i + offset) * cols + j + offset] = new Cell(i + offset, j + offset, 0);
                }
            }
        }
    };

    var update = function(x, y) {
        grid[y * cols + x].setState('alive'); // TODO POR QUE AL REVES X E Y???
        nextGrid[y * cols + x].setState('alive'); // TODO POR QUE AL REVES X E Y???
    };

    var evolve = function() {
        for (var i = 0; i < size; i++) {
            switch (grid[i].state) {
                case "dead":
                    if (neighbours(grid[i]) == 3) {
                        nextGrid[i].setState('alive');
                    }
                    break;

                case "alive":
                    if (overpopulation.indexOf(neighbours(grid[i])) != -1) {
                        nextGrid[i].setState('dead');
                    }
                    break;
            }
        }
        /* Update the current grid */
        for (var j = 0; j < size; j++) {
            grid[j] = new Cell(nextGrid[j].x, nextGrid[j].y, nextGrid[j].value);
        }
    };

    var getRows = function() {
        return rows;
    };

    var getCols = function() {
        return cols;
    };

    var getGrid = function() {
        return grid;
    };

    var getSpeed = function() {
        return speed;
    };

    var setSpeed = function(s) {
        speed = s;
    };

    return {
        create: create,
        setConfig: setConfig,
        getSpeed: getSpeed,
        setSpeed: setSpeed,
        clear: clear,
        evolve: evolve,
        applyPattern: applyPattern,
        getRows: getRows,
        getCols: getCols,
        getGrid: getGrid,
        update: update
    };
})();

//module.exports = Grid;