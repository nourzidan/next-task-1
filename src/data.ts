
export interface inputitem{
    label: string;
    type: string;
    placeholder: string;
    classn?: string;
    nameinapi: string;
  }

  export interface sidebaritem{
    to:string;
    icon:string;
    title:string;
  }

  export interface carditem{
    img:string
    name:string
    price:string
    id:string
    refreshproducts:()=>void

  }
