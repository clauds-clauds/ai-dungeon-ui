/* Types HERE! */
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
  onclick?: () => void;
};
