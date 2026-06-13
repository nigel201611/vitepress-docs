# RBAC-based Permission Verification

## Permission Verification Scenarios and Requirements:

* Only users with specific roles can operate specific resources
* Different users can operate specific entities of the same resource type
* Different users can operate different attributes of the same resource
* "Who (User) has what permission (Authority) to perform which operations (Operation) on which resources (Resource)"

## Role-Based Access Control - RBAC

<img src="/images/RBAC.png">

## Node.js Libraries for RBAC

### [AccessControl.js](https://github.com/onury/accesscontrol)
* 1.6k Stars
* No updates for 3 years, many open issues
* Does not support TypeScript

### [Casbin](https://github.com/casbin/node-casbin)
* 1.7k Stars
* Written in TypeScript, supports multiple programming languages
* Complex concepts, slightly cumbersome to use

### [CASL](https://github.com/stalniy/casl)
* 3.4k Stars
* Written in TypeScript
* Simple and easy to use, good readability

### CASL Define Abilities
```js
import { AbilityBuilder, Ability } from '@casl/ability'
import { User } from '../models'; // application specific interfaces

/**
 * @param user contains details about logged in user: its id, name, email, etc
 */
function defineAbilitiesFor(user: User) {
  const { can, cannot, rules } = new AbilityBuilder(Ability);
  // can read blog posts
  can('read', 'BlogPost');
  // can manage (i.e., do anything) own posts
  can('manage', 'BlogPost', { author: user.id });
  // cannot delete a post if it was created less than a day ago
  cannot('delete', 'BlogPost', {
    createdAt: { $lt: Date.now() - 24 * 60 * 60 * 1000 }
  });

  return new Ability(rules);
});

```

### Check Abilities
```js
// Later on you can check abilities by using can and cannot methods of Ability instance.
// in the same file as above
import { ForbiddenError } from '@casl/ability';
const user = getLoggedInUser(); // app specific function
const ability = defineAbilitiesFor(user);
class BlogPost { // business entity
  constructor(props) {
    Object.assign(this, props);
  }
}
// true if ability allows to read at least one Post
ability.can('read', 'BlogPost');
// the same as
ability.can('read', BlogPost);
// true, if user is the author of the blog post
ability.can('manage', new BlogPost({ author: user.id }));
// true if there is no ability to read this particular blog post
const ONE_DAY = 24 * 60 * 60 * 1000;
const postCreatedNow = new BlogPost({ createdAt: new Date() });
const postCreatedAWeekAgo = new BlogPost({ createdAt: new Date(Date.now() - 7 * ONE_DAY) });
// can delete if it's created less than a day ago
ability.can('delete', postCreatedNow); // true
ability.can('delete', postCreatedAWeekAgo); // false
// you can even throw an error if there is a missed ability
ForbiddenError.from(ability).throwUnlessCan('delete', postCreatedAWeekAgo);

```
