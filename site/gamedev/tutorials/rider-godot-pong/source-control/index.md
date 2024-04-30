---
type: TutorialStep
date: 2024-04-30
title: Source Control Management with Godot
topics:
  - gamedev
  - ide
  - rider
  - godot
author: khalidabuhakmeh
subtitle: >-
  Using Git source control for your Godot project.
thumbnail: ./thumbnail.png
---

Outside of binary assets like images, video, and audio, most of Godot Game Engine's files are text-based. This means that it works seamlessly with source control. If you remember, when starting our project, we could select our source control option; in our case, it was **Git**.

In the same directory as your project, you can run the `git init` command to initialize your project for source control management. You'll also want to ensure your `.gitignore` file is updated to keep unwanted assets out of source control.

```text
# Godot 4+ specific ignores
.godot/

# Godot-specific ignores
.import/
export.cfg
export_presets.cfg

# Imported translations (automatically generated from CSV files)
*.translation

# Mono-specific ignores
.mono/
data_*/
mono_crash.*.json

# IntelliJ / Rider
/.idea

#macOS
.DS_Store
```

Almost all work done by the Godot game engine goes into the `.godot` folder, so you won’t need to worry about accidentally committing large binary builds of your game by accident.

As a note, I chose to ignore the JetBrains `.idea` folder for this demo, but ignoring it is optional. Still, checking this directory into source control may be worth it to you, as it allows teams to share IDE settings for a particular project.

Once set up, you can run your favorite **Git** tools or execute common commands from your terminal.

In the next step of our tutorial, we'll set up the scene for our game in Godot.
