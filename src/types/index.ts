export type BreadCrumb = {
    path: string;
    home: string;
    isIcon?: boolean;
    items: Crumb[];
  };
  
  export type Crumb = {
    name: string;
    path: string;
  };
  