//This code should go to financeController function
var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
}

var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
}

var i1 = new Income(1, 'Salary', 25000000);
var i2 = new Income(1, 'Lottery', 3000000);

// var incomes = [];
// incomes.push(i1);
// incomes.push(i2);

// console.log(incomes[1].description);

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