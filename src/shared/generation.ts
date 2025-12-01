import { Log } from "./log";
import { extensionState } from "./state.svelte";
import { Storage } from "./storage";

export class Generation {
  static async generate(prompt: string) {
    if (extensionState.generatingImage) {
      alert("You are already generating an image...");
      return;
    }

    extensionState.generatingImage = true;
    const model = Storage.getCurrentSettings().generationModel;
    const ratio = Storage.getCurrentSettings().generationAspectRatio;
    const apiKey = Storage.getCurrentSettings().generationApiKey;

    Log.info(`Generating an image with model: ` + model);
    Log.info(`Image generation prompt: ` + prompt);

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
          messages: [{ role: "user", content: prompt }],
          image_config: {
            aspect_ratio: ratio,
          },
        }),
      });

      if (!response.ok) Log.error(`Image generation failed: ${response.status} ${response.statusText}`);

      const data = await response.json();
      const url = data?.choices?.[0]?.message?.images?.[0]?.image_url?.url;

      if (!url) Log.error("Image generation failed: No image URL found in response.");
      else extensionState.generatedImage = url;
    } catch (error) {
      Log.error(`Image generation error: ${error}`);
    } finally {
      extensionState.generatingImage = false;
    }
  }
}
