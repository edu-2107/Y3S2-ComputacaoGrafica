import { CGFappearance } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

/**
 * MyPanorama
 * @constructor
 * @param scene 
 * @param texture
 */
export class MyPanorama {
    constructor(scene, texture) {
        this.scene = scene;
        this.texture = texture;
        this.sphere = new MySphere(scene, 50, 50, texture);
        this.initMaterials();
    }

    initMaterials(){
        this.textureM = new CGFappearance(this.scene);
        this.textureM.setAmbient(1, 1, 1, 1.0);
        this.textureM.setShininess(10.0);
        this.textureM.setTexture(this.texture);
        this.textureM.setTextureWrap('REPEAT', 'REPEAT');
    }

    display(){
        let cameraPosition = this.scene.camera.position;
        this.scene.pushMatrix();
        this.scene.translate(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
        this.textureM.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }
}
