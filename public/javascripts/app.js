if(localStorage.token) {
  $.ajaxSetup({
    headers: {
         Authorization: 'Bearer ' + localStorage.token
    }
  });
}

if (location.search) {
  var token = location.search.split('=')[1];
  localStorage.setItem('token', token);
  location.href = '/home';
}

function logOut() {
  localStorage.token = '';
  location = '/';
}

function getUser() {
  if(localStorage.token) {
    return JSON.parse(atob(localStorage.token.split('.')[1])).user;
  }
}
