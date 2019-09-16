define(["@grafana/runtime","@grafana/ui","react"], function(__WEBPACK_EXTERNAL_MODULE__grafana_runtime__, __WEBPACK_EXTERNAL_MODULE__grafana_ui__, __WEBPACK_EXTERNAL_MODULE_react__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./module.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/tslib/tslib.es6.js":
/*!******************************************!*\
  !*** ../node_modules/tslib/tslib.es6.js ***!
  \******************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "./datasource.ts":
/*!***********************!*\
  !*** ./datasource.ts ***!
  \***********************/
/*! exports provided: BoltDatasource, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoltDatasource", function() { return BoltDatasource; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/runtime */ "@grafana/runtime");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var datasourceUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! datasourceUtils */ "./datasourceUtils.ts");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }






var BoltDatasource =
/** @class */
function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](BoltDatasource, _super);

  function BoltDatasource(instanceSettings) {
    var _this = _super.call(this, instanceSettings) || this;

    _this.data = [];
    _this.baseUrl = '';
    _this.anCollection = '';
    _this.rawCollection = '';
    _this.baseUrl = instanceSettings.url;

    if (_this.baseUrl.endsWith('/')) {
      _this.baseUrl = _this.baseUrl.substr(0, _this.baseUrl.length - 1);
    }

    if (instanceSettings.jsonData) {
      _this.anCollection = instanceSettings.jsonData.anCollection;
      _this.rawCollection = instanceSettings.jsonData.rawCollection;
    }

    _this.backendSrv = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])();
    return _this;
  }

  BoltDatasource.prototype.metricFindQuery = function (query) {
    if (!this.anCollection || !this.rawCollection) {
      return [];
    }

    if (query.includes(',')) {
      var queryParams = query.split(',');
      query = queryParams[0];
    }

    var facetFields = query;
    var url = this.baseUrl + '/' + this.anCollection + '/select?q=*:*&facet=true&facet.field=' + facetFields + '&wt=json&rows=0';
    var params = {
      url: url,
      method: 'GET'
    };
    return this.backendSrv.datasourceRequest(params).then(function (response) {
      if (response.status === 200) {
        return datasourceUtils__WEBPACK_IMPORTED_MODULE_3__["Utils"].mapToTextValue(response);
      } else {
        return {
          status: 'error',
          message: 'Error',
          title: 'Error'
        };
      }
    });
  };

  BoltDatasource.prototype.query = function (options) {
    var e_1, _a;

    var _loop_1 = function _loop_1(query) {
      var collection = query.collection;
      var q = query.query;

      if (!q || !collection) {
        return "continue";
      }

      var numRows = ['single', 'facet'].includes(query.queryType) ? 0 : query.numRows;
      var startTime = options.range.from.toISOString();
      var endTime = options.range.to.toISOString();
      var solrQuery = {
        fq: query.timeField + ':[' + startTime + ' TO ' + endTime + ']',
        q: q,
        fl: query.timeField + (query.fl ? ',' + query.fl : ''),
        rows: numRows,
        start: 0,
        sort: query.sortField + ' ' + query.sortOrder,
        getRawMessages: query.queryType === 'table' ? true : false
      };

      if (query.queryType === 'facet' && query.facetQuery) {
        solrQuery['facet'] = true;
        solrQuery['json.facet'] = query.facetQuery.replace('__START_TIME__', startTime).replace('__END_TIME__', endTime);
      }

      var params = {
        url: this_1.baseUrl + '/' + collection + '/select?wt=json',
        method: 'GET',
        params: solrQuery
      };
      return {
        value: this_1.backendSrv.datasourceRequest(params).then(function (response) {
          if (response.status === 200) {
            return datasourceUtils__WEBPACK_IMPORTED_MODULE_3__["Utils"].processResponse(response, query.queryType, query.timeField);
          } else {
            return {
              status: 'error',
              message: 'Error',
              title: 'Error'
            };
          }
        })
      };
    };

    var this_1 = this;

    try {
      for (var _b = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](options.targets), _c = _b.next(); !_c.done; _c = _b.next()) {
        var query = _c.value;

        var state_1 = _loop_1(query);

        if (_typeof(state_1) === "object") return state_1.value;
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  };

  BoltDatasource.prototype.testDatasource = function () {
    var options = {
      url: this.baseUrl,
      method: 'GET'
    };
    return this.backendSrv.datasourceRequest(options).then(function (response) {
      if (response.status === 200) {
        return {
          status: 'success',
          message: 'Data source is working',
          title: 'Success'
        };
      } else {
        return {
          status: 'error',
          message: 'Data source is NOT working',
          title: 'Error'
        };
      }
    })["catch"](function (error) {
      return {
        status: 'success',
        message: 'Data source is working',
        title: 'Success'
      };
    });
  };

  return BoltDatasource;
}(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["DataSourceApi"]);


/* harmony default export */ __webpack_exports__["default"] = (BoltDatasource);

/***/ }),

/***/ "./datasourceUtils.ts":
/*!****************************!*\
  !*** ./datasourceUtils.ts ***!
  \****************************/
/*! exports provided: Utils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Utils", function() { return Utils; });
var Utils =
/** @class */
function () {
  function Utils() {}

  Utils.processResponse = function (response, format, timeField) {
    var data = response.data;
    var seriesList;
    var series = {}; // Process line chart facet response

    if (data.facets && data.facets.lineChartFacet) {
      seriesList = [];
      var jobs = data.facets.lineChartFacet.buckets;
      jobs.forEach(function (job) {
        var jobId = job.val;
        var partFields = job.group.buckets;
        partFields.forEach(function (partField) {
          var partFieldJson = JSON.parse(partField.val);
          var jobIdWithPartField = jobId + '_' + partFieldJson.aggr_field;
          var buckets = partField.timestamp.buckets;
          var actualSeries = [];
          var scoreSeries = [];
          var anomalySeries = [];
          buckets.forEach(function (timeBucket) {
            var d = new Date(timeBucket.val);
            var ts = d.getTime();
            var actual = timeBucket.actual.buckets[0].val;
            var score = timeBucket.score.buckets[0].val;
            var anomaly = timeBucket.anomaly.buckets[0].val;

            if (score >= 1 && anomaly) {
              anomaly = actual;
            } else {
              anomaly = null;
              score = null;
            }

            actualSeries.push([actual, ts]);
            scoreSeries.push([score, ts]);
            anomalySeries.push([anomaly, ts]);
          });
          seriesList.push({
            target: jobIdWithPartField + '_actual',
            datapoints: actualSeries
          });
          seriesList.push({
            target: jobIdWithPartField + '_score',
            datapoints: scoreSeries
          });
          seriesList.push({
            target: jobIdWithPartField + '_anomaly',
            datapoints: anomalySeries
          });
        });
      });
    } else if (data.facets && data.facets.heatMapFacet) {
      seriesList = [];
      var jobs = data.facets.heatMapFacet.buckets;
      jobs.forEach(function (job) {
        var dayBuckets = job.Day0.buckets;
        var seriesData = [];
        dayBuckets.forEach(function (bucket) {
          if (bucket.score != null && bucket.score.score != null) {
            var d = new Date(bucket.val);
            seriesData.push([bucket.score.score, d.getTime()]);
          }
        });
        seriesList.push({
          target: job.val,
          datapoints: seriesData
        });
      });
      seriesList.sort(function (a, b) {
        var totalA = 0;
        var totalB = 0;

        if (a.datapoints && b.datapoints) {
          a.datapoints.map(function (d) {
            totalA += d[0];
          });
          b.datapoints.map(function (d) {
            totalB += d[0];
          });
        } else {
          return 0;
        }

        return totalA - totalB;
      });
    } else if (format === 'table') {
      // Table
      var columns_1 = [];
      var rows_1 = [];
      seriesList = {};
      var index_1 = 0;
      data.response.docs.forEach(function (item) {
        var row = [];

        for (var property in item) {
          // Set columns
          if (index_1 === 0 && item.hasOwnProperty(property)) {
            if (property === timeField) {
              columns_1.push({
                type: 'time',
                text: 'Time'
              });
            } else {
              columns_1.push({
                type: 'string',
                text: property
              });
            }
          } // Set rows


          if (property === timeField) {
            var d = new Date(item[timeField]);
            var ts = d.getTime(); //.unix() * 1000;

            row.push(ts);
          } else {
            row.push(item[property]);
          }
        }

        index_1++;
        rows_1.push(row);
      });
      seriesList = [{
        type: 'table',
        columns: columns_1,
        rows: rows_1
      }];
    } else if (format === 'single') {
      seriesList = [];
      seriesList.push({
        target: 'Number of docs',
        datapoints: [[data.response.numFound, '']]
      });
    } else if (format === 'chart') {
      // Charts
      seriesList = [];
      data.response.docs.forEach(function (item) {
        for (var property in item) {
          if (item.hasOwnProperty(property) && property !== timeField) {
            // do stuff
            if (typeof series[property] === 'undefined') {
              series[property] = [];
            }

            var date = new Date(item[timeField]);
            var ts = date.getTime();
            series[property].push([item[property] || 0, ts]);
          }
        }
      });

      for (var property in series) {
        seriesList.push({
          target: property,
          datapoints: series[property].reverse()
        });
      }
    }

    return {
      data: seriesList
    };
  };

  Utils.mapToTextValue = function (result) {
    if (result.data.collections) {
      return result.data.collections.map(function (collection) {
        return {
          text: collection,
          value: collection
        };
      });
    }

    if (result.data.facet_counts) {
      var ar = [];

      for (var key in result.data.facet_counts.facet_fields) {
        if (result.data.facet_counts.facet_fields.hasOwnProperty(key)) {
          var array = result.data.facet_counts.facet_fields[key];

          for (var i = 0; i < array.length; i += 2) {
            // take every second element
            ar.push({
              text: array[i],
              expandable: false
            });
          }
        }
      }

      return ar;
    }

    if (result.data) {
      return result.data.split('\n')[0].split(',').map(function (field) {
        return {
          text: field,
          value: field
        };
      });
    }
  };

  return Utils;
}();



/***/ }),

/***/ "./module.tsx":
/*!********************!*\
  !*** ./module.tsx ***!
  \********************/
/*! exports provided: BoltConfigControl, plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoltConfigControl", function() { return BoltConfigControl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datasource */ "./datasource.ts");
/* harmony import */ var _queryEditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./queryEditor */ "./queryEditor.tsx");




var BoltConfigControl =
/** @class */
function () {
  function BoltConfigControl() {}

  BoltConfigControl.templateUrl = 'partials/config.html';
  return BoltConfigControl;
}();


var plugin = new _grafana_ui__WEBPACK_IMPORTED_MODULE_0__["DataSourcePlugin"](_datasource__WEBPACK_IMPORTED_MODULE_1__["BoltDatasource"]).setConfigCtrl(BoltConfigControl).setQueryEditor(_queryEditor__WEBPACK_IMPORTED_MODULE_2__["BoltQueryEditor"]);

/***/ }),

/***/ "./queryEditor.tsx":
/*!*************************!*\
  !*** ./queryEditor.tsx ***!
  \*************************/
/*! exports provided: BoltQueryEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoltQueryEditor", function() { return BoltQueryEditor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__);




var BoltQueryEditor =
/** @class */
function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](BoltQueryEditor, _super);

  function BoltQueryEditor(props) {
    var _this = _super.call(this, props) || this;

    _this.onFieldValueChange = function (event, _name) {
      var _a, _b;

      var name = _name ? _name : event.target.name;
      var value = event.target.value;

      _this.setState(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _this.state, (_a = {}, _a[name] = value, _a)));

      var onChange = _this.props.onChange;
      onChange(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _this.props.query, (_b = {}, _b[name] = value, _b)));
    };

    _this.resetFields = function () {
      _this.setState({
        fl: '',
        numRows: 100,
        start: 0,
        facetQuery: '',
        sortField: _this.props.query.timeField,
        sortOrder: 'desc'
      });

      var onChange = _this.props.onChange;
      onChange(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _this.props.query, {
        fl: '',
        numRows: 100,
        start: 0,
        facetQuery: '',
        sortField: _this.props.query.timeField,
        sortOrder: 'desc'
      }));
    };

    var query = _this.props.query.query || '';
    var collection = _this.props.query.collection || '';
    var timeField = _this.props.query.timeField || 'timestamp';
    var fl = _this.props.query.fl || '';
    var queryType = _this.props.query.queryType || 'chart';
    var numRows = _this.props.query.numRows || 100;
    var start = _this.props.query.start || 0;
    var facetQuery = _this.props.query.facetQuery || '';
    var sortField = _this.props.query.sortField || timeField;
    var sortOrder = _this.props.query.sortOrder || 'desc';
    _this.state = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _this.state, {
      query: query,
      collection: collection,
      timeField: timeField,
      fl: fl,
      queryType: queryType,
      numRows: numRows,
      start: start,
      facetQuery: facetQuery,
      sortField: sortField,
      sortOrder: sortOrder
    });
    var onChange = _this.props.onChange;
    onChange(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _this.props.query, _this.state));
    return _this;
  }

  BoltQueryEditor.prototype.render = function () {
    var _this = this;

    var chartTypes = [{
      value: 'chart',
      displayName: 'Chart'
    }, {
      value: 'table',
      displayName: 'Table'
    }, {
      value: 'single',
      displayName: 'Single'
    }, {
      value: 'facet',
      displayName: 'Facet'
    }];
    var _a = this.state,
        query = _a.query,
        collection = _a.collection,
        timeField = _a.timeField,
        fl = _a.fl,
        queryType = _a.queryType,
        numRows = _a.numRows,
        start = _a.start,
        facetQuery = _a.facetQuery,
        sortField = _a.sortField,
        sortOrder = _a.sortOrder;
    var labelWidth = 8; // const facetOptions = [{ value: 'Heat Map', displayName: 'Heatmap' }, { value: 'Line chatrt', displayName: 'Line chart' }];

    var facetOptions = [{
      displayName: 'HeatMap Facet Query',
      value: '{"heatMapFacet":{"numBuckets":true,"offset":0,"limit":10000,"type":"terms","field":"jobId","facet":{"Day0":{"type":"range",' + '"field":"timestamp","start":"__START_TIME__","end":"__END_TIME__","gap":"+1HOUR","facet":{"score":{"type":"query","q":"*:*",' + '"facet":{"score":"max(score_value)"}}}}}}}'
    }, {
      displayName: 'LineChart FacetQuery',
      value: '{"lineChartFacet":{"numBuckets":true,"offset":0,"limit":10,"type":"terms","field":"jobId","facet":{"group":{"numBuckets":true,' + '"offset":0,"limit":10,"type":"terms","field":"partition_fields","sort":"s desc","ss":"sum(s)","facet":{"s":"sum(score_value)",' + '"timestamp":{"type":"terms","limit":-1,"field":"timestamp","sort":"index","facet":{"actual":{"type":"terms","field":"actual_value"}, ' + '"score":{"type":"terms","field":"score_value"},"anomaly":{"type":"terms","field":"is_anomaly"}}}}}}}}'
    }];
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "gf-form-inline"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "gf-form"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormLabel"], {
      width: labelWidth
    }, "Type"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("select", {
      value: queryType,
      onChange: function onChange(event) {
        _this.onFieldValueChange(event, 'queryType'); // this.resetFields();

      }
    }, chartTypes.sort().map(function (c) {
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
        value: c.value
      }, c.displayName);
    }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "gf-form"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormField"], {
      label: "Query",
      type: "text",
      value: query,
      labelWidth: labelWidth,
      width: 4,
      name: "query",
      onChange: this.onFieldValueChange
    })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "gf-form"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormField"], {
      label: "Collection",
      type: "text",
      value: collection,
      labelWidth: labelWidth,
      width: 4,
      name: "collection",
      onChange: this.onFieldValueChange
    })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "gf-form"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormField"], {
      label: "Time Field",
      type: "text",
      value: timeField,
      labelWidth: labelWidth,
      width: 4,
      name: "timeField",
      onChange: this.onFieldValueChange
    }))), queryType === 'facet' && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "gf-form-inline"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "gf-form"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormLabel"], {
      width: labelWidth
    }, "Facet Query"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("select", {
      contentEditable: true,
      value: facetQuery,
      onChange: function onChange(event) {
        return _this.onFieldValueChange(event, 'facetQuery');
      }
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", null), facetOptions.map(function (f) {
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
        value: f.value
      }, f.displayName);
    })))), queryType !== 'facet' && queryType !== 'single' && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "gf-form-inline"
    }, queryType !== 'chart' && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "gf-form"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormField"], {
      label: "Sort",
      type: "text",
      value: sortField,
      labelWidth: labelWidth,
      width: 4,
      name: "sortField",
      onChange: this.onFieldValueChange
    })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "gf-form"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormLabel"], {
      width: labelWidth
    }, "Order"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("select", {
      onChange: function onChange(event) {
        return _this.onFieldValueChange(event, 'sortOrder');
      }
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
      value: "asc",
      selected: sortOrder === 'asc'
    }, "Ascending"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
      value: "desc",
      selected: sortOrder === 'desc'
    }, "Descending")))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "gf-form"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormField"], {
      label: "Out Fields",
      type: "text",
      value: fl,
      labelWidth: labelWidth,
      width: 4,
      name: "fl",
      onChange: this.onFieldValueChange
    })), queryType !== 'single' && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "gf-form"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormField"], {
      label: "Number of rows",
      labelWidth: 10,
      type: "text",
      value: numRows,
      width: 6,
      name: "numRows",
      onChange: this.onFieldValueChange
    })), queryType === 'table' && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "gf-form"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormField"], {
      label: "Start page",
      type: "text",
      value: start,
      labelWidth: labelWidth,
      width: 4,
      name: "start",
      onChange: this.onFieldValueChange
    }))));
  };

  return BoltQueryEditor;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]);



/***/ }),

/***/ "@grafana/runtime":
/*!***********************************!*\
  !*** external "@grafana/runtime" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_runtime__;

/***/ }),

/***/ "@grafana/ui":
/*!******************************!*\
  !*** external "@grafana/ui" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_ui__;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ })

/******/ })});;
//# sourceMappingURL=module.js.map