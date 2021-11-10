var uiController = (function() {
    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn",
        incomeList: ".income__list",
        expenseList: ".expenses__list"
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // inc, exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        getDOMstrings: function() {
            return DOMstrings;
        },

        clearFields: function() {
            var fields = document.querySelector(DOMstrings.inputDescription + ", " + DOMstrings.inputValue
            );

            // Convert list to array
            var fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(el, index, array) {
                el.value = "";
            });

            // for(var i = 0; i < fieldsArr.length; i++ ) {
            //     fieldsArr[i].value = '';
            // }
        },

        addListItem: function(item, type) {
            //1. Orlogo, zarlagiin elementiig aguulsan html-iig beldene.
            var html, list;

            if(type === 'inc') {
                list = DOMstrings.incomeList;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">$value$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else {
                list = DOMstrings.expenseList;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">$value$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            //2. In that html, orlogo, zarlagiin utguudiig replace ashiglan uurchilj ugnu.
            html = html.replace('%id%', item.id);
            html = html.replace('%description%', item.desc);
            html = html.replace('$value$', item.value);

            //3. Beltgesen html-ee DOM ruu hiine.
            document.querySelector(list).insertAdjacentHTML('beforeend', html);
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

    return {
        addItem: function(type, desc, val) {
            var item, id;

            if(data.items[type].length === 0) id = 1; 
            else {
                id = data.items[type][data.items[type].length - 1].id + 1;
            }

            if(type === 'inc') {
                item = new Income(id, desc, val);
            } else {
                //type === exp
                item = new Expense(id, desc, val);
            }

            data.items[type].push(item);

            return item;
        },

        seeData: function() {
            return data;
        }
    };

    


})();





var appController = (function(uiController, financeController) {
    var DOM = uiController.getDOMstrings();

    var ctrlAddItem = function() {
        //1. Oruulah datag delgetsees olj avna.
       var input = uiController.getInput();
       
       //2. Olj avssan datagaa finControllert damjuulj tend hadgalna.
       var item = financeController.addItem(input.type, input.description, input.value);

       //3. Olj avsan datanuudaa web deeree tohiroh hesegt gargana.
       uiController.addListItem(item, input.type);
       uiController.clearFields();

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