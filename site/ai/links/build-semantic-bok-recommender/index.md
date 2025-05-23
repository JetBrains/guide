---
date: 2025-05-22
title: "LLM Course – Build a Semantic Book Recommender (Python, OpenAI, LangChain, Gradio)"
topics:
  - ai
author: hs
subtitle: Build an intelligent book recommendation system using the power of large language models and Python.
thumbnail: ./thumbnail.png
video: "https://youtu.be/Q7mS1VHm3Yw"
linkURL: "https://youtu.be/Q7mS1VHm3Yw"
---

## Building a Semantic Book Recommender

It's an absolute privilege to work with Dr Jodie Burchell here at JetBrains, so I was delighted to spend a couple of hours watching her in-depth course on how to build a semantic book recommender from start to finish. In this article I'll share my thoughts and give you a brief overview of the course so you can decide if you're going to dive in!

Jodie doesn't assume any prior knowledge (speaking my language) beyond a bit of Python and an even smaller bit of LLM knowledge; she starts off by setting the wider scene of what we're going to work through:

- Prepare Text Data
- Vector Search
- Text Classification
- Sentiment Analysis
- Gradio Dashboard

As much as I want to get started, knowing where I'm going is very helpful!

### Prepare text data

As I expected, Jodie takes us straight into it by downloading a Kaggle dataset containing thousands of books. The dataset description includes helpful columns for the recommender, including the ISBN, title, authors, description, and more. While I know this video needs a book dataset, I would encourage anyone starting in Data Science to check out [Kaggle](https://www.kaggle.com/). There really is a wealth of data on there.

I'm sure it won't surprise you that the next step is to download and install [PyCharm](https://www.jetbrains.com/pycharm/download/). Oh, there's a promotion code in the video too - go check it out! Once we've got PyCharm set up with our virtual environment and the relevant libraries (including pandas, matplotlib, and seaborn), we can roll up our sleeves and get started.

I enjoyed Jodie's deep dive into the data inside PyCharm. She explains everything clearly, including that spicy topic of "missingness" and how it can lead to bias. Jodie shows us how to craft a heatmap, and then takes us through what that heatmap tells us and what conclusions we can subsequently draw. Even if you're not going to build the full semantic book recommender, I would watch this part of the video in isolation because it's a well-paced overview of many aspects of data cleaning. Jodie covers examining missing fields, visualising missing data, analysing missingness for bias, and then takes us through a decision to exclude some of that data. Next, Jodie works on the book categories where we have a huge number of distinct values, leading to a _long-tail problem_ which Jodie then shows us how we can manage. As a spoiler, there's more data cleaning to be done in the short descriptions too, as well as some of the other categories, before we can save the cleaned dataset.

### Vector search

This whole area is very new to me so again I really appreciated that Jodie started right at the beginning and explained it without assuming prior knowledge. Jodie goes to great lengths to explain how we can import the text descriptions, split them into manageable chunks, converting the chunks into document embeddings, and then finally store them in a vector database.

Jodie steps us through the code piece by piece so this is your chance to follow along as it runs. I strongly suggest pausing the video to follow along, it's a really nice feeling to see what you've built in action! Not least, you can start querying your hard work! The engine that you've built will find the closest match to your query based on book descriptions (for now!). I'll let you watch the full video to see what happens next ;-)

### Text Classification

It's time to build on the powerful basics that are already in place by refining using text classification to sort the categories into a smaller number of groups to add it to our book recommender as a filter. As a recap from the data cleaning section, we know we likely have too many categories, many of which only have a few books in (1/2). If we focus on fiction/non-fiction distinction, we can get a starter for classifying the rest of the books. Jodie using a zero-shot classification model from [Hugging Face](https://huggingface.co/) - another great website to check out if you haven't already. We're back to the code for the final part of this section so again, I recommend you follow along with Jodie and see how zero-shot classification can help us identify what's the most likely classification; fiction or non-fiction. Once we've checked how good it is, it's time to merge the dataframes before we move on to sentiment analysis!

### Sentiment Analysis

Again, we're going to start at the beginning, and Jodie does a fine job of explaining what sentiment analysis is (helps us determine the tone of the book). Jodie leans into her academic background here to take us through classifying our books into one of 7 emotional states (anger, disgust, fear, joy, sadness, surprise, and neutral). There's another fun journey here into the layers in the model that we need to predict emotional categories to further train the model.

I enjoyed watching Jodie iterate over the solution and then fine tune the solution to allow for a book to be represented by more than one emotional state. Once again I urge you to follow along because you'll feel extremely awesome when you see what you've created!

### Introduction to Gradio

It's back to the code again to retrieve our recommendations to use Gradio, an open-source Python library, to build an interactive dashboard. If you've been following along (and I hope you do), you end up with a dashboard that:

- Takes a user query input ("a story about forgiveness")
- Filters it for categories (fiction, non-fiction)
- Filters it for emotional tones (joyful, suspenseful).

You can now marvel at your dashboard with book covers, titles, and descriptions. DONE!
