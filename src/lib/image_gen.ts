import { get } from "svelte/store";
import { settings } from "./storage";
import { imageGenState } from "./state.svelte";
import { Dev } from "./dev";
import { SayType } from "./types";

export class ImageGen {
  static async generate() {
    // Return if already generating.
    if (imageGenState.generating) {
      Dev.say("Stop pressing that damn button!!!", SayType.Loud);
      return;
    }

    // Set the state.
    imageGenState.generating = true;

    // Get all the current model settings.
    const model = get(settings).imageGenModel;
    const ratio = get(settings).imageGenRatio;
    const apiKey = get(settings).imageGenApiKey;

    Dev.say("Generating image with model: " + model);
    Dev.say("Generating image with prompt: " + imageGenState.prompt);

    // Try to do the generation
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "X-Title": "Dungeon UI (Web Extension)",
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: "user", content: imageGenState.prompt }],
          image_config: {
            aspect_ratio: ratio,
          },
        }),
      });

      // If something went wrong then say that.
      if (!response.ok) Dev.say(`Image generation failed: ${response.status} ${response.statusText}`, SayType.Loud);

      // Get the data.
      const data = await response.json();
      const url = data?.choices?.[0]?.message?.images?.[0]?.image_url?.url;

      // Again, check if that thing is decent.
      if (!url) Dev.say("Image generation failed: No image URL found in response.", SayType.Loud);
      else imageGenState.image = url; // Otherwise just assign it.
    } catch (error) {
      Dev.say(`Image generation error: ${error}`, SayType.Loud);
    } finally {
      imageGenState.generating = false;
    }
  }
}
