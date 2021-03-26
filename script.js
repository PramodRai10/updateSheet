

    const innerBody = document.querySelector('.innerbody');

    function myFunction($this) {
        console.log('Clicked');
        console.log($this.id);
        const id = $this.id - 1;
        var n2 = document.getElementById("tableData").rows[`${id}`].cells;

        const obj = {

        };


        for (let j = 1; j < n2.length - 1; j++) {
            obj[j] = n2.item(j).innerHTML;
        }
        const row_id = n2.item(0).innerHTML;
        // const status = n2.item(6).innerHTML;
        // const vaccinated = n2.item(7).innerHTML;
        console.log(obj);
        updateData(obj, row_id);
        // console.log(row_id, status, vaccinated);
        setTimeout(() => {
            location.reload();
        }, 10000)
    }
    async function updateData(obj, row_id) {
        var settings = {
            url: 'https://v1.nocodeapi.com/pramodrai/google_sheets/rSfMdTMqyDueALRt?tabId=Sheet1',
            method: "PUT",
            timeout: 0,
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify({ "row_id": row_id, "name": obj[1], "email": obj[2], "dob": obj[4], "aadharId": obj[3], "phone": obj[5], "status": obj[6], "vaccinated": obj[7] }),
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
            fetchData();
        })
    }
    async function fetchData() {
        const response = await fetch(
            'https://v1.nocodeapi.com/pramodrai/google_sheets/rSfMdTMqyDueALRt?tabId=Sheet1'
        )

        const dataObj = await response.json();
        const data = dataObj.data;

        let x = '';
        console.log(typeof (data));
        for (let i = 0; i < data.length; i++) {

            let { row_id, AadharId, DOB, Email, Name, Phone, Status, Vaccinated } = data[i];
            if (Status == undefined) {
                Status = ''
            }
            if (Vaccinated == undefined) {
                Vaccinated = ''
            }

            x += `
                  <tr id=row-${i}>
                    <th scope="row">${row_id}</th>
                    <td>${Name}</td>
                    <td>${Email}</td>
                    <td>${AadharId}</td>
                    <td>${DOB}</td>
                    <td>${Phone}</td>
                    <td contenteditable="true">${Status}</td>
                    <td contenteditable="true">${Vaccinated}</td>
                    <td><button type="button" id=${i + 2} onClick="myFunction(this)" class="save btn btn-danger btn-rounded btn-sm my-0">Save</button></td>
                  </tr>
            `
        };
        innerBody.innerHTML = x;
    }
    fetchData();

