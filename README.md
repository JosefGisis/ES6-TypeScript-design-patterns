## ES6 Design Patterns

This repository contains practice examples for all 23 design patterns from "Design Patterns: Elements of Reusable Object-Oriented Software" by Gamma, Helm, Johnson, and Vlissides in TypeScript (EcmaScript6).

The examples are contained within directories ordered by the design pattern's purpose:

1. Creational: the way objects are created.
2. Structural: the way objects relate to each other.
3. Behavioral: the way objects communicate with each other.

There is also a folder containing code as an example of SOLID design principles.

---

### What are design patterns?

Design patterns describe a frequently occurring problem in object-oriented programming and provide a solution to that problem. By utilizing design patterns, applications become eminently more understandable, extensible, modifiable, and error resilient (pp. 2-3).

### Design patterns outline some basic principles.

1. <h4>Program to an interface, not an implementation:</h4> Polymorphism requires clients to be able to work with exchangeable implementations, and in order to do so, all objects of a subclass need to be able to stand in for objects of its superclass (think of Liskov's substitution principle). By programming to an interface, we can interchange all objects that share an interface (pp. 17-8).

2. <h4>Favor object composition over inheritance:</h4> Class inheritance results in large, monolithic, static structures. Changes to parent classes, necessitates refactoring all inheriting classes. Furthermore, class inheritance fundamentally breaks encapsulation by exposing classes' structures. Object composition (while suffering from its own downsides, namely being harder to understand) is preferable (pp. 18-20).

3. <h4>Encapsulate variation:</h4> When an aspect of a program varies or is highly dynamic, encapsulating that functionality simplifies the application's logic and makes it easier to modify and extend. This is the principle behind most behavioral design patterns (p. 345).

Josef Gisis 10/6/2024

---

Gamma, E., Helm, R., Johnson, R., & Vlissides, J. (1995). _Design Patterns: Elements of Reusable Object-Oriented Software_. Addison-Wesley.
