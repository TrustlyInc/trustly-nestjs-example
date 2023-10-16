import { ApiProperty } from "@nestjs/swagger";

export class ProductDto {
    @ApiProperty()
    id: String;
    @ApiProperty()
    title: String;
    @ApiProperty()
    description: String;
    @ApiProperty()
    image: String;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    price: number;


    static build(json: any): ProductDto {
        let product = new ProductDto();
        product.id = json.id;
        product.title = json.title;
        product.description = json.description;
        product.image = `images/${json.image}`;
        product.quantity = json.quantity;
        product.price = json.price;


        return product;
    }
}