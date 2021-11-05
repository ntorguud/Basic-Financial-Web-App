var uiController = (function() {
    var DOMstrings = {
        inputType = '.add__type',
        inputDescription = '.add__description',
        inputValue = '.add__value',
        addBtn = '.add__btn'
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,  //inc/ exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    };
})();

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
        addItem: function(type, description, value) {
            
            var item, id;

            if(data.items[type].length === 0) id = 1;
            
            else {
                id = data.items[type][data.items[type].length - 1].id + 1;  //data.items[type] is an ARRAY !!!!
            }

            if(type === 'inc') {
                item = new Income(id, description, value);
            } else {
                //type === 'exp'
                item = new Expense(id, description, value);
            }

            data.items[type].push(item);
        },

        seeData: function() {
            return data;
        }
    };

    // data.items.inc.push(i1);

    // console.log(data.totals.inc);

    // var incomes =[];
    // var expenses = [];

    // var totalIncomes = 0;
    // var totalExpenses = 0;

})();

var appController = (function(uiController, financeController) {

    var ctrlAddItem = function() {
    
        //1. Oruulah ugugdliig delgetsees olj avna.
        console.log(uiController.getInput());

        //2. Olj avsan ugugdluudee fnCtrl-t damjuulj tend hadgalna.
        financeController.addItem(input.type, input.description, input.value);

        //3. Olj avsan datanuudaa webiin tohiroh hesguud deer gargana.

        //4. Tusviig tootsoolno.

        //5. Etssiin uldegdel, tootsoog delgetsend gargana.
    };

    var setupEventListeners = function() {
        var DOM = uiController.getDOMstrings();

        document.querySelector(DOM.addBtn).addEventListener('click', function() {
            ctrlAddItem();
        });
    
        document.addEventListener('keypress', function(event) {
            if(event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            };
        });
    };

    return {
        init: function() {
            console.log('Application started.');
            setupEventListeners();
        }
    };
     
})(uiController, financeController);

appController.init();
