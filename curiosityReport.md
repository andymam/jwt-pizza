# Curiosity Report: Dependency Injection

## Introduction
*Why did you choose this topic? What drew your curiosity?*

(Example: I chose Dependency Injection because I kept encountering the term in software architecture discussions and wanted to understand how it improves code maintainability and testability.)

---

## What Is Dependency Injection?
*A clear and concise explanation of the topic in your own words.*

---

## Why Is Dependency Injection Useful?
*Discuss the benefits and common use cases. How does it help developers?*

---

## How Does It Work?
*Explain the concept with examples or analogies. Code snippets are welcome here.*

```javascript
// Example of dependency injection in JavaScript
class PizzaService {
  constructor(toppingService) {
    this.toppingService = toppingService;
  }

  createPizza() {
    return `Pizza with ${this.toppingService.getToppings()}`;
  }
}
