import Guide from "./guide";
import ProductCredential from "./product-credential";
import ProductStatus from "./product-status";

class Product {
  public product: string;
  public title: string;
  public logoUrl: string;
  public description: string;
  public status: ProductStatus;
  public launchUrl: string;
  public launchTip: string;
  public guides: Guide[] = [];
  public credentials: ProductCredential;
}

export default Product;
