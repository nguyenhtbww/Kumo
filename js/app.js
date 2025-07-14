import { url, CProduct } from "./common.js";
export const getBrands = async (limit = 6) => {
    let data = await fetch(`${url}/brands/?_sort=position&_order=desc&_limit=${limit}`).then(res => res.json()).then(data => data);
    let html = `<li class="nav-item"><a class="nav-link" href="/">Trang chủ</a></li>`;
    data.forEach(brand => {
        html += `<li class="nav-item"><a class="nav-link" href="products.html?id=${brand.id}">${brand.name}</a></li>`;
    });
    return html;
};
export const getProductDetail = async (product_id) => {
    let product = await fetch(`${url}/products/${product_id}`).then(res => res.json()).then(data => data);
    let { id, brand_id, attribute_id, name, price, sale, image, description, hot, status, created_date } = product;
    let obj;
    obj = new CProduct(id, brand_id, attribute_id, name, price, sale, image, description, hot, status, created_date);
    let html = `
      <div className="container mt-3">
            <div className="row">
                <div className="col-4 px-4">
                    <img className="img-fluid" src="${obj.image}" wiht="15px"/>
                </div>
                <div className="col-6">
                    <h3>Chi tiết sản phẩm</h3>
                    <h4>${obj.name}</h4>
                    <p>Giá khởi điểm: ${obj.price}</p>
                    <button className="btn btn-primary my-2">
                        Thêm vào giỏ hàng
                    </button>
                    <h4>Mô tả: </h4>
                    <p>${obj.description}</p>
                </div>
            </div>
        </div>
  `;
    return html;
};
export const getProductsByBrand = async (brand_id, limit = 50) => {
    let data = await fetch(`${url}/products/?brand_id=${brand_id}&_limit=${limit}`).then(res => res.json()).then(data => data);
    let html = ``;
    data.forEach(product => {
        html += productHtml(product);
    });
    return html;
};
export const getNewProducts = async (limit = 6) => {
    let data = await fetch(`${url}/products/?_sort=created_date&_order=desc&_limit=${limit}`).then(res => res.json()).then(data => data);
    let html = ``;
    data.forEach(product => {
        html += productHtml(product);
    });
    return html;
};
export const getHotProducts = async (limit = 6) => {
    let data = await fetch(`${url}/products/?hot=1&_sort=created_date&_order=desc&_limit=${limit}`).then(res => res.json()).then(data => data);
    let html = ``;
    data.forEach(product => {
        html += productHtml(product);
    });
    return html;
};
const productHtml = (product) => {
    let { id, brand_id, attribute_id, name, price, sale, image, description, hot, status, created_date } = product;
    let obj;
    obj = new CProduct(id, brand_id, attribute_id, name, price, sale, image, description, hot, status, created_date);
    return `<div class="col-xl-3 col-lg-4 col-md-6 col-6">
      <div class="product_grid card b-0">
        <div class="badge bg-success text-white position-absolute ft-regular ab-left text-upper">Sale</div>
        <button class="btn btn_love position-absolute ab-right snackbar-wishlist"><i
            class="far fa-heart"></i></button>
        <div class="card-body p-0">
          <div class="shop_thumb position-relative">
            <a href="product_detail.html?id=${obj.id}" class="card-img-top d-block overflow-hidden"><img src="${obj.image}" class="card-img-top"
                 alt="..."></a>
            <div class="product-hover-overlay bg-dark d-flex align-items-center justify-content-center">
              <div class="edlio">
                <!-- <a routerLink="product/{{prod._id}}" data-toggle="modal" data-target="#quickview"
                  class="text-white fs-sm ft-medium"><i class="fas fa-eye mr-1"></i>Quick View</a> -->
                  <a
                  class="text-white fs-sm ft-medium"><i class="fas fa-eye mr-1"></i>Quick View</a>
                </div>
            </div>
          </div>
        </div>
        <div class="card-footers b-0 pt-3 px-2 bg-white d-flex align-items-start justify-content-center">
          <div class="text-left">
            <div class="text-center">
              <h5 class="fw-bolder fs-md mb-0 lh-1 mb-1"><a>${obj.name}</a></h5>
              <div class="elis_rty"><span class="ft-bold fs-md text-dark">${obj.price}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
};
