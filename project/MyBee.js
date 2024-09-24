import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyEllipsoid } from './MyEllipsoid.js';

/**
 * MyBee
 * @constructor
 * @param scene
 */
export class MyBee extends CGFobject {
    constructor(scene) {
        super(scene);

        // Create body parts
        this.head = new MyEllipsoid(this.scene, 20, 10, 0.3, 0.3, 0.3);
        this.torax = new MyEllipsoid(this.scene, 20, 10, 0.45, 0.25, 0.25);
        this.body = new MyEllipsoid(this.scene, 20, 10, 0.8, 0.4, 0.4);
        this.antenac = new MyCylinder(this.scene, 0.8, 0.05, 50, 1);
        this.antenat = new MyReceptacle(this.scene, 50, 10, 0.1);
        this.legc = new MyCylinder(this.scene, 0.5, 0.02, 50, 1);
        this.eye = new MyEllipsoid(this.scene, 20, 10, 0.1, 0.05, 0.10);
        this.wingb = new MyEllipsoid(this.scene, 20, 10, 0.6, 0.05, 0.3);
        this.wings = new MyEllipsoid(this.scene, 20, 10, 0.4, 0.05, 0.2);

        // Initial position, orientation, and velocity
        this.position = { x: 0, y: 3, z: 0 };
        this.orientation = 0;
        this.velocity = { x: 0, y: 0, z: 0 };
        this.pollen = null;

        this.isDescending = false;
        this.isAscending = false;
        this.targetY = 0;

        this.beeHeight = 3.0;
        this.oscillationAmplitude = 0.5;
        this.oscillationSpeed = Math.PI * 2; 
        this.wingRotationSpeed = 0.014;

        this.initMaterials();
        this.initKeyControls();

        this.time = 0;
    }

    initMaterials() {
        // Head material
        this.headM = new CGFappearance(this.scene);
        this.headM.setAmbient(0.4, 0.33, 0.0, 1.0);
        this.headM.setDiffuse(0.4, 0.33, 0.0, 1.0);
        this.headM.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.headM.setShininess(10.0);

        // Body material
        this.bodyM = new CGFappearance(this.scene);
        this.bodyTexture = new CGFtexture(this.scene, "textures/beetexture.jpg");
        this.bodyM.setShininess(10.0);
        this.bodyM.setTexture(this.bodyTexture);
        this.bodyM.setTextureWrap('REPEAT', 'REPEAT');

        // Eyes, antennas, and legs material
        this.blackM = new CGFappearance(this.scene);
        this.blackM.setAmbient(0, 0, 0, 1.0);
        this.blackM.setDiffuse(0, 0, 0, 1.0);
        this.blackM.setSpecular(0.2, 0.2, 0.2, 1.0);
        this.blackM.setShininess(5.0);

        // Wings material
        this.wingM = new CGFappearance(this.scene);
        this.wingM.setAmbient(0.5, 0.5, 1.0, 0.2);
        this.wingM.setDiffuse(0.5, 0.5, 1.0, 0.2);
        this.wingM.setSpecular(0.0, 0.0, 1.0, 0.2);
        this.wingM.setEmission(0.0, 0.0, 1.0, 0.2);
        this.wingM.setShininess(10.0);
    }

    initKeyControls() {
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'W':
                case 'w':
                    this.accelerate(0.1); // Accelerate
                    break;
                case 'S':
                case 's':
                    this.accelerate(-0.1); // Decelerate
                    break;
                case 'A':
                case 'a':
                    this.turn(Math.PI / 16); // Turn left
                    break;
                case 'D':
                case 'd':
                    this.turn(-Math.PI / 16); // Turn right
                    break;
                case 'R':
                case 'r':
                    this.reset(); // Reset position, orientation, and velocity
                    break;
                case 'F':
                case 'f':
                    this.descendToFlower(); // Descend to flower
                    break;
                case 'P':
                case 'p':
                    this.ascendFromFlower(); // Ascend from flower
                    break;
            }
        });
    }

    descendToFlower() {
        this.isDescending = true;
        this.isAscending = false;
        this.targetY = 0;
    }

    ascendFromFlower() {
        if (this.pollen) {
            this.isAscending = true;
            this.isDescending = false;
            this.targetY = this.beeHeight;
        }
    }

    update(t) {
        this.time = t / 1000;

        if (this.isDescending) {
            if (this.position.y > this.targetY) {
                this.position.y -= 0.1;
            } else {
                this.isDescending = false;
                this.velocity = { x: 0, y: 0, z: 0 };
                const flower = this.scene.garden.getFlowerAt(this.position.x, this.position.z); // Get the flower at bee's position
                if (flower && flower.pollen && !this.pollen) {
                    this.pollen = flower.pollen;
                    flower.pollen = null; // Remove pollen from flower
                }
            }
        } else if (this.isAscending) {
            if (this.position.y < this.targetY) {
                this.position.y += 0.1;
            } else {
                this.isAscending = false;
            }
        } else {
            // Update position based on velocity
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.position.z += this.velocity.z;
        }

        this.position.y = this.beeHeight + this.oscillationAmplitude * Math.sin(this.oscillationSpeed * this.time);
        this.wingAngle = Math.PI/16 * Math.sin(this.wingRotationSpeed * t); 
    }


    display() {
        this.scene.pushMatrix();

        // Apply position and orientation
        this.scene.translate(this.position.x, this.position.y, this.position.z);
        this.scene.rotate(this.orientation, 0, 1, 0);
        this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);

        // Display head
        this.scene.pushMatrix();
        this.headM.apply();
        this.head.display();
        this.scene.popMatrix();

        // Display eyes
        this.displayEye(-0.25, 0.1, 0.15);
        this.displayEye(-0.25, 0.1, -0.15);

        // Display torax
        this.scene.pushMatrix();
        this.scene.translate(0.6, 0, 0);
        this.headM.apply();
        this.torax.display();
        this.scene.popMatrix();

        // Display body
        this.scene.pushMatrix();
        this.scene.translate(1, 0, 0);
        this.scene.rotate(-Math.PI / 10, 0, 0, 1);
        this.scene.translate(Math.sin(Math.PI / 6), 0, 0);
        this.bodyM.apply();
        this.body.display();
        this.scene.popMatrix();

        // Display antennas
        this.displayAntennaStem(4 * Math.PI / 3);
        this.displayAntennaBall(4 * Math.PI / 3);
        this.displayAntennaStem(5 * Math.PI / 3);
        this.displayAntennaBall(5 * Math.PI / 3);

        // Display legs
        this.displayLeg(0.5, 0, 0, -Math.PI / 10, -5 * Math.PI / 3);
        this.displayLeg(0.5, 0, 0, -Math.PI / 10, -4 * Math.PI / 3);
        this.displayLeg(1.2, -0.25, 0, -Math.PI / 10, -5 * Math.PI / 3);
        this.displayLeg(1.2, -0.25, 0, -Math.PI / 10, -4 * Math.PI / 3);
        this.displayLeg(1.8, -0.40, 0, -Math.PI / 10, -5 * Math.PI / 3);
        this.displayLeg(1.8, -0.40, 0, -Math.PI / 10, -4 * Math.PI / 3);

        // Display wings with animation
        const wingAngle = this.wingAngle;
        this.displayWing(0.5, 0.4, 0.6, -Math.PI / 6, Math.PI / 2, true, wingAngle);
        this.displayWing(0.5, 0.4, -0.6, Math.PI / 6, Math.PI / 2, true, -wingAngle);
        this.displayWing(0.85, 0.3, 0.4, -Math.PI / 6, Math.PI / 2, false, wingAngle);
        this.displayWing(0.85, 0.3, -0.4, Math.PI / 6, Math.PI / 2, false, -wingAngle);

        // Display pollen if the bee is carrying it
        if (this.pollen) {
            this.scene.pushMatrix();
            this.scene.translate(0, -0.8, 0);
            this.pollen.display();
            this.scene.popMatrix();
        }

        this.scene.popMatrix();
    }


    displayEye(x, y, z) {
        this.scene.pushMatrix();
        this.scene.translate(x, y, z);
        this.scene.rotate(-3 * Math.PI / 5, 0, 0, 1);
        this.scene.rotate(3 * Math.PI / 2, 0, 1, 0);
        this.blackM.apply();
        this.eye.display();
        this.scene.popMatrix();
    }

    displayAntennaStem(angle) {
        this.scene.pushMatrix();
        this.scene.rotate(angle, 1, 0, 0);
        this.blackM.apply();
        this.antenac.display();
        this.scene.popMatrix();
    }

    displayAntennaBall(angle) {
        this.scene.pushMatrix();
        this.scene.rotate(angle - Math.PI / 2, 1, 0, 0);
        this.scene.translate(0, -0.8, 0);
        this.blackM.apply();
        this.antenat.display();
        this.scene.popMatrix();
    }

    displayLeg(x, y, z, rotationAngle, legAngle) {
        this.scene.pushMatrix();
        this.scene.translate(x, y, z);
        this.scene.rotate(rotationAngle, 0, 0, 1);
        this.scene.rotate(legAngle, 1, 0, 0);
        this.blackM.apply();
        this.legc.display();
        this.scene.popMatrix();
    }

    displayWing(x, y, z, rotateX, rotateY, isBig, wingAngle) {
        this.scene.pushMatrix();
        this.scene.translate(x, y, z);
        this.scene.rotate(rotateX, 1, 0, 0);
        this.scene.rotate(rotateY, 0, 1, 0);
        this.scene.rotate(wingAngle, 0, 0, 1);
        this.wingM.apply();
        if (isBig) {
            this.wingb.display();
        } else {
            this.wings.display();
        }
        this.scene.popMatrix();
    }


    turn(angle) {
        this.orientation += angle * this.scene.speedFactor;
        this.updateVelocityDirection();
    }

    accelerate(value) {
        const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.z ** 2);
        const newSpeed = Math.max(0, speed + value * this.scene.speedFactor);

        // Calculate direction based on orientation
        const directionX = -Math.cos(this.orientation);
        const directionZ = Math.sin(this.orientation);

        this.velocity.x = newSpeed * directionX;
        this.velocity.z = newSpeed * directionZ;
    }

    updateVelocityDirection() {
        const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.z ** 2);
        this.velocity.x = speed * -Math.cos(this.orientation);
        this.velocity.z = speed * Math.sin(this.orientation);
    }

    reset() {
        this.position = { x: 0, y: this.beeHeight, z: 0 };
        this.orientation = 0;
        this.velocity = { x: 0, y: 0, z: 0 };
        this.pollen = null;
    }
}
