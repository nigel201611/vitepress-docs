// N进制减法
function ZT02() {//2 11 1
    function main(str) {
       let strArr = str.split(" ");
        let jin = parseInt(input[0]);
        let numStr = input[1];
        let jianStr = input[2];
        //检查开头
        if (numStr.length != 1 && jianStr.length != 1 && (numStr.startsWith("0") || jianStr.startsWith("0"))){
            return -1;
        }
        //检查结尾
        if (numStr.endsWith("/0")){
            numStr = numStr.substring(0,numStr.length-2);
        }
        if (jianStr.endsWith("/0")){
            jianStr = jianStr.substring(0,jianStr.length-2);
        }
        let no1 = 0;
        let no2 = 0;
        try {
            no1 = parseInt(numStr, jin);
            no2 = parseInt(jianStr, jin);
        }catch (Exception e){
            return -1;
        }

        let res = no1 - no2;
        let flag = 0;
        if (no1 - no2 > 0){
            flag = 0
        }else {
             flag = 1
        }
        return flag + ' '+ String(parseInt(res,jin))
    }
}
