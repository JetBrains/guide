---
date: 2024-03-12
title: Demystifying Nulls and Nlanks in Django
topics:
  - django
  - databases
  - web
author: sb
subtitle: Learn the difference between blank=True and null=True
seealso:
  - title: (documentation) Django support in PyCharm
    href: >-
      https://www.jetbrains.com/help/pycharm/django-support7.html
  - title: (documentation) Django model fields
    href: >-
      https://docs.djangoproject.com/en/5.0/ref/models/fields/
  - title: (article) Blank or Null?
    href: >-
      https://simpleisbetterthancomplex.com/tips/2016/07/25/django-tip-8-blank-or-null.html
thumbnail: ./thumbnail.png
video: "https://youtube.com/embed/2BgoCIYkT4c"
obsoletes:
  - /python/tips/django-blank-null/
---

Are you always getting confused between `blank=True` and `null=True` in Django?

You're not alone! This is a common area of confusion in Django and is one of the [most up-voted questions in StackOverflow](https://stackoverflow.com/questions/8609192/what-is-the-difference-between-null-true-and-blank-true-in-django) for Django.

Let's go through the key concepts.

## In the Database

When you set `null=True` on a field, the associated Database column will be nullable.
Whereas setting `blank` has no impact on the Database schema.

If you are creating instances of your model from the Django shell, and assuming the fields have no `default` value:

- any field with `blank=True` `null=True` does NOT need a value set, and will be saved as `NULL` in the Database.
- any field with `blank=False` `null=True` does NOT need a value set, and will also be saved as `NULL` in the Database.
- any field with `blank=False` `null=False` ALWAYS needs a value set.
- any field with `blank=True` `null=False` does NOT need a value set IF an empty string `""` is a valid value (e.g. `TextField`s and `CharField`s), OTHERWISE this needs a value set.

**Note:** for simplicity, I will refer to fields as non-CharFields and CharFields. CharFields are fields where an empty string is a valid value such as a `TextField` or a `CharField`.

## In the Django admin

Any field with `blank=False` is marked as a required field and will be bold in the model forms to create or update an instance.

If you do not set a value for these, your form will have a validation error _even if_ the field is nullable.

If you have a field where `blank=True` `null=False`, and you do not set a value for this in the form, the Django admin will try to save this with a blank string `""`.
This will cause an error when an empty string is not a valid value, such as with an `IntegerField`.

That's why `blank=True` `null=False` does not make sense for non-CharFields.

The CharFields with `blank=True` `null=True` are saved as an empty string in the Database when updated or created from the admin. However, these have NULL values when created from the shell (or when not using a Django form).

This means we have two empty states for CharFields and that's... yucky. If you want values to be optional on CharFields you should set `blank=True` `null=False`.

## Conclusion

If you want to allow empty values for a field:

- for CharFields set `blank=True` `null=False`.
- for non-CharFields set `blank=True` `null=True`.
