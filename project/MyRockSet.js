import { CGFobject } from '../lib/CGF.js';
import { MyHive } from './MyHive.js';
import { MyRock } from './MyRock.js';

/**
 * MyRockSet
 * @constructor
 * @param scene 
 * @param numRocks
 * @param minSize
 * @param maxSize
 */
export class MyRockSet extends CGFobject {
    constructor(scene, numRocks, minSize, maxSize) {
        super(scene);
        
        this.numRocks = numRocks;
        this.minSize = minSize;
        this.maxSize = maxSize;
        this.rocks = [];
        this.positions = [];

        this.hive = new MyHive(this.scene, 5, 5, 5);
        
        this.initRocks();
    }

    initRocks() {
        // Level 1 with 16 rocks
        for (let i = 0; i < 16; i++) {
            let scale = this.minSize + Math.random() * (this.maxSize - this.minSize);
            let posX = (i % 4 - 1.5) * 4.2; 
            let posY = -40;
            let posZ = (Math.floor(i / 4) - 1.5) * 4.2; 
            let rock = new MyRock(this.scene, 10, 10, scale);
            this.rocks.push(rock);
            this.positions.push([posX, posY, posZ]);
        }

        // Level 2 with 9 rocks
        for (let i = 0; i < 9; i++) {
            let scale = this.minSize + Math.random() * (this.maxSize - this.minSize);
            let posX = (i % 3 - 1) * 4.2; 
            let posY = -36.0; 
            let posZ = (Math.floor(i / 3) - 1) * 4.2; 
            let rock = new MyRock(this.scene, 10, 10, scale);
            this.rocks.push(rock);
            this.positions.push([posX, posY, posZ]);
        }

        // Level 3 with 4 rocks
        for (let i = 0; i < 4; i++) {
            let scale = this.minSize + Math.random() * (this.maxSize - this.minSize);
            let posX = (i % 2 - 0.5) * 4.2; 
            let posY = -32.0; 
            let posZ = (Math.floor(i / 2) - 0.5) * 4.2; 
            let rock = new MyRock(this.scene, 10, 10, scale);
            this.rocks.push(rock);
            this.positions.push([posX, posY, posZ]);
        }

        // Level 4 with 1 rock
        let scale = this.minSize + Math.random() * (this.maxSize - this.minSize);
        let posX = 0;
        let posY = -28.0; 
        let posZ = 0;
        let rock = new MyRock(this.scene, 10, 10, scale);
        this.rocks.push(rock);
        this.positions.push([posX, posY, posZ]);
    }

    display() {
        for (let i = 0; i < this.numRocks; i++) {
            this.scene.pushMatrix();
            this.scene.translate(...this.positions[i]);
            this.scene.translate(-20, 0, 0);
            this.rocks[i].display();
            this.scene.popMatrix();

            if (i == this.numRocks-1) {
                this.scene.pushMatrix();
                this.scene.translate(...this.positions[i]);
                this.scene.translate(-25, 5, 0);
                this.hive.display();
                this.scene.popMatrix();
            }
        }
    }
}
