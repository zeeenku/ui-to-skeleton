import { HTMLTag } from "./html-tag";

export function createSkeletonHTMLTagFromDOM(element: HTMLElement): HTMLTag {
    const { width, height } = element.getBoundingClientRect();

    const className = element.getAttribute("class") || "";
    const display = window.getComputedStyle(element).display;
    const borderRadius = window.getComputedStyle(element).borderRadius;
    const clientRects = element.getClientRects();
    const linesCount = Math.round(clientRects[0].height 
        /
        parseInt(window.getComputedStyle(element).lineHeight, 10)
    );
    const tag = new HTMLTag(element.tagName.toLowerCase(), width, height,display, borderRadius, clientRects, linesCount, className);

    Array.from(element.childNodes).forEach((child: ChildNode) => {
        if (child.nodeType === 1) {
            tag.children.push(createSkeletonHTMLTagFromDOM(child as HTMLElement));
        } else if (child.nodeType === 3) {
            tag.children.push(child.textContent || "");
        }
    });

    return tag;
}