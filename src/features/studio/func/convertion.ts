import { SkeletonCodeConfigFormats, SkeletonCodeConfigStylings, UiCodeConfigFormats, UiCodeConfigStylings } from "../types";
export const convertionController = (code: string, inputFormat: UiCodeConfigFormats | SkeletonCodeConfigFormats,
    exportFormat: UiCodeConfigFormats | SkeletonCodeConfigFormats,
    inputStyling: UiCodeConfigStylings | SkeletonCodeConfigStylings,
    exportStyling: UiCodeConfigStylings | SkeletonCodeConfigStylings,
) => {
    let html = "";

    switch(inputFormat){
        case "jsx":
            html = jsxToHtml(code);
            break; 
        default:
            html = code;
    }

    let exportSTr = "";

    switch(exportFormat){
        case "jsx":
            exportSTr = htmlToJsx(html);
            break;
        default:
            exportSTr = html;
    }

    console.log(inputFormat);
    console.log(exportFormat);
    console.log(exportSTr);

    return exportSTr;
}

export const jsxToHtml = (htmlInput: string): string => {
  let jsx = htmlInput;

  // Replace className with class
  jsx = jsx.replace(/className=/g, 'class=');

  // Replace htmlFor with for
  jsx = jsx.replace(/htmlFor=/g, 'for=');

  // Convert inline styles to HTML style attributes
  jsx = jsx.replace(/style={{([^}]+)}}/g, (match, styles: string) => {
    // Split style string into key-value pairs and join them back as a valid CSS style string
    const styleObj: string = styles
      .split(',')
      .map((style: string) => {
        const [key, value] = style.split(':');
        return `${key.trim()}:${value.trim()}`; // Return style as "key: value"
      })
      .join(';'); // Combine styles into one string

    return `style="${styleObj}"`;
  });

  // Handle boolean attributes like checked, disabled, etc.
  jsx = jsx.replace(/([a-zA-Z-]+)={true}/g, (match, attribute) => {
    const booleanAttributes = ['checked', 'disabled', 'readonly', 'multiple', 'required', 'autofocus', 'autoplay', 'controls', 'loop', 'selected', 'open'];
    if (booleanAttributes.includes(attribute)) {
      return `${attribute}=""`;  // Convert {true} to empty string
    }
    return match;
  });

  // Ensure tags that are not void (e.g., <div>, <span>) are not self-closing
  jsx = jsx.replace(/<([a-zA-Z0-9]+)([^>]*)\/>/g, (match, tagName, rest) => {
    const voidElements = ['br', 'img', 'input', 'hr', 'meta', 'link'];  // Add more void tags if necessary
    if (voidElements.includes(tagName.toLowerCase())) {
      return `<${tagName}${rest} />`;  // Keep void tags self-closing
    }
    return `<${tagName}${rest}></${tagName}>`;  // Convert non-void tags to properly closed tags
  });

  // Handle non-JSX attributes (e.g., data-, aria-)
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

  // Replace class with className for JSX compatibility
  jsx = jsx.replace(/class=/g, 'className=');

  // Replace for with htmlFor for JSX compatibility
  jsx = jsx.replace(/for=/g, 'htmlFor=');

  // Replace inline styles and convert them to the JSX style format
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

  // Handle boolean attributes like checked, disabled, etc.
  jsx = jsx.replace(/([a-zA-Z-]+)=""/g, (match, attribute) => {
    const booleanAttributes = ['checked', 'disabled', 'readonly', 'multiple', 'required', 'autofocus', 'autoplay', 'controls', 'loop', 'selected', 'open'];
    if (booleanAttributes.includes(attribute)) {
      return `${attribute}={true}`;
    }
    return match;
  });

  // Remove self-closing for non-void elements (like <div>, <p>, etc.)
  jsx = jsx.replace(/<([a-zA-Z0-9]+)([^>]*)\/>/g, '<$1$2></$1>');

  // Handle non-JSX attributes (e.g., data-, aria-)
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

