import { CGFobject } from '../lib/CGF.js';
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        
        this.slices = slices;
        this.stacks = stacks;
        
        this.initBuffers();
    }

    initBuffers() {
    
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        let idx = 0;
        let incrmv = 2 * Math.PI / this.slices;
        let incrmz = 1 / this.stacks // 1 / height
        
        for (let i = 0; i < this.slices; i++) {
            
            let xv1 = Math.cos(i * incrmv);
            let yv1 = Math.sin(i * incrmv);
            let xv2 = Math.cos((i + 1) * incrmv);
            let yv2 = Math.sin((i + 1) * incrmv);

            
            for (let j = 0; j < this.stacks; j++) {

                let xm = Math.cos((i + 0.5) * incrmv); // x between 2 vertices
                let ym = Math.sin((i + 0.5) * incrmv); // y between 2 vertices
                let sz = Math.sqrt(Math.pow(xm, 2) + Math.pow(ym, 2)); // distance to the vertice in the middle

                this.vertices.push(xv1, yv1, j*incrmz, // base
                                   xv2, yv2, j*incrmz, // base
                                   xv1, yv1, ((j + 1) * incrmz), // top
                                   xv2, yv2, ((j + 1) * incrmz)); // top

                this.indices.push(idx, idx + 1, idx + 2,
                                  idx + 2, idx + 1, idx + 3);

                this.normals.push(xm/sz, ym/sz, 0, 
                                  xm/sz, ym/sz, 0, 
                                  xm/sz, ym/sz, 0, 
                                  xm/sz, ym/sz, 0);
                
                idx += 4;
                
            }
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
    
        this.initGLBuffers();
    }

    updateBuffers(complexity){
    }
}