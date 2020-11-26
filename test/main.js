const FastJS = require("../src/parser");
const path = require("path")

FastJS.Parse( `

#a:click{
    coucou:nice;
    coucou:nice;
    coucou:nice;
    attribute:set("ok","ok");
    delay:0.3s;
    delay:0.5ms;
    callback:ok();
}

(attr)[0]:on{
    callback:nice();
    coucou:nice;
    ok:nice;
    attribute:rem("ok","nice","cool");
    
}

#coucou[0]:false{
    
}`,path.resolve(__dirname,"test"))
FastJS.CustomParse(path.resolve(__dirname,"./animator.fast"),path.resolve(__dirname,"test"),(selectorElement,event,Change,selectorIndex,item,css)=>{
   if(css.value=="nice"){
       return "alert(\"nice\");";
   }
});
