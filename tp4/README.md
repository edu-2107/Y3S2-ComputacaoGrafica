# CG 2023/2024

## Group T12G12

## TP 4 Notes


In the initial section of the worksheet, we created a material that incorporated the tangram.png texture. This material was then used to texture each individual shape within the tangram object. Additionally, we aligned the vertices of each shape in the tangram object with the corresponding coordinates on the texture map. 

![Screenshot 1](https://git.fe.up.pt/cg/cg-2023-2024/t12/cg-t12-g12/-/raw/master/tp4/screenshots/CG-t12g12-tp4-1.png)

**Figure 1:** Tangram

Finally, we made modifications to the class MyUnitCube to enable it to accept the texture for each face during construction. Subsequently, we assigned three new textures to the cube: one for the top face, one for the bottom face, and one for the sides. Additionally, we adjusted the filtering type because the original textures had significantly smaller dimensions compared to where they were being applied. In such cases, the default filtering method is linear filtering, but by changing the filtering type, the image became sharp.

![Screenshot 2](https://git.fe.up.pt/cg/cg-2023-2024/t12/cg-t12-g12/-/raw/master/tp4/screenshots/CG-t12g12-tp4-2.png)

**Figure 2:** Unit Cube
