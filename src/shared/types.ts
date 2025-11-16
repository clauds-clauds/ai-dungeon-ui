export interface GenericComponent {
  icon?: string;
  label?: string;
  children?: any;
}

export type PrettyCard = {
  id: string;
  name: string;
  type: string;
  triggers: string;

  customization: string;
  highlight: string;
  textColor: string;
  borderColor: string;
  borderStyle: string;

  icons: string[];
  graphics: string[];
};
