---
type: TutorialStep
date: 2025-02-03
title: Creating the KnowledgeBase
author: mm
subtitle: Building the Knowledge Base
thumbnail: ./thumbnail.png
topics:
  - aws
---

## Knowledge Base

We will be using AWS Bedrock [Knowledge Bases](https://aws.amazon.com/bedrock/knowledge-bases/) to provide additional information to the LLM, so they can understand the context and deliver relevant information, enabling more accurate and contextual responses for the specific needs of our application.

### What we are going to build?

We have a food menu from the restaurant which are going to feed into the knowledge base and directly interact with the LLM model to retrieve the relevant info.

[IMAGE_SRC]

So, we got a sample restaurant menu what they normally serve to their customers. This information will be feeded to the LLM, so next time we don't need to see the menu, rather talk to AI, what's special today in the menu?

Create a file `food.txt` and store this information.

```text

**Breakfast**
- **Vegetarian Options:**
  - Paneer Paratha with Yogurt
  - Masala Dosa with Sambar and Coconut Chutney
  - Aloo Tikki with Toast and Fresh Juice
  - Poha with Pomegranate and Coriander
  - Avocado Toast with Eggs

- **Non-Vegetarian Options:**
  - Scrambled Eggs with Bacon and Toast
  - Chicken Sausage with Eggs and Hash Browns
  - Smoked Salmon on Bagel with Cream Cheese
  - Omelette (Cheese, Mushroom, and Bell Peppers)
  - English Breakfast: Sausages, Bacon, Grilled Tomato, Mushrooms, Beans, Toast

---

**Lunch**
- **Vegetarian Options:**
  - Vegetable Biryani with Raita
  - Paneer Tikka Masala with Naan or Rice
  - Spaghetti Aglio e Olio (Garlic & Olive Oil) with Parmesan
  - Grilled Vegetable Wrap with Hummus and Tabbouleh
  - Chickpea Salad with Feta, Olives, and Lemon Dressing

- **Non-Vegetarian Options:**
  - Chicken Shawarma with Garlic Sauce and Pita Bread
  - Grilled Fish with Couscous and Steamed Vegetables
  - Lamb Rogan Josh with Rice
  - BBQ Chicken Wrap with Coleslaw
  - Prawn Alfredo Pasta

---

**Dinner**
- **Vegetarian Options:**
  - Vegetable Lasagna
  - Tofu Stir-Fry with Bell Peppers and Broccoli
  - Dal Tadka with Jeera Rice
  - Vegetable Stuffed Bell Peppers with Quinoa
  - Spinach and Ricotta Stuffed Ravioli

- **Non-Vegetarian Options:**
  - Grilled Chicken Breast with Garlic Mashed Potatoes and Veggies
  - Butter Chicken with Naan or Rice
  - Seafood Paella with Mussels, Prawns, and Clams
  - Grilled Salmon with Asparagus and Lemon Butter Sauce
  - Roast Duck with Orange Glaze and Roasted Vegetables

---

**Pastries & Cakes**
- **Pastries:**
  - Chocolate Croissant
  - Apple Cinnamon Danish
  - Almond and Raspberry Danish
  - Blueberry Muffins
  - Pistachio Eclair

- **Cakes:**
  - Classic Vanilla Sponge Cake
  - Chocolate Fudge Cake
  - Red Velvet Cake with Cream Cheese Frosting
  - Lemon Drizzle Cake
  - Carrot Cake with Walnuts
  - Tiramisu

---
```

Now, we need to upload this data to S3, which will be acting as the Data Source.

Navigate to S3.

![step1](./images/1.png)

Click Create Bucket

![step2](./images/2.png)

Provide the bucket name, and make it should be unique.

![step3](./images/3.png)

After the bucket is created, make sure to upload the `food.txt` file which we created earlier.

![step4](./images/4.png)

Head back to IAM again, and make sure to enable the console access.

![iam1](./images/iam1.png)

![iam2](./images/iam2.png)

You can provide your own custom password or autogenerate.

![iam3](./images/iam3.png)

Now, let's resume back to BedRock console.

Click Knowledge Bases.

![step5](./images/5.png)

Click Create.
![step5](./images/6.png)

Now, choose Knowledge Base with vector store.

_A vector database is a collection of data stored as mathematical representations. Vector databases make it easier for machine learning models to remember previous inputs, allowing machine learning to be used to power search, recommendations, and text generation use-cases._

Source: [Cloudflare](https://www.cloudflare.com/en-gb/learning/ai/what-is-vector-database/)

![step5](./images/7.png)

aaaaaa

![step8](./images/8.png)
