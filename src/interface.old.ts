export interface OrgDocument {
    dataType: 'org-document';
    properties: DocumentProperties;
    contents: OrgNode[];
}

export interface BaseNode {
    dataType: 'org-node';
    ref: string;
    properties: BaseProperties;
}

export interface BaseProperties {
    postAffiliated: number;
    postBlank: number;
    trueLevel: number | null;
}

export interface DocumentProperties {
    title: string[];
    filetags: string[];
    author: string[];
    creator: string;
    date: string[];
    description: string[];
    email: string;
    language: string;
}

export type OrgNode = OrgElement | OrgObject;

export type OrgElement =
    | SectionElement
    | HeadlineElement
    | ParagraphElement
    | GreaterBlockElement
    | LesserBlockElement
    | DrawerElement
    | PropertyDrawerElement
    | DynamicBlockElement
    | TableElement
    | HorizontalRuleElement
    | FootnoteDefinitionElement
    | InlineTaskElement
    | CommentElement
    | FixedWidthElement
    | ClockElement
    | PlanningElement
    | ListElement;

export type OrgObject =
    | EntityObject
    | LaTeXFragmentObject
    | ExportSnippetObject
    | FootnoteReferenceObject
    | CitationReferenceObject
    | BabelCallObject
    | InlineBabelCallObject
    | RadioTargetObject
    | TargetObject
    | LinkObject
    | TimestampObject
    | MacroObject
    | SubscriptObject
    | SuperscriptObject
    | BoldObject
    | ItalicObject
    | UnderlineObject
    | StrikethroughObject
    | CodeObject
    | VerbatimObject
    | LineBreakObject
    | StatisticsCookieObject
    | TableCellObject;

export type MinimalObjectSet =
    | string
    | BoldObject
    | ItalicObject
    | UnderlineObject
    | StrikethroughObject
    | CodeObject
    | VerbatimObject
    | EntityObject
    | LaTeXFragmentObject
    | SubscriptObject
    | SuperscriptObject;

// Objects allowed in table cells
export type TableCellContent =
    | MinimalObjectSet
    | CitationReferenceObject
    | ExportSnippetObject
    | FootnoteReferenceObject
    | LinkObject
    | MacroObject
    | RadioTargetObject
    | TargetObject
    | TimestampObject;

// Objects allowed in link descriptions (can't contain links, radio targets, or targets)
export type LinkDescriptionContent =
    | MinimalObjectSet
    | CitationReferenceObject
    | ExportSnippetObject
    | FootnoteReferenceObject
    | MacroObject
    | TimestampObject;

// Objects allowed in emphasis markup (generally all objects except the same type to prevent nesting)
export type TextMarkupContent = OrgObject | string;

// Elements allowed in a section
export type SectionContent = OrgElement | string;

// Objects allowed in a paragraph
export type ParagraphContent = OrgObject | string;

// Objects allowed in a headline title
export type HeadlineTitleContent = OrgObject | string;

// Footnote definition content
export type FootnoteDefinitionContent = OrgElement | string;

// Element interfaces with content restrictions
export interface SectionElement extends BaseNode {
    type: 'section';
    contents: SectionContent[];
}

export interface HeadlineElement extends BaseNode {
    type: 'headline';
    properties: BaseProperties & {
        level: number;
        todoKeyword?: string;
        priority?: string;
        title: HeadlineTitleContent[];
        tags?: string[];
        commentedp?: boolean;
    },
    contents: (OrgNode | string)[];
}

export interface ParagraphElement extends BaseNode {
    type: 'paragraph';
    contents: ParagraphContent[];
}

export interface GreaterBlockElement extends BaseNode {
    type: 'center-block' | 'quote-block' | 'special-block';
    blockName?: string; // Used for special-block
    contents: (OrgNode | string)[];
}

export interface LesserBlockElement extends BaseNode {
    type: 'example-block' | 'export-block' | 'src-block' | 'verse-block';
    language?: string; // For src-block
    parameters?: string[]; // For src-block
    value: string;
}

export interface DrawerElement extends BaseNode {
    type: 'drawer';
    drawerName: string;
    contents: (OrgNode | string)[];
}

export interface PropertyDrawerElement extends BaseNode {
    type: 'property-drawer';
    contents: (PropertyElement | string)[];
}

export interface PropertyElement extends BaseNode {
    type: 'node-property';
    key: string;
    value: string;
}

export interface DynamicBlockElement extends BaseNode {
    type: 'dynamic-block';
    blockName: string;
    parameters?: string[];
    contents: (OrgNode | string)[];
}

export interface TableElement extends BaseNode {
    type: 'table';
    tblfm?: string[];
    contents: TableRowElement[];
}

export interface TableRowElement extends BaseNode {
    type: 'table-row';
    contents: TableCellObject[];
}

export interface HorizontalRuleElement extends BaseNode {
    type: 'horizontal-rule';
}

export interface FootnoteDefinitionElement extends BaseNode {
    type: 'footnote-definition';
    label: string;
    contents: FootnoteDefinitionContent[];
}

export interface InlineTaskElement extends BaseNode {
    type: 'inline-task';
    todoKeyword?: string;
    priority?: string;
    title: HeadlineTitleContent[];
    tags?: string[];
}

export interface CommentElement extends BaseNode {
    type: 'comment';
    value: string;
}

export interface FixedWidthElement extends BaseNode {
    type: 'fixed-width';
    value: string;
}

export interface ClockElement extends BaseNode {
    type: 'clock';
    timestamp: TimestampObject;
    duration?: string;
}

export interface PlanningElement extends BaseNode {
    type: 'planning';
    deadline?: TimestampObject;
    scheduled?: TimestampObject;
    closed?: TimestampObject;
}

export interface ListElement extends BaseNode {
    type: 'plain-list';
    listType: 'ordered' | 'unordered' | 'descriptive';
    contents: ListItemElement[];
}

export interface ListItemElement extends BaseNode {
    type: 'item';
    bullet?: string;
    counter?: string;
    checkbox?: 'on' | 'off' | 'trans';
    tag?: (OrgObject | string)[];
    contents: (OrgElement | string)[];
}

// Object interfaces with content restrictions
export interface EntityObject extends BaseNode {
    type: 'entity';
    name: string;
    html?: string;
    latex?: string;
    ascii?: string;
    unicode?: string;
}

export interface LaTeXFragmentObject extends BaseNode {
    type: 'latex-fragment';
    value: string;
}

export interface ExportSnippetObject extends BaseNode {
    type: 'export-snippet';
    backend: string;
    value: string;
}

export interface FootnoteReferenceObject extends BaseNode {
    type: 'footnote-reference';
    label?: string;
    definition?: (OrgObject | string)[];
}

export interface CitationReferenceObject extends BaseNode {
    type: 'citation-reference';
    key: string;
    prefix?: string;
    suffix?: string;
}

export interface BabelCallObject extends BaseNode {
    type: 'babel-call';
    name: string;
    arguments?: string[];
}

export interface InlineBabelCallObject extends BaseNode {
    type: 'inline-babel-call';
    name: string;
    arguments?: string[];
}

export interface RadioTargetObject extends BaseNode {
    type: 'radio-target';
    value: string;
}

export interface TargetObject extends BaseNode {
    type: 'target';
    value: string;
}

export interface LinkObject extends BaseNode {
    type: 'link';
    path: string;
    format?: string;
    rawLink: string;
    description?: LinkDescriptionContent[];
}

export interface TimestampObject extends BaseNode {
    type: 'timestamp';
    timestampType: 'active' | 'inactive' | 'diary' | 'range';
    year: number;
    month: number;
    day: number;
    dayName?: string;
    hour?: number;
    minute?: number;
    repeater?: {
        type: '+' | '++' | '.+';
        value: number;
        unit: 'h' | 'd' | 'w' | 'm' | 'y';
    };
    warning?: {
        type: '-' | '--';
        value: number;
        unit: 'h' | 'd' | 'w' | 'm' | 'y';
    };
    endYear?: number;
    endMonth?: number;
    endDay?: number;
    endHour?: number;
    endMinute?: number;
}

export interface MacroObject extends BaseNode {
    type: 'macro';
    key: string;
    arguments?: string[];
}

export interface SubscriptObject extends BaseNode {
    type: 'subscript';
    contents: TextMarkupContent[];
}

export interface SuperscriptObject extends BaseNode {
    type: 'superscript';
    contents: TextMarkupContent[];
}

// Text markup objects with content restrictions
export interface BoldObject extends BaseNode {
    type: 'bold';
    contents: TextMarkupContent[];
}

export interface ItalicObject extends BaseNode {
    type: 'italic';
    contents: TextMarkupContent[];
}

export interface UnderlineObject extends BaseNode {
    type: 'underline';
    contents: TextMarkupContent[];
}

export interface StrikethroughObject extends BaseNode {
    type: 'strikethrough';
    contents: TextMarkupContent[];
}

export interface CodeObject extends BaseNode {
    type: 'code';
    value: string;
}

export interface VerbatimObject extends BaseNode {
    type: 'verbatim';
    value: string;
}

export interface LineBreakObject extends BaseNode {
    type: 'line-break';
}

export interface StatisticsCookieObject extends BaseNode {
    type: 'statistics-cookie';
    value: string;
}

export interface TableCellObject extends BaseNode {
    type: 'table-cell';
    contents: TableCellContent[];
}
