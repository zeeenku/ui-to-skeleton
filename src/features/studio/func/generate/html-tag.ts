// Utility function to check if the class is a width class
// button with text children only!

// h1 has width bigger than screen put screen if not use the one there
// default corners rounding if no on already exists
//change border color
// anchor tags must be manipulated in a good way!
// use unified tag!!!
// background img handle
// will be mostly necessary after everything
// make title fit only text in case of smaller than screen....
// remove bg image
// option of removing animations....
// div that its children is a text?????
// div --> span & plain text (only styles span and text get neglected)...
// a child is only text????
// maybe add the feature of multi texts lines ui
// h3 -> span -> text also gives confusion...
// detect a with children components if yes then use dont match it
// add other text tags like i blokquote...
// function isWidthClass(className: string) {
//     const regex = /^(.*:)?(w-|min-w-)\S+$/;
//     return regex.test(className);
// }

// function isPaddingClass(className) {
//     const regex = /^(p|px|py|pt|pr|pb|pl)-(\[[^\]]+\]|[0-9]+|auto|rem|em|px|%-?[\d.]+)$/;
//     return regex.test(className);
// }

// function isMarginClass(className) {
//     const regex = /^(m|mx|my|mt|mr|mb|ml)-(\[[^\]]+\]|[0-9]+|auto|rem|em|px|%-?[\d.]+)$/;
//     return regex.test(className);
// }
// const tailwindDisplayClasses = [
//     "block",
//     "inline",
//     "inline-block",
//     "flex",
//     "inline-flex",
//     "grid",
//     "inline-grid",
//     "table",
//     "inline-table",
//     "table-caption",
//     "table-cell",
//     "table-column",
//     "table-column-group",
//     "table-footer-group",
//     "table-header-group",
//     "table-row",
//     "inline-table-row",
//     "hidden"
// ];

// const defaultClasses: Record<string, string[]> = {
//     button: [
//         "inline-block",
//         "px-4",
//         "py-2", 
//         "rounded",
//     ],
//     p: [
//         "block",
//         "my-4",
//     ],
//     img: [
//         "block",
//         "max-w-full",
//     ],
//     h1: [
//         "block",
//         "mt-0",
//         "mb-2", 
//     ],
//     h2: [
//         "block",
//         "mt-0",
//         "mb-3", 
//     ],
//     h3: [
//         "block",
//         "mt-0",
//         "mb-4", 
//     ],
//     h4: [
//         "block",
//         "mt-0",
//         "mb-5", 
//     ],
//     h5: [
//         "block",
//         "mt-0",
//         "mb-6", 
//     ],
//     h6: [
//         "block",
//         "mt-0",
//         "mb-7",
//     ],
//     a: [
//         "inline"
//     ],
//     span: [
//         "inline", 
//     ],
// };
// Utility function to check if the class is a background class
// function isBgClass(className: string) {
//     const regex = /^(.*:)?bg-\S+$/;
//     return regex.test(className);
// }  



// function isIconClass(className) {
//     const regex = /^(fas|far|fal|fab|fa)-\S+$/;  // Checks for Font Awesome classes
//     return regex.test(className);
// }

// // Utility function to check if the class is a text-related class
// function isTextClass(className: string) {
//     const regex = /^(.*:)?(text-)?\S+|^(.*:)?(font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black))|^(.*:)?(underline|line-through|no-underline)$/;
//     return regex.test(className);
// }

// // Utility function to check if the class is a height class
// function isHeightClass(className: string) {
//     const regex = /^(.*:)?(h-|min-h-)\S+$/;
//     return regex.test(className);
// }

// has a text children, then make an element for it
// block and father flex, not working....

function isBgClass(className: string) { 
    const regex = /^(.*:)?bg-\S+$/;
    return regex.test(className);
}

function isIconClass(className: string) {
    const regex = /^(fas|far|fal|fab|fa)-[a-zA-Z0-9-]+$/;  // Checks for Font Awesome classes
    return regex.test(className);
}

function isTextClass(className: string) {
    // Strict matching for text-related classes, excluding spacing classes like mt-2
    const regex = /^(.*:)?(text-(color|size|align|opacity)|font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)|underline|line-through|no-underline)$/;
    return regex.test(className);
}

// Matches height-related classes (h-, min-h-)
function isHeightClass(className: string) {
    const regex = /^(.*:)?(h-|min-h-)(auto|screen|full|\d+px|\d+rem|\d+%)$/;
    return regex.test(className);
}

// Matches width-related classes (w-, min-w-)
function isWidthClass(className: string) {
    const regex = /^(.*:)?(w-|min-w-)(auto|screen|full|\d+px|\d+rem|\d+%)$/;
    return regex.test(className);
}

// HTMLTag class for rendering and managing HTML elements
export class HTMLTag {
    tagName: string;
    width: number;
    borderRadius: string;
    height: number;
    display: string;
    className: string;
    linesCount: number;
    clientRects: DOMRectList;
    children: (HTMLTag | string)[];

    constructor(tagName: string, width: number, height: number, display: string, borderRadius: string,clientRects: DOMRectList, linesCount:number, className: string) {
        this.tagName = tagName;
        this.borderRadius = borderRadius;
        this.width = Math.round(width);
        this.height = Math.round(height);
        this.className = className;
        this.display = display;
        this.clientRects = clientRects;
        this.linesCount = linesCount;
        this.children = [];
    }

    // Method to append a child to the element
    appendChild(child: HTMLTag | string) {
        this.children.push(child);
    }

    // Method to render the element and its children
    render( bgClass: string, defaultBorderRadiusClass: string) {

        const element = document.createElement("div");
        // get display class (if not exist)
        // get padding class (default one)
        // get margin class (default one if not exist)
        // if(this.tagName == "a"){
        //     this.display = "block";
        // }

        // simplify
        const textTags = ["p", "h1", "h2", "h3", "h4", "h5", "h6"];

        const nonLayoutTagNames = ["button", "svg", "i" , "p", "img", "h1", "a", "h2", "h3", "h4", "h5", "h6", "span"];
        element.style.display = this.display;
        // if it neeeds to have a specefic width then inline-block ig?
        // or maybe make is father has a static width
        // layout el ==> children of el has children non text
        // if at least on of the elements is a not a tex element then it is a layout
        // how??? no empty or text children element, element with children one or more not text
        // what is a text element?
        // inline or inline-block with text 
        // different bg than parent

        // !nonLayoutTagNames.includes(this.tagName) && 
        if (!this.areChildrenTexts()) {
            element.setAttribute("class", this.className);
        } else {

            if(textTags.includes(this.tagName)){
                Array.from(Array(this.linesCount).keys()).forEach(el => {
                    const line = document.createElement("div");
                    const h = Math.round(this.clientRects[0].height);
                    
                    // Dynamically creating the height and margin class names (using string template literals)
                    const heightClass = `h-[${Math.round(h*0.7* 0.8/this.linesCount)}px]`;
                    const marginClass = `mb-[${Math.round(h*0.7* 0.2/this.linesCount)}px]`;
                    
                    if(this.linesCount-1 === el ){
                        // text-center to mx-auto
                        // actually this is a flwad, practically not possible
                        line.classList.add("w-1/2");
                        if(this.className.includes("text-center")){
                            line.classList.add("mx-auto");
                        }
                    }
                    // Adding the calculated class names and other classes to the div
                    line.classList.add(heightClass);
                    line.classList.add(marginClass);
                    line.classList.add("animate-pulse");
                    // line.classList.add("border");
                    line.classList.add(bgClass);
                
                    // Conditional class for border radius
                    if (this.borderRadius === "0px") {
                        line.classList.add(defaultBorderRadiusClass); // Make sure defaultBorderRadiusClass is defined
                    }
                
                    // Append the line to the element
                    element.appendChild(line);
                });
                

                return element;
            }

            // if it is a skeleton
            // all children are text
            // dtect if its a p or ....
            // if yes do a texts skeleton
            // if not do a normal skeleton....
            let hasWidthClass = false;
            let hasHeightClass = false;
            let classList = 
            //defaultClasses[this.tagName] || [];
            //todo: detect if they are in the same type of classes if yes dont add it from original
            this.className
            .split(" ");
            classList = classList.filter(Boolean);

            element.setAttribute("classe",classList.map(el=>el).join(" "));
            element.setAttribute("dissp", this.display);
            // block inside flex doenst give it full width....
            classList = classList
            .filter((className: string, index: number) => {
                // If it's a width class, mark it


                // children are actually textn eventhough its block but content doesnt have full width
                if (!hasWidthClass && isWidthClass(className)) {
                    hasWidthClass = true;
                    return true;
                }

                
                // If it's a height class, mark it
                if (!hasHeightClass && isHeightClass(className)) {
                    hasHeightClass = true;
                    return true;
                }

                return !isBgClass(className) && !isIconClass(className) && !isTextClass(className);
            });


            // Apply default width and height if missing
            if (!hasWidthClass //&& !["block","flex"].includes(this.display)
            ) classList.push(`w-[${this.width}px]`);
            if (!hasHeightClass) classList.push(`h-[${this.height}px]`);

            // Add the animation and background classes

            classList.push("animate-pulse", 
                //"border" ,
                bgClass);
            if(this.borderRadius == "0px"){
                classList.push(defaultBorderRadiusClass);
            }
            // Add all the classes to the element
            classList.forEach(el => element.classList.add(el));
        }

        // Render children (if any)
        this.children.forEach(child => {
            if (child instanceof HTMLTag && this.tagName !== "svg") {
                element.appendChild(child.render(bgClass, defaultBorderRadiusClass));
            } else {
                // const ell = document.createElement("span");
                // // ell.innerHTML = child;
                // element.appendChild(ell);
            }
        });

        return element;
    }

    
areChildrenTexts(depth=1){
    if(this.tagName == "svg") return true;
    if(depth > 2) return false;
    let areTexts = true;
    this.children.forEach(child => {
        if ((child instanceof HTMLTag && child.tagName !== "svg") && areTexts) {
            // areTexts = false;
            //maybe later for advanced solution
            areTexts = child.areChildrenTexts(depth+1) && child.children.length <= 1 
            && child.display !==  "block"
            && child.display !==  "inline-block"
            ;
        }
    });
    return areTexts;
}
}


    // const nonLayoutTagNames = ["button","p","img","h1","a","h2","h3","h4","h5","h6","span"];
    // // if its body is actually text
    // if(nonLayoutTagNames.includes(this.tagName)){
    //     // remove all text classes
    //     // get the width to put
    //     // remove text children 
    //     filterClasses(this.attributes["class"] ?? "").forEach((el)=>{
    //         if(el.length){
    //             element.classList.add(el);
    //         }
    //     });
    
    //     element.classList.add("animate-pulse");
    //     element.classList.add("bg-blue-300");
    // }
//     if(!Object.keys(this.attributes).includes("skeleton-role")){

// }
    // Append child element
