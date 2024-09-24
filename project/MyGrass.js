import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';

/**
 * MyGrass
 * @constructor
 * @param scene
 */
export class MyGrass extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.blades = [];
        this.numBlades = 10000;     // Number of grass blades
        this.initGrass();
        this.initMaterials();
    }

    initGrass() {
        for (let i = 0; i < this.numBlades; i++) {
            const x = (Math.random() - 0.5) * 50;           // Random x position in a 50x50 area
            const z = (Math.random() - 0.5) * 50;           // Random z position in a 50x50 area
            const height = Math.random() * (2 - 1) + 1;     // Random height between 1 and 3
            const width = 0.1;                              // Width of the grass blade
            const rotation = Math.random() * Math.PI;       // Random rotation around the y-axis
            const blade = new MyTriangle(this.scene, height);
            this.blades.push({ blade, x, z, height, width, rotation });
        }
    }

    initMaterials(){
        this.textureG = new CGFappearance(this.scene);
        this.grassTexture = new CGFtexture(this.scene, "textures/grasstexture.jpg");
        this.textureG.setAmbient(1, 1, 1, 1.0);
        this.textureG.setShininess(10.0);
        this.textureG.setTexture(this.grassTexture);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0);
        for (const { blade, x, z, height, width, rotation } of this.blades) {
            this.scene.pushMatrix();
            this.scene.translate(x + 10, -42, z + 10);
            this.scene.rotate(rotation, 0, 1, 0);
            this.scene.scale(width, height, 1);
            this.textureG.apply();
            blade.display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();
    }
}
