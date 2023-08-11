---
date: 2020-01-29
title: Formatting code in columns
topics:
  - .net
  - editing
  - resharper
  - rider
author: matkoch
subtitle: Easily read common code in column-style layout!
thumbnail: ./thumbnail.png
cardThumbnail: ./card.png
animatedGif:
  file: ./guide.webm
  width: 540
  height: 298
leadin: "**Ad-hoc formatting or everywhere?** \U0001F4D0\n\nAligning properties in columns can greatly improve readability for DTOs or vector data types. We can also align binary expressions, invocations and many more constructs. However, often we don't want to apply such formatting across our whole code base, but in very particular cases. Using **formatter comments**, we can format our code just for a specific scope:\n\n```\npublic class PersonDto\n{\n    // @formatter:<setting_name> <value>\n    public Guid     PersonGuid  { get; set; }\n    public int      PersonId    { get; set; }\n    public DateTime UtcCreated  { get; set; }\n    public DateTime UtcModified { get; set; }\n    public string   Name        { get; set; }\n    public string   Email       { get; set; }\n    public string   City        { get; set; }\n    public string   State       { get; set; }\n    public int      ZipCode     { get; set; }\n    // @formatter:<setting_name> restore\n}\n```\n\nIn order to determine the `setting_name` and `value`, we recommend to first change the formatting through the settings dialog, save it to the solution layer, and then to identify the added line in `your-solution.sln.dotsettings`.\n\nMay the formatting be with you! \U0001F9D9\U0001F3FB\n\n### See Also\n- [\"Formatting\" on the JetBrains .NET blog](https://blog.jetbrains.com/dotnet/?s=formatting)\n- [Format and Reformat Code](https://www.jetbrains.com/help/rider/Code_Formatting_Style.html)\n"
---

