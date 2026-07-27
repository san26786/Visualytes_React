export type BlogContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3 | 4; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "quote"; text: string };

export interface BlogFullContent {
  subtitle?: string;
  sections: BlogContentBlock[];
}
