const loadPhone = async (searchText, datalimit) => {
     const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;

     const res = await fetch(url);
     const data = await res.json();
     displayPhone(data.data, datalimit);
}

const loadPhoneDetais = async id => {
     const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
     const res = await fetch(url);
     const data = await res.json();
     console.log(data.data);
}


const displayPhone = (phones, datalimit) => {
     const divContainer = document.getElementById('div-container');
     divContainer.innerText = '';
     // display 10 phone only
     const showAll = document.getElementById('show-all');
     if (datalimit && phones.length > 0) {
          phones = phones.slice(0, 10)
          showAll.classList.remove('d-none');
     }
     else {
          showAll.classList.add('d-none');
     }
     // display no phone found
     const noPhone = document.getElementById('no-phone-found');
     if (phones.length === 0) {
          noPhone.classList.remove('d-none');
     }
     else {
          noPhone.classList.add('d-none');
     }
     // display all phone
     phones.forEach(phone => {
          const phoneDiv = document.createElement('div');
          phoneDiv.classList.add('col');
          phoneDiv.innerHTML = `
          <div class="card">
          <img src="${phone.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Phone name:${phone.phone_name}</h5>
            <p class="card-text">Brand name:${phone.brand}</p>
            
            <button onclick = loadPhoneDetails('${phone.slug}')  href="" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#phoneDetailModal"  >show details</button>

            </div>
        </div>
          `
          divContainer.appendChild(phoneDiv);
     })
     toggleSpinner(false);
}

const processSearch = (datalimit) => {
     toggleSpinner(true)
     const searchInput = document.getElementById('input-field');
     const searchText = searchInput.value;
     loadPhone(searchText, datalimit);
}
document.getElementById('btn-search').addEventListener('click', function () {
     processSearch(10);
})

document.getElementById('input-field').addEventListener('keypress', function (e) {

     if (e.key === 'Enter') {
          processSearch(10);
     }
})

const toggleSpinner = isloading => {
     const loader = document.getElementById('toggle-spinner');
     if (isloading) {
          loader.classList.remove('d-none');
     }
     else {
          loader.classList.add('d-none')
     }
}

document.getElementById('show-all').addEventListener('click', function () {
     processSearch();
})


const loadPhoneDetails = async id => {

     const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
     const res = await fetch(url);
     const data = await res.json();
     displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
     console.log(phone);
     const phoneDetail = document.getElementById('phoneDetailModalLabel');
     phoneDetail.innerText = phone.name;
     const phoneRelease = document.getElementById('phoneRelease');
     phoneRelease.innerHTML = `
     <p>Release date:${phone.releaseDate}</p>
     
     <p>Memory:${phone.mainFeatures ? phone.mainFeatures.memory : 'No memory found'}</p>
     <p>others:${phone.others ? phone.others.Bluetooth : 'Not found'}</p>
     
     
     `
}
loadPhone('apple');