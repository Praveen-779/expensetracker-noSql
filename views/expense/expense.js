let token = localStorage.getItem('token');
let pageSize = localStorage.getItem('pagesize');
const  host = "http://localhost:7000"

const parsedjwt = parseJwt(token);
let isPremium = parsedjwt.ispremiumuser;

async function addExpense(event) {
    event.preventDefault();
    const displayDiv = document.getElementById('display');

    const obj = {
        amount: document.getElementById('amount').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value
    }

    try {
        const response = await axios.post(`${host}/expense/add-expense`, obj, { headers: { 'Authorization': token } });
        handlePageClick(1)
    }
    catch (err) {
        console.log(err);
    }


}

async function deleteExpense(id) {
    try {
        const response = await axios.delete(`${host}/expense/delete/${id}`, { headers: { 'Authorization': token } });
        handlePageClick(1)

    } catch (err) {
        console.log(err);
    }
}

document.getElementById('rzp-button1').onclick = async function (e) {
    const response = await axios.get(`${host}/purchase/premiummembership`, { headers: { 'Authorization': token } });
    console.log('p1');


    const options = {
        "key": response.data.key_id,
        "order_id": response.data.order.id,
        "handler": async function (response) {
            token = await axios.post(`${host}/purchase/updatetransactionstatus`, {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
            }, { headers: { "Authorization": token } })

            alert('TRANSACTION SUCCESSFULL');
            localStorage.setItem('token', token.data.token)
            displayPremium();
            location.reload();

        }
    }
    console.log(response.data.order.id,response.data.key_id)
    const rzp = new Razorpay(options);
    rzp.open();
    e.preventDefault();

    rzp.on('payment.failed', async function (response) {
        await axios.post(`${host}/purchase/updatefailedstatus`, { order_id: options.order_id }, { headers: { "Authorization": token } })
        alert('TRANSACTION FAILED');
    })

}

async function download() {
    try {
        const downloadedDiv = document.getElementById('downloadedfiles');
        const button = document.createElement('button');
        const response = await axios.get(`${host}/expense/download`, { headers: { "Authorization": token } });
        const a = document.createElement('a');
        a.href = response.data.url;
        a.click();
        displayDownloads()
    } catch (err) {
        console.log(err);
    }


}

async function displayPremium() {
    console.log(isPremium)
    if (isPremium) {
        const buyPremiumButton = document.getElementById('rzp-button1');
        buyPremiumButton.style.display = 'none';

        const premiumMessage = document.createElement('p');
        premiumMessage.innerHTML = `<h3><strong>YOU ARE A PREMIUM USER!   </strong></h3> <button type="submit" onclick="download()" >Download expense</button>`;
        document.getElementById('premium').appendChild(premiumMessage);

        const showLeaderboardButton = document.createElement('button');
        showLeaderboardButton.textContent = 'Show Leaderboard';
        showLeaderboardButton.addEventListener('click', getLeaderboard);
        document.getElementById('premium').appendChild(showLeaderboardButton);
        displayDownloads();
    }
}

async function getLeaderboard() {
    try {
        console.log(token);
        const response = await axios.get(`${host}/premium/leaderboard`, { headers: { 'Authorization': token } });
        const leaderBoardArray = response.data.leaderBoard;
        displayLeaderBoard(leaderBoardArray);

    } catch (err) {
        console.log(err);
    }
}

function displayLeaderBoard(leaderBoardArray) {
    const leaderboardDiv = document.getElementById('leaderboard');
    console.log(leaderBoardArray);
    leaderboardDiv.innerHTML = '';

    leaderboardDiv.innerHTML = '<h1>LEADERBOARD</h1>'

    leaderBoardArray.forEach(leaderBoard => {
        console.log(leaderBoard.name, leaderBoard.totalexpense);

        const leaderboardEntry = document.createElement('li');
        leaderboardEntry.textContent = `name : ${leaderBoard.name}  - Amount : ${leaderBoard.totalexpense ?? 0}  `
        leaderboardDiv.appendChild(leaderboardEntry);
    })
}

async function displayDownloads() {
    try {
        if (isPremium) {
            const response = await axios.get(`${host}/expense/downloadedexpense`, { headers: { 'Authorization': token }} )
            const downloadedDiv = document.getElementById('downloadedfiles');
            const downloadedFiles = response.data.downloadedFiles;

            downloadedDiv.innerHTML = '';

            const h1 = document.createElement('h2');
            h1.innerText = 'Your Downloaded List Data';
            downloadedDiv.appendChild(h1);


            for (let i = 0; i < downloadedFiles.length; i++) {
                console.log(downloadedFiles[i]);
                const li = document.createElement('li');
                const a = document.createElement('a');
                const button = document.createElement('button')

                button.innerText = "Download";
                a.href = downloadedFiles[i].url;

                const date = downloadedFiles[i].date;

                li.textContent = ` file ${i + 1}
        ,    ${date}   `;

                button.addEventListener('click', () => {
                    a.click();
                });
                li.appendChild(button);
                li.appendChild(a);
                downloadedDiv.appendChild(li);

            }
        }

    } catch (err) {
        console.log(err);
    }
}

function listExpenses(expenses) {
    try {

        const displayDiv = document.getElementById('display');
        displayDiv.innerHTML = '';
        console.log('inside list')

        for (let i = 0; i < expenses.length; i++) {

            const amount = expenses[i].amount;
            const category = expenses[i].category;
            const description = expenses[i].description;
            const id = expenses[i]._id;
            console.log(id)

            const expenseDetail = document.createElement('p');
            expenseDetail.innerHTML =
                `Amount : ${amount} - Category : ${category} - Description : ${description}
                 <button onclick="deleteExpense('${id}')">Delete</button>`

            displayDiv.appendChild(expenseDetail);
        }

    } catch (err) {
        console.log(err);
    }
}


function showPagination(data) {
    const paginationDiv = document.getElementById("pagination");
    paginationDiv.innerHTML = '';
    if (data.hasPreviousPage) {
        const button1 = document.createElement('button');
        button1.textContent = data.previousPage;
        button1.addEventListener('click', () => handlePageClick(data.previousPage));
        paginationDiv.appendChild(button1);
    }


    const button2 = document.createElement('button');
    button2.textContent = data.currentPage;
    button2.style.fontWeight = 'bold';
    paginationDiv.appendChild(button2);

    if (data.hasNextPage) {
        // const paginationDiv = document.getElementById("pagination");
        const button3 = document.createElement('button');
        button3.textContent = data.nextPage;
        button3.addEventListener('click', () => handlePageClick(data.nextPage));
        paginationDiv.appendChild(button3);
    }
}

async function handlePageClick(page) {
    pageSize = localStorage.getItem('pagesize');
    const response = await axios.get(`${host}/expense/pagination/${pageSize}/?page=${page}`, { headers: { 'Authorization': token } })
    listExpenses(response.data.expenses);
    console.log(response.data.expenses.length);
    showPagination(response.data);
}

document.addEventListener('DOMContentLoaded', async () => {
    // await displayExpense();
    await displayPremium();
    const page = 1;
    try {
        console.log(host, pageSize, page);
        const response = await axios.get(`${host}/expense/pagination/${pageSize}?page=${page}`, { headers: { 'Authorization': token } })
        listExpenses(response.data.expenses);
        console.log(response.data.expenses.length);
        showPagination(response.data);
    } catch (err) {
        console.log(err);
    }

});


async function savePageSize(event) {
    event.preventDefault();
    const size = document.getElementById('itemsperpage').value;
    localStorage.setItem('pagesize', size);
    alert(`page limit set to ${size}`);
    handlePageClick(1)

}




function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
