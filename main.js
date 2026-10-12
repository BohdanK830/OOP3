//task 1
class Marker{
    constructor(color, inkAmount = 100){
        this.color  = color;
        this.inkAmount = inkAmount;
    }
    print(text){
        let printedText = "";
        for(let char of text){
            if (this.inkAmount === 0){
                break;
            }
            printedText += char;
            if (char !== " " && char !== "\n"){
                this.inkAmount -= 0.5;
            }
        }
        const container = document.getElementById("marker-output");
        if (container){
            const textNode = document.createElement("span");
            textNode.innerText = printedText;
            textNode.style.color = this.color;
            container.appendChild(textNode);
            if (this.inkAmount <= 0){
                const warningNode = document.createElement("span");
                warningNode.innerText = "Out of ink";
                warningNode.style.color = "gray";
                container.appendChild(warningNode);
            }
        }
    }
}
class RefillableMarker extends Marker{
    refill(amount = 100){
        this.inkAmount += amount;
        if (this.inkAmount > 100) {
            this.inkAmount = 100;
        }
        const container = document.getElementById("marker-output");
        if (container) {
            const refillNode = document.createElement("div");
            refillNode.innerText = `\n[Marker refilled, ink level: ${this.inkAmount}%]\n`;
            refillNode.style.color = "gray";
            container.appendChild(refillNode);
        }
    }
}

//task 2
class ExtendedDate extends Date{
    getDateText(){
        const container = document.getElementById("dateText");
        const textNode = document.createElement("span");
        const days = ["", "First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", 
                          "Eighth", "Ninth", "Tenth", "Eleventh", "Twelfth", "Thirteenth", 
                          "Fourteenth", "Fifteenth", "Sixteenth", "Seventeenth", "Eighteenth", 
                          "Nineteenth", "Twentieth", "Twenty-First", "Twenty-Second", "Twenty-Third", 
                          "Twenty-Fourth", "Twenty-Fifth", "Twenty-Sixth", "Twenty-Seventh", 
                          "Twenty-Eighth", "Twenty-Ninth", "Thirtieth", "Thirty-First"
        ];
        const months = ["January", "February", "March", "April", "May", "June","July",
                        "August", "September", "October", "November", "December"];
        const day = this.getDate();
        const monthText = months[this.getMonth()];
        const dayText = days[day];
        textNode.innerText = `${dayText} ${monthText}`;
        container.appendChild(textNode);
    }
    checkDate(anyDate){
        const container = document.getElementById("checkDate");
        const textNode = document.createElement("span");
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const compareDate = new Date(anyDate);
        compareDate.setHours(0, 0, 0, 0);
        textNode.innerText = (compareDate >= today) + "\n";
        container.appendChild(textNode);
    }
    isLeapYear(){
        const container = document.getElementById("isLeap");
        const textNode = document.createElement("span");
        const year = this.getFullYear();
        textNode.innerText = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        container.appendChild(textNode);
    }
    nextDate(anyDate){
        const container = document.getElementById("nextDate");
        const textNode = document.createElement("span");
        const date = anyDate !== undefined ? new Date(anyDate) : new Date(this.getTime());
        const next = new ExtendedDate(date.getTime());
        next.setDate(next.getDate() + 1);
        textNode.innerText = next;
        container.appendChild(textNode);
    }
}

//task 3
class Employee{
    constructor(firstName, lastName, position, department, salary) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.position = position;
        this.department = department;
        this.salary = salary;
    }
}
class EmpTable{
    constructor(employees){
        this.employees = employees;
    }
    getHtml(){
        if (!this.employees || this.employees.length === 0){
            return "<p>No employees found.</p>";
        }
        let html = `
            <table class="employee-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Position</th>
                        <th>Department</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
        `;
        this.employees.forEach((empl, index) =>
            {html += `<tr>
            <td>${index + 1}</td>
            <td>${empl.firstName}</td>
            <td>${empl.lastName}</td>
            <td>${empl.position}</td>
            <td>${empl.department}</td>
            <td>$${empl.salary.toLocaleString()}</td>
            </tr>`;})
        html += `</tbody></table>`;
        return html;
    }
}

//task 4

class StyledEmpTable extends EmpTable{
    getStyles(){
        return `
            <style>
                .styled-employee-table {
                    width: 100%;
                    border-collapse: collapse;
                    background-color: #ffffff;
                    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.15);
                    border-radius: 8px;
                    overflow: hidden;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    margin-top: 25px;
                }
                .styled-employee-table th {
                    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                    color: white;
                    padding: 14px 18px;
                    font-weight: 600;
                    text-transform: uppercase;
                    font-size: 0.85rem;
                    letter-spacing: 0.5px;
                    text-align: left;
                }
                .styled-employee-table td {
                    padding: 12px 18px;
                    border-bottom: 1px solid #eef2f5;
                    color: #495057;
                    font-size: 0.95rem;
                }
                .styled-employee-table tr:nth-child(even) {
                    background-color: #f8fafc;
                }
                .styled-employee-table tr:hover {
                    background-color: #f1f5f9;
                    cursor: pointer;
                }
            </style>
        `;
    }
    getHtml(){
        let parentHtml = super.getHtml();
        parentHtml = parentHtml.replace(/employee-table/g, "styled-employee-table");
        return this.getStyles() + parentHtml;
    }
}