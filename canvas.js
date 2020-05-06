const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math'); // Liner progression
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
    dimensions: [ 2048, 2048 ]
};

const sketch = () => {
    const palette = random.pick(palettes);

    const createGrid = () => {
        const points = [];
        const count = 40;
        for (let x = 0; x < 40; x++) {
            for (let y = 0; y < 40; y++) {
                const u = count <= 1 ? 0.5 : x / (count - 1);
                const v = count <= 1 ? 0.5 : y / (count - 1);
                const radius = Math.abs(random.noise2D(u, v)) * 0.05;
                points.push({
                    color: random.pick(palette),
                    radius,
                    rotation: random.noise2D(u, v) * 1,
                    position: [u, v],
                });
            }
        }
        return points;
    };

    const points = createGrid().filter(() => random.value() > 0.5);
    const margin = 400;

    return ({ context, width, height }) => {
        context.fillStyle = 'white';
        context.fillRect(0,0, height, width);

        points.forEach(({ radius, position, color, rotation }) => {
            const [u, v] = position;

            const x = lerp(margin, width - margin, u);
            const y = lerp(margin, height - margin, v);

            context.beginPath();
            context.arc(x, y, radius * width, 0, Math.PI * 2, false);
            context.fillStyle = color;
            context.fill();

            context.rotate(rotation);
        });
    };
};

canvasSketch(sketch, settings);
