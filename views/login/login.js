async function login(event) {
    event.preventDefault();
    
    const obj = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    }
    try {
        console.log(obj);
        const response = await  axios.post('http://localhost:7000/user/login', obj);
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
            alert(response.data.message);

            window.location.href = '../expense/expense.html'
        }

    }
    catch (err) {
        const errorDiv = document.getElementById('errorMessage');
        errorDiv.innerHTML = `<div style="color : red;">${err}, message :  ${err.response.data.message}</div>`
    }
}