# ValidJS
### JQuery Text Input Validator Class



## Getting Started
On text input elements include one of the following attributes:

1. vkey
2. vfoc
3. vpre
4. vsuf

```html
<input type='text' vkey='number'></input>
<input type='text' vfoc='email'></input>
<input type='text' vpre='DR.'></input>
<input type='text' vsuf='ft'></input>
```

## VKEY
Provides keydown events to restrict user from using certain characters
### Options
1. number
2. numberslash
3. numberdash
4. integer
5. decimal
6. characters

## VFOC
Provides focusout events to flag inputs that require rules 
### Options
1. number
2. integer
3. decimal
4. email
5. alpha
6. alphanumeric
7. dash
8. natrual
9. naturalzero
10. ip
11. bas64
12. url
13. credit
14. required

## VPRE
Allows you to set a string to be added to the prefix of inputing data. 

## VSUF
Allows you to set a string to be added to the suffix of inputing data. 


