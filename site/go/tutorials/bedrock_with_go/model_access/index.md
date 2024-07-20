---
type: TutorialStep
date: 2024-07-18
title: Enable Model Access
author: mm
subtitle: ""
thumbnail: ./thumbnail.png
topics:
  - aws
---

## Enable Foundational Models

Make sure you are logged in the AWS Management Console and search for "AWS Bedrock."

![step1](./images/step1.png)

Click the hamburger menu.

![step2](./images/step2.png)

Click **Model access**.

![step3](./images/step3.png)

Click **Modify model access**.

![step4](./images/step4.png)

Next, choose the model which you want to enable. As you can see that our models are already enabled, and I am running them in **ap-south-1** region.

![step5](./images/step5.png)

I will show you an example of enabling models in a different region like North Virginia.

I will choose Anthropic as my model and then click Next.

![step6](./images/step6.png)

Review the specific models you want to enable/disable and finally click Submit.

![step7](./images/step7.png)

It will take a couple of seconds and the models will be enabled. Sometimes, it's instant.

![step8](./images/step8.png)

The availability of models is region-specific. Below the list of models is specific to North Virginia, which changes from time to time.

![step9](./images/step9.png)

This is the example from the ap-south-1 (Mumbai) region. As you can see few models are not available in this region.

![step10](./images/step10.png)

Once your model has been enabled, you can play around with **Chat/Text/Image** to test the interactivity.

![step11](./images/step11.png)

Select the specific model which you would like to explore and then click **Apply**.

![step12](./images/step12.png)

![step13](./images/step13.png)

Cool! Our model is working, and now it's time to start setting up our application in Go and interact with AWS Bedrock SDK.
