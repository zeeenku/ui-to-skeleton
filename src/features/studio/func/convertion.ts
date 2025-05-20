import { SkeletonCodeConfigFormats, SkeletonCodeConfigStylings, UiCodeConfigFormats, UiCodeConfigStylings } from "../types";

export const convertionController = (code: string, inputFormat: UiCodeConfigFormats | SkeletonCodeConfigFormats,
    exportFormat: UiCodeConfigFormats | SkeletonCodeConfigFormats,
    inputStyling: UiCodeConfigStylings | SkeletonCodeConfigStylings,
    exportStyling: UiCodeConfigStylings | SkeletonCodeConfigStylings,
    ) => {
        
        // switch all to html
        let html = "";

        switch(inputFormat){
            case "jsx":
                html = jsxToHtml(code)
            default:
                html = code;
        }

        // switch styling in html
        // like it is supposed to be, but not gonna be implemnted rn
        // switch from html to the wanted format
        let exportSTr = "";

         switch(exportFormat){
            case "jsx":
                exportSTr = htmlToJsx(html)
            default:
                exportSTr = html;

        
        }
        console.log(inputFormat)
        console.log(exportFormat)
        console.log(exportSTr)
        return exportSTr;
     }








export const jsxToHtml = (htmlInput: string): string => {
  let jsx = htmlInput;

  jsx = jsx.replace(/class=/g, 'className=');

  jsx = jsx.replace(/for=/g, 'htmlFor=');

  jsx = jsx.replace(/style="([^"]+)"/g, (match, styles) => {
    const styleObj: Record<string, string> = styles
      .split(';')
      .filter(Boolean)
      .reduce((acc: Record<string, string>, rule: string) => {
        const [key, value] = rule.split(':');
        if (key && value) acc[key.trim()] = value.trim();
        return acc;
      }, {} as Record<string, string>);
    return `style={${JSON.stringify(styleObj)}}`;
  });

  jsx = jsx.replace(/([a-zA-Z-]+)=""/g, (match, attribute) => {
    const booleanAttributes = ['checked', 'disabled', 'readonly', 'multiple', 'required', 'autofocus', 'autoplay', 'controls', 'loop', 'selected', 'open'];
    if (booleanAttributes.includes(attribute)) {
      return `${attribute}={true}`;
    }
    return match;
  });

  jsx = jsx.replace(/<([a-zA-Z0-9]+)([^>]*)>(?!<\/\1>)/g, '<$1$2 />');

  jsx = jsx.replace(/([a-zA-Z0-9-]+)=/g, (match, attribute) => {
    const nonJsxAttributes = [
      'data-', 'aria-', 'role', 'tabindex', 'contenteditable', 'spellcheck', 'lang', 'dir',
      'inputmode', 'draggable', 'dropzone', 'title'
    ];
    if (nonJsxAttributes.some(attr => attribute.startsWith(attr))) {
      return match;
    }
    return match;
  });

  return jsx;
};



const htmlToJsx = (htmlInput: string): string => {
  let jsx = htmlInput;

  jsx = jsx.replace(/class=/g, 'className=');

  jsx = jsx.replace(/for=/g, 'htmlFor=');

  jsx = jsx.replace(/style="([^"]+)"/g, (match, styles) => {
    const styleObj: Record<string, string> = styles
      .split(';')
      .filter(Boolean)
      .reduce((acc: Record<string, string>, rule: string) => {
        const [key, value] = rule.split(':');
        if (key && value) acc[key.trim()] = value.trim();
        return acc;
      }, {} as Record<string, string>);
    return `style={{${Object.entries(styleObj)
      .map(([key, value]) => `${key}: '${value}'`)
      .join(', ')}}}`;
  });

  jsx = jsx.replace(/([a-zA-Z-]+)=""/g, (match, attribute) => {
    const booleanAttributes = ['checked', 'disabled', 'readonly', 'multiple', 'required', 'autofocus', 'autoplay', 'controls', 'loop', 'selected', 'open'];
    if (booleanAttributes.includes(attribute)) {
      return `${attribute}={true}`;
    }
    return match;
  });

  jsx = jsx.replace(/<([a-zA-Z0-9]+)([^>]*)>(?!<\/\1>)/g, '<$1$2 />');

  jsx = jsx.replace(/([a-zA-Z0-9-]+)=/g, (match, attribute) => {
    const nonJsxAttributes = [
      'data-', 'aria-', 'role', 'tabindex', 'contenteditable', 'spellcheck', 'lang', 'dir',
      'inputmode', 'draggable', 'dropzone', 'title'
    ];
    if (nonJsxAttributes.some(attr => attribute.startsWith(attr))) {
      return match; 
    }
    return match;
  });

  return jsx;
};
