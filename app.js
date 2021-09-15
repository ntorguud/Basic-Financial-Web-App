//UI controller
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
    }
})();


var financeController = (function() {
    console.log('Hello');
})();


//Connector controller
var appController = (function(uiController,financeController) {

    var ctrlAddItem = function() {
        //1. Oruulah data-g UI-s olj avna.
        console.log(uiController.getInput());
        //2. Data-gaa financeController-t damjuulj hadgalna.

        //3. Data-g web-iin torhiroh hesegt gargana.

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
    }
        return {
            init: function() {
                console.log('Application started.');
                setUpEventListeners();
            }
        }
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
