import { Location } from "history";
import { RouteComponentProps } from "@reach/router";

export type TLocationState = {
    from?: Location;
    background: Location
  }

export type TBurgerElementProps = {
    item: any,
    index: number,
    handleClose: any
  }

export type TDetailsModalProps = {
    title: string;
    children: React.ReactNode
  }

export type TIngredientCategoryProps = {
  title: string,
  ingredients: Array<TIngredientData>,
  id: string,
  ref: any,
  className: string
}

export type TIngredientDetailsProps = {
  data: Array<TIngredientData>
}

export type TModalProps = {
  title?: string,
  onClose?: any,
  children?: React.ReactNode
}

export type TModalOverlayProps = {
  onClick: any
}

export type TOrderCardProps = { 
  order: any,
  key: string
}

export type TOrder = {
  _id: string;
  ingredients: Array<string>;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

export type TOrders = TOrder[];

export type TStatsListProps = {
  orders: Array<TOrder>
}

export type TProtectedRouteProps = { children: React.ReactNode, exact?: boolean } & RouteComponentProps;

export type TProfileFormProps = {
  name: string;
  email: string;
  password: string;
  isValueChanged: boolean
}

export type TIngredientDataArray = {
  data: TIngredientData[]
}
export type TIngredientData = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  count: number
}