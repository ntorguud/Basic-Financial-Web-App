//This code should go to financeController function
var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
};

var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
};

var i1 = new Income(1, 'Salary', 25000000);
var i2 = new Income(1, 'Lottery', 3000000);

// var incomes = [];
// incomes.push(i1);
// incomes.push(i2);

// console.log(incomes[1].description); Sugalaa hojson gedeg uguulber garch irsen

var data = {
    items: {
        inc: [],
        exp: []
    },

    totals: {
        inc: 0,
        exp: 0
    }
};

var type = 'inc'; //ali ruu n orohiig end shiidne.
var desc = 'Salary';
var val = 2500000;

data.items[type].push(desc);
console.log(data.items);

// ********************** //

var html = '<p>Hello World0</p><p>Hello World1</p><p>Hello World2</p>';

html = html.replace(/p/gi, 'strong'); //global.r buh p tag.iig solih, upper & lower case

    //beforebegin *****

// <div class='inc' style='background-color: green; color: white; padding: 50px;'>

    //aftebegin *****

// <h1>Income</h1>

    //beforeend *****

// </div>

    //afterend *****

// <div class="exp" style="background-color: red; color: white; padding: 50px;">

// <h1>Expense</h1>

// </div>
var incDiv = document.querySelector('.inc');

incDiv.insertAdjacentHTML('beforeend', 'Hello!');

//focus will show where the cursor is




var a = ['cat', 'mosue', 'bird', 'sun', 'moon'];

console.log(a);
a.splice(a.indexOf('bird'), 1);   //bird gesen element gantsaaraa ustna.
a.splice(a.indexOf('moon'), 1);
console.log(a);



var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var e1 = new Expense(3, 'Food', 15000);
  var e2 = new Expense(65, 'Shoes', 150080);
  var e3 = new Expense(78, 'Leasing', 90000);
  var e4 = new Expense(300, 'Gas', 399000);

  var e = [e1, e2, e3, e4];

  console.log(e);

  //id = 2... iig haij olj ustgah heregtei.
//   var ids = [2, 3, 65, 78, 300];

//   e.splice(ids.indexOf(2), 1);

var ids = e.map(function(el, index, array) {
    return el.id;
    // return Math.round(el.value/2848) + '$';
});
console.log(e);

var index = ids.indexOf(320);
if(index !== -1) e.splice(index, 1); 
//1. element oldohgui bol -1 deh elementiig ustgadag.

//2. indexOf elementiig -3 gesen utgatai ugvul hoinoos n toolj bgad 3 el ustgana.
console.log(ids);

console.log(e);



//Split function. Hooson zaigaar n zadalj bolno.
var str = "Unuudur saihan udur bna.";
var x = str.split(" ");

console.log(x.length);


var str = "Expense-22";
var x = str.split("-");

console.log(x[1]);  //1dex element buyu 22iig salgaj avj bna.





var a = '17773442939';


var x = a.split("");

var x = a.split("").reverse().join("");
console.log("2. too " + x);

var y = "";
var count = 1;

for(i = 0; i < x.length; i++) {
    y = y + x[i];

    if(count % 3 === 0) y = y + ",";
    count++;
}

var z = y.split("").reverse().join("");
if(z[0] === ",") z = z.substr(1, z.length - 1);

console.log(z);
