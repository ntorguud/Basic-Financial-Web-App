var uiController = (function() {
    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn"
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
        }
    };

})();





var financeController = (function(){
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

})();





var appController = (function(uiController, financeController) {
    var DOM = uiController.getDOMstrings();

    var ctrlAddItem = function() {
        //1. Oruulah datag delgetsees olj avna.
       uiController.getInput();
       //2. Olj avssan datagaa finControllert damjuulj tend hadgalna.

       //3. Olj avsan datanuudaa web deeree tohiroh hesegt gargana.

       //4. Budgetiig tootsoolno.

       //5. Final uldegdel, tootsoog delgetsend gargana.
    };

    var setupEventListeners = function() {
        document.querySelector(DOM.addBtn).addEventListener("click", function() {
            ctrlAddItem();
        });
    
        document.addEventListener("keypress", function(event) {
            if(event.keyCode === 13 || event.which === 13) {
                ctrlAddItem(); 
        };
    });
    }; 

    return {
        init: function() {
            console.log("Application started.");
            setupEventListeners();
        }
    };
   
})(uiController, financeController);

appController.init();