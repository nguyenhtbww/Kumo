import { url, TBrand } from "./common.js";

//begin: chức năng hiển thi danh sách nhà sản xuất
export const getBrandList = async () => {
    //Gọi API và đón nhận dữ liệu  res và chuyển về  dạng JSON , sau đó then lần nữa để trả về data
    let data = await fetch(`${url}/brands`).then(res => res.json()).then(data => data);
    let arr: TBrand[] = data as TBrand[];
    let html;
    arr.forEach(brand => {
        html += brandHtml(brand);
    });
    html = `
        <div id="brand_list" class="listnhasx">
            <h2>
            Brand list admin | <a href="add_brand.html" class="float-end">Add brand</a>
            </h2>
        <div id="data">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Tên Sản Phẩm</th>
                    <th scope="col">Vi trí</th>
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
const brandHtml = (brand: TBrand) => {
    return `<tr>
                <td>${brand.id} </td>
                <td>${brand.name}</td>
                <td>${brand.position}</td>
                <td> ${brand.status == 1 ? "Show":"Hide"}</td>
                <td>
                    <a href="edit_brand.html?id=${brand.id}" class="btn btn-warning px-3 me-1" > Edit </a>
                    <button idnsx="${brand.id}" class="btn btn-danger px-3 btnxoa" > Delete </button>
                </td>
            </tr>`;
}

// begin: chức năng thêm nhà sản xuất
export const form_add_brand = () => {
    return `<h2>
        Add brand
    </h2>
    <form>
        <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control border-primary" id="name">
        </div>
        <div class="mb-3">
            <label for="position" class="form-label">Position</label>
            <input type="number" class="form-control border-primary" id="position">
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
export const add_brand = async () => {
    let name:string = (document.querySelector('#name') as HTMLInputElement).value;
    let position: number = Number((document.querySelector('#position') as HTMLInputElement).value);
    let status:number = Number((document.querySelector('[name=status]:checked') as HTMLInputElement).value);

    let data = { name: name, position: position, status: status}
    let opt = { method: 'post', body: JSON.stringify(data), headers: {'Content-type': 'application/json' }}; 
    let result = await fetch (url +`/brands/`, opt).then(res => res.json()).then(data => data);
    document.location = 'admin_brand.html'
}

// begin: chức năng sửa nhà sản xuất
export const form_edit_brand = async (id: number) =>{
    // gọi API và đón nhận dữ liệu res và chuyển về dạng 350N, sau đó then lần nữa để trả về data
    let brand = await fetch(`${url}/brands/?id=${id}`).then(res => res.json()).then(data => data[0]);
    return `<h2>
                Edit brand
            </h2>
            <form>
                <div class="nb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control border-primary" id="name" value="${brand.name}">
                </div>
                <div class="mb-3">
                    <label for="position" class="form-label">Position</label>
                    <input type="number" class="form-control border-primary" id="position" value="${brand.position}">
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="status" id="hide" value="a" ${brand.status==0 ?'checked':''}>
                    <label class="form-check-label" for "hide">
                        Hide
                    </label>
                    <input class="form-check-input" type="radio" name="status" id="show" value="1" ${brand.status==1?'checked': ''}>
                    <label class="form-check-label" for "show">
                        Show
                    </label>
                </div>
                    <input type="hidden" id="id" value="${id}">
                    <button id="btn" class="btn btn-primaгу px-3" type="button">Update</button>
            </form>`;
}

export const edit_brand = async () => {
    let id:string = (document.querySelector('#id') as HTMLInputElement).value;
    let name:string = (document.querySelector('#name') as HTMLInputElement).value;
    let position:number = Number((document.querySelector('#position') as HTMLInputElement).value);
    let status:number = Number ((document.querySelector('[name=status]:checked') as HTMLInputElement).value);
    let data = {name: name, position: position, status: status}
    console.log(id);
    let opt ={method: 'put', body: JSON.stringify(data), headers: {'Content-type': 'application/json'}};
    let result = await fetch(url + `/brands/${id}`, opt).then(res => res.json()).then(data => data);
    document.location = 'admin_brand.html';
}

// begin: chức năng xóa nhà sản xuất
export const deleteBrand = async (btn: HTMLButtonElement) => {
    let id: string = btn.getAttribute('idnsx');
    let confirm: boolean = window.confirm('Are you sure ?');
    if(confirm==false) return;

    let otp = {method: 'delete'}
    let result = await fetch(url + `/brands/${id}`, otp).then(res => res.json()).then(data => data);
    document.location = 'admin_brand.html'
}