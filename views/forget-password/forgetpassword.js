async function forgetPassword(event) {
    try {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const response = await axios.post('http://localhost:7000/password/forgetpassword', { email: email });
        const success = response.data.success;


        if (success) {
            const uuid = response.data.uuid;
            localStorage.setItem('uuid', uuid);
            document.getElementById('result').innerHTML = 'mail with link to reset password sent successfully';
        } else {
            document.getElementById('result').innerHTML = 'Please Enter Registered Mail Id';
        }

    } catch (err) {
        console.log(err);
    }
}