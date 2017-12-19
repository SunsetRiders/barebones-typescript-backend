import Integration from "./integration";
import Product from "./product";

class BusinessUnit {
  public title: string;
  public description: string;
  public order: number;
  public products: Product[] = [];
  public integration: Integration;
}

export default BusinessUnit;
