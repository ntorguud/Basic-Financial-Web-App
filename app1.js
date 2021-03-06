// Ð”ÑÐ»Ð³ÑÑ†Ñ‚ÑÐ¹ Ð°Ð¶Ð¸Ð»Ð»Ð°Ñ… ÐºÐ¾Ð½Ñ‚Ñ€Ð¾Ð»Ð»ÐµÑ€
var uiController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    containerDiv: ".container"
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // exp, inc
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseInt(document.querySelector(DOMstrings.inputValue).value)
      };
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

      // for (var i = 0; i < fieldsArr.length; i++) {
      //   fieldsArr[i].value = "";
      // }
    },

    // budget: data.budget,
    //     percent: data.percent,
    //     totalInc: data.totals.inc,
    //     totalExp = data.totals.exp

    showBudget: function(budget) {
      document.querySelector(DOMstrings.budgetLabel).textContent = budget.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent = budget.totalInc;
      document.querySelector(DOMstrings.expenseLabel).textContent = budget.totalExp;

      if(budget.percent !== 0) {
      document.querySelector(DOMstrings.percentageLabel).textContent = budget.percent + "%";} else {
        document.querySelector(DOMstrings.percentageLabel).textContent = budget.percent;
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

    budget: 0,

    percent: 0
  };

  return {
    calculateBudget: function() {
      calculateTotal('inc');
      calculateTotal('exp');

      //Tusviig shineer tootsoolno.
      data.budget = data.totals.inc - data.totals.exp;

      //Orlogo, zarlagiin percentiig tootsno.
      data.percent = Math.round((data.totals.exp / data.totals.inc) * 100);
    },

    getBudget: function() {
      return {
        budget: data.budget,
        percent: data.percent,
        totalInc: data.totals.inc,
        totalExp = data.totals.exp
      };
    },

    deleteItem: function(type, id) {
      var ids = data.items[type].map(function(el) {
        return el.id;
      });

      var index = ids.indexOf(id);

      if(index !== -1) {
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

      // 4. Ð¢Ó©ÑÐ²Ð¸Ð¹Ð³ Ñ‚Ð¾Ð¾Ñ†Ð¾Ð¾Ð»Ð½Ð¾
      financeController.calculateBudget();

      // 5. Ð­Ñ†ÑÐ¸Ð¹Ð½ Ò¯Ð»Ð´ÑÐ³Ð´ÑÐ», Ñ‚Ð¾Ð¾Ñ†Ð¾Ð¾Ð³ Ð´ÑÐ»Ð³ÑÑ†ÑÐ½Ð´ Ð³Ð°Ñ€Ð³Ð°Ð½Ð°.
      var budget = financeController.getBudget();

      //6. Tusviin tootsoog delgetsend gargah
      uiController.showBudget(budget);
  }
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

    document.querySelector(DOMstrings.containerDiv).addEventListener('click', function(event) {
      
      // console.log(event.target.parentNode.parentNode.parentNode.parentNode.id);  //end Id-tai bgaa
      var id = event.target.parentNode.parentNode.parentNode.parentNode.id;

      if(id) {
        //inc-2
        var arr = id.split("-");
        var type = arr[0];
        var itemId = parseInt(arr[1]);

        //1. FnModule-s type, id ashiglan ustgana.
        financeController.deleteItem(type, itemId);

        //2. UI-s ene elementiig ustgana.
        uiController.deleteListItem(id);

        //3. Uldegdel tootsoog update hiij haruulna.
      }  
    });
  };

  return {
    init: function() {
      console.log("Application started...");
      uiController.showBudget({
        budget: 0,
        percent: 0,
        totalInc: 0,
        totalExp: 0
      });
      setupEventListeners();
    }
  };
})(uiController, financeController);

appController.init();