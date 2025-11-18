export interface GenericComponent {
  icon?: string;
  label?: string;
  children?: any;
  lighter?: boolean;
}

export type PrettyCard = {
  id: string;
  name: string;
  type: string;
  triggers: string;

  highlight: string;
  textColor: string;
  borderColor: string;
  borderStyle: string;
  colorStyle: string;

  icons: string[];
  currentIcon: number;
  graphics: string[];
  currentGraphic: number;
};
