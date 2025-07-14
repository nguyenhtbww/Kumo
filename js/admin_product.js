import { url } from "./common.js";
export const getProductList = async () => {
    let data = await fetch(`${url}/products`).then(res => res.json()).then(data => data);
    let arr = data;
    let html = ``;
    arr.forEach(product => {
        html += productHtml(product);
    });
    html = `<div id="brand_list" class="listnhasx">
            <h2>
            Product list admin | <a href="add_product.html" class="float-end">Add product</a>
            </h2>
        <div id="data">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Tên Sản Phẩm</th>
                    <th scope="col">Hình ảnh</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Chức Năng</th>
                </tr>
                </thead>
            <tbody>
                 ${html}
            </tbody>
        </table>
            </div>
            </div>`;
    return html;
};
const productHtml = (product) => {
    return `<tr>
                <td>${product.id} </td>
                <td>${product.name}</td>
                <td>
                <img width="50px" src="${product.image}">
                </td>
                <td>${product.price}</td>
                <td> ${product.status == true ? "Show" : "Hide"}</td>
                <td>
                    <a href="edit_product.html?id=${product.id}" class="btn btn-warning px-3 me-1" > Edit </a>
                    <button idnsx="${product.id}" class="btn btn-danger px-3 btnxoa" > Delete </button>
                </td>
            </tr>`;
};
export const form_add_product = async () => {
    let brands = await getAllBrands();
    let optionBrands = ``;
    brands.forEach(brand => optionBrands += `<option value='${brand.id}'>${brand.name}<option>`);
    let types = await getAllTypes();
    let optionTypes = ``;
    types.forEach(type => optionTypes += `<option value='${type.id}'>${type.name}<option>`);
    return `<h2>
        Add poduct
    </h2>
    <form>
        <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control border-primary" id="name">
        </div>
        <div class="mb-3">
            <label for="type_id" class="form-label">Type</label>
            <select id="type_id" class="form-control border-primary">${optionTypes}</select>
        </div>
         <div class="mb-3">
            <label for="brand_id" class="form-label">Brand</label>
            <select id="brand_id" class="form-control border-primary">${optionBrands}</select>
        </div>
        <div class="mb-3">
            <label for="price" class="form-label">Price</label>
            <input type="number" class="form-control border-primary" id="price">
        </div>
         <div class="mb-3">
            <label for="sale" class="form-label">Sale</label>
            <input type="number" class="form-control border-primary" id="sale">
        </div>
        <div class="mb-3">
            <label for="image" class="form-label">Image</label>
            <input type="text" class="form-control border-primary" id="image">
        </div>
        <div class="mb-3">
            <label for="create_date" class="form-label">Create_date</label>
            <input type="date" class="form-control border-primary" id="create_date">
        </div>
         <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <input type="text" class="form-control border-primary" id="description">
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="hot" id="nornal" value="0">
            <label class="form-check-label" for="nornal">
                Nornal
            </label>
            <input class="form-check-input" type="radio" name="hot" id="hot" value="1" checked>
            <label class="form-check-label" for="hot">
                Hot
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="status" id="hide" value="0">
            <label class="form-check-label" for="hide">
                Hide
            </label>
            <input class="form-check-input" type="radio" name="status" id="show" value="1" checked>
            <label class="form-check-label" for="show">
                Show
            </label>
        </div>
        <button id="btn" class="btn btn-primary px-3" type="button">Add</button>
    </form>`;
};
const getAllBrands = async () => {
    return fetch(`${url}/brands`).then(res => res.json()).then(data => data);
};
const getAllTypes = async () => {
    return fetch(`${url}/types`).then(res => res.json()).then(data => data);
};
export const add_product = async () => {
    let name = document.querySelector('#name').value;
    let brand_id = Number(document.querySelector('#brand_id').value);
    let type_id = Number(document.querySelector('#type_id').value);
    let price = Number(document.querySelector('#price').value);
    let sale = Number(document.querySelector('#sale').value);
    let image = (document.querySelector('#image').value);
    let description = (document.querySelector('#description').value);
    let create_date = (document.querySelector('#create_date').value);
    let hot = Number(document.querySelector('[name=hot]:checked').value);
    let status = Number(document.querySelector('[name=status]:checked').value);
    let data = { name: name, brand_id: brand_id, type_id: type_id, price: price, sale: sale, image: image, description: description, create_date: create_date, hot: hot, status: status };
    let opt = { method: 'post', body: JSON.stringify(data), headers: { 'Content-type': 'application/json' } };
    let result = await fetch(url + `/products/`, opt).then(res => res.json()).then(data => data);
    document.location = 'admin_product.html';
};
export const form_edit_product = async (id) => {
    let product = await fetch(`${url}/products/?id=${id}`).then(res => res.json()).then(data => data[0]);
    let brands = await getAllBrands();
    let optionBrands = ``;
    brands.forEach(brand => optionBrands += `<option value='${brand.id}'${product.brand_id == product.brand_id ? 'selectes' : ''}>${brand.name}<option>`);
    let types = await getAllTypes();
    let optionTypes = ``;
    types.forEach(type => optionTypes += `<option value='${type.id}' ${product.type_id == product.type_id ? 'selectes' : ''}>${type.name}<option>`);
    return `<h2>
        Edit poduct
    </h2>
    <form>
        <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control border-primary" id="name" value="${product.name}">
        </div>
        <div class="mb-3">
            <label for="type_id" class="form-label">Type</label>
            <select id="type_id" class="form-control border-primary">${optionTypes}</select>
        </div>
         <div class="mb-3">
            <label for="brand_id" class="form-label">Brand</label>
            <select id="brand_id" class="form-control border-primary">${optionBrands}</select>
        </div>
        <div class="mb-3">
            <label for="price" class="form-label">Price</label>
            <input type="number" class="form-control border-primary" id="price" value="${product.price}">
        </div>
         <div class="mb-3">
            <label for="sale" class="form-label">Sale</label>
            <input type="number" class="form-control border-primary" id="sale" value="${product.sale}">
        </div>
        <div class="mb-3">
            <label for="image" class="form-label">Image</label>
            <input type="text" class="form-control border-primary" id="image" value="${product.image}">
        </div>
         <div class="mb-3">
            <label for="create_date" class="form-label">create_date</label>
            <input type="date" class="form-control border-primary" id="create_date" value="${product.create_date}">
        </div>
         <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <input type="text" class="form-control border-primary" id="description" value="${product.description}">
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="hot" id="normal" value="0"${product.hot == 0 ? 'checked' : ''}>
            <label class="form-check-label" for="hide">
                Normal
            </label>
            <input class="form-check-input" type="radio" name="hot" id="hot" value="1" ${product.hot == 1 ? 'checked' : ''}>
            <label class="form-check-label" for="hot">
                Hot
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="status" id="hide" value="0"${product.status == 0 ? 'checked' : ''}>
            <label class="form-check-label" for="hide">
                Hide
            </label>
            <input class="form-check-input" type="radio" name="status" id="show" value="1" ${product.status == 1 ? 'checked' : ''}>
            <label class="form-check-label" for="show">
                Show
            </label>
        </div>

        <input class="form-check-input" type="hidden" id="id" value="${id}">
        <button id="btn" class="btn btn-primary px-3" type="button">Update</button>
    </form>`;
};
export const edit_product = async () => {
    let id = document.querySelector('#id').value;
    let name = document.querySelector('#name').value;
    let brand_id = Number(document.querySelector('#brand_id').value);
    let type_id = Number(document.querySelector('#type_id').value);
    let price = Number(document.querySelector('#price').value);
    let sale = Number(document.querySelector('#sale').value);
    let image = (document.querySelector('#image').value);
    let description = (document.querySelector('#description').value);
    let create_date = (document.querySelector('#create_date').value);
    let hot = Number(document.querySelector('[name=hot]:checked').value);
    let status = Number(document.querySelector('[name=status]:checked').value);
    let data = { name: name, brand_id: brand_id, type_id: type_id, price: price, sale: sale, image: image, description: description, create_date: create_date, hot: hot, status: status };
    let opt = { method: 'put', body: JSON.stringify(data), headers: { 'Content-type': 'application/json' } };
    let result = await fetch(url + `/products/${id}`, opt).then(res => res.json()).then(data => data);
    document.location = 'admin_product.html';
};
export const deleteProduct = async (btn) => {
    let id = btn.getAttribute('idnsx');
    let confirm = window.confirm('Are you sure?');
    if (confirm == false)
        return;
    let opt = { method: 'delete' };
    let result = await fetch(url + `/products/${id}`, opt).then(res => res.json()).then(data => data);
    document.location = 'admin_brand.html';
};
