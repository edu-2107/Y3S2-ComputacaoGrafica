import { MyFlower } from './MyFlower.js';

/**
 * MyGarden
 * @constructor
 * @param scene 
 * @param numRows
 * @param numCols
 */
export class MyGarden {
    constructor(scene, numRows, numCols) {
        this.scene = scene;
        this.numRows = numRows;
        this.numCols = numCols;
        this.flowerMatrix = [];

        this.createFlowerMatrix();
    }

    createFlowerMatrix() {
        for (let i = 0; i < this.numRows; i++) {
            this.flowerMatrix[i] = [];
            for (let j = 0; j < this.numCols; j++) {
                let radiusFlower = Math.random() * (3.5 - 1.5) + 1.5;               // Random radius between 1.5 and 3.5
                let petalNumber = Math.floor(Math.random() * (10 - 6) + 6);         // Random int number of petals between 6 and 10
                let petalColor = [Math.random(), Math.random(), Math.random()];     // Random petal color
                let receptacleRadius = 2 * radiusFlower / 5;                        // Radius of the receptacle is 2/5 of the flower radius
                let receptacleColor = [0.8, 0.6, 0.2];
                let stemRadius = Math.random() * (0.5 - 0.2) + 0.2;                 // Random stem radius between 0.2 and 0.5
                let stemHeight = Math.floor(Math.random() * (6 * Math.floor(radiusFlower) - 4 * Math.floor(radiusFlower)) + 4 * Math.floor(radiusFlower));
                let stemColor = [0.05, 0.3, 0.05];
                let leafColor = [Math.random(), Math.random(), Math.random()];      // Random leaf color
                this.flowerMatrix[i][j] = new MyFlower(
                    this.scene,
                    radiusFlower,
                    petalNumber,
                    petalColor,
                    receptacleRadius,
                    receptacleColor,
                    stemRadius,
                    stemHeight,
                    stemColor,
                    leafColor
                );
            }
        }
    }

    getFlowerPosition(row, col) {
        if (row < this.numRows && col < this.numCols) {
            return {
                flower: this.flowerMatrix[row][col],
                x: row * 7,
                z: col * 7
            };
        }
        return null;
    }

    getFlowerAt(x, z) {
        const radius = 3.5;
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                const flowerX = i * 7;
                const flowerZ = j * 7;
                const distance = Math.sqrt((flowerX - x) ** 2 + (flowerZ - z) ** 2);
                if (distance < radius) {
                    return this.flowerMatrix[i][j];
                }
            }
        }
        return null;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, -10, 0);
        this.scene.popMatrix();
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                this.scene.pushMatrix();
                this.scene.translate(i * 7, -40, j * 7);
                this.flowerMatrix[i][j].display();
                this.scene.popMatrix();
            }
        }
    }
}
