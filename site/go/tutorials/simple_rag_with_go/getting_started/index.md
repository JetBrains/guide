---
type: TutorialStep
date: 2025-02-03
title: Getting Started
author: mm
subtitle: Setting up the AWS environment and configuring the AWS SDK.
thumbnail: ./thumbnail.png
topics:
  - aws
---

## Prerequisites

To get started, make sure you have a valid AWS [account](https://aws.amazon.com/), and you have installed [AWS CLI](https://aws.amazon.com/cli/) on your machine.

> NOTE: AWS Bedrock is not free. Make sure you check the [pricing](https://aws.amazon.com/bedrock/pricing/) before going ahead.

Let's begin to set up the process step by step.

Login to AWS Management Console and search for IAM.

![step1](./images/step01.png)

Click **Users**.

![step2](./images/step02.png)

Click **Create user**.

![step3](./images/step03.png)

Provide a name. I am using "bedrock_user" you can choose any name that suits you and then move forward.

![step4](./images/step04.png)

Next, click **Attach policies directly** and check **AdministratorAccess** and move forward.

> Always use strict policies based on your organization rules. For this tutorial, it's fine to use full access, but we would normally prohibit it.

![step5](./images/step1.png)

Review everything is done correctly and then click **Create user**.

![step6](./images/step2.png)

Once the user is created successfully, you will be redirected to the "users" page. Click the newly created user.

![step7](./images/step3.png)

Next, click **Security credentials** -- **Create access key**.

![step8](./images/step4.png)

Next, choose use-case as **Other** and move forward.

![step9](./images/step5.png)

Provide a tag if you wish to. But it's completely optional. Go ahead and click **Create access key**.

![step10](./images/step6.png)

You can see the below image, access key and secret access key have been generated for us.

![step11](./images/step7.png)

Now, we need to configure AWS CLI to use the access keys, which will be helpful when we are interacting our Go application with AWS SDK.

Open the Terminal and then type **aws configure**. After that, provide your access key id and secret access key.

![step12](./images/step8.png)

> Avoid copying the AWS access keys you see on the screen, as they will become invalid after a few days. Instead, ensure you use your own access keys and secret key.

The AWS CLI has been successfully configured. Next, let's proceed to the section where we'll focus on the Knowledge Base.
