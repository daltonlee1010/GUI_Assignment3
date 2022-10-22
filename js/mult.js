/*
Author: Dalton Lee
Created: Ocotober 13, at 9:00 AM
Description: This webpage creates a multiplication table completely dynamically based on 
parameters entered in an HTML form.

File: mult.js
GUI Assignment: Creating an Interactive Dynamic Table
Dalton Lee, UMass Lowell Computer Science Student, dalton_lee@student.uml.edu
Copyright (c) 2021 by Dalton. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
updated by Dalton Lee on Ocotober 22, at 7:00 PM
*/

function submissionCheck() {

    // Check variable, set to false if there are any errors with text inputs
    var check = true;

    // Extract values from input fields, store in variables..
    var cmin = document.getElementById('cminrange').value;
    var cmax = document.getElementById('cmaxrange').value;
    var rmin = document.getElementById('rminrange').value;
    var rmax = document.getElementById('rmaxrange').value;

    // Convert values into integers to use in min/max checks & comparison checks
    var cmin_int = parseInt(cmin, 10);
    var cmax_int = parseInt(cmax, 10);
    var rmin_int = parseInt(rmin, 10);
    var rmax_int = parseInt(rmax, 10);

    // If contents created by this js file upon clicking submit exist, delete them..
    var container_exists = document.getElementById("mult_container");
    if(container_exists != null)
        container_exists.parentNode.removeChild(container_exists);
    var table_exists = document.getElementById("mult_table");
    if(table_exists != null)
        table_exists.parentNode.removeChild(table_exists);
    var error_exists = document.getElementById("error_msg");
    if(error_exists != null)
        error_exists.parentNode.removeChild(error_exists);

    // Create error_msg variable, append whenever there is an error type
    let error_msg = document.createElement('p');
    error_msg.setAttribute('id', 'error_msg');
    error_msg.innerHTML = "!!ERROR BOX!! Make changes below to generate table:<br>";
    // Validate numbers entered to text fields (that there's an entry, they're only numbers, 
    // and they're between -50 and 50)
    if(cmin.length == 0 || isNaN(cmin) || cmin_int < -50 || cmin_int > 50)
    {
        error_msg.innerHTML += "- Enter a number between -50 and 50 for Column Minimum Value<br>";
        check = false;
    }
    if(cmax.length == 0 || isNaN(cmax) || cmax_int < -50 || cmax_int > 50)
    {
        error_msg.innerHTML += "- Enter a number between -50 and 50 for Column Maximum Value<br>";
        check = false;
    }
    if(rmin.length == 0 || isNaN(rmin) || rmin_int < -50 || rmin_int > 50)
    {
        error_msg.innerHTML += "- Enter a number between -50 and 50 for Row Minimum Value<br>";
        check = false;
    }
    if(rmax.length == 0 || isNaN(rmax) || rmax_int < -50 || rmax_int > 50)
    {
        error_msg.innerHTML += "- Enter a number between -50 and 50 for Row Maximum Value<br>";
        check = false;
    }

    // Check range of numbers entered to text fields
    if(cmax_int < cmin_int)
    {
        error_msg.innerHTML += "- Column range is not compatible, accomadate numbers... column min range is higher than column max range (" + cmin + " > " + cmax + ")<br>";
        check = false;
    }
    if(rmax_int < rmin_int)
    {
        error_msg.innerHTML += "- Row range is not compatible, accomadate numbers... row min range is higher than row max range (" + rmin + " > " + rmax+ ")<br>";
        check = false;
    }

    // If all conditionals above were NOT met, the table is all set to be generated.
    // Otherwise, show error message..
    if(check == true)
    {
        generateTable(cmin_int, cmax_int, rmin_int, rmax_int);
    }
    else
    {
        document.getElementById('body').appendChild(error_msg);
    }
}

function generateTable(cmin, cmax, rmin, rmax) {
    // Declare variables that will be used to display the multiplication table
    let container = document.createElement('div');
    container.setAttribute('id', 'mult_container');
    let table = document.createElement('table');
    table.setAttribute('id', 'mult_table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    // Append proper html elements as children to other elements
    container.appendChild(table);
    table.appendChild(thead);
    table.appendChild(tbody);

    // Adding the entire table to the body tag
    document.getElementById('body').appendChild(container);

    // Creating and adding data to first row of the table
    let row_1 = document.createElement('tr');
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = "#";
    row_1.appendChild(heading_1);

    // Add values on head row (contains column values) from min to max value
    for(let i = cmin; i <= cmax; i++)
    {
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = i.toString();
        row_1.appendChild(heading_2);
    }
    thead.appendChild(row_1);


    // Creating and adding data to second row of the table
    // Add values on tbody th column (contains row numbers) from min to max value
    for(let i = rmin; i <= rmax; i++)
    {
        let row_next = document.createElement('tr');
        let row_next_head = document.createElement('th');
        row_next_head.innerHTML = i.toString();
        row_next.appendChild(row_next_head);

        // Calculate and fill in all td of the table (products of the column's and row's values)
        for(let j = cmin; j <= cmax; j++)
        {
            let row_next_data = document.createElement('td');
            let product = i * j;
            row_next_data.innerHTML = product.toString();
            row_next.appendChild(row_next_data);
        }
        tbody.appendChild(row_next);
    }
}