/* Types HERE! */
export type Adventure = {
  storyCards: Record<string, StoryCard>;
};

export type StoryCard = {
  id: string;
  name: string;
  type: string;
  triggers: string;

  restriction: string;
  textColor: string;
  borderColor: string;
  borderStyle: string;
  colorStyle: string;

  icons: string[];
  currentIcon: number;
  graphics: string[];
  currentGraphic: number;
};

export type GenericButton = {
  icon: string;
  label?: string;
  danger?: boolean;
  onclick?: () => void;
};

export enum ResponseType {
  Action = "Action",
  Last = "Last",
  Other = "Story",
}
