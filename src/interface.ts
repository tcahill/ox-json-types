export interface StandardProperties {
    postAffiliated?: number;
    postBlank?: number;
    trueLevel?: number | null;
    preBlank?: number;
    rawValue?: string;
    [key: string]: any;
}

export interface DocumentProperties {
    title: string[];
    filetags: string[];
    author: string[];
    creator: string;
    date: TimestampObject[];
    description: string[];
    email?: string;
    language?: string;
}

export interface NodeBase {
    dataType: 'org-node';
    ref: string;
    properties: StandardProperties;
    contents: (OrgNode | string)[];
}

export interface OrgDocument {
    dataType: 'org-document';
    properties: DocumentProperties;
    contents: OrgNode[];
}

export type OrgNode = OrgElement | OrgObject;

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

export type LinkDescriptionContent =
    | MinimalObjectSet
    | CitationReferenceObject
    | ExportSnippetObject
    | FootnoteReferenceObject
    | MacroObject
    | TimestampObject;

export type TextMarkupContent = OrgObject | string;

export type OrgElement =
    | SectionElement
    | HeadlineElement
    | ParagraphElement
    | GreaterBlockElement
    | LesserBlockElement
    | DrawerElement
    | PropertyDrawerElement
    | PropertyElement
    | DynamicBlockElement
    | TableElement
    | TableRowElement
    | HorizontalRuleElement
    | FootnoteDefinitionElement
    | InlineTaskElement
    | CommentElement
    | FixedWidthElement
    | ClockElement
    | PlanningElement
    | ListElement
    | ListItemElement
    | KeywordElement;

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

export interface HeadlineProperties extends StandardProperties {
    level: number;
    todoKeyword?: string | null;
    todoType?: string | null;
    priority?: string | null;
    title: (OrgObject | string)[];
    tags?: string[];
    tagsAll?: string[];
    archivedp?: boolean;
    commentedp?: boolean;
    footnoteSectionP?: boolean;
}

export interface HeadlineElement extends NodeBase {
    type: 'headline';
    properties: HeadlineProperties;
    drawer?: Record<string, any>;
}

export interface SectionElement extends NodeBase {
    type: 'section';
    properties: StandardProperties;
}

export interface ParagraphElement extends NodeBase {
    type: 'paragraph';
    properties: StandardProperties;
}

export interface FootnoteReferenceProperties extends StandardProperties {
    label: string;
}

export interface FootnoteReferenceObject extends NodeBase {
    type: 'footnote-reference';
    properties: FootnoteReferenceProperties;
}

export interface FootnoteDefinitionProperties extends StandardProperties {
    label: string;
}

export interface FootnoteDefinitionElement extends NodeBase {
    type: 'footnote-definition';
    properties: FootnoteDefinitionProperties;
}

export interface LinkObject extends NodeBase {
    type: 'link';
    properties: LinkProperties;
}

export interface LinkProperties extends StandardProperties {
    path: string;
    format?: string;
    rawLink: string;
    type: string;
}

export interface GreaterBlockProperties extends StandardProperties {
    blockName?: string; // Used for special-block
    type?: string;
}

export interface LesserBlockProperties extends StandardProperties {
    language?: string; // For src-block
    parameters?: string[]; // For src-block
    value: string;
    name?: string,
}

export interface DrawerProperties extends StandardProperties {
    drawerName: string;
}

export interface PropertyDrawerProperties extends StandardProperties {
}

export interface PropertyElementProperties extends StandardProperties {
    key: string;
    value: string;
}

export interface DynamicBlockProperties extends StandardProperties {
    blockName: string;
    parameters?: string[];
}

export interface TableProperties extends StandardProperties {
    tblfm?: string[];
}

export interface TableRowProperties extends StandardProperties {
    type: 'standard' | 'rule';
}

export interface HorizontalRuleProperties extends StandardProperties {
}

export interface InlineTaskProperties extends StandardProperties {
    todoKeyword?: string | null;
    todoType?: string | null;
    priority?: string | null;
    title: (OrgObject | string)[];
    tags?: string[];
}

export interface CommentProperties extends StandardProperties {
    value: string;
}

export interface FixedWidthProperties extends StandardProperties {
    value: string;
}

export interface ClockProperties extends StandardProperties {
    duration?: string;
}

export interface PlanningProperties extends StandardProperties {
}

export interface ListProperties extends StandardProperties {
    listType: 'ordered' | 'unordered' | 'descriptive';
}

export interface ListItemProperties extends StandardProperties {
    bullet?: string;
    counter?: string;
    checkbox?: 'on' | 'off' | 'trans';
    tag?: (OrgObject | string)[];
}

// Object-specific property interfaces
export interface EntityProperties extends StandardProperties {
    name: string;
    html?: string;
    latex?: string;
    ascii?: string;
    unicode?: string;
}

export interface LaTeXFragmentProperties extends StandardProperties {
    value: string;
}

export interface ExportSnippetProperties extends StandardProperties {
    backend: string;
    value: string;
}

export interface CitationReferenceProperties extends StandardProperties {
    key: string;
    prefix?: string;
    suffix?: string;
}

export interface BabelCallProperties extends StandardProperties {
    name: string;
    arguments?: string[];
}

export interface InlineBabelCallProperties extends StandardProperties {
    name: string;
    arguments?: string[];
}

export interface RadioTargetProperties extends StandardProperties {
    value: string;
}

export interface TargetProperties extends StandardProperties {
    value: string;
}

export interface TimestampProperties extends StandardProperties {
    timestampType: 'active' | 'inactive' | 'diary' | 'range';
    start: string,
    end: string,
    rawValue: string,
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
}

export interface MacroProperties extends StandardProperties {
    key: string;
    arguments?: string[];
}

export interface SubscriptProperties extends StandardProperties {
}

export interface SuperscriptProperties extends StandardProperties {
}

export interface BoldProperties extends StandardProperties {
}

export interface ItalicProperties extends StandardProperties {
}

export interface UnderlineProperties extends StandardProperties {
}

export interface StrikethroughProperties extends StandardProperties {
}

export interface CodeProperties extends StandardProperties {
    value: string;
}

export interface VerbatimProperties extends StandardProperties {
    value: string;
}

export interface LineBreakProperties extends StandardProperties {
}

export interface StatisticsCookieProperties extends StandardProperties {
    value: string;
}

export interface TableCellProperties extends StandardProperties {
}

export interface GreaterBlockElement extends NodeBase {
    type: 'center-block' | 'quote-block' | 'special-block';
    properties: GreaterBlockProperties;
    contents: (OrgNode | string)[];
}

export interface LesserBlockElement extends NodeBase {
    type: 'example-block' | 'export-block' | 'src-block' | 'verse-block';
    properties: LesserBlockProperties;
}

export interface DrawerElement extends NodeBase {
    type: 'drawer';
    properties: DrawerProperties;
    contents: (OrgNode | string)[];
}

export interface PropertyDrawerElement extends NodeBase {
    type: 'property-drawer';
    properties: PropertyDrawerProperties;
    contents: (PropertyElement | string)[];
}

export interface PropertyElement extends NodeBase {
    type: 'node-property';
    properties: PropertyElementProperties;
}

export interface DynamicBlockElement extends NodeBase {
    type: 'dynamic-block';
    properties: DynamicBlockProperties;
    contents: (OrgNode | string)[];
}

export interface TableElement extends NodeBase {
    type: 'table';
    properties: TableProperties;
    contents: TableRowElement[];
}

export interface TableRowElement extends NodeBase {
    type: 'table-row';
    properties: TableRowProperties;
    contents: TableCellObject[];
}

export interface HorizontalRuleElement extends NodeBase {
    type: 'horizontal-rule';
    properties: HorizontalRuleProperties;
}

export interface InlineTaskElement extends NodeBase {
    type: 'inline-task';
    properties: InlineTaskProperties;
}

export interface CommentElement extends NodeBase {
    type: 'comment';
    properties: CommentProperties;
}

export interface FixedWidthElement extends NodeBase {
    type: 'fixed-width';
    properties: FixedWidthProperties;
}

export interface ClockElement extends NodeBase {
    type: 'clock';
    properties: ClockProperties;
    timestamp: TimestampObject;
}

export interface PlanningElement extends NodeBase {
    type: 'planning';
    properties: PlanningProperties;
    deadline?: TimestampObject;
    scheduled?: TimestampObject;
    closed?: TimestampObject;
}

export interface ListElement extends NodeBase {
    type: 'plain-list';
    properties: ListProperties;
    contents: ListItemElement[];
}

export interface ListItemElement extends NodeBase {
    type: 'item';
    properties: ListItemProperties;
}

export interface KeywordProperties extends StandardProperties {
    key: string,
    value: string,
}

export interface KeywordElement extends NodeBase {
    type: 'keyword';
    properties: KeywordProperties;
}

// Object interfaces with revised structure
export interface EntityObject extends NodeBase {
    type: 'entity';
    properties: EntityProperties;
}

export interface LaTeXFragmentObject extends NodeBase {
    type: 'latex-fragment';
    properties: LaTeXFragmentProperties;
}

export interface ExportSnippetObject extends NodeBase {
    type: 'export-snippet';
    properties: ExportSnippetProperties;
}

export interface CitationReferenceObject extends NodeBase {
    type: 'citation-reference';
    properties: CitationReferenceProperties;
}

export interface BabelCallObject extends NodeBase {
    type: 'babel-call';
    properties: BabelCallProperties;
}

export interface InlineBabelCallObject extends NodeBase {
    type: 'inline-babel-call';
    properties: InlineBabelCallProperties;
}

export interface RadioTargetObject extends NodeBase {
    type: 'radio-target';
    properties: RadioTargetProperties;
}

export interface TargetObject extends NodeBase {
    type: 'target';
    properties: TargetProperties;
}

export interface TimestampObject extends NodeBase {
    type: 'timestamp';
    properties: TimestampProperties;
}

export interface MacroObject extends NodeBase {
    type: 'macro';
    properties: MacroProperties;
}

export interface SubscriptObject extends NodeBase {
    type: 'subscript';
    properties: SubscriptProperties;
    contents: TextMarkupContent[];
}

export interface SuperscriptObject extends NodeBase {
    type: 'superscript';
    properties: SuperscriptProperties;
    contents: TextMarkupContent[];
}

export interface BoldObject extends NodeBase {
    type: 'bold';
    properties: BoldProperties;
    contents: TextMarkupContent[];
}

export interface ItalicObject extends NodeBase {
    type: 'italic';
    properties: ItalicProperties;
    contents: TextMarkupContent[];
}

export interface UnderlineObject extends NodeBase {
    type: 'underline';
    properties: UnderlineProperties;
    contents: TextMarkupContent[];
}

export interface StrikethroughObject extends NodeBase {
    type: 'strikethrough';
    properties: StrikethroughProperties;
    contents: TextMarkupContent[];
}

export interface CodeObject extends NodeBase {
    type: 'code';
    properties: CodeProperties;
}

export interface VerbatimObject extends NodeBase {
    type: 'verbatim';
    properties: VerbatimProperties;
}

export interface LineBreakObject extends NodeBase {
    type: 'line-break';
    properties: LineBreakProperties;
}

export interface StatisticsCookieObject extends NodeBase {
    type: 'statistics-cookie';
    properties: StatisticsCookieProperties;
}

export interface TableCellObject extends NodeBase {
    type: 'table-cell';
    properties: TableCellProperties;
    contents: TableCellContent[];
}
