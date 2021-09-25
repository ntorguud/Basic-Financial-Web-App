//UI controller
var uiController = (function() {
    var DOMstrings = {
        inputType: ".add__type", //return inc or exp
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn",
        incomeList: ".income__list",
        expensesList: ".expenses__list"
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        getDOMstrings: function() {
            return DOMstrings;
        },

        //Lesson 69
        addListItem: function(item, type) {
            // Preparing HTML which includes income and expense elements.
            var html, list;
            
            if(type === "inc") {
                list = DOMstrings.incomeList;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%Description%</div><div class="right clearfix"><div class="item__value">$Value$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else {
                list = DOMstrings.expensesList;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%Description%</div><div class="right clearfix"><div class="item__value">$Value$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Replace income and expense values in this HTML.
            html = html.replace("%id%", item.id);
            html = html.replace("%Description%", item.desc);
            html = html.replace("$Value$", item.val);

            //Put HTML into the DOM.
            document.querySelector(incExpList).insertAdjacentHTML("beforeend", html);
        }
    };
})();

//Private data
var financeController = (function() {
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
    return {
        addItem: function(type, desc, val) {
            var item, id;
            if(data.items[type].length === 0) id = 1;
            else {
                id = data.items[type][data.items[type].length - 1].id + 1;
            }

            if(type === "inc") {
                item = new Income(id, desc, val);
            } else {
                item = new Expense(id, desc, val);
            }
            data.items[type].push(item);

            return item();
        },

        seeData: function() {
            return data;
        }    
    };
})();


//Connector controller
var appController = (function(uiController, financeController) {

    var ctrlAddItem = function() {
        //1. Oruulah data-g UI-s olj avna.
        var input = uiController.getInput();
    
        //2. Data-gaa financeController-t damjuulj hadgalna.
        var item = financeController.addItem(
            input.type, 
            input.description, 
            input.value);

        //3. Data-g web-iin torhiroh hesegt gargana.
        uiController.addListItem(item, input.type);

        //4. Calculate budget

        //5. Show Final balance in the display.
    };
    
    var setUpEventListeners = function() {
        var DOM = uiController.getDOMstrings();

        document.querySelector(DOM.addBtn).addEventListener("click", function() {
            ctrlAddItem();
        });
    
        document.addEventListener("keypress", function(event) {
            if(event.keyCode === 13 | event.which === 13) {
                ctrlAddItem(); //event.which -- in old browsers
            } 
        });
    };
        
    return {
        init: function() {
            console.log('Application started.');
            setUpEventListeners();
        }
     };
})(uiController, financeController);

appController.init();


// var hunController = (function() {
//     var thought = 'JS is tough.';
//     function tsusGuih() {
//     }

//     function o2TsusRuuOruulah() {
//     }
//     return {
//         speaking: function() {
//             thought = 'JS is beautiful';
//             o2TsusRuuOruulah();
//             tsusGuih();
//             console.log('hi');
//         }
//     }
// })();

// hunController.tsusGuih(); //says it is not a function cuz it's a private function. This process is a function encapsulation.
