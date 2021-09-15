//UI controller
var uiController = (function() {
    var x = 100;
    function add(y) {
        return x + y;
    }
    return {
        publicAdd: function(a) {
            a = add(a);
            console.log('Analyzed data : ' + a);
        }
    }
})();


var financeController = (function() {
    console.log('Hello');
})();

//Connector controller
var appController = (function(uiCtrl,fnCtrl) {

    var ctrlAddItem = function() {
        //1. Oruulah data-g ui-s olj avna.
        console.log("Delgetsees datagaa avah heseg");
        //2. Data-gaa financeController-t damjuulj hadgalna.

        //3. Data-g web-iin torhiroh hesegt gargana.

        //4. Calculate budget

        //5. Show Final balance in the display.
    };
    
    document.querySelector(".add__btn").addEventListener("click", function() {
        ctrlAddItem();
    });

    document.addEventListener("keypress", function(event) {
        if(event.keyCode === 13 | event.which === 13) {
            ctrlAddItem(); //event.which -- in old browsers
        } 
    });
})(uiController, financeController);


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
