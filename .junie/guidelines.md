List of Incremental changes:

```
 - parse all md files in the release_notes folder and generate an html file, using the JetBrains guide design. The HTML file should include all changes listed in the release_notes folder sorted by technology not product. Also make sure to aggregate EAP versions and final releases together
```

```
 - for the release note generation also list the version number that you can find in the headline of each document, but make sure to aggregate stable release and eap
```

```
 - instead of aggregating each technology by release version have a high level aggregator for the version and then list all the changes that were released in that particular version
```

```
 - implementation a sanitize logic that groups technologies better, for instance it doesn't make sense to differentiate between "build", "Built. Ant", "Build. Gradle". For that look through the release notes before and identify logical groups
```

```
 - build the same group for AI, IDE, Java, Lang, RD as in Remote Development, SQL, Version Control
```

```
 - for the release note generation, when aggregating items by technology also consider when a technology is mentioned in the ticket title., e.g. if the ticket title is "formatting for C#" it should be in the c# section not in a formatting section
```

```
 - oh I just noticed there are also entries for C++, can you create a technology section for that too
```

```
 - it seems like there are redundant entries, I just want a unique list of all by it's ticket number
```
