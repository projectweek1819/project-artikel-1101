<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.js"></script>
<html>
  <head>
<h2>KANKER BEJEWELED</h2>
  </head>
  <body>
  </body>
</html>

<script>
var cols = 8;
var rows = 8;
var colors = ["red", "green", "blue","purple","orange"];
var position = (0,0)
function setup() {
    createCanvas(900, 900);
    level = createArray(cols, rows);
    insertColors();
    pos(level, position);
    removeChains(level);
}
function draw() {
    background(255);
    createEmptyArray();
    noLoop();
}
function width(level) {
return level[0].length;
}
function height(level) {
return level.length;
}
function createArray(cols, rows) {
    var level = new Array(cols);
    for (var i = 0; i < level.length; i++) {
        level[i] = new Array(rows);
    }
    return level;
}
function insertColors() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            level[i][j] = random(colors);
        }
    }
}
function createEmptyArray() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            var x = i * 100;
            var y = j * 100;
            fill(level[i][j]);
            stroke(30);
            rect(x, y, 100, 100);
        }
    }
}
function pos(level, position)
{
  const { x, y } = position;
     let i;
     for (i = 1; x + i < 8; ++i) {
         if (level[y][x + i] !== level[y][x]) {
             break;
         }
     }
     let j;
     for (j = 1; x - j >= 0; ++j) {
         if (level[y][x - j] !== level[y][x]) {
             break;
         }
     }
     return i + j - 1;
 }
 function verticalChainAt(level, position) {
    const {x, y} = position;
    let i;
    for (i = 1;y + i < 8; ++i) {
        if (level[y+ i][x] !== level[y][x]) {
            break;
        }
    }
    let j;
    for (j = 1; y - j >=0; ++j) {
        if (level[y-j][x] !== level[y][x]) {
            break;
        }
    }
    return i + j - 1 ;
}
function removeChains(level){
    const result = {};
    const positions = [];
    for (let y = 0; y < 8; y++){
        let x = 0;
        while (x < 8){
            const n = pos(level, {x, y});
            if (n >2){
                for ( let i = 0; i !== n; i++){
                    positions.push({x: x + i, y});
                }
            }
            x += n;
        }
    }

    for (let x = 0; x < 8; x++){
        let y = 0;
        while (y < 8){
            const n = verticalChainAt(level, {x, y});
            if (n >2){
                for ( let i = 0; i !== n; i++){
                    positions.push({x, y: y + i});
                }
            }
            y += n;
        }
    }

    for(const position of positions){
        const {x,y} = position;
        const color = level[y][x];
        result[color] = (result[color] || 0 ) + 1;;
    }

    for(const {x,y} of positions){
        level[y][x] = "";
    }
    return result;
}

function collapse(level){
    for (let y = height(level) - 1; y > 0; y--){
        for(let x = 0; x < width(level); x++){
            for (let y = height(level) - 1; y > 0; y--){
                var q = {x, y};
                q.y = y-1;
                if( level[y][x] == ""){
                    swap(level, {x, y}, q);
                }
            }
        }
    }
}
function swap(level,p,q) {
    let temp = level[p.y][p.x];
    level[p.y][p.x] = level[q.y][q.x];
    l[q.y][q.x] = temp;

}


</script>
