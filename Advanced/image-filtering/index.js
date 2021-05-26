// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function(){
    const $display = $('#display');

    // TODO: Call your apply function(s) here
    //applyFilter(IncreaseGreenbyBlue);
   reddify(rgbNumbers);
   decreaseBlue(rgbNumbers);
   IncreaseGreenbyBlue(rgbNumbers);
   applyFilterNoBackground(reddify);



    render($display, image);
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////
////var rgbString = "rgb(250, 250, 250)";
var rgbNumbers = [250];
// TODO: Create the applyFilter function here

/*var rgbString = ["rgb(150, 150, 150)", "rgb(50, 200, 50)", "rgb(150, 150, 150)"];
//var rgbNumbers = rgbStringToArray(rgbString);'*/
function applyFilter (filterFunction){
    for(var i = 0; i < image.length; i++){
     for (var j = 0; j < image[i].length; j++){
        var rgbString = image[i][j];
        var rgbNumbers = rgbStringToArray(rgbString);
        filterFunction(rgbNumbers);
        var rgbString = rgbArrayToString(rgbNumbers);
        image[i][j] = rgbString;
        }
    }
}


// TODO: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction){
    for(var i = 0; i < image.length; i++){
        if(i != "rgb(250, 250, 250)"){
            applyFilter(filterFunction);
        }
    }
    }

// TODO: Create filter functions
function reddify(array){
    array[RED] = 255;
}
function decreaseBlue(array){
    array[BLUE] = Math.max([BLUE] - 30);
}
function IncreaseGreenbyBlue(array){
    array[GREEN] = Math.min([GREEN] + [BLUE]);
}

// CHALLENGE code goes below here
