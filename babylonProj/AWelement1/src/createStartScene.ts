//-----------------------------------------------------
//TOP OF CODE - IMPORTING BABYLONJS
// import "@babylonjs/core/Debug/debugLayer";
// import "@babylonjs/inspector";
import {
    Scene,
    ArcRotateCamera,
    Vector3,
    Vector4,
    HemisphericLight,
    SpotLight,
    MeshBuilder,
    Mesh,
    Light,
    Camera,
    Engine,
    StandardMaterial,
    Texture,
    Color3,
    Space,
    ShadowGenerator,
    PointLight,
    DirectionalLight,
  } from "@babylonjs/core";
  //----------------------------------------------------
  
  //----------------------------------------------------
  //MIDDLE OF CODE - FUNCTIONS
  function createBox(scene: Scene, px: number, py: number, pz: number, sx: number, sy: number, sz: number, rotation: boolean) {
    let box = MeshBuilder.CreateBox("box",{size: 1}, scene);
    box.position = new Vector3(px, py, pz);
    box.scaling = new Vector3(sx, sy, sz);
  
    if (rotation) {
      scene.registerAfterRender(function () {
        box.rotate(new Vector3(4, 8, 2)/*axis*/, 0.02/*angle*/, Space.LOCAL);
      });
    }
    return box;
  }

  //faced box function
  function createFacedBox(scene: Scene, px: number, py: number, pz: number) {
    const mat = new StandardMaterial("mat");
    const texture = new Texture("./assets/textures/numbers.jpg", scene);
    mat.diffuseTexture = texture;

    var columns = 6;
    var rows = 1;

    const faceUV = new Array(6);

    for (let i = 0; i < 6; i++) {
        faceUV[i] = new Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
    }

    const options = {
        faceUV: faceUV,
        wrap: true
    };

    let box = MeshBuilder.CreateBox("tiledBox", options, scene);
    box.material = mat;
    box.position = new Vector3(px, py, pz);

    scene.registerAfterRender(function () {
        box.rotate(new Vector3(2, 6, 4)/*axis*/, 0.02/*angle*/, Space.LOCAL);
    });
    return box;
  }

  function createTorus(scene: Scene, px: number, py: number, pz: number) {
    const torus = MeshBuilder.CreateTorus("torus", {});
    torus.position = new Vector3(px, py, pz);
    scene.registerAfterRender(function () {
      torus.rotate(new Vector3(4, 8, 2)/*axis*/, 0.02/*angle*/, Space.LOCAL);
    });
    return torus;
  }

  //Type refers to Polyhedra guide: https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/polyhedra/polyhedra_by_numbers
  function createPolyhedra(scene: Scene, t: number, s: number, px: number, py: number, pz: number) {
    const polyhedra = MeshBuilder.CreatePolyhedron("shape", {type: t, size: s}, scene);
    polyhedra.position = new Vector3(px, py, pz);
    scene.registerAfterRender(function () {
      polyhedra.rotate(new Vector3(4, 8, 2)/*axis*/, 0.02/*angle*/, Space.LOCAL);
    });
    return polyhedra;
  }

  function createAnyLight(scene: Scene, index: number, px: number, py: number, pz: number, colX: number, colY: number, colZ: number, mesh: Mesh) {
    // only spotlight, point and directional can cast shadows in BabylonJS
    switch (index) {
      case 1: //hemispheric light
        const hemiLight = new HemisphericLight("hemiLight", new Vector3(px, py, pz), scene);
        hemiLight.intensity = 0.3;
        return hemiLight;
        break;
      case 2: //spot light
        const spotLight = new SpotLight("spotLight", new Vector3(px, py, pz), new Vector3(0, -1, 0), Math.PI / 3, 10, scene);
        spotLight.diffuse = new Color3(colX, colY, colZ); //0.39, 0.44, 0.91
        let shadowGenerator = new ShadowGenerator(1024, spotLight);
        shadowGenerator.addShadowCaster(mesh);
        shadowGenerator.useExponentialShadowMap = true;
        return spotLight;
        break;
      case 3: //point light
        const pointLight = new PointLight("pointLight", new Vector3(px, py, pz), scene);
        pointLight.diffuse = new Color3(colX, colY, colZ); //0.39, 0.44, 0.91
        shadowGenerator = new ShadowGenerator(1024, pointLight);
        shadowGenerator.addShadowCaster(mesh);
        shadowGenerator.useExponentialShadowMap = true;
        return pointLight;
        break;
      case 4: //directional light
        const dirLight = new DirectionalLight("dirLight", new Vector3(px, py, pz), scene);
        dirLight.diffuse = new Color3(colX, colY, colZ); 
        dirLight.specular = new Color3(colZ, colY, colX); 
        return dirLight;
        break; 
    }
  }

  function createGround(scene: Scene, w: number, h: number, px: number) {
    let ground = MeshBuilder.CreateGround(
      "ground",
      { width: w, height: h },
      scene,
    );
    ground.receiveShadows = true;
    ground.position.x = px;
    return ground;
  }
  
  function createArcRotateCamera(scene: Scene) {
    let camAlpha = -Math.PI / 2,
      camBeta = Math.PI / 2.5,
      camDist = 10,
      camTarget = new Vector3(0, 0, 0);
    let camera = new ArcRotateCamera(
      "camera1",
      camAlpha,
      camBeta,
      camDist,
      camTarget,
      scene,
    );
    camera.attachControl(true);
    return camera;
  }
  //----------------------------------------------------------
  
  //----------------------------------------------------------
  //BOTTOM OF CODE - MAIN RENDERING AREA FOR YOUR SCENE  
export default function createStartScene(engine: Engine) {
  interface SceneData {
    scene: Scene;
    box1?: Mesh;
    box2?: Mesh;
    box3?: Mesh;
    box4?: Mesh;
    box5?: Mesh;
    box6?: Mesh;
    box7?: Mesh;
    faceBox?: Mesh;
    light1?: Light;
    light2?: Light;
    light3?: Light;
    light4?: Light;
    sphere?: Mesh;
    torus?: Mesh;
    polyhedra1?: Mesh;
    polyhedra2?: Mesh;
    ground?: Mesh;
    camera?: Camera;
  }

  let that: SceneData = { scene: new Scene(engine) };
  that.scene.debugLayer.show();

  that.ground = createGround(that.scene, 25, 10, -0.5);
  //Scene Lighting
  that.light1 = createAnyLight(that.scene,1,0,1,0,0.75,0.12,0.91,that.ground);// hemispherical
  that.light2 = createAnyLight(that.scene,4,0.7,-1,0.3,0.24,0.24,0.91,that.ground);// directional
  
  //shape 1 and light
  that.faceBox = createFacedBox(that.scene, -10, 2, 0);
  that.light3 = createAnyLight(that.scene,2,-10,5,0,0.75,0.12,0.91,that.faceBox);// spot

  //shape 2 and light
  that.box7 = createBox(that.scene, -5, 2, 0, 3, 2, 1, true);

  //shape 3 and light
  that.torus = createTorus(that.scene, 0, 2, 0);
  that.light4 = createAnyLight(that.scene,2,0,5,0,0.12,0.64,0.86,that.torus);// spot

  //shape 4 and light
  that.polyhedra1 = createPolyhedra(that.scene, 1, 1, 5, 2, 0);
  
  //shape 5 and light
  that.polyhedra2 = createPolyhedra(that.scene, 12, 1, 10, 2, 0);
  
  //walls
  that.box1 = createBox(that.scene, -13, 2.5, 0, 0.5, 5, 9, false); //wall
  that.box2 = createBox(that.scene, -8, 2.5, 0, 0.5, 5, 9, false); //wall
  that.box3 = createBox(that.scene, -3, 2.5, 0, 0.5, 5, 9, false); //wall
  that.box4 = createBox(that.scene, 2, 2.5, 0, 0.5, 5, 9, false); //wall
  that.box5 = createBox(that.scene, 7, 2.5, 0, 0.5, 5, 9, false); //wall
  that.box6 = createBox(that.scene, 12, 2.5, 0, 0.5, 5, 9, false); //wall
  
  //camera
  that.camera = createArcRotateCamera(that.scene);
  return that;
}
  //----------------------------------------------------