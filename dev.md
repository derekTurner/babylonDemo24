# Coding notes
Just setting up.

## Bit more

*hello *

**hello**

***hello***


List

1. item
2. Item
3. Item

* Item
* Item
* Item

> CTRL + SHIFT + P

```bash
PS C:\Users\66668229\Documents\GitHub\babylonDemo24> Ls


    Directory: C:\Users\66668229\Documents\GitHub\babylonDemo24


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----        21/11/2024     13:38                .devcontainer
d-----        21/11/2024     15:23                babylonProj
d-----        21/11/2024     14:05                node_modules
d-----        21/11/2024     13:38                testProj
-a----        21/11/2024     13:38             68 .gitattributes
-a----        21/11/2024     13:38           2177 .gitignore
-a----        21/11/2024     13:38             36 dev.md
-a----        21/11/2024     14:05          35367 package-lock.json
-a----        21/11/2024     13:38            233 package.json


PS C:\Users\66668229\Documents\GitHub\babylonDemo24>
```


Code Examle

```javascript
import { Scene, Sound } from "@babylonjs/core";
import { SceneData } from "./interfaces ";
import { Button, AdvancedDynamicTexture } from "@babylonjs/gui/2D";

```

Import resources from Babylon

```javascript

function createSceneButton(
  scene: Scene,
  name: string,
  index: string,
  x: string,
  y: string,
  advtex: { addControl: (arg0: Button) => void }
) {
  var button: Button = Button.CreateSimpleButton(name, index);
  button.left = x;
  button.top = y;
  button.width = "180px";
  button.height = "35px";
  button.color = "white";
  button.cornerRadius = 20;
  button.background = "green";
  const buttonClick: Sound = new Sound(
    "MenuClickSFX",
    "./assets/audio/menu-click.wav",
    scene,
    null,
    {
      loop: false,
      autoplay: false,
    }
  );
  button.onPointerUpObservable.add(function () {
    buttonClick.play();
    alert("you did it!");
  });
  advtex.addControl(button);
  return button;
}

export default function createGUIScene(runScene: SceneData) {
  //GUI elements
  let advancedTexture: AdvancedDynamicTexture =
    AdvancedDynamicTexture.CreateFullscreenUI("myUI", true);
  let button1: Button = createSceneButton(
    runScene.scene,
    "but1",
    "Click Here",
    "0px",
    "120px",
    advancedTexture
  );
  
  runScene.scene.onAfterRenderObservable.add(() => {});
}
```

Here's html

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Hello world</title>
    </head>
    <body> </body>
</html>
<script type="module" src="./src/index.ts"></script>
```

[Markdown notes](https://derekturner.github.io/Javascript-Games-Fund-24/#/Block_1/section_6/markdown)


![markdown](images/md.png)



| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |


---

