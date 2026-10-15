/**
 * A minimal component library on json-dom: base HTML element factories plus richer interactive components.
 */
import 'core-js/stable';
declare const jsonDomComponents: {
    createClearableInput: (config: import("./clearableInput/types").ClearableInputConfig) => import("json-dom/dist/domItem/types").DomItem;
    createTypeahead: (config: import("./typeahead/types").TypeaheadConfig) => import("json-dom/dist/domItem/types").DomItem;
    anchor: (href?: string, children?: import("json-dom/dist/domItem/types").DomItem[], className?: string, attributes?: import("json-dom/dist/domItem/types").Attributes) => import("json-dom/dist/domItem/types").DomItem;
    button: (label: string, className?: string, attributes?: import("json-dom/dist/domItem/types").Attributes) => import("json-dom/dist/domItem/types").DomItem;
    div: (children?: import("json-dom/dist/domItem/types").DomItem[], className?: string, attributes?: import("json-dom/dist/domItem/types").Attributes) => import("json-dom/dist/domItem/types").DomItem;
    element: (nodeName: string, children?: import("json-dom/dist/domItem/types").DomItem[], className?: string, attributes?: import("json-dom/dist/domItem/types").Attributes) => import("json-dom/dist/domItem/types").DomItem;
    fieldset: (content?: string, children?: import("json-dom/dist/domItem/types").DomItem[], className?: string, attributes?: import("json-dom/dist/domItem/types").Attributes) => import("json-dom/dist/domItem/types").DomItem;
    footer: (children?: import("json-dom/dist/domItem/types").DomItem[], className?: string, attributes?: import("json-dom/dist/domItem/types").Attributes) => import("json-dom/dist/domItem/types").DomItem;
    form: (action?: string, method?: string, children?: import("json-dom/dist/domItem/types").DomItem[], className?: string, attributes?: import("json-dom/dist/domItem/types").Attributes) => import("json-dom/dist/domItem/types").DomItem;
    header: (children?: import("json-dom/dist/domItem/types").DomItem[], className?: string, attributes?: import("json-dom/dist/domItem/types").Attributes) => import("json-dom/dist/domItem/types").DomItem;
    heading: (level?: 1 | 2 | 3 | 4 | 5 | 6, children?: import("json-dom/dist/domItem/types").DomItem[], className?: string, attributes?: import("json-dom/dist/domItem/types").Attributes) => import("json-dom/dist/domItem/types").DomItem;
    input: (type?: string, name?: string, value?: string | null, children?: import("json-dom/dist/domItem/types").DomItem[], className?: string, attributes?: import("json-dom/dist/domItem/types").Attributes) => import("json-dom/dist/domItem/types").DomItem;
    label: (content?: string, labelFor?: string, children?: import("json-dom/dist/domItem/types").DomItem[], className?: string, attributes?: import("json-dom/dist/domItem/types").Attributes) => import("json-dom/dist/domItem/types").DomItem;
    legend: (content?: string, children?: import("json-dom/dist/domItem/types").DomItem[], className?: string, attributes?: import("json-dom/dist/domItem/types").Attributes) => import("json-dom/dist/domItem/types").DomItem;
    listItem: (children?: import("json-dom/dist/domItem/types").DomItem[], className?: string, attributes?: import("json-dom/dist/domItem/types").Attributes) => import("json-dom/dist/domItem/types").DomItem;
    main: (children?: import("json-dom/dist/domItem/types").DomItem[], className?: string, attributes?: import("json-dom/dist/domItem/types").Attributes) => import("json-dom/dist/domItem/types").DomItem;
    nav: (children?: import("json-dom/dist/domItem/types").DomItem[], className?: string, attributes?: import("json-dom/dist/domItem/types").Attributes) => import("json-dom/dist/domItem/types").DomItem;
    node: (nodeName: string, nodeValue?: string | null, children?: import("json-dom/dist/domItem/types").DomItem[], attributes?: import("json-dom/dist/domItem/types").Attributes) => import("json-dom/dist/domItem/types").DomItem;
    option: (value: string, label: string, className?: string, attributes?: import("json-dom/dist/domItem/types").Attributes) => import("json-dom/dist/domItem/types").DomItem;
    paragraph: (content?: string, children?: import("json-dom/dist/domItem/types").DomItem[], className?: string, attributes?: import("json-dom/dist/domItem/types").Attributes) => import("json-dom/dist/domItem/types").DomItem;
    radio: (name?: string, value?: string, checked?: boolean, children?: import("json-dom/dist/domItem/types").DomItem[], className?: string, attributes?: import("json-dom/dist/domItem/types").Attributes) => import("json-dom/dist/domItem/types").DomItem;
    select: (children?: import("json-dom/dist/domItem/types").DomItem[], className?: string, attributes?: import("json-dom/dist/domItem/types").Attributes) => import("json-dom/dist/domItem/types").DomItem;
    span: (children?: import("json-dom/dist/domItem/types").DomItem[], className?: string, attributes?: import("json-dom/dist/domItem/types").Attributes) => import("json-dom/dist/domItem/types").DomItem;
    style: (styleContent?: string) => import("json-dom/dist/domItem/types").DomItem;
    submit: (name?: string, label?: string, className?: string, attributes?: import("json-dom/dist/domItem/types").Attributes) => import("json-dom/dist/domItem/types").DomItem;
    table: (children?: import("json-dom/dist/domItem/types").DomItem[], className?: string, attributes?: import("json-dom/dist/domItem/types").Attributes) => import("json-dom/dist/domItem/types").DomItem;
    tableBody: (children?: import("json-dom/dist/domItem/types").DomItem[], className?: string, attributes?: import("json-dom/dist/domItem/types").Attributes) => import("json-dom/dist/domItem/types").DomItem;
    tableData: (children?: import("json-dom/dist/domItem/types").DomItem[], className?: string, attributes?: import("json-dom/dist/domItem/types").Attributes) => import("json-dom/dist/domItem/types").DomItem;
    tableHead: (children?: import("json-dom/dist/domItem/types").DomItem[], className?: string, attributes?: import("json-dom/dist/domItem/types").Attributes) => import("json-dom/dist/domItem/types").DomItem;
    tableHeading: (children?: import("json-dom/dist/domItem/types").DomItem[], className?: string, attributes?: import("json-dom/dist/domItem/types").Attributes) => import("json-dom/dist/domItem/types").DomItem;
    tableRow: (children?: import("json-dom/dist/domItem/types").DomItem[], className?: string, attributes?: import("json-dom/dist/domItem/types").Attributes) => import("json-dom/dist/domItem/types").DomItem;
    text: (nodeValue?: string) => import("json-dom/dist/domItem/types").DomItem;
    textArea: (name?: string, children?: import("json-dom/dist/domItem/types").DomItem[], className?: string, attributes?: import("json-dom/dist/domItem/types").Attributes) => import("json-dom/dist/domItem/types").DomItem;
    unorderedList: (children?: import("json-dom/dist/domItem/types").DomItem[], className?: string, attributes?: import("json-dom/dist/domItem/types").Attributes) => import("json-dom/dist/domItem/types").DomItem;
};
export default jsonDomComponents;
