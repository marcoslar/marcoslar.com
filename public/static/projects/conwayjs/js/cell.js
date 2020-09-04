var Cell = function(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.state = (value == 1) ? 'alive' : 'dead';
};

Cell.prototype.show = function() {
    return this.value;
}

Cell.prototype.state = function() {
    return this.state;
}

Cell.prototype.setState = function(s) {
    this.state = s;
    this.value = (s == 'alive') ? 1 : 0;
}

Cell.prototype.setX = function(x) {
    this.x = x;
}

Cell.prototype.setY = function(y) {
    this.y = y;
}
Cell.prototype.getX = function() {
    return this.x;
}

Cell.prototype.getY = function() {
    return this.y;
}

//module.exports = Cell;