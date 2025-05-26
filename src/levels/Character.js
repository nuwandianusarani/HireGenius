import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

const Character = () => {
  const pixiContainer = useRef(null);

  useEffect(() => {
    // Create a Pixi Application
    const app = new PIXI.Application({
      width: 400,
      height: 400,
      transparent: true,
    });

    // Append Pixi canvas to the div
    pixiContainer.current.appendChild(app.view);

    // Load the sprite sheet
    PIXI.Loader.shared.add("character", "../assets/spritesheet_default.png").load((loader, resources) => {
      const sheet = resources.character.spritesheet;
      if (sheet) {
        // Create a sprite from the sheet
        const character = new PIXI.Sprite(sheet.textures["idle.png"]); // Adjust based on available textures
        character.x = 200;
        character.y = 200;
        character.anchor.set(0.5);
        app.stage.addChild(character);
      }
    });

    return () => {
      app.destroy(true, true);
    };
  }, []);

  return <div ref={pixiContainer} />;
};

export default Character;
