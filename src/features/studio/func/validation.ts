import { HTMLHint } from "htmlhint";


const noScriptTagRule = {
  id: "no-script-tag",
  description: "Disallow use of <script> tags",
  init(parser: any, reporter: any) {
    parser.addListener("tagstart", (event: any) => {
      if (event.tagName.toLowerCase() === "script") {
        reporter.error(
          "The <script> tag is not allowed.",
          event.line,
          event.col,
          this,
          event.raw
        );
      }
    });
  },
};

HTMLHint.addRule(noScriptTagRule);

export const validateFormat = async (html: string, type: string) => {
  const rules = {
    "tagname-lowercase": true,
    "attr-value-double-quotes": true,
    "doctype-first": false,
    "tag-pair": true,
    "spec-char-escape": false,
    "id-unique": true,
    "src-not-empty": true,
    "attr-no-duplication": true,
    "no-script-tag": true,
  };

  const results = await HTMLHint.verify(html, rules);
  return results;
};