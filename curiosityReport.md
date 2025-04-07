# Curiosity Report: Dependency Injection

## Introduction
*Why dependency injection?*

I chose to learn more about dependency injection because I have seen it in a few of my classes and no matter which context I heard about it in, I
could not understand it at all.
---

## What Is Dependency Injection?

According to Gemini, Dependency Injection (DI) is a software design pattern that promotes loose coupling and testability by making a class independent of its dependencies, meaning it doesn't create or manage its own dependencies, but instead receives them from an external source.

From what I understand, instead of doing something like this:

```javascript
class PizzaService {
  constructor() {
    this.toppingService = new ToppingService(); // tightly coupled
  }

  makePizza() {
    return `Pizza with ${this.toppingService.getToppings()}`;
  }
}
```

It is doing something like this:

```javascript
class PizzaService {
  constructor(toppingService) {
    this.toppingService = toppingService;
  }

  makePizza() {
    return `Pizza with ${this.toppingService.getToppings()}`;
  }
}
```

The second example using DI makes the code less coupled.

---

## Why Is Dependency Injection Useful?

Some common advantages are for testing/mocking purposes. It is way easier to create mocks for a function or class when it uses DI rather than creating an instance of a class object inside it.

It also makes the code more reusable and changeable. 

---

## How Does It Work?

Dependency Injection works by passing an object (a *dependency*) into a class or function, rather than having that class create the object itself.


[ ToppingService ] ---> injected into ---> [ PizzaService ]
