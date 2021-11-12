// Ð”ÑÐ»Ð³ÑÑ†Ñ‚ÑÐ¹ Ð°Ð¶Ð¸Ð»Ð»Ð°Ñ… ÐºÐ¾Ð½Ñ‚Ñ€Ð¾Ð»Ð»ÐµÑ€
var uiController = (function() {
    var DOMstrings = {
      inputType: ".add__type",
      inputDescription: ".add__description",
      inputValue: ".add__value",
      addBtn: ".add__btn",
      incomeList: ".income__list",
      expenseList: ".expenses__list",
      tusuvLabel: ".budget__value",
      incomeLabel: ".budget__income--value",
      expeseLabel: ".budget__expenses--value",
      percentageLabel: ".budget__expenses--percentage",
      containerDiv: ".container",
      expensePercentageLabel: ".item__percentage"
    };

    var nodeListForEach = function(list, callback) {
        for(var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };
  
    return {
      getInput: function() {
        return {
          type: document.querySelector(DOMstrings.inputType).value, // exp, inc
          description: document.querySelector(DOMstrings.inputDescription).value,
          value: parseInt(document.querySelector(DOMstrings.inputValue).value)
        };
      },

      displayPercentages: function(allPercentages) {
          //Expensiin node(DOM-iin neg tag) listiig oloh
        var elements = document.querySelectorAll(DOMstrings.expensePercentageLabel);

        // elements bolgonii huvid expense percentages-iig array-s avch shivj oruulah
        nodeListForEach(elements, function(el, index) {
            el.textContent = allPercentages[index];
        });
      },
  
      getDOMstrings: function() {
        return DOMstrings;
      },
  
      clearFields: function() {
        var fields = document.querySelectorAll(
          DOMstrings.inputDescription + ", " + DOMstrings.inputValue
        );
  
        // Convert List to Array
        var fieldsArr = Array.prototype.slice.call(fields);
  
        fieldsArr.forEach(function(el, index, array) {
          el.value = "";
        });
  
        fieldsArr[0].focus();
      },
  
      tusviigUzuuleh: function(tusuv) {
        document.querySelector(DOMstrings.tusuvLabel).textContent = tusuv.tusuv;
        document.querySelector(DOMstrings.incomeLabel).textContent =
          tusuv.totalInc;
        document.querySelector(DOMstrings.expeseLabel).textContent =
          tusuv.totalExp;
  
        if (tusuv.huvi !== 0) {
          document.querySelector(DOMstrings.percentageLabel).textContent =
            tusuv.huvi + "%";
        } else {
            document.querySelector(DOMstrings.percentageLabel).textContent =
            tusuv.huvi;
        }
      },
  
      deleteListItem: function(id) {
        var el = document.getElementById(id);
        el.parentNode.removeChild(el);
      },
  
      addListItem: function(item, type) {
        // ÐžÑ€Ð»Ð¾Ð³Ð¾ Ð·Ð°Ñ€Ð»Ð°Ð³Ñ‹Ð½ ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚Ð¸Ð¹Ð³ Ð°Ð³ÑƒÑƒÐ»ÑÐ°Ð½ html-Ð¸Ð¹Ð³ Ð±ÑÐ»Ñ‚Ð³ÑÐ½Ñ.
        var html, list;
        if (type === "inc") {
          list = DOMstrings.incomeList;
          html =
            '<div class="item clearfix" id="inc-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete">            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div>        </div></div>';
        } else {
          list = DOMstrings.expenseList;
          html =
            '<div class="item clearfix" id="exp-%id%"><div class="item__description">$$DESCRIPTION$$</div>          <div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn">                <i class="ion-ios-close-outline"></i></button></div></div></div>';
        }
        // Ð¢ÑÑ€ HTML Ð´Ð¾Ñ‚Ñ€Ð¾Ð¾ Ð¾Ñ€Ð»Ð¾Ð³Ð¾ Ð·Ð°Ñ€Ð»Ð°Ð³Ñ‹Ð½ ÑƒÑ‚Ð³ÑƒÑƒÐ´Ñ‹Ð³ REPLACE Ð°ÑˆÐ¸Ð³Ð»Ð°Ð¶ Ó©Ó©Ñ€Ñ‡Ð¸Ð»Ð¶
        html = html.replace("%id%", item.id);
        html = html.replace("$$DESCRIPTION$$", item.description);
        html = html.replace("$$VALUE$$", item.value);
  
        // Ð‘ÑÐ»Ñ‚Ð³ÑÑÑÐ½ HTML ÑÑ DOM Ñ€ÑƒÑƒ Ñ…Ð¸Ð¹Ð¶ Ó©Ð³Ð½Ó©.
        document.querySelector(list).insertAdjacentHTML("beforeend", html);
      }
    };
  })();
  





  // Ð¡Ð°Ð½Ñ…Ò¯Ò¯Ñ‚ÑÐ¹ Ð°Ð¶Ð¸Ð»Ð»Ð°Ñ… ÐºÐ¾Ð½Ñ‚Ñ€Ð¾Ð»Ð»ÐµÑ€
  var financeController = (function() {
    // private data
    var Income = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    };
  
    // private data
    var Expense = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
      this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalInc) {
        if(totalInc > 0) {
            this.percentage = Math.round((this.value / totalInc) * 100);
        } else this.percentage = 0;
    };

    Expense.prototype.getPercentage = function(totalInc) {
        return this.percentage;
    };
  
    var calculateTotal = function(type) {
      var sum = 0;
      data.items[type].forEach(function(el) {
        sum = sum + el.value;
      });
  
      data.totals[type] = sum;
    };
  
    // private data
    var data = {
      items: {
        inc: [],
        exp: []
      },
  
      totals: {
        inc: 0,
        exp: 0
      },
  
      tusuv: 0,
  
      huvi: 0
    };
  
    return {
      tusuvTootsooloh: function() {
        // ÐÐ¸Ð¹Ñ‚ Ð¾Ñ€Ð»Ð¾Ð³Ñ‹Ð½ Ð½Ð¸Ð¹Ð»Ð±ÑÑ€Ð¸Ð¹Ð³ Ñ‚Ð¾Ð¾Ñ†Ð¾Ð¾Ð»Ð½Ð¾
        calculateTotal("inc");
  
        // ÐÐ¸Ð¹Ñ‚ Ð·Ð°Ñ€Ð»Ð°Ð³Ñ‹Ð½ Ð½Ð¸Ð¹Ð»Ð±ÑÑ€Ð¸Ð¹Ð³ Ñ‚Ð¾Ð¾Ñ†Ð¾Ð¾Ð»Ð½Ð¾
        calculateTotal("exp");
  
        // Ð¢Ó©ÑÐ²Ð¸Ð¹Ð³ ÑˆÐ¸Ð½ÑÑÑ€ Ñ‚Ð¾Ð¾Ñ†Ð¾Ð¾Ð»Ð½Ð¾
        data.tusuv = data.totals.inc - data.totals.exp;

        if(data.totals.inc > 0) {
            // ÐžÑ€Ð»Ð¾Ð³Ð¾ Ð·Ð°Ñ€Ð»Ð°Ð³Ñ‹Ð½ Ñ…ÑƒÐ²Ð¸Ð¹Ð³ Ñ‚Ð¾Ð¾Ñ†Ð¾Ð¾Ð»Ð½Ð¾
            data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100); 
        } else data.huvi = 0;
      },
  
      tusviigAvah: function() {
        return {
          tusuv: data.tusuv,
          huvi: data.huvi,
          totalInc: data.totals.inc,
          totalExp: data.totals.exp
        };
      },
  
      deleteItem: function(type, id) {
        var ids = data.items[type].map(function(el) {
          return el.id;
        });
  
        var index = ids.indexOf(id);
  
        if (index !== -1) {
          data.items[type].splice(index, 1);
        }
      },
  
      addItem: function(type, desc, val) {
        var item, id;
  
        if (data.items[type].length === 0) id = 1;
        else {
          id = data.items[type][data.items[type].length - 1].id + 1;
        }
  
        if (type === "inc") {
          item = new Income(id, desc, val);
        } else {
          item = new Expense(id, desc, val);
        }
  
        data.items[type].push(item);
  
        return item;
      },

      calculatePercentages: function() {
        data.items.exp.forEach(function(el) {
            el.calcPercentage(data.totals.inc);
        });
      },

      getPercentages: function() {
          var allPercentages = data.items.exp.map(function(el) {
            return el.getPercentage();
          });

          return allPercentages;
      },
  
      seeData: function() {
        return data;
      }
    };
  })();





  
  // ÐŸÑ€Ð¾Ð³Ñ€Ð°Ð¼Ñ‹Ð½ Ñ…Ð¾Ð»Ð±Ð¾Ð³Ñ‡ ÐºÐ¾Ð½Ñ‚Ñ€Ð¾Ð»Ð»ÐµÑ€
  var appController = (function(uiController, financeController) {
    var ctrlAddItem = function() {
      // 1. ÐžÑ€ÑƒÑƒÐ»Ð°Ñ… Ó©Ð³Ó©Ð³Ð´Ð»Ð¸Ð¹Ð³ Ð´ÑÐ»Ð³ÑÑ†ÑÑÑ Ð¾Ð»Ð¶ Ð°Ð²Ð½Ð°.
      var input = uiController.getInput();
  
      if (input.description !== "" && input.value !== "") {
        // 2. ÐžÐ»Ð¶ Ð°Ð²ÑÐ°Ð½ Ó©Ð³Ó©Ð³Ð´Ð»Ò¯Ò¯Ð´ÑÑ ÑÐ°Ð½Ñ…Ò¯Ò¯Ð³Ð¸Ð¹Ð½ ÐºÐ¾Ð½Ñ‚Ñ€Ð¾Ð»Ð»ÐµÑ€Ñ‚ Ð´Ð°Ð¼Ð¶ÑƒÑƒÐ»Ð¶ Ñ‚ÑÐ½Ð´ Ñ…Ð°Ð´Ð³Ð°Ð»Ð½Ð°.
        var item = financeController.addItem(
          input.type,
          input.description,
          input.value
        );
  
        // 3. ÐžÐ»Ð¶ Ð°Ð²ÑÐ°Ð½ Ó©Ð³Ó©Ð³Ð´Ð»Ò¯Ò¯Ð´ÑÑ Ð²ÑÐ± Ð´ÑÑÑ€ÑÑ Ñ‚Ð¾Ñ…Ð¸Ñ€Ð¾Ñ… Ñ…ÑÑÑÐ³Ñ‚ Ð½ÑŒ Ð³Ð°Ñ€Ð³Ð°Ð½Ð°
        uiController.addListItem(item, input.type);
        uiController.clearFields();
  
        //Budgetiig shineer tootsoolood ui-d uzuulne.
        updateBudget();
    }
};

        var updateBudget = function() {
            // 4. Ð¢Ó©ÑÐ²Ð¸Ð¹Ð³ Ñ‚Ð¾Ð¾Ñ†Ð¾Ð¾Ð»Ð½Ð¾
            financeController.tusuvTootsooloh();
    
            // 5. Ð­Ñ†ÑÐ¸Ð¹Ð½ Ò¯Ð»Ð´ÑÐ³Ð´ÑÐ»,
            var tusuv = financeController.tusviigAvah();
    
            // 6. Ð¢Ó©ÑÐ²Ð¸Ð¹Ð½ Ñ‚Ð¾Ð¾Ñ†Ð¾Ð¾Ð³ Ð´ÑÐ»Ð³ÑÑ†ÑÐ½Ð´ Ð³Ð°Ñ€Ð³Ð°Ð½Ð°.
            uiController.tusviigUzuuleh(tusuv);

            //7. Percentage-iig tootsoolno.
            financeController.calculatePercentages();

            //8. Elementuudiin tootsoolson huviig huleej avna.
            var allPercentages = financeController.getPercentages();

            //9. Huviig delgetsend gargana.
            uiController.displayPercentages(allPercentages);
    };
  
    var setupEventListeners = function() {
      var DOM = uiController.getDOMstrings();
  
      document.querySelector(DOM.addBtn).addEventListener("click", function() {
        ctrlAddItem();
      });
  
      document.addEventListener("keypress", function(event) {
        if (event.keyCode === 13 || event.which === 13) {
          ctrlAddItem();
        }
      });
  
      document
        .querySelector(DOM.containerDiv)
        .addEventListener("click", function(event) {
          var id = event.target.parentNode.parentNode.parentNode.parentNode.id;
  
          if (id) {
            // inc-2
            var arr = id.split("-");
            var type = arr[0];
            var itemId = parseInt(arr[1]);
  
            console.log(type + " ===> " + itemId);
  
            // 1. Ð¡Ð°Ð½Ñ…Ò¯Ò¯Ð³Ð¸Ð¹Ð½ Ð¼Ð¾Ð´ÑƒÐ»Ð¸Ð°Ñ type, id Ð°ÑˆÐ¸Ð³Ð»Ð°Ð°Ð´ ÑƒÑÑ‚Ð³Ð°Ð½Ð°.
            financeController.deleteItem(type, itemId);
  
            // 2. Ð”ÑÐ»Ð³ÑÑ† Ð´ÑÑÑ€ÑÑÑ ÑÐ½Ñ ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚Ð¸Ð¹Ð³ ÑƒÑÑ‚Ð³Ð°Ð½Ð°
            uiController.deleteListItem(id);
  
            // 3. Ò®Ð»Ð´ÑÐ³Ð´ÑÐ» Ñ‚Ð¾Ð¾Ñ†Ð¾Ð¾Ð³ ÑˆÐ¸Ð½ÑÑ‡Ð¸Ð»Ð¶ Ñ…Ð°Ñ€ÑƒÑƒÐ»Ð½Ð°.
            //Budgetiig shineer tootsoolood ui-d uzuulne.
            updateBudget();
            
          }
        });
    };
  
    return {
      init: function() {
        console.log("Application started...");
        uiController.tusviigUzuuleh({
          tusuv: 0,
          huvi: 0,
          totalInc: 0,
          totalExp: 0
        });
        setupEventListeners();
      }
    };
  })(uiController, financeController);
  
  appController.init();