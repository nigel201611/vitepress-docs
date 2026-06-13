# Code Reuse

## Why Reuse Code?

## Core Goal

Improve human efficiency, reduce development cost. The formula:

```
Time saved = Code reuse time saved * Code reuse factor * Number of uses

1. A page (form) takes 8 hours, code reuse saves 8 hours
2. When reused in a new scenario, 4 hours, material reuse factor = 0.5
3. Number of uses: 20
Time saved = 8 * 0.5 * 20 = 80 hours = 80 / 22 approximately 4 person-days
If we have 10 similar page templates, 40 person-days

```

## Thoughts Behind It

* Different developers and teams produce a large amount of repetitive, common code
* This code is scattered across each team's project code
* When reusing, people tend to directly copy code into projects, because this has the lowest personal cost (developers are often more familiar with their own code)
* However, this practice is not conducive to code sharing between teams, because different developers work on different businesses and have varying levels of familiarity with different pages. The purpose of code reuse is to level up the overall capability of developers in the team as much as possible
* Therefore, we need to use tool-based approaches to reduce the cost of code reuse

## Code Reuse Practices in Large Companies

Four questions that must be answered to implement code reuse:

* Question 1: What reusable code exists?
* Question 2: How to extract reusable code, and what is the measurement standard?
* Question 3: How to manage reusable code? How to maintain it?
* Question 4: How to use the reusable code?
Different teams will arrive at different answers to these questions. Each team should choose solutions that suit their own business characteristics. Below are the answers from large companies to these four questions.

What reusable code exists?

<img src="/images/reusecode.jpg">

How to extract reusable code, and what is the measurement standard?

* How many times it has been reused in existing project code? (> 3 times)
* Is it already included in basic components? (not included)
* Is there likely a reuse scenario in the future? (yes)
* Does it already duplicate existing reusable code? (not duplicated)

How to manage reusable code? How to maintain it?

* Have a unified material (a general term for reusable code) management platform, managing materials as assets
* Have a unified material production, management, maintenance, and consumption process and tool chain
* In this course, we will use a scaffold for the production, maintenance, and consumption of reusable code, and manage these materials through a platform

How to use reusable code?

Quick:
* Manual copy
* Using IDE capabilities

Advanced:
* Scaffold installation
* Integration with IDE (using plugins or extensions)

## Add Page Flow
<br/>
<img src="/images/addCodeTemp.jpg">
