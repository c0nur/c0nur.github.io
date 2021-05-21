// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function(){
    const $display = $('#display');

    // TODO: Call your apply function(s) here





    render($display, image);
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO: Create the applyFilter function here
function applyFilter (){

}
for(var i = 0; i < image.length; i++){
    for (var j = 0; j < image[i].length; j++){
        var rgbString = [i][j];
        var rgbNumbers = rgbStringToArray(rgbString);
        filterFunction(rgbNumbers);
        var rgbString = rgbStringToArray(rgbNumbers);
        image[i][j] = rgbString;
    }
}
// TODO: Create the applyFilterNoBackground function


// TODO: Create filter functions


// CHALLENGE code goes below here
