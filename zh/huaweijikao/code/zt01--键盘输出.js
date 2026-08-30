// 键盘输出
function ZT01() {
    let screen = "";
    let choose = "";
    let jianQie = "";
    function main(input) {
        let strArr = input.split(" ")
        for (int i = 0; i < strArr.length; i++) {
            operate(strArr[i]);
        }
        return screen.length
    }//a

   function operate(str){
        if (str === 'a'){//a screen输入一个a
            if (choose.equals("")){
                screen += "a";
            }else {
                choose = "";
                screen = "a";
            }
            return;
        }
        if (str === 'ctrl-c'){//ctrl-c
            jianQie = choose;
            return;
        }
        if (str == 'ctrl-x'){//ctrl-x
            jianQie = choose;
            choose = "";
            screen = "";
            return;
        }
        if (str === 'ctrl-v'){//ctrl-v
            if (choose.equals("")){
                screen += jianQie;
            }else {
                screen = jianQie;
                choose = "";
            }
            return;
        }
        if (str === 'ctrl-a'){//ctrl-a
            choose = screen;
        }
    }
}
