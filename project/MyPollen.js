import { CGFobject } from '../lib/CGF.js';

/**
 * MyPollen
 * @constructor
 * @param scene 
 * @param slices
 * @param stacks
 * @param radius
 */
export class MyPollen extends CGFobject {
    constructor(scene, slices, stacks, radius) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for (let stack = 0; stack <= this.stacks; stack++) {
            let theta = (stack * Math.PI) / this.stacks;
            let sinTheta = Math.sin(theta);
            let cosTheta = Math.cos(theta);

            for (let slice = 0; slice <= this.slices; slice++) {
                let phi = (slice * 2 * Math.PI) / this.slices;
                let sinPhi = Math.sin(phi);
                let cosPhi = Math.cos(phi);

                let x = cosPhi * sinTheta * this.radius;
                let y = cosTheta * this.radius;
                let z = sinPhi * sinTheta * this.radius;

                let scaleFactor = 1.7;
                y *= scaleFactor;

                let u = slice / this.slices;
                let v = stack / this.stacks;

                this.vertices.push(x, y, z);
                this.normals.push(x, y, z);
                this.texCoords.push(u, v);
            }
        }

        for (let stack = 0; stack < this.stacks; stack++) {
            for (let slice = 0; slice < this.slices; slice++) {
                let first = stack * (this.slices + 1) + slice;
                let second = first + this.slices + 1;

                this.indices.push(first);
                this.indices.push(first + 1);
                this.indices.push(second);

                this.indices.push(second);
                this.indices.push(first + 1);
                this.indices.push(second + 1);

                this.indices.push(first);
                this.indices.push(second);
                this.indices.push(first + 1);

                this.indices.push(second);
                this.indices.push(second + 1);
                this.indices.push(first + 1);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        super.display();
    }
}
