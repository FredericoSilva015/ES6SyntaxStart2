/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mortgage_js__ = __webpack_require__(1);


document.getElementById('calcBtn').addEventListener('click',  () => {
    let principal = document.getElementById("principal").value;
    let years = document.getElementById("years").value;
    let rate = document.getElementById("rate").value;
    let mortgage = new __WEBPACK_IMPORTED_MODULE_0__mortgage_js__["a" /* default */](principal,years,rate);
    document.getElementById("monthlyPayment").innerHTML = mortgage.monthlyPayment.toFixed(2);
    document.getElementById("monthlyRate").innerHTML = (mortgage.monthlyRate*100).toFixed(2);
    let html = "";
    mortgage.amortization.forEach((year, index) => html += `
            <tr>
            <td>${index + 1}</td>
            <td class="currency">${Math.round(year.principalY)}</td>
            <td class="stretch">
                <div class="flex">
                    <div class="bar principal"
                         style="flex:${year.principalY};-webkit-flex:${year.principalY}">
                    </div>
                    <div class="bar interest"
                         style="flex:${year.interestY};-webkit-flex:${year.interestY}">
                    </div>
                </div>
            </td>
            <td class="currency left">${Math.round(year.interestY)}</td>
            <td class="currency">${Math.round(year.balance)}</td>
        </tr>
        `
    );
    let x = document.createElement("TABLE");
    x.innerHTML = html;
    // console.log(html);
    document.getElementById("amortization").appendChild(x);
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Mortgage {
	constructor(principal,years,rate){
		this.principal = principal;
		this.years = years;
		this.rate = rate;
		this.monthlyRate = this.rate /100/12;
	}
 
	get monthlyPayment() {
		let monthlyRate = this.monthlyRate;
		return this.principal * monthlyRate / (1 - (Math.pow(1/(1+ monthlyRate), this.years * 12)));
	}

	get amortization() {
		let monthlyPayment = this.monthlyPayment;
		let monthlyRate = this.monthlyRate;
		let balance = this.principal;
		let amortization = [];
		for (let y=0; y<this.years; y++) {
            let interestY = 0;
            let principalY = 0;
            for (let m=0; m<12; m++) {
                let interestM = balance * monthlyRate;
                let principalM = monthlyPayment - interestM;
                interestY = interestY + interestM;
                principalY = principalY + principalM;
                balance = balance - principalM;
            }
            amortization.push({principalY, interestY, balance});
        }
        return amortization;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Mortgage;


/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map