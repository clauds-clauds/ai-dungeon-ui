## Install Guide (Dev)

1. Download release from the sidebar.
2. Navigate to `chrome://extensions/`.
3. Enable developer mode (top right).
4. Click load unpacked.
5. Navigate to `Dungeon UI` folder.
6. Load folder as extension.
7. Done.

## What is this?

`Dungeon UI` is a browser extension which adds some more graphical elements to AI Dungeon. Such as:

- Icons for characters, locations, factions and whatever else.
- Tooltips which can be hovered over to show some HD images.
- Travel system which renders artwork for your current location.
- Text coloring, formatting, custom borders, exporting...

## Disclaimers

**Affiliation:** `Dungeon UI` is an unofficial, third-party browser extension. It is not developed, endorsed, or affiliated with **Latitude.**, the creators of **AI Dungeon**. All trademarks and brand names are the property of their respective owners.

**Warranty & Liability:** This software is provided "AS IS", without warranty of any kind, express or implied, as detailed in the `LICENSE` file. Use at your own risk. **I am** not responsible for any data loss, account issues, or other damages resulting from its use.

**Privacy & Data**: All your data (_settings_, _uploaded files_, _API keys_) is stored **locally** on your device. I have no access to (_or interest regarding_) this data, and **none of it is ever transmitted to me**. The sole exception is for API calls you _choose_ to make (e.g., to OpenRouter), which send your **API key**, prompt, and generation settings directly to that third-party service, **not to me**.

**User Responsibility:** This extension offers **optional** features, like the image generation tab, which connect to third-party services (e.g., OpenRouter). Use of these features is not required. If you choose to use them, you are solely responsible for acquiring, securing, and paying for any necessary API keys (_and their usage_). You are also solely responsible for all content you upload (images, audio, fonts) and must ensure you have the proper rights or licenses for its use. **I assume** no liability for user-incurred costs or copyright violations.

## What is new?

`Dungeon UI` is a major refactor of what was once `Dungeon Extension`. It has now been rewritten from scratch using `TypeScript/Svelte`, resulting in a less buggy and clumsy experience whilst also offering a neat little performance boost.

### Major New Features:

1. `Traveller:` a new system which tracks which locations you go through, showcasing the graphics for them plus playing _optional_ ambient sound effects.

2. `Image Generation:` generate and prompts images directly from within the editor! No longer do you have to scour the internet, draw your own, or resort to other measures. You can now simply prompt what you want to see and instantly load it as a graphic.

3. `Vanilla UI:` the entire user interface has been altered to be far more _vanilla_ friendly, fitting in seamlessly with the AI Dungeon interface. Mobile navigation is now actually _NOT_ a damn pain.

4. `Text & Borders:` Load custom font files, customize the color of the text (for _entities, story text, action text_), change border colors on a per-entity basis, plus select which border style you'd like (_solid, dashed, dotted_).
