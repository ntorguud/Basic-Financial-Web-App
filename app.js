var uiController = (function() {

})();

var financeController = (function() {

})();

var appController = (function(uiController, financeController) {

    var ctrlAddItem = function() {
    
        //1. Oruulah ugugdliig delgetsees olj avna.
        console.log('Delgetsnees ugugdluu avah heseg.');

        //2. Olj avsan ugugdluudee fnCtrl-t damjuulj tend hadgalna.

        //3. Olj avsan datanuudaa webiin tohiroh hesguud deer gargana.

        //4. Tusviig tootsoolno.

        //5. Etssiin uldegdel, tootsoog delgetsend gargana.
    }

    document.querySelector('.add__btn').addEventListener('click', function() {
        ctrlAddItem();
    });

    document.addEventListener('keypress', function(event) {
        if(event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        };
    });
     
})(uiController, financeController);
