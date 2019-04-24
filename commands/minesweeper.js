async function minesweeper(message) {
    var num_rows = 6;
    var num_cols = 6;
    var num_mines = 5;
    let finalGame = "**MINESWEEPER:**\n";
    var mines = new Array();
    for (var i = 0; i < num_mines; i++) {
        var new_mine = {};
        var new_mine_valid = false;
        while (!new_mine_valid) {
            new_mine.row = Math.floor((Math.random() * num_rows));
            new_mine.col = Math.floor((Math.random() * num_cols));
            new_mine_valid = true;
            for (j = 0; j < mines.length; j++) {
                if ((mines[j].row == new_mine.row) && (mines[j].col == new_mine.col)) new_mine_valid = false;
            }
        }
        mines.push(new_mine);
    }
    console.log(mines);
    for (var r = 0; r < num_rows; r++) {
        for (var c = 0; c < num_cols; c++) {
            var contains_mine = false
            for (j = 0; j < mines.length; j++) {
                if ((mines[j].row == r) && (mines[j].col == c)) contains_mine = true;
            }
            if (contains_mine) {
                finalGame += ' ||:bomb:|| ';
            } else {
                var number = 0;
                for (var a = (r - 1); a <= (r + 1); a++) {
                    for (var b = (c - 1); b <= (c + 1); b++) {
                        for (j = 0; j < mines.length; j++) {
                            if ((mines[j].row == a) && (mines[j].col == b)) number++;
                        }
                    }
                }
                if (number == 0) {
                    finalGame += ' ||:zero:|| ';
                } else {
                    let numberEmoji;
                    switch (number) {
                        case 1: numberEmoji = ":one:"; break;
                        case 2: numberEmoji = ":two:"; break;
                        case 3: numberEmoji = ":three:"; break;
                        case 4: numberEmoji = ":four:"; break;
                    };
                    finalGame += ` ||${numberEmoji}|| `;
                }
            }
        }
        finalGame += "\n";
    }
    message.channel.send(finalGame);
}

module.exports = minesweeper;