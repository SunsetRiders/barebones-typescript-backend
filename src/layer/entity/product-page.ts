import BusinessUnit from "./business-unit";
import ProductStatus from "./product-status";

class ProductPage {
  public title: string;
  public metadata: ProductStatus[] = [];
  public businessUnits: BusinessUnit[] = [];
}

export default ProductPage;
