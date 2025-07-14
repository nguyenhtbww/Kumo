import { url } from "./common.js";
export const getBrandList = async () => {
    let data = await fetch(`${url}/brands`).then(res => res.json()).then(data => data);
    let arr = data;
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
            </div>`;
    return html;
};
const brandHtml = (brand) => {
    return `<tr>
                <td>${brand.id} </td>
                <td>${brand.name}</td>
                <td>${brand.position}</td>
                <td> ${brand.status == 1 ? "Show" : "Hide"}</td>
                <td>
                    <a href="edit_brand.html?id=${brand.id}" class="btn btn-warning px-3 me-1" > Edit </a>
                    <button idnsx="${brand.id}" class="btn btn-danger px-3 btnxoa" > Delete </button>
                </td>
            </tr>`;
};
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
};
export const add_brand = async () => {
    let name = document.querySelector('#name').value;
    let position = Number(document.querySelector('#position').value);
    let status = Number(document.querySelector('[name=status]:checked').value);
    let data = { name: name, position: position, status: status };
    let opt = { method: 'post', body: JSON.stringify(data), headers: { 'Content-type': 'application/json' } };
    let result = await fetch(url + `/brands/`, opt).then(res => res.json()).then(data => data);
    document.location = 'admin_brand.html';
};
export const form_edit_brand = async (id) => {
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
                    <input class="form-check-input" type="radio" name="status" id="hide" value="a" ${brand.status == 0 ? 'checked' : ''}>
                    <label class="form-check-label" for "hide">
                        Hide
                    </label>
                    <input class="form-check-input" type="radio" name="status" id="show" value="1" ${brand.status == 1 ? 'checked' : ''}>
                    <label class="form-check-label" for "show">
                        Show
                    </label>
                </div>
                    <input type="hidden" id="id" value="${id}">
                    <button id="btn" class="btn btn-primaгу px-3" type="button">Update</button>
            </form>`;
};
export const edit_brand = async () => {
    let id = document.querySelector('#id').value;
    let name = document.querySelector('#name').value;
    let position = Number(document.querySelector('#position').value);
    let status = Number(document.querySelector('[name=status]:checked').value);
    let data = { name: name, position: position, status: status };
    console.log(id);
    let opt = { method: 'put', body: JSON.stringify(data), headers: { 'Content-type': 'application/json' } };
    let result = await fetch(url + `/brands/${id}`, opt).then(res => res.json()).then(data => data);
    document.location = 'admin_brand.html';
};
export const deleteBrand = async (btn) => {
    let id = btn.getAttribute('idnsx');
    let confirm = window.confirm('Are you sure ?');
    if (confirm == false)
        return;
    let otp = { method: 'delete' };
    let result = await fetch(url + `/brands/${id}`, otp).then(res => res.json()).then(data => data);
    document.location = 'admin_brand.html';
};
