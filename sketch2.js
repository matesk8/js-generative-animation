const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');

const settings = {
    dimensions: [ 2048, 2048 ]
};

const sketch = () => {
    const createGrid = () => {
        const points = [];
        const count = 5;
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                const u = count <= 1 ? 0.5 : x / (count - 1);
                const v = count <= 1 ? 0.5 : y / (count - 1);
                points.push([u, v]);
            }
        }
        return points;
    };

    const points = createGrid();

    return ({ context, width, height }) => {
        context.fillStyle = 'white';
        context.fillRect(0,0, height, width);

        points.forEach(([ u, v]) => {
            const x = u * width; // Scale to pixel width
            const y = v * height; // Scale to pixel height

            context.beginPath();
            context.arc(x, y, 200, 0, Math.PI * 2, false);
            context.fillStyle = 'black';
            context.lineWidth = 20;
            context.stroke();
        });
    };
};

canvasSketch(sketch, settings);
