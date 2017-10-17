

/**

draw()
init()
personInput()
computerInput()
check()
win()
lose()



**/

var data;


function draw(){
  var table = '<table id="xox_table" border="1">';
    for(var i = 0; i < 3; i++) {
        table += '<tr>';
        for(var j = 0; j < 3; j++) {
           table += '<td id="'+i+'_'+j+'">&nbsp;</td>'; 
        }
        table += '</tr>';
    }
   table += '</table>';  
   $('#xox').html(table);
}

function random(limit){
    return Math.floor(Math.random()* limit);
}

function check(){
    var success = [[[0,0],[0,1],[0,2]],
                   [[1,0],[1,1],[1,2]],
                   [[2,0],[2,1],[2,2]],
                   [[0,0],[1,0],[2,0]],
                   [[0,0],[1,0],[2,0]],
                   [[1,1],[2,1],[2,1]],
                   [[0,2],[1,2],[2,2]],
                   [[0,0],[1,1],[2,2]],
                   [[0,2],[1,1],[2,0]],
                  ];
    var countForX, countForY;
    outerLoop:for(var i = 0; i < success.length; i++) {
       countForX = 0;
       countForY = 0;
       for(var j = 0; j < success[i].length; j++) {
          for(var k = 0; k < 1; k++) {
             if(data[success[i][j][0]][success[i][j][1]] === 'X'){
                 countForX++;
                 if(countForX === 3) { break outerLoop; } 
             } else { countForX = 0; }
             if(data[success[i][j][0]][success[i][j][1]] === 'O'){
                 countForY++;
                 if(countForY === 3) { break outerLoop; } 
             } else { countForY = 0; }
          } 
       }
    }

    if(countForX === 3) {
        var devam = confirm("Tebrikler kazandiniz yeniden oynamak istermisiniz?");
        if(devam){
            init();
        }
    }
    if(countForY === 3) {
        var devam = confirm("Kaybettiniz yeniden oynamak istermisiniz?");
        if(devam){
            init();
        }
    }
      
}

function computerInput(){
    var emptyCells = [];
    for(var i = 0; i < 3; i++) {
        for(var j = 0; j < 3; j++) { 
           if(!data[i][j]){
              emptyCells.push([i,j]);
           }
        }
    }
    var cellId = emptyCells[random(emptyCells.length)];
    data[cellId[0]][cellId[1]] = 'O';
    $("#" + cellId[0]+'_'+cellId[1]).html('O');
    check();
}

function setListeners(){
    $('#xox_table td').on('click', function(e){
        var id = e.target.id;
        // console.log('id', id);
        var coordinates = id.split('_');
        var x = coordinates[0];
        var y = coordinates[1];
        data[x][y] = 'X';
        $('#'+ id).html('X');
        check();
        setTimeout(computerInput, 1000);
    })
}

function init(){
    draw();
    setListeners();
    data = [[],[],[]];
}

init();

