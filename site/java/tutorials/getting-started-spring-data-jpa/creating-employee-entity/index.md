---
type: TutorialStep
date: 2021-06-02
title: Creating an Employee Entity
topics: []
author: da
subtitle: Create a JPA entity representing an Employee.
thumbnail: ./thumbnail.png
---

An Entity is a Java class representing data you want to insert into a database. For our application, we will create an Employee entity that we will use to insert Employee data into an Employee table in our database.

In the _Project_ tool window, we'll navigate to our `src/main/java` directory, select the `com.jetbrains.springdatajpaapp` package and press <kbd>⌘N</kbd> (macOS) / <kbd>Alt+Insert</kbd> (Windows/Linux). Choose **Java Class** and then type in our entity name - `Employee`. Then, press <kbd>⏎</kbd> (macOS) / <kbd>Enter</kbd> (Windows/Linux).

In the Employee class, we'll make it an entity by adding the `@Entity` annotation to our class definition and importing the `javax.persistence.Entity` package. Once you do that, you'll notice an error in your class.

![Employee Entity Error](./EmployeeEntity.png)

As the error message indicates, entities must have a primary key which is specified by having a field annotated by the `@Id` annotation. We'll use the <kbd>⌥⏎</kbd> (macOS) / <kbd>Alt+Enter</kbd> (Windows/Linux) shortcut so IntelliJ IDEA can add the ID for us which will result in a prompt to enter the ID field's information. We'll take the default _Name_ and _Type_. You can select the _Field Access_ checkbox (I prefer annotations on fields instead of the setter methods because I find it more readable). You can also select the _Generated_ checkbox so you don't have to assign Employee Ids yourself.

![Add Employee ID](./AddIdAttribute.png)

Then, we'll click **OK**. You'll notice that IntelliJ IDEA creates an `id` field with its setters and getters.

Next, let's add a couple of String fields: `firstName` and `lastName`.

Next, we'll generate our constructors by bringing up the _Generate_ menu <kbd>⌘N</kbd> (macOS) / <kbd>Alt+Insert</kbd> (Windows/Linux) and select **Constructor**. We don't need the constructor to take in an `id` because ours will be generated so we'll click on **firstName** then hold down <kbd>⌘</kbd> (macOS) / <kbd>Ctrl</kbd> (Windows/Linux) and select **lastName**.

![Generate Constructor](./GenerateConstructor.png)

Then, we'll click **OK**.

You'll now notice that you have an error on your `Employee` class because you don't have a no-arg constructor. If you press **Alt+Enter** (Windows/Linux), or **⌥⏎** (macOS), on the error, IntelliJ IDEA offers to create it for you - let's go ahead and do that.

Next, we'll generate our field's setters and getters. We'll bring up the _Generate_ menu <kbd>⌘N</kbd> (macOS) / <kbd>Alt+Insert</kbd> (Windows/Linux) and select **Getter and Setter**. We'll hold down <kbd>⌘</kbd> (macOS) / <kbd>Ctrl</kbd> (Windows/Linux) and select both variables. Then, we'll click **OK**. IntelliJ IDEA generates the getters and setters for both variables.

Finally, let's generate a `toString` method by bring up the _Generate_ menu again <kbd>⌘N</kbd> (macOS) / <kbd>Alt+Insert</kbd> (Windows/Linux) and selecting **toString**. We'll keep all the fields selected and click **OK**.

## End Result

Your final `Employee` entity should look similar to this (formatting may vary):

```java
package com.jetbrains.springdatajpaapp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Employee {
    @Id
    @GeneratedValue
    private Long id;
    private String firstName;
    private String lastName;

    public Employee() {
    }

    public Employee(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                '}';
    }
}
```
