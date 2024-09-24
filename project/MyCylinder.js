import { CGFobject } from '../lib/CGF.js';

/**
 * MyCylinder
 * @constructor
 * @param scene 
 * @param height
 * @param radius
 * @param slices
 * @param stacks
 */
export class MyCylinder extends CGFobject {
    constructor(scene, height, radius, slices, stacks) {
        super(scene);
        
        this.height = height;
        this.radius = radius;
        this.slices = slices;
        this.stacks = stacks;

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
    
        // Add vertices and indices for each slice
        for (let i = 0; i <= this.slices; i++) {
            let angle = (i * 2 * Math.PI) / this.slices;
            let x = this.radius * Math.cos(angle);
            let y = this.radius * Math.sin(angle);

            // Bottom vertex
            this.vertices.push(x, y, 0);
            this.normals.push(x, y, 0);

            // Top vertex
            this.vertices.push(x, y, this.height);
            this.normals.push(x, y, 0);

            // Indices
            if (i > 0) {
                const lastIndex = i * 2;
                this.indices.push(lastIndex - 2, lastIndex, lastIndex - 1);
                this.indices.push(lastIndex + 1, lastIndex - 1, lastIndex);
            }
        }

        // Bottom center vertex
        this.vertices.push(0, 0, 0);
        this.normals.push(0, 0, -1);

        // Top center vertex
        this.vertices.push(0, 0, this.height);
        this.normals.push(0, 0, 1);

        // Indices for bottom base
        for (let i = 0; i < this.slices; i++) {
            this.indices.push(i * 2, this.vertices.length / 3 - 2, (i * 2 + 2) % (this.slices * 2));
        }

        // Indices for top base
        for (let i = 0; i < this.slices; i++) {
            this.indices.push(this.vertices.length / 3 - 1, (i * 2 + 1) % (this.slices * 2), (i * 2 + 3) % (this.slices * 2));
        }
        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
