---
type: TutorialStep
date: 2025-02-03
title: Working with Backend
author: mm
subtitle: ""
thumbnail: ./thumbnail.png
topics:
  - aws
---

So, the implementation is complete. Now, it's time to build the backend.

You can start working directly by cloning the [repo](https://github.com/mukulmantosh/aws-rag-go).

![step1](./images/1.png)

![step2](./images/1_1.png)

![step3](./images/2-0.png)

```go
package main

import (
	"log"
	"net/http"
)

func main() {
	bedrockAgent := NewBedrock()
	http.HandleFunc("/send-message", ProcessLLMModel(bedrockAgent))
	log.Println("Server started, listening on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

```

![step4](./images/2-1.png)

You can find the Knowledge Base ID in the Knowledge Base dashboard. Click [here](https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html) if you're looking for the `ModelArn` and a list of supported foundation models.

![kb](./images/knowledge_base.png)

![step5](./images/3.png)

![step6](./images/4.png)
