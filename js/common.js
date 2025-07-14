const url = `http://localhost:3000`;
const tygia = 25000;
class CProduct {
    id;
    brand_id;
    type_id;
    name;
    price;
    sale;
    image;
    description;
    hot;
    status;
    created_date;
    constructor(id, brand_id, type_id, name, price, sale, image, description, hot, status, created_date) {
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
    percentSale() {
        return (100 * (this.price - this.sale) / this.price).toFixed(0) + '%';
    }
    VNDPrice() {
        return Number(this.price).toLocaleString('vi') + "VND";
    }
    salePrice() {
        return Number(this.sale).toLocaleString('vi') + "VND";
    }
    USDPrice() {
        return Number(this.price / tygia).toFixed(0) + "USD";
    }
}
export { url, tygia, CProduct };
