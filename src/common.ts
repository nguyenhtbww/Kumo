const url: string = `http://localhost:3000`;
const tygia: number = 25000;

interface IProduct {
    id :number;
    brand_id: number;
    type_id: number;
    name: string;
    price:number;
    sale:number;
    image:string;
    description:string;
    hot: boolean;
    status:boolean;
    created_date:string;
}

class CProduct implements IProduct{
    id :number;
    brand_id: number;
    type_id: number;
    name: string;
    price:number;
    sale:number;
    image:string;
    description:string;
    hot: boolean;
    status:boolean;
    created_date:string;

    constructor(id,brand_id,type_id,name,price,sale,image,description,hot,status,created_date){
        this.id = id;
        this.brand_id = brand_id;
        this.type_id = type_id;
        this.name = name;
        this.price = price;
        this.sale = sale;
        this.image = image;
        this.description = description;
        this.hot = hot;
        this.status = status;
        this.created_date = created_date;
    }

    percentSale (){
        return (100*(this.price - this.sale)/this.price).toFixed(0)+ '%';
    }
    
    VNDPrice (){
        return Number (this.price).toLocaleString('vi')+ "VND";
    }
    salePrice (){
        return Number(this.sale).toLocaleString('vi') + "VND";
    }
    USDPrice (){
        return Number(this.price/tygia).toFixed(0) + "USD";
    }
    
}

type TBrand = {id : number; name : string; position : number; status: number}
export {url ,tygia ,TBrand,  IProduct, CProduct}