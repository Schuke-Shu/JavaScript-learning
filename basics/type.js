/*
    JavaScript类型分为两类：
    1. 原始类型
       包含数值、字符串、布尔值、null、undefined、Symbol（ES6新增）
    2. 对象类型
       数组、函数和类也是对象类型
 */

// ===========
// ==  数值  ==
// ===========
/*
    js使用数值类型'Number'表示整数和近似实数
    使用 IEEE 754 标准定义的64位浮点格式表示数值，意味着js可以表示的最大整数为【正负1.7976931348623157 * 10^308】，最小整数为【正负5 * 10^-324】
    这种方式可以准确表示 -2^53 ~ 2^53 之间的所有整数（包含边界值），如果超出这个范围可能会损失一定的精度
 */
// ps：js中某些操作是以32位整数计算的（例如数组索引和位操作）

// JavaScript的语句可以使用换行符结尾，也可使用分号结尾

// 整数字面量
console.log(18); // 十进制
console.log(0x12); // 十六进制
// ES6之后可以编写二进制与八进制数
console.log(0o22); // 八进制
console.log(0b00010010); // 二进制
// 数值变量中的字母不区分大小写

// 浮点字面量
// 浮点字面量可以包含小数点，实数由整数部分、小数点、小数部分组成
// 浮点字面量也可以使用指数计数法表示：实数值后面可以跟字母e/E、加号或减号（加号可省略，减号表示指数为负）、整数指数

// 语法：[digits][.digits][(E|e)[(+|-)]digits]
console.log(3.14); // 3.14
console.log(2345.6789); // 2345.6789
console.log(.3333333); // 0.3333333
console.log(6.02e23); // 6.02e+23
console.log(1.4738223E-32); // 1.4738223e-32

// 下划线在数值中没有任何作用，仅用于视觉分隔
// 下划线两边必须都为数字，在十六进制数中 A ~ F 的大小写字母也算数字
console.log(1_2) // 12
num = 0.1_2;
// num = 0._12; // error
// num = 0b_2; // error

// 算术
// js包含+-*/%，ES6新增了**（取幂，等同于^）
console.log(2 ** 3); // 8
// js的Math对象提供了一系列工具函数和常量，支持更复杂的数学计算

// 溢出
// 数值在发生溢出或除以零时不会发生错误，发生上溢出或正整数除以零时结果为无穷值：Infinity，发生下溢出或负整数除以零时结果为负无穷值：-Infinity
console.log(5/0); // Infinity
console.log(-5/0); // -Infinity
// 任何加减乘除无穷值的结果都是无穷值（只可能符号相反）

console.log(0/0); // NaN
// NaN为“非数值”，没有意义
// 无穷除无穷、负数平方根或使用无法转换为数值的非数值作为算术操作符的操作数，结果都为NaN

// Number对象定义了属性用于对应Infinity和NaN
console.log(Number.POSITIVE_INFINITY ===  Infinity); // true
console.log(Number.NEGATIVE_INFINITY ===  -Infinity); // true
console.log(Number.NaN === NaN); // false，NaN与任何值比较都不想等，包括自己
console.log(NaN === NaN);

console.log(isNaN(NaN)); // true
console.log(isFinite(Infinity)); // isFinite()在参数是有限数或可以转换为有限数时返回true
console.log(isFinite(10)); // true

// 负零值与正零值相等（即便使用js的严格相等比较），这意味着除了作为除数使用，几乎无法区分这两个值
zero = 0;
negz = -0;
console.log(zero === negz); // true

// 浮点数精度问题
x = .3 - .2; // 0.09999999999999998
y = .2 - .1; // 0.1
console.log(x === .1); // false
console.log(y === .1); // true
console.log(x === y); // false

// BigInt
// ES2020定义的新的数值类型，可用于表示超大整数（BigInt不适合加密，它没有考虑防止时序攻击）
big = 1234n;                // 定义BigInt类型值，使用后缀'n'（不可以使用N）
console.log(big);           // 输出的值也会带'n'后缀
big = 0b111111n;            // 二进制BigInt
big = 0o7777n;              // 八进制BigInt
big = 0x8000000000000000n;  // 十六进制BigInt
big = 2n ** 63n;              // 64位整数

big = BigInt(Number.MAX_SAFE_INTEGER); // 将常规js数值转换为BigInt
console.log(big);
str = "1" + "0".repeat(100); // 1后跟100个0
BigInt(str); // 10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n

// 算术操作符有一边为BigInt时，另一边也必须是BigInt
// BigInt的除法会舍弃小数
1000n + 2000n;  // 3000n
3000n - 2000n;  // 1000n
2000n * 3000n;  // 6000000n

1n / 2n;        // 0n
3000n / 997n;   // 3n

3000n % 997n;   // 9n
(2n ** 121071n) - 1n; // 39457位数字的梅森素数

// 比较操作符可以不都为BigInt，因为比较时会转换类型
1 < 2n;     // true
2 > 1n;     // true
0 == 0n;    // true
0 === 0n;   // false，===会检查类型是否相等

// ps：位操作通常可以用于BigInt操作数，Math对象的任何函数都不接受BigInt操作数

// 日期和时间
// js定义了Date类，Date是对象，也可用数值表示（1970年1月1日零点至今的毫秒数，也称为时间戳）
console.log(Date.now());        // 当前时间的时间戳（数值）
console.log(now = new Date());  // 当前时间的日期对象
console.log(now.getTime());     // 转换为毫秒时间戳
console.log(now.toISOString()); // 转换为标准格式的字符串