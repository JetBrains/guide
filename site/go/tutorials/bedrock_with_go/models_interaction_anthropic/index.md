---
type: TutorialStep
date: 2024-07-18
title: Interacting with ML Models — Anthropic
author: mm
subtitle: ""
thumbnail: ./thumbnail.png
topics:
  - aws
  - ai
---

In this section we will be working with Anthropic. This section is quite similar to the previous one, implementing streaming and non-streaming features.

Anthropic has multiple types of models supported like Claude 3 Sonnet, 3.5 Sonnet, Opus and Haiku. You can check over [here](https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters-claude.html) the inference parameters and code examples.

## Anthropic Haiku

For this tutorial, we will be using Anthropic Haiku.

> _Haiku is the fastest and most cost-effective model on the market for its intelligence category. It can read an information and data dense research paper on arXiv (~10k tokens) with charts and graphs in less than three seconds._

![step1](./images/step1.png)

Read more: [Claude 3 Haiku: our fastest model yet](https://www.anthropic.com/news/claude-3-haiku)

_Claude consists of a family of large language models that enable you to balance intelligence, speed, and cost._

![step2](./images/step2.png)

## Non-Streaming

Let's first begin by implementing the non-streaming way to interact with Anthropic.

First thing is to create a file under `models` and name it `anthropic.go`.

![step3](./images/step3.png)

```go
package models

type Claude3Request struct {
	AnthropicVersion string    `json:"anthropic_version"`
	MaxTokens        int       `json:"max_tokens"`
	Messages         []Message `json:"messages"`
	Temperature      float64   `json:"temperature,omitempty"`
	TopP             float64   `json:"top_p,omitempty"`
	TopK             int       `json:"top_k,omitempty"`
	StopSequences    []string  `json:"stop_sequences,omitempty"`
	SystemPrompt     string    `json:"system,omitempty"`
}
type Content struct {
	Type string `json:"type,omitempty"`
	Text string `json:"text,omitempty"`
}
type Message struct {
	Role    string    `json:"role,omitempty"`
	Content []Content `json:"content,omitempty"`
}

type Claude3Response struct {
	ID              string            `json:"id,omitempty"`
	Model           string            `json:"model,omitempty"`
	Type            string            `json:"type,omitempty"`
	Role            string            `json:"role,omitempty"`
	ResponseContent []ResponseContent `json:"content,omitempty"`
	StopReason      string            `json:"stop_reason,omitempty"`
	StopSequence    string            `json:"stop_sequence,omitempty"`
	Usage           Usage             `json:"usage,omitempty"`
}
type ResponseContent struct {
	Type string `json:"type,omitempty"`
	Text string `json:"text,omitempty"`
}
type Usage struct {
	InputTokens  int `json:"input_tokens,omitempty"`
	OutputTokens int `json:"output_tokens,omitempty"`
}

type PartialResponse struct {
	Type    string                 `json:"type"`
	Message PartialResponseMessage `json:"message,omitempty"`
	Index   int                    `json:"index,omitempty"`
	Delta   Delta                  `json:"delta,omitempty"`
	Usage   PartialResponseUsage   `json:"usage,omitempty"`
}

type PartialResponseMessage struct {
	ID           string               `json:"id,omitempty"`
	Type         string               `json:"type,omitempty"`
	Role         string               `json:"role,omitempty"`
	Content      []interface{}        `json:"content,omitempty"`
	Model        string               `json:"model,omitempty"`
	StopReason   string               `json:"stop_reason,omitempty"`
	StopSequence interface{}          `json:"stop_sequence,omitempty"`
	Usage        PartialResponseUsage `json:"usage,omitempty"`
}

type PartialResponseUsage struct {
	InputTokens  int `json:"input_tokens,omitempty"`
	OutputTokens int `json:"output_tokens,omitempty"`
}

type Delta struct {
	Type       string `json:"type,omitempty"`
	Text       string `json:"text,omitempty"`
	StopReason string `json:"stop_reason,omitempty"`
}

func (r Claude3Response) SetContent(content string) {
	r.ResponseContent[0].Text = content
}
func (r Claude3Response) GetContent() string {
	return r.ResponseContent[0].Text
}

```

Let's break it down.

The `Claude3Request` struct is used to send request to Claude Haiku API.

- **AnthropicVersion** — A string indicating the version of the Anthropic API. The value must be `bedrock-2023-05-31`.
- **MaxTokens** — The maximum number of tokens to generate before stopping.
- **Messages** — An array of input messages.
- **Temperature** — The amount of randomness injected into the response.
- **TopP** — In nucleus sampling, Anthropic Claude computes the cumulative distribution over all the options for each subsequent token in decreasing probability order and cuts it off once it reaches a particular probability specified by `top_p`. You should alter either `temperature` or `top_p`, but not both.
- **TopK** — Only sample from the top K options for each subsequent token.
- **StopSequences** — Custom text sequences that cause the model to stop generating.
- **SystemPrompt** — A system prompt is a way of providing context and instructions to Anthropic Claude, such as specifying a particular goal or role.

I don't want to get into more details. As everything is mentioned in the official documentation.

For reference, you can check out the [Claude Messages API](https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters-anthropic-claude-messages.html) and Anthropic API [Docs](https://docs.anthropic.com/en/api/getting-started).

Invoking from the CLI.

```bash
aws bedrock-runtime invoke-model \
--model-id anthropic.claude-3-haiku-20240307-v1:0 \
--body "{\"messages\":[{\"role\":\"user\",\"content\":[{\"type\":\"text\",\"text\":\"Hello\\nHello! How can I assist you today?\"}]}],\"anthropic_version\":\"bedrock-2023-05-31\",\"max_tokens\":2000,\"temperature\":1,\"top_k\":250,\"top_p\":0.999,\"stop_sequences\":[\"\\n\\nHuman:\"]}" \
--cli-binary-format raw-in-base64-out \
--region ap-south-1 \
invoke-model-output.txt
```

The sample payload will give you clarity about the above Go structs which we created.

```json
{
	"messages": [
		{
			"role": "user",
			"content": [
				{
					"type": "text",
					"text": "Hello Hello! How can I assist you today?"
				}
			]
		}
	],
	"anthropic_version": "bedrock-2023-05-31",
	"max_tokens": 2000,
	"temperature": 1,
	"top_k": 250,
	"top_p": 0.999,
	"stop_sequences": ["Human:"]
}
```

Moving ahead, we need to create a new function named `AnthropicBody`. I believe now you can relate this function with the above JSON.

![step4](./images/step4.png)

This function accepts user-provided prompt and followed up with creating a new `Claude3Request` and framing the payload based on API specification and finally returning JSON byte slice.

```go
func (wrapper Anthropic) AnthropicBody(prompt string) []byte {
	payload := Claude3Request{
		AnthropicVersion: "bedrock-2023-05-31",
		MaxTokens:        200,
		Messages: []Message{
			{
				Role: "user",
				Content: []Content{
					{
						Type: "text",
						Text: prompt,
					},
				},
			},
		},
	}

	body, err := json.Marshal(payload)
	if err != nil {
		log.Fatal(err)
	}
	return body
}

```

Moving forward, lets implemented the `Invoke` method.

TEXT TO BE ADDED.

![step5](./images/step5.png)

```go
func (wrapper Anthropic) Invoke() (string, error) {
	body := wrapper.AnthropicBody(wrapper.prompt)

	output, err := wrapper.bedrock.BedrockRuntimeClient.InvokeModel(context.TODO(), &bedrockruntime.InvokeModelInput{
		ModelId:     aws.String(claudeV3ModelID),
		ContentType: aws.String("application/json"),
		Body:        body,
	})
	if err != nil {
		log.Fatal(err)
	}

	var resp Claude3Response

	err = json.Unmarshal(output.Body, &resp)

	if err != nil {
		log.Fatal(err)
	}

	return resp.ResponseContent[0].Text, nil
}

```

Now, move on to add the missing logic.

![step6](./images/step6.png)
