# Common Regular Expressions

## (?:pattern) Non-capturing Group

(?:) indicates a non-capturing group. The only difference from a capturing group is that the matched value of a non-capturing group is not saved.

## (?=pattern) Positive Lookahead

Positive lookahead matches the position before pattern. This is a non-capturing match.
Simply put, using xxx(?=pattern) as an example, it captures the content xxx that ends with pattern.

## (?!pattern) Negative Lookahead

Negative lookahead matches at the beginning of any string that does not match pattern.
Simply put, using xxx(?!pattern) as an example, it captures the content xxx that does not end with pattern.

## (?<=pattern) Positive Lookbehind

Positive lookbehind is similar to positive lookahead, but in the opposite direction.
Simply put, using (?<=pattern)xxx as an example, it captures the content xxx that starts with pattern.

## (?<!pattern) Negative Lookbehind

Simply put, using (?<!pattern)xxx as an example, it captures the content xxx that does not start with pattern.
