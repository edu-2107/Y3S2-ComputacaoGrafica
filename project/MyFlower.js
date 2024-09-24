import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';
import { MyPollen } from './MyPollen.js';

/**
 * MyFlower
 * @constructor
 * @param scene 
 * @param radiusFlower
 * @param petalNumber
 * @param petalColor
 * @param receptacleRadius
 * @param receptacleColor
 * @param stemRadius
 * @param stemHeight
 * @param stemColor
 * @param leafColor
 */
export class MyFlower extends CGFobject {
    constructor(scene, radiusFlower, petalNumber, petalColor, receptacleRadius, receptacleColor, stemRadius, stemHeight, stemColor, leafColor) {
        super(scene);
        this.radiusFlower = radiusFlower;
        this.petalNumber = petalNumber;
        this.petalColor = petalColor;
        this.receptacleRadius = receptacleRadius;
        this.receptacleColor = receptacleColor;
        this.stemRadius = stemRadius;
        this.stemHeight = stemHeight;
        this.stemColor = stemColor;
        this.leafColor = leafColor;
        this.pollenRotation = Math.random() * (2 * Math.PI - 0) + 0;

        this.petalAngles = [];
        for (let i = 0; i < this.petalNumber; i++) {
            let minAngle = -Math.PI / 8;
            let maxAngle = Math.PI / 8;
            let petalAngle = Math.random() * (maxAngle - minAngle) + minAngle;
            this.petalAngles.push(petalAngle);
        }

        this.petalRadius = this.radiusFlower - this.receptacleRadius;

        this.petal = new MyPetal(this.scene, -Math.PI / 6, this.petalRadius);
        this.receptacle = new MyReceptacle(this.scene, 50, 10, this.receptacleRadius);
        this.stem = new MyStem(this.scene, this.stemHeight, this.stemRadius, this.leafColor, this.radiusFlower, this.stemColor);
        this.pollen = new MyPollen(this.scene, 30, 30, receptacleRadius / 3);

        this.stemSum = this.stem.getSum();

        this.initMaterials();
    }

    initMaterials() {
        // petal
        this.petalM = new CGFappearance(this.scene);
        this.petalTexture = new CGFtexture(this.scene, "textures/petaltexture.jpg");
        this.petalM.setAmbient(this.petalColor[0], this.petalColor[1], this.petalColor[2], 1.0);
        this.petalM.setDiffuse(this.petalColor[0], this.petalColor[1], this.petalColor[2], 1.0);
        this.petalM.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.petalM.setShininess(10.0);
        this.petalM.setTexture(this.petalTexture);

        // receptacle
        this.receptacleM = new CGFappearance(this.scene);
        this.receptacleTexture = new CGFtexture(this.scene, "textures/receptacletexture.jpg");
        this.receptacleM.setAmbient(this.receptacleColor[0], this.receptacleColor[1], this.receptacleColor[2], 1.0);
        this.receptacleM.setDiffuse(this.receptacleColor[0], this.receptacleColor[1], this.receptacleColor[2], 1.0);
        this.receptacleM.setSpecular(0.2, 0.2, 0.2, 1.0);
        this.receptacleM.setShininess(10.0);
        this.receptacleM.setTexture(this.receptacleTexture);

        // pollen
        this.pollenM = new CGFappearance(this.scene);
        this.pollenTexture = new CGFtexture(this.scene, "textures/pollentexture.jpg");
        this.pollenM.setAmbient(1, 0.6, 0, 0);
        this.pollenM.setShininess(10.0);
        this.pollenM.setTexture(this.pollenTexture);
    }

    display() {
        // Display stem
        this.scene.pushMatrix();
        this.stem.display();
        this.scene.popMatrix();

        // Display receptacle
        this.scene.pushMatrix();
        this.scene.translate(0, this.stemSum + this.receptacleRadius, 0);
        this.receptacleM.apply();
        this.receptacle.display();
        this.scene.popMatrix();

        // Display pollen if it exists
        if (this.pollen) {
            this.scene.pushMatrix();
            this.scene.translate(0, this.stemSum + this.receptacleRadius, -this.receptacleRadius);
            this.scene.rotate(this.pollenRotation, 0, 0, 1);
            this.pollenM.apply();
            this.pollen.display();
            this.scene.popMatrix();
        }

        // Display the petals
        for (let i = 0; i < this.petalNumber; i++) {
            if (i != this.petalNumber / 2) {
                this.scene.pushMatrix();
                this.scene.translate(0, this.stemSum + this.receptacleRadius, 0);

                let angle = ((2 * Math.PI) / this.petalNumber) * i;
                let x = Math.sin(angle) * this.receptacleRadius * 2;
                let y = Math.cos(angle) * this.receptacleRadius * 2;
                this.scene.translate(x, y, 0);

                let rotationAngle = -angle;

                this.scene.rotate(rotationAngle, 0, 0, 1);
                this.scene.rotate(this.petalAngles[i], 1, 0, 0);

                this.petalM.apply();
                this.petal.display();
                this.scene.popMatrix();
            }
        }
    }

    enableNormalViz() {
        this.petal.enableNormalViz();
        this.receptacle.enableNormalViz();
        this.stem.enableNormalViz();
    }

    disableNormalViz() {
        this.petal.disableNormalViz();
        this.receptacle.disableNormalViz();
        this.stem.disableNormalViz();
    }
}
