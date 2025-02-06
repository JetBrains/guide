---
date: 2024-12-03
title: "UUID in Kotlin Multiplatform"
topics:
  - kotlin
author: martonbraun
subtitle: Work with unique IDs using the Kotlin Standard Library
thumbnail: ./thumbnail.jpg
video: "https://www.youtube.com/watch?v=V5EOsE_eJLE"
linkURL: "https://www.youtube.com/watch?v=V5EOsE_eJLE"
---

Kotlin Multiplatform has UUID support built into the Standard Library, with experimental APIs added in [Kotlin 2.0.20](https://kotlinlang.org/docs/whatsnew2020.html#support-for-uuids-in-the-common-kotlin-standard-library).

Having a standard implementation for everyone to use means you don't have to implement it yourself or add extra dependencies to your projects. You’ll also be able to reuse the same UUID type across the entire ecosystem, with both libraries and your own project code building on this API.

### What's a UUID

**U**niversally **U**nique **Id**entifiers are 128-bit numbers which are often used as database or session IDs. The great thing about them is that they can be generated independently anywhere, with an extremely low chance of generating the same ID twice.

This means you can create these IDs and assign them to things on the client side on many different devices, without having to constantly synchronise with a server that would tell you what the next ID should be.

### Generating and parsing UUIDs

To get started with UUIDs in a Kotlin Multiplatform project, we can call `Uuid.random()`, which gives us a version 4 randomized UUID. This function is backed by different random number generators across the various platforms, which are all described in detail in [the documentation](https://kotlinlang.org/api/core/kotlin-stdlib/kotlin.uuid/-uuid/).

```kotlin
val uuid = Uuid.random()
```

As these new APIs are experimental for now, we’ll have to opt in to using them:

```kotlin
import kotlin.uuid.ExperimentalUuidApi

@OptIn(ExperimentalUuidApi::class)
```

We can print this UUID directly, which will call `toString()` on it, and display it in a standard hexadecimal format, where each of the 32 digits represents 4 bits of data. These digits are also separated into groups using dashes.

```kotlin
println(uuid) // 3f2dd185-0540-4d82-ad26-e6a181cb1893
```

What if we have a UUID in the standard dashed format as a string from somewhere? We can use the `parse()` function to take that and create an instance of the class.

```kotlin
val parsed = Uuid.parse("3f2dd185-0540-4d82-ad26-e6a181cb1893")
```

While `parse()` and `toString()` use the standard format with dashes, you can also use `parseHex()` and `toHexString()` for a more concise string representation, with no dashes. This shorter format is sometimes used when sending IDs through the network or when saving them to a database, just to save a bit of space.

```kotlin
val parsed = Uuid.parseHex("3f2dd18505404d82ad26e6a181cb1893")
println(parsed.toHexString()) // 3f2dd18505404d82ad26e6a181cb1893
```

While we’re at efficiency, you can also convert a `Uuid` to a `ByteArray`, as well as the other way around, if you want to work at the byte level.

```kotlin
val array = uuid.toByteArray()
val uuidAgain = Uuid.fromByteArray(array)
```

### Converting to Long and back

If you want to work with the individual bits of a `Uuid`, you can call `toLongs()` to get access to them as two `Long` values, which represent the most significant bits and the least significant bits of the UUID:

```kotlin
uuid.toLongs { mostSignificantBits, leastSignificantBits ->

}
```

This of course works nicely as the UUID is 128 bits and each `Long` value can hold 64 of those!

Depending on the version of the UUID, certain bits of it will have specific meaning. Something that all UUIDs must contain though is their version, which is always stored in the first hex digit of the third group.

```
3f2dd185-0540-4d82-ad26-e6a181cb1893
              ^
```

In this form, we can immediately see that this is a version 4 UUID, but let’s see how we could extract this value in our code.

First, we’ll take the most significant bits. We’ll shift them to the right by 3 hexadecimal digits (which is 12 decimal places when counting in binary), and then perform a binary AND operation to chop off just one digit.

```kotlin
val version = uuid.toLongs { mostSignificantBits, leastSignificantBits ->
    (mostSignificantBits shr 12) and 0xF
}
```

We can print this value and confirm that we are working with a version 4 UUID:

```kotlin
println(version) // 4
```

If you want to work with unsigned values instead, you can always use the `toULongs()` function which gives you the same bits as two unsigned long values.

```kotlin
uuid.toULongs { mostSignificantBits, leastSignificantBits ->
    ...
}
```

Going the other way, there are APIs you can use to construct UUIDs from two Long or unsigned Long values, using the fromLongs and fromULongs functions. Note the 0x prefix here that lets us use hexadecimal digits, as well as the uL suffix which specifies that our values are unsigned Longs.

```kotlin
val uuid = Uuid.fromULongs(0x946010f5f9aa4061uL, 0xbd1d483e6e8e217buL)
```

### Java interoperability

Finally, if you’re working on the JVM, you can use extensions to convert between the Java `UUID` and Kotlin `Uuid` types, in both directions, making it easy to interop with existing code that uses Java UUIDs, or to migrate it step-by-step to the new Kotlin type.

```kotlin
val kotlinUuid: kotlin.uuid.Uuid = Uuid.random()
kotlinUuid.toJavaUuid()

val javaUuid: java.util.UUID = UUID.randomUUID()
javaUuid.toKotlinUuid()
```

With that, you can now generate, parse, inspect, and convert UUIDs in your common or platform-specific Kotlin code.
