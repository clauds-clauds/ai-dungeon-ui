export interface Pill {
  icon: string;
  label?: string;
}

export interface Tab {
  icon?: string;
  id?: string;
  page?: any;
  pills: Pill[];
  hidden?: boolean;
}

export type Adventure = {
  storyCards: Record<string, StoryCard>;
};

export type StoryCard = {
  // Basics:
  id: string;
  name: string;
  type: string;
  triggers: string;
  limit: string;

  // Colors:
  useCustomColor: boolean;
  color: string;

  // Icons:
  icons: string[];
  currentIcon: number;
  iconBorderColor: string;
  iconBorderStyle: string;

  // Graphics :
  graphics: string[];
  currentGraphic: number;
};

export enum ResponseType {
  Action = "Action",
  Last = "Last",
  Other = "Story",
}
