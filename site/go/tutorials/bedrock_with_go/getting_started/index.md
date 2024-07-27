---
type: TutorialStep
date: 2024-08-01
title: Getting Started
author: mm
subtitle: ""
thumbnail: ./thumbnail.png
topics:
  - aws
---

## Prerequisites

To get started, make sure you have a valid AWS account, and you have installed [AWS CLI](https://aws.amazon.com/cli/) in your machine.

> NOTE: AWS Bedrock is not free. Make sure you check the [pricing](https://aws.amazon.com/bedrock/pricing/) before going ahead.

Let's begin to set up the process step by step.

Login to AWS Management Console and search for IAM.

![step1](./images/step1.png)

Click **Users**

![step2](./images/step2.png)

Click **Create user**

![step3](./images/step3.png)

Provide a name. I am using "bedrock_user" you can choose any name that suits you and then move forward.

![step4](./images/step4.png)

Next, click **Attach policies directly** and check **AmazonBedrockFullAccess** and move forward.

> Always use strict policies based on your organization rules. For this tutorial, it's fine to use full access. But we normally prohibit it.

![step5](./images/step5.png)

Review everything is done correctly and then click **Create user**.

![step6](./images/step6.png)

Once the user is created successfully, you will be redirected to users page. Click the newly created user.

![step7](./images/step7.png)

Next, click **Security credentials**.

![step8](./images/step8.png)

Click **Create access key**.

![step9](./images/step9.png)

Next, choose use-case as **Other** and move forward.

![step10](./images/step10.png)

Provide a tag if you wish to. But it's completely optional. Go ahead and click **Create access key**.

![step11](./images/step11.png)

You can see the below image, access key and secret access key have been generated for us.

![step12](./images/step12.png)

Now, we need to configure AWS CLI to use the access keys,
which will be helpful when we are interacting our Go application with AWS SDK.

Open Terminal and then type **aws configure**. After that, provide your access key id and secret access key.

![step13](./images/step13.png)

Our AWS CLI has been configured properly now. Let's move ahead and enable the model access.
