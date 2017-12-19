import Integration from "./integartion";
import Product from "./product";

class BusinessUnit {
  public title: string;
  public description: string;
  public order: int;
  public products: Product[] = [];
  public integration: Integration;
}

export default BusinessUnit;
