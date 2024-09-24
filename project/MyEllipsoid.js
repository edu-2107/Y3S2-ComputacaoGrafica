import { CGFobject } from '../lib/CGF.js';

/**
 * MyEllipsoid
 * @constructor
 * @param scene 
 * @param slices
 * @param stacks
 * @param radiusX
 * @param radiusY
 * @param radiusZ
 */
export class MyEllipsoid extends CGFobject {
    constructor(scene, slices, stacks, radiusX, radiusY, radiusZ) {
        super(scene);

        this.slices = slices;
        this.stacks = stacks;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.radiusZ = radiusZ;

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

                let x = this.radiusX * sinTheta * cosPhi;
                let y = this.radiusY * sinTheta * sinPhi;
                let z = this.radiusZ * cosTheta;

                let u = slice / this.slices;
                let v = stack / this.stacks;

                this.vertices.push(x, y, z);
                this.normals.push(x / this.radiusX, y / this.radiusY, z / this.radiusZ);
                this.texCoords.push(u, v);
            }
        }

        for (let stack = 0; stack < this.stacks; stack++) {
            for (let slice = 0; slice < this.slices; slice++) {
                let first = (stack * (this.slices + 1)) + slice;
                let second = first + this.slices + 1;

                this.indices.push(first, second, first + 1);
                this.indices.push(second, second + 1, first + 1);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
