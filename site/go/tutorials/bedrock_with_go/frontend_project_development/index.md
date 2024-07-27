---
type: TutorialStep
date: 2024-08-01
title: Developing Frontend App
author: mm
subtitle: ""
thumbnail: ./thumbnail.png
topics:
  - react
---

## Cleaning Stuff

First, let's remove the changes which we are not going to use in our application.

Remove `assets`, `App.css` and `index.css`.

![step1](./images/step1.png)

Clean everything from `App.jsx`. Check the image below, you will get the idea.

![step2](./images/step2.png)

Remove `index.css` from `main.jsx`.

![step3](./images/step3.png)

Add these two logos in your `public` directory. You can download them from my [repo](https://github.com/mukulmantosh/bedrock_ui/tree/master/public).

![step4](./images/step4.png)

Update `index.html` with your new favicon and title.

![step5](./images/step5.png)

Now, we are good to go ahead.

## Development Time

Let's begin first by opening `App.jsx`.

The `App` is a functional React component. It returns some JSX, a syntax similar to HTML, used to define UI structures in React. When rendered, `App` displays a section with a title "AWS Bedrock with Go" inside a div. The `hero`, `hero-body`, and `title` are CSS class names used to style these elements, and these are actually coming from [Bulma](https://bulma.io/). So, make sure to import bulma at the top.

![step6](./images/step6.png)

Next, we are going to set a new background image.

Create a new file `BackgroundImage.module.css` under `src/styles/modules`.

> When CSS files end with `.module.css`, they're using a feature called [CSS Modules](https://github.com/css-modules/css-modules). CSS Modules use local scope to avoid style conflicts across different project parts, allowing component-scoped styling.

![step7](./images/step7.png)

Update `App.jsx` with the new styling to apply the background.

![step8](./images/step8.png)

### Creating Components

We will be creating multiple components. Let's start first with showing AI-related logos in our UI.

You need to place new images under `public/images`. Download these images from my [repo](https://github.com/mukulmantosh/bedrock_ui/tree/master/public/images).

![step9](./images/step9.png)

Next, create a new directory called `components` under `src`, followed up with a new file `AILogoComponent.jsx`.

![step10](./images/step10.png)

In this component we are displaying a layout containing four logos.

```jsx
import AnthropicLogo from "/images/Anthropic_logo.svg";
import LlamaLogo from "/images/llama.png";
import AI21Logo from "/images/ai21.png";
import MistralAiLogo from "/images/mistral_ai.png";

function AILogoComponent() {
	return (
		<div className="columns is-mobile mt-6">
			<div className="column"></div>
			<div className="column">
				<div className="card">
					<div className="card-image">
						<figure className="image is-4by3">
							<img src={AnthropicLogo} alt="anthropic" />
						</figure>
					</div>
				</div>
			</div>
			<div className="column">
				<div className="card">
					<div className="card-image">
						<figure className="image is-4by2">
							<img src={LlamaLogo} alt="llama" />
						</figure>
					</div>
				</div>
				<div className="card">
					<div className="card-image">
						<figure className="image is-4by2">
							<img src={AI21Logo} alt="ai21" />
						</figure>
					</div>
				</div>
				<div className="card">
					<div className="card-image">
						<figure className="image is-4by2">
							<img src={MistralAiLogo} alt="mistral" />
						</figure>
					</div>
				</div>
			</div>
			<div className="column"></div>
		</div>
	);
}

export default AILogoComponent;
```

We need to import the above component in our `App` component.

![step11](./images/step11.png)

This is the current state of our UI. Well, you can play around and come up with your own creativity.

![step12](./images/step12.png)
