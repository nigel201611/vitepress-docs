# 基于 RBAC 的权限验证

## 权限验证的场景以及需求：

* 特定的角色的用户才能操作特定的资源
* 不同的用户能操作同类资源的特定实体
* 不同的用户操作特定资源的不同属性
* “谁（User）拥有什么权限（Authority）去操作（Operation）哪些资源（Resource）”


## 根据角色完成权限的控制 - RBAC (role based access control)

<img src="/images/RBAC.png">

## Node.js 实现 RBAC 的库

### [AccessControl.js](https://github.com/onury/accesscontrol)
* 1.6k Star
* 3年没有更新，很多 issue 没人处理
* 不支持 ts

### [Casbin](https://github.com/casbin/node-casbin)
* 1.7k Star
* ts 编写，支持多种编程语言
* 概念比较复杂，使用略繁琐
### [CASL](https://github.com/stalniy/casl)
* 3.4k Star
* ts 编写
* 简单易用，可读性良好


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