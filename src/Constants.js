const canvas_size = [800,800];
const snake_start = [
    [8,7], [8,8]
];
const apple_start = [8,3];
const scale = 40;
const speed = 100;
const directions = {
    38: [0,-1], //up
    40: [0,1],  //down
    37: [-1,0], //left
    39: [1,0] // right
};

export {
    canvas_size,
    snake_start,
    apple_start,
    scale,
    speed,
    directions
}