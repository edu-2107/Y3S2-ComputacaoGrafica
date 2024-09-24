import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import { MyLeaf } from './MyLeaf.js';

/**
 * MyStem
 * @constructor
 * @param scene 
 * @param height
 * @param radius
 * @param leafColor
 * @param maxHeight
 * @param stemColor
 */
export class MyStem extends CGFobject {
    constructor(scene, height, radius, leafColor, maxHeight, stemColor) {
        super(scene);
        
        this.height = height;
        this.radius = radius;
        this.leafColor = leafColor;
        this.maxHeight = maxHeight;
        this.stemColor = stemColor;

        this.cylinders = [];
        this.leaves = [];
        this.heights = [];
        this.angles = [];
        this.leafAngles = [];

        let sum = 0;

        for (let i = 0; i < this.height; i++){
            let value = Math.random() * (this.maxHeight - 0.1) + 0.1;
            this.heights.push(value);
            sum += value;

            let rotationAngle = Math.random() * Math.PI * 2;
            this.leafAngles.push(rotationAngle);

            if (i == 0) {
                this.angles.push(0);
            }
            else {
                let ang = Math.random * (Math.PI/6 - (-Math.PI/6)) + (-Math.PI/6);
                this.angles.push(ang);
            }
        }

        this.sum = sum;
        this.createCylinders();
        this.createLeaves();
        this.initMaterials();
    }

    getSum() {
        return this.sum;
    }

    initMaterials(){
        this.leafM = new CGFappearance(this.scene);
        this.leafTexture = new CGFtexture(this.scene, "textures/leaftexture.jpg");
        this.leafM.setAmbient(this.leafColor[0], this.leafColor[1], this.leafColor[2], 1.0);
        this.leafM.setDiffuse(this.leafColor[0], this.leafColor[1], this.leafColor[2], 1.0);
        this.leafM.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.leafM.setShininess(10.0);
        this.leafM.setTexture(this.leafTexture);

        this.stemM= new CGFappearance(this.scene);
        this.stemM.setAmbient(this.stemColor[0], this.stemColor[1], this.stemColor[2], 1.0);
        this.stemM.setDiffuse(this.stemColor[0], this.stemColor[1], this.stemColor[2], 1.0);
        this.stemM.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.stemM.setShininess(10.0);

    }

    createCylinders() {
        for (let i = 0; i < this.height; i++) {
            this.cylinders[i] = new MyCylinder(this.scene, this.heights[i], this.radius, 50, 1);
        }
    }

    createLeaves() {
        for (let i = 0; i < this.cylinders.length; i++) {
            this.leaves[i] = new MyLeaf(this.scene);
        }
    }

    display() {

        let currentHeight = 0;

        for (let i = 0; i < this.height; i++) {
            this.scene.pushMatrix();
            if (i != 0) {
                this.scene.translate(0, currentHeight, 0);
            }
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            //this.scene.rotate(this.angles[i], 0, 0, 1);
            this.stemM.apply();
            this.cylinders[i].display();
            this.scene.popMatrix();
            
            if (i < this.leaves.length - 1) { 
                this.scene.pushMatrix();
                this.scene.translate(0, currentHeight + this.heights[i], 0); 
                this.scene.rotate(this.leafAngles[i], 0, 1, 0); 
                this.leafM.apply();
                this.leaves[i].display();
                this.scene.popMatrix();
            }

            currentHeight += this.heights[i]; 
        }
    }
}
