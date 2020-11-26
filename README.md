# FastJS

## Usage

Create a new file with any extension, then write the fastJS code following its syntax.

Create a javascript file and paste this:

```javascript
const FastJS = require("../src/parser");

FastJS.Parse(path.resolve(__dirname,"./<my_file>.<ext>"),__dirname);
```
or
```javascript
const FastJS = require("../src/parser");

FastJS.Parse("your code here",__dirname);
```
Compile with nodejs and it will generate the code into a javascript file.
Use it like this in the HTML page:

```html
<script src="main.js"></script>
<script src="generated_file.js"></script> <!-- the generated file after your principal script -->
```

> Add action

```javascript
const FJ= require("../src/parser");

let input = path.resolve(__dirname,"./animator.fast");
let ouput = path.resolve(__dirname,"test");

FJ.CustomParse(input,ouput,(selectorElement,event,Change,selectorIndex,item,css)=>{
    

   // css = {css:"",value:""}
    console.log(css)
   // selectorElement => document.querySelectorAll(selectorElement)
    console.log(selectorElement)
   // selectorIndex (can be undefined) => document.querySelectorAll(selectorElement)[selectorIndex]
    console.log(selectorIndex)
  // event => addEventListener(event,()=>{})
    console.log(event)
  // Change (list of css element) => [{css:"",value:""},{css:"",value:""}]
    console.log(Change)
  // item (pure code) => "#a:mouseover{display:none;}"
    console.log(item)

  if(css.css="remove"&&css.value=="true"){
      // e  = on eventlistener is call function(e){})
      return "e.target.remove();"; 
  }
});
```
## Syntax

* No comment in the code.
* No semicolon after parenthesis.

> Special argument

* delay
    * ms
    * s
* callback
    * function (no parameters and function name must be like this [a-zA-Z0-9])
    * function recienve the event parameter
* attribute
    * rem("attribute_name")
    * set("name","value")  (update if there was a value)

> Selector All

* default html element
    * a
    * div
* attribute
    * (attributename)
* class
    * .container
* id
    * #btn

> Selector One

* element[index]

The code must be like this:

```css
#id[0]:event{
    display:none;
    delay:0.3s;
    callback:myfunction();
}

.a:click{hello:true;}

(stop)[1]:mouseover
{
display:none;
attribute:set("ok","nice");
attribute:rem("ok");
}

div:drag{
    callback:start();
    callback:close();
}
```



## Licence
[Apache](https://github.com/JulesG10/FastJS/LICENCE.md)
