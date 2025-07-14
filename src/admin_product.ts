import { url, IProduct } from "./common.js";

//begin: chức năng hiển thi danh sách nhà sản xuất
export const getProductList = async () => {
    //Gọi API và đón nhận dữ liệu  res và chuyển về  dạng JSON , sau đó then lần nữa để trả về data
    let data = await fetch(`${url}/products`).then(res => res.json()).then(data => data);
    let arr:IProduct[] = data as IProduct[];

    let html =``;
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
            </div>`
    return html;
}

const productHtml = (product:IProduct) => {
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
}

// begin: chức năng thêm nhà sản xuất
export const form_add_product = async() => {
    let brands = await getAllBrands();
    let optionBrands:string = ``;
    brands.forEach(brand => optionBrands +=`<option value='${brand.id}'>${brand.name}<option>`);

        let types = await getAllTypes();
        let optionTypes:string = ``;
        types.forEach(type => optionTypes+=`<option value='${type.id}'>${type.name}<option>`);
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
}

const getAllBrands = async () => {
    return fetch (`${url}/brands`).then(res => res.json()).then(data => data);
}

const getAllTypes = async ()=>{
    return fetch (`${url}/types`).then(res => res.json()).then(data => data);
}

export const add_product = async () => {
    let name:string = (document.querySelector('#name') as HTMLInputElement).value;
    let brand_id: number = Number((document.querySelector('#brand_id') as HTMLInputElement).value);
    let type_id: number = Number((document.querySelector('#type_id') as HTMLInputElement).value);
    let price: number = Number((document.querySelector('#price') as HTMLInputElement).value);
    let sale: number = Number((document.querySelector('#sale') as HTMLInputElement).value);
    let image: string = ((document.querySelector('#image') as HTMLInputElement).value);
    let description: string = ((document.querySelector('#description') as HTMLInputElement).value);
    let create_date: string = ((document.querySelector('#create_date') as HTMLInputElement).value);
    let hot: number = Number((document.querySelector('[name=hot]:checked') as HTMLInputElement).value);
    let status:number = Number((document.querySelector('[name=status]:checked') as HTMLInputElement).value);

    let data = { name: name, brand_id: brand_id,type_id: type_id, price: price, sale: sale, image: image, description: description, create_date: create_date, hot :hot, status: status}
    let opt = { method: 'post', body: JSON.stringify(data), headers: {'Content-type': 'application/json' }}; 
    let result = await fetch (url +`/products/`, opt).then(res => res.json()).then(data => data);
    document.location = 'admin_product.html'
}

// begin: chức năng sửa nhà sản xuất
export const form_edit_product = async (id: number) =>{
    // gọi API và đón nhận dữ liệu res và chuyển về dạng 350N, sau đó then lần nữa để trả về data
    let product = await fetch(`${url}/products/?id=${id}`).then(res => res.json()).then(data => data[0]);

    let brands = await getAllBrands();
    let optionBrands:string = ``;
    brands.forEach(brand => optionBrands +=`<option value='${brand.id}'${product.brand_id==product.brand_id?'selectes': ''}>${brand.name}<option>`);

        let types = await getAllTypes();
        let optionTypes:string = ``;
        types.forEach(type => optionTypes+=`<option value='${type.id}' ${product.type_id==product.type_id?'selectes': ''}>${type.name}<option>`);
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
            <input class="form-check-input" type="radio" name="hot" id="normal" value="0"${product.hot==0? 'checked': ''}>
            <label class="form-check-label" for="hide">
                Normal
            </label>
            <input class="form-check-input" type="radio" name="hot" id="hot" value="1" ${product.hot==1? 'checked': ''}>
            <label class="form-check-label" for="hot">
                Hot
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="status" id="hide" value="0"${product.status==0? 'checked': ''}>
            <label class="form-check-label" for="hide">
                Hide
            </label>
            <input class="form-check-input" type="radio" name="status" id="show" value="1" ${product.status==1? 'checked': ''}>
            <label class="form-check-label" for="show">
                Show
            </label>
        </div>

        <input class="form-check-input" type="hidden" id="id" value="${id}">
        <button id="btn" class="btn btn-primary px-3" type="button">Update</button>
    </form>`;
}

export const edit_product= async () => {
    let id:string = (document.querySelector('#id') as HTMLInputElement).value;
    let name:string = (document.querySelector('#name') as HTMLInputElement).value;
    let brand_id: number = Number((document.querySelector('#brand_id') as HTMLInputElement).value);
    let type_id: number = Number((document.querySelector('#type_id') as HTMLInputElement).value);
    let price: number = Number((document.querySelector('#price') as HTMLInputElement).value);
    let sale: number = Number((document.querySelector('#sale') as HTMLInputElement).value);
    let image: string = ((document.querySelector('#image') as HTMLInputElement).value);
    let description: string = ((document.querySelector('#description') as HTMLInputElement).value);
    let create_date: string = ((document.querySelector('#create_date') as HTMLInputElement).value);
    let hot: number = Number((document.querySelector('[name=hot]:checked') as HTMLInputElement).value);
    let status:number = Number((document.querySelector('[name=status]:checked') as HTMLInputElement).value);

    let data = { name: name, brand_id: brand_id,type_id:type_id, price:price, sale: sale, image: image, description:description, create_date: create_date, hot:hot, status:status}
    let opt = { method: 'put', body: JSON.stringify(data), headers: {'Content-type': 'application/json' }}; 
    let result = await fetch(url +`/products/${id}`, opt).then(res => res.json()).then(data => data);
    document.location = 'admin_product.html'
}

// begin: chức năng xoa nhà sản xuất
export const deleteProduct = async (btn: HTMLButtonElement) =>{
    // gọi API và đón nhận dữ liệu res và chuyển về dạng 350N, sau đó then lần nữa để trả về data
    let id:string = btn.getAttribute('idnsx');
    let confirm: boolean = window.confirm ('Are you sure?');
    if(confirm==false) return;

        let opt = {method : 'delete'}
        let result = await fetch (url +`/products/${id}`, opt).then(res => res.json()).then(data => data);
    document.location = 'admin_brand.html'
}