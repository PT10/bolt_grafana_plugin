define(["@grafana/data","@grafana/runtime","@grafana/ui","react"], function(__WEBPACK_EXTERNAL_MODULE__grafana_data__, __WEBPACK_EXTERNAL_MODULE__grafana_runtime__, __WEBPACK_EXTERNAL_MODULE__grafana_ui__, __WEBPACK_EXTERNAL_MODULE_react__) { return /******/ (function(modules) { // webpackBootstrap
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

/***/ "./AnnotationQueryEditor.ts":
/*!**********************************!*\
  !*** ./AnnotationQueryEditor.ts ***!
  \**********************************/
/*! exports provided: AnnotationQueryEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnotationQueryEditor", function() { return AnnotationQueryEditor; });
var AnnotationQueryEditor =
/** @class */
function () {
  function AnnotationQueryEditor() {
    this.annotation.queryText = this.annotation.queryText || '';
  }

  AnnotationQueryEditor.templateUrl = 'partials/annotations.editor.html';
  return AnnotationQueryEditor;
}();



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
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "@grafana/data");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/runtime */ "@grafana/runtime");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var datasourceUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! datasourceUtils */ "./datasourceUtils.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 *
 *  Copyright (C) 2019 Bolt Analytics Corporation
 *
 *      Licensed under the Apache License, Version 2.0 (the "License");
 *      you may not use this file except in compliance with the License.
 *      You may obtain a copy of the License at
 *
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 *      Unless required by applicable law or agreed to in writing, software
 *      distributed under the License is distributed on an "AS IS" BASIS,
 *      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *      See the License for the specific language governing permissions and
 *      limitations under the License.
 *
 */



 //import _ from 'lodash';

var BoltDatasource =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(BoltDatasource, _super);

  function BoltDatasource(instanceSettings, $q, templateSrv) {
    var _this = _super.call(this, instanceSettings) || this;

    _this.data = [];
    _this.baseUrl = '';
    _this.anCollection = '';
    _this.jobConfigCollection = '';
    _this.rawCollection = '';
    _this.rawCollectionType = 'single';
    _this.timestampField = 'timestamp';
    _this.anomalyThreshold = 5;
    _this.topN = 10;
    _this.rawCollectionWindow = 1;
    _this.totalCount = undefined;
    _this.facets = {
      aggAnomaly: '{"heatMapFacet":{"numBuckets":true,"offset":0,"limit":__TOPN__,"sort":"s desc","type":"terms","field":"jobId",' + '"facet":{"s":"max(score_value)","Day0":{"type":"range","field":"timestamp","start":"__START_TIME__",' + '"end":"__END_TIME__","gap":"__AGG_INTERVAL__","facet":{"score":{"type":"query","q":"score_value:[__SCORE_THRESHOLD__ TO *]"' + ',"facet":{"severity":{"type":"terms","field":"Severity_s","facet":{"score":"max(score_value)"}}}}}}}}}',

      /*'{"heatMapFacet":{"numBuckets":true,"offset":0,"limit":__TOPN__,"sort":"s desc","type":"terms","field":"jobId",' +
        '"facet":{"s": "max(score_value)", "Day0":{"type":"range",' +
        '"field":"timestamp","start":"__START_TIME__","end":"__END_TIME__","gap":"__AGG_INTERVAL__","facet":{"score":{"type":"query",' +
        '"q":"score_value:[__SCORE_THRESHOLD__ TO *]", "facet":{"score":"max(score_value)"}}}}}}}',*/
      aggAnomalyByPartFields: '{"heatMapByPartFieldsFacet":{"numBuckets":true,"offset":0,"limit":__TOPN__,"type":"terms","field":"jobId","facet":{"partField":' + '{"type":"terms","field":"partition_fields","limit":__TOPN__,"sort":"s desc","facet":{"s":"max(score_value)","Day0":{' + '"type":"range","field":"timestamp","start":"__START_TIME__","end":"__END_TIME__","gap":"__AGG_INTERVAL__","facet":' + '{"score":{"type":"query","q":"score_value:[__SCORE_THRESHOLD__ TO *]","facet":{"score":"max(score_value)","severity":' + '{"type":"terms","field":"Severity_s","facet":{"score":"max(score_value)"}}}}}}}}}}}',

      /*'{"heatMapByPartFieldsFacet":{"numBuckets":true,"offset":0,"limit": __TOPN__,"type":"terms","field":"jobId",' +
        '"facet":{"partField":{"type":"terms","field":"partition_fields","limit": __TOPN__,"sort":"s desc",' +
        '"facet":{"s":"max(score_value)","Day0":{"type":"range","field":"timestamp","start":"__START_TIME__","end":"__END_TIME__",' +
        '"gap":"__AGG_INTERVAL__",' +
        '"facet":{"score":{"type":"query","q":"score_value:[__SCORE_THRESHOLD__ TO *]","facet":{"score":"max(score_value)"}}}}}}}}}',*/
      indvAnomaly: '{"lineChartFacet":{"numBuckets":true,"offset":0,"limit":__TOPN__,"type":"terms","field":"jobId","facet":{"group":{"numBuckets":true,' + '"offset":0,"limit":__TOPN__,"type":"terms","field":"partition_fields","sort":"s desc","ss":"sum(s)","facet":{"s":"max(score_value)",' + '"timestamp":{"type":"terms","limit":-1,"field":"timestamp","facet":{"actual":{"type":"terms","field":"actual_value"}, ' + '"score":{"type":"terms","field":"score_value"},"anomaly":{"type":"terms","field":"is_anomaly"},' + '"expected":{"type":"terms","field":"expected_value"},"severity": {"type": "terms","field": "Severity_s"}}}}}}}}',
      correlation: '{"correlation":{"numBuckets":true,"offset":0,"limit":__TOPN__,"type":"terms","field":"jobId","facet":{"group":{"numBuckets":true,' + '"offset":0,"limit":__TOPN__,"type":"terms","field":"partition_fields","sort":"s desc","ss":"sum(s)","facet":{"s":"sum(score_value)",' + '"timestamp":{"type":"terms","limit":-1,"field":"timestamp","sort":"index","facet":{"actual":{"type":"terms","field":"actual_value"}}}}}}}}'
    };
    _this.stats = {
      metaBar: 'stats=true&stats.field=hourly_avg_0_f&stats.field=hourly_avg_1_f&stats.field=hourly_avg_2_f&stats.field=hourly_avg_3_f&' + 'stats.field=hourly_avg_4_f&stats.field=hourly_avg_5_f&stats.field=hourly_avg_6_f&stats.field=hourly_avg_7_f&' + 'stats.field=hourly_avg_8_f&stats.field=hourly_avg_9_f&stats.field=hourly_avg_10_f&stats.field=hourly_avg_11_f&' + 'stats.field=hourly_avg_12_f&stats.field=hourly_avg_13_f&stats.field=hourly_avg_14_f&stats.field=hourly_avg_15_f&' + 'stats.field=hourly_avg_16_f&stats.field=hourly_avg_17_f&stats.field=hourly_avg_18_f&stats.field=hourly_avg_19_f&' + 'stats.field=hourly_avg_20_f&stats.field=hourly_avg_21_f&stats.field=hourly_avg_22_f&stats.field=hourly_avg_23_f'
    };
    _this.jobIdMappings = {
      dashboards: {},
      panels: {}
    };
    _this.$q = $q;
    _this.templateSrv = templateSrv;
    _this.baseUrl = instanceSettings.url;

    if (_this.baseUrl.endsWith('/')) {
      _this.baseUrl += 'solr';
    } else {
      _this.baseUrl += '/solr';
    }

    if (instanceSettings.jsonData) {
      _this.anCollection = instanceSettings.jsonData.anCollection;
      _this.jobConfigCollection = instanceSettings.jsonData.jobConfigCollection;
      _this.rawCollection = instanceSettings.jsonData.rawCollection;
      _this.timestampField = instanceSettings.jsonData.timestampField;
      _this.rawCollectionType = instanceSettings.jsonData.rawCollectionType;
      _this.rawCollectionWindow = instanceSettings.jsonData.rawCollectionWindow;

      if (instanceSettings.jsonData.anomalyThreshold) {
        _this.anomalyThreshold = instanceSettings.jsonData.anomalyThreshold;
      }

      if (instanceSettings.jsonData.topN) {
        _this.topN = parseInt(instanceSettings.jsonData.topN, 10);
      }
    }

    _this.backendSrv = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])();

    _this.buildValuesMap();

    return _this;
  }

  BoltDatasource.prototype.metricFindQuery = function (query) {
    if (!query || query.length === 0) {
      return Promise.resolve([]);
    }

    var pattern1 = /^getPageCount\(\$(.*),\s*\$(.*)\)$/; //const pattern2 = /^(.*)\((.*):\s*(.*),\s*(.*)\)$/;

    var pattern2 = /^(.*)\((.*)\)$/;
    var matches1 = query.match(pattern1);
    var matches2 = query.match(pattern2);

    if (matches1 && matches1.length === 3) {
      return this.getTotalCount(matches1);
    } else if (matches2) {
      var tokens = matches2[2].split(/,\s*/);
      var queryParts = tokens[0].split(/:\s*/);
      var tokenArr = [];
      tokenArr.push(matches2[0]);
      tokenArr.push(matches2[1]);
      tokenArr.push(queryParts[0]);
      tokenArr.push(queryParts[1]);
      tokenArr.push(tokens[1]);
      var addQuotes = tokens[2] || 'true';
      tokenArr.push(JSON.parse(addQuotes));
      return this.getFields(tokenArr);
    } else {
      return Promise.reject({
        status: 'error',
        message: 'Supported options are: <collection_name>(<filter>,<field_name>) and getPageCount($PageSize, $Search)',
        title: 'Error while adding the variable'
      });
    }
  };

  BoltDatasource.prototype.query = function (options) {
    var _this = this;

    var targetPromises = options.targets.map(function (query) {
      // If user has added page number variable the count is computed in template init (metricFindQuery) No need to fire the Query on solr again
      if (query.queryType === 'count' && _this.totalCount) {
        return Promise.resolve([{
          data: [{
            target: 'Number of docs',
            datapoints: [[_this.totalCount, '']]
          }]
        }]);
      }

      var collection = Object.keys(_this.facets).includes(query.queryType) ? _this.anCollection : ['metaBar', 'metaCp'].includes(query.queryType) ? _this.anCollection : query.collection;

      if (!query.query) {
        return Promise.resolve([]);
      }

      var q = _this.getQueryString(_this.templateSrv.replace(query.query, options.scopedVars)); // Provision for empty series filter


      if (q.match(/AND\s*$/)) {
        q = q.slice(0, q.lastIndexOf('AND'));
      }

      var start = _this.templateSrv.replace(query.start, options.scopedVars);

      var numRows = _this.templateSrv.replace(query.numRows.toString(), options.scopedVars) || 100;

      if (query.queryType === 'chart') {
        numRows = 1000; // Cursor page size
      } else {
        numRows = ['count', 'facet'].includes(query.queryType) ? 0 : numRows;
      }

      numRows = Number(numRows);
      start = numRows * Number(start);
      var startTime = options.range.from.toISOString();
      var endTime = options.range.to.toISOString();
      var solrQueryBody = {};
      solrQueryBody.query = q; // Add basic query fields

      var solrQueryParams = {
        fq: _this.timestampField + ':[' + startTime + ' TO ' + endTime + ']',
        fl: _this.timestampField + (query.fl ? ',' + query.fl : ',*'),
        rows: numRows,
        start: start
      }; // Add fields specific to raw logs and single stat on raw logs

      if (query.queryType === 'rawlogs' || query.queryType === 'count' || query.queryType === 'slowQueries') {
        solrQueryParams['collectionWindow'] = _this.rawCollectionWindow;
        solrQueryParams['startTime'] = startTime;
        solrQueryParams['endTime'] = endTime;
        solrQueryParams['getRawMessages'] = true;
      }

      if (query.queryType === 'slowQueries') {
        solrQueryParams['rex.message.q'] = query.rexQuery;
        solrQueryParams['rex.message.outputfields'] = query.rexOutFields;
      } // Set facet fields for heatmap, linechart and count (only in case of multi collection mode due to plugin numFound limitation)
      // TODO: Find out why numFound is returned only after specifying the facet


      if (query.queryType === 'count' && _this.rawCollectionType === 'multi') {
        solrQueryParams['facet'] = true;
        solrQueryParams['facet.field'] = 'id';
        solrQueryParams['facet.limit'] = 2;
      } else if (Object.keys(_this.facets).includes(query.queryType)) {
        var aggInterval = _this.templateSrv.replace(query.aggInterval, options.scopedVars) || '+1HOUR';
        solrQueryParams['facet'] = true;
        solrQueryParams['json.facet'] = _this.facets[query.queryType].replace('__AGG_INTERVAL__', aggInterval).replace('__START_TIME__', startTime).replace('__END_TIME__', endTime).replace(/__TOPN__/g, _this.topN).replace('__SCORE_THRESHOLD__', _this.anomalyThreshold);
      } else {
        delete solrQueryParams['facet'];
        delete solrQueryParams['json.facet'];
      }

      var statsQueryString = '';

      if (query.queryType === 'metaBar') {
        statsQueryString += 'q=' + q + '&rows=0&fq=' + solrQueryParams['fq'] + '&stats=true&';

        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(Array(24).keys()).forEach(function (hour) {
          if (hour === 23) {
            statsQueryString += 'stats.field=hourly_avg_' + hour + '_f';
          } else {
            statsQueryString += 'stats.field=hourly_avg_' + hour + '_f&';
          }
        });
      } // for cursor to work. Will sort by ts later


      if (query.queryType === 'chart') {
        solrQueryParams['sort'] = 'id asc';
      } else if (query.sortField) {
        solrQueryParams['sort'] = _this.templateSrv.replace(query.sortField, options.scopedVars) + ' ' + _this.templateSrv.replace(query.sortOrder, options.scopedVars);
      }

      var httpOpts = {
        url: _this.baseUrl + '/' + collection + '/select' + (statsQueryString ? '?' + statsQueryString : ''),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        params: statsQueryString ? undefined : solrQueryParams,
        data: statsQueryString ? undefined : JSON.stringify(solrQueryBody)
      };
      var cursor = query.queryType === 'chart' ? '*' : null;
      return _this.sendQueryRequest([], httpOpts, query, startTime, cursor); // cursor mark or charts
    }).values();
    var series = {};
    var resultSeries = [];
    return Promise.all(targetPromises).then(function (responses) {
      responses.forEach(function (resp) {
        resp.forEach(function (r) {
          r.data.forEach(function (s) {
            if (s.type === 'table') {
              resultSeries.push(s);
            } else {
              series[s.target] = !series[s.target] ? s.datapoints : series[s.target].concat(s.datapoints);
            }
          });
        });
      });
      Object.keys(series).forEach(function (key) {
        resultSeries.push({
          target: key,
          datapoints: series[key].sort(function (a, b) {
            return a[1] - b[1];
          })
        });
      });
      var result = {
        data: resultSeries
      };
      return result;
    });
  };

  BoltDatasource.prototype.annotationQuery = function (options) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, Promise, function () {
      var jsonQ, expression, type, variables, solrQueryBody, collection, startTime, endTime, numRows, start, solrQueryParams, httpOpts;
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        jsonQ = JSON.parse(options.annotation.annotationQuery);
        expression = jsonQ.query;
        type = jsonQ.type;
        variables = options.dashboard.getVariables();
        variables.forEach(function (v) {
          var name = v.id;
          var val = v.current.value;
          expression = expression.replace('$' + name, val || '*');
        });
        solrQueryBody = {
          query: this.getQueryString(expression)
        };
        collection = this.anCollection;
        startTime = options.range.from.toISOString();
        endTime = options.range.to.toISOString();
        numRows = 1000;
        start = 0;
        solrQueryParams = {
          fq: this.timestampField + ':[' + startTime + ' TO ' + endTime + ']',
          fl: type === 'changePoints' ? 'changepoint*' : '*',
          rows: numRows,
          start: start,
          sort: 'id asc'
        };
        httpOpts = {
          url: this.baseUrl + '/' + collection + '/select',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          params: solrQueryParams,
          data: JSON.stringify(solrQueryBody)
        };
        return [2
        /*return*/
        , this.processAnnotationsQuery([], httpOpts, type, '*', options.annotation.iconColor)];
      });
    });
  };

  BoltDatasource.prototype.testDatasource = function () {
    var options = {
      url: this.baseUrl + '/' + this.anCollection + '/select?wt=json',
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
        status: 'error',
        message: error.status + ': ' + error.statusText,
        title: 'Error'
      };
    });
  };

  BoltDatasource.prototype.sendQueryRequest = function (respArr, options, query, startTime, cursor) {
    /*params.method = 'POST';
    params.headers = { 'Content-Type': 'application/json' };*/
    var _this = this;

    if (cursor) {
      options.params['cursorMark'] = cursor;
    }

    return this.backendSrv.datasourceRequest(options).then(function (response) {
      if (response.status === 200) {
        var groupMap = _this.jobIdMappings;
        var processedData = datasourceUtils__WEBPACK_IMPORTED_MODULE_3__["Utils"].processResponse(response, _this.timestampField, _this.anomalyThreshold, groupMap, JSON.parse(query.groupEnabled), _this.topN, query, startTime);
        respArr.push(processedData);

        if (cursor && response.data.nextCursorMark && cursor !== response.data.nextCursorMark) {
          return _this.sendQueryRequest(respArr, options, query, startTime, response.data.nextCursorMark);
        } else {
          return respArr;
        }
      } else {
        return Promise.reject([{
          status: 'error',
          message: 'Error',
          title: 'Error'
        }]);
      }
    })["catch"](function (error) {
      return Promise.reject([{
        status: 'error',
        message: error.status + ': ' + error.statusText,
        title: 'Error while accessing data'
      }]);
    });
  };

  BoltDatasource.prototype.processAnnotationsQuery = function (respArr, options, type, cursor, iconColor) {
    var _this = this;

    if (cursor) {
      options.params['cursorMark'] = cursor;
    }

    return this.backendSrv.datasourceRequest(options).then(function (response) {
      var data = datasourceUtils__WEBPACK_IMPORTED_MODULE_3__["Utils"].getAnnotations(response.data.response, type, iconColor);
      respArr.push(data);

      if (cursor && response.data.nextCursorMark && cursor !== response.data.nextCursorMark) {
        return _this.processAnnotationsQuery(respArr, options, type, response.data.nextCursorMark, iconColor);
      } else {
        return respArr;
      }
    })["catch"](function (error) {
      return Promise.reject([{
        status: 'error',
        message: error.status + ': ' + error.statusText,
        title: 'Error while executing annotations query'
      }]);
    });
  };

  BoltDatasource.prototype.getFields = function (matches) {
    var _this = this;

    var collection = matches[1];
    var filterField = matches[2];
    var filterFieldVal = matches[3].replace('$', '');
    var field = matches[4];
    var addQuotes = matches[5];
    var variable = this.templateSrv.variables.find(function (v) {
      return v.name === filterFieldVal;
    });

    if (variable) {
      var resolvedFilterValues = [];

      if (_typeof(variable.current.value) !== 'object') {
        resolvedFilterValues.push(variable.current.value);
      } else {
        resolvedFilterValues = variable.current.value;
      }

      if (resolvedFilterValues[0] === '$__all') {
        if (!variable || !variable.options || variable.options.length < 2) {
          filterFieldVal = '';
        } else {
          var allValues = variable.options.slice(1).map(function (opt) {
            var fieldName = opt.text;

            if (filterField === 'jobId' || filterField === 'jobId_s') {
              Object.keys(_this.jobIdMappings.panels).forEach(function (k) {
                if (_this.jobIdMappings.panels[k] === fieldName) {
                  fieldName = k;
                }
              });
            }

            return fieldName;
          }).join(' OR ');
          filterFieldVal = '(' + allValues + ')';
        }
      } else {
        resolvedFilterValues = resolvedFilterValues.map(function (dashboard) {
          var fieldName = dashboard;

          if (filterField === 'jobId' || filterField === 'jobId_s') {
            Object.keys(_this.jobIdMappings.panels).forEach(function (k) {
              if (_this.jobIdMappings.panels[k] === fieldName) {
                fieldName = k;
              }
            });
          }

          return fieldName;
        });
        filterFieldVal = '(' + resolvedFilterValues.join(' OR ') + ')';
      }
    }

    var url = this.baseUrl + '/' + collection + '/select?facet=true&facet.field=' + field + '&wt=json&rows=0&facet.limit=-1';
    var params = {
      url: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        query: filterField + ': ' + filterFieldVal
      }
    };
    return this.backendSrv.datasourceRequest(params).then(function (response) {
      if (response.status === 200) {
        return datasourceUtils__WEBPACK_IMPORTED_MODULE_3__["Utils"].mapToTextValue(response, addQuotes);
      } else {
        return Promise.reject([{
          status: 'error',
          message: 'Error',
          title: 'Error'
        }]);
      }
    });
  };

  BoltDatasource.prototype.buildValuesMap = function () {
    var _this = this;

    var url = this.baseUrl + '/' + this.jobConfigCollection + '/select?q=jobId:*&fl=jobId,name,searchGroup&rows=10000';
    var params = {
      url: url,
      method: 'GET'
    };
    return this.backendSrv.datasourceRequest(params).then(function (response) {
      if (response.status === 200) {
        _this.jobIdMappings = {
          dashboards: {},
          panels: {}
        };
        response.data.response.docs.forEach(function (doc) {
          if (!doc.searchGroup || !doc.searchGroup[0]) {
            return;
          }

          _this.jobIdMappings.dashboards[doc.jobId] = '"' + doc.searchGroup[0] + '"';
          _this.jobIdMappings.panels[doc.jobId] = '"' + doc.name + '"';
        });
      }
    });
  };

  BoltDatasource.prototype.getTotalCount = function (matches) {
    var _this = this;

    var pageSizeVar = matches[1];
    var searchVar = matches[2];
    var searchQuery = this.templateSrv.variables.find(function (v) {
      return v.name === searchVar;
    });

    if (!searchQuery) {
      this.totalCount = undefined;
      return Promise.reject({
        status: 'error',
        message: '$' + searchVar + ' not found in variables',
        title: 'Error while adding the variable'
      });
    }

    var pageSize = this.templateSrv.variables.find(function (v) {
      return v.name === pageSizeVar;
    });

    if (!pageSize) {
      this.totalCount = undefined;
      return Promise.reject({
        status: 'error',
        message: '$' + pageSizeVar + ' not found in variables',
        title: 'Error while adding the variable'
      });
    }

    var params = {
      q: searchQuery.query,
      rows: 0,
      fq: 'timestamp:[' + this.templateSrv.timeRange.from.toJSON() + ' TO ' + this.templateSrv.timeRange.to.toJSON() + ']',
      getRawMessages: true,
      startTime: this.templateSrv.timeRange.from.toJSON(),
      endTime: this.templateSrv.timeRange.to.toJSON(),
      facet: true,
      'facet.field': 'id',
      'facet.limit': 2
    };
    var options = {
      url: this.baseUrl + '/' + this.rawCollection + '/select?wt=josn',
      method: 'GET',
      params: params
    };
    return this.backendSrv.datasourceRequest(options).then(function (data) {
      _this.totalCount = data.data.response.numFound;
      return datasourceUtils__WEBPACK_IMPORTED_MODULE_3__["Utils"].getFirstAndLastNResults(data, pageSize);
    });
  };

  BoltDatasource.prototype.getQueryString = function (queryStr) {
    var _this = this;

    var q; //const queryStr = this.templateSrv.replace(query, options.scopedVars);

    var matches = queryStr.match(/__dashboard__:\s*(.*)/);

    if (!matches) {
      matches = queryStr.match(/__dashboard_s__:\s*(.*)/);
    }

    var matches2 = queryStr.match(/__panel__:\s*(.*) AND .*/);

    if (!matches2) {
      matches2 = queryStr.match(/__panel_s__:\s*(.*) AND .*/);

      if (!matches2) {
        matches2 = queryStr.match(/__panel__:\s*(.*)/);

        if (!matches2) {
          matches2 = queryStr.match(/__panel_s__:\s*(.*)/);
        }
      }
    }

    if (matches && matches.length === 2) {
      // Dashboard case
      var dahsboardName_1 = matches[1];

      if (dahsboardName_1 === '*') {
        q = queryStr.replace('__dashboard__', 'jobId');
        q = q.replace('__dashboard_s__', 'jobId_s');
      } else if (dahsboardName_1.startsWith('{')) {
        // All option
        var jobIdList_1 = [];
        var dashboards = dahsboardName_1.replace('{', '').replace('}', '').split(',');
        dashboards.forEach(function (dashboard) {
          var jobId = Object.keys(_this.jobIdMappings.dashboards).filter(function (jobId) {
            return _this.jobIdMappings.dashboards[jobId] === dashboard;
          });

          if (jobId) {
            jobId.forEach(function (job) {
              return jobIdList_1.push(job);
            });
          }
        });
        var jobIdStr = '(' + jobIdList_1.join(' OR ') + ')';
        q = queryStr.replace('__dashboard__', 'jobId').replace(dahsboardName_1, jobIdStr);
        q = q.replace('__dashboard_s__', 'jobId_s').replace(dahsboardName_1, jobIdStr);
      } else {
        // particular option
        var jobIdList = Object.keys(this.jobIdMappings.dashboards).filter(function (jobId) {
          return _this.jobIdMappings.dashboards[jobId] === dahsboardName_1;
        });
        var jobIdStr = '( ' + jobIdList.join(' OR ') + ' )';
        q = queryStr.replace('__dashboard__', 'jobId').replace(dahsboardName_1, jobIdStr);
        q = q.replace('__dashboard_s__', 'jobId_s').replace(dahsboardName_1, jobIdStr);
      }

      q = datasourceUtils__WEBPACK_IMPORTED_MODULE_3__["Utils"].queryBuilder(q);
    } else if (matches2 && matches2.length === 2) {
      // Panel case
      var panelName_1 = matches2[1];

      if (panelName_1 === '*') {
        q = queryStr.replace('__panel__', 'jobId');
        q = queryStr.replace('__panel_s__', 'jobId_s');
      } else if (panelName_1.startsWith('{')) {
        // All option
        var jobIdList_2 = [];
        var panels = panelName_1.replace('{', '').replace('}', '').split(',');
        panels.forEach(function (panel) {
          var jobId = Object.keys(_this.jobIdMappings.panels).filter(function (jobId) {
            return _this.jobIdMappings.panels[jobId] === panel;
          });

          if (jobId) {
            jobIdList_2.push(jobId);
          }
        });
        var jobIdStr = '(' + jobIdList_2.join(' OR ') + ')';
        q = queryStr.replace('__panel__', 'jobId').replace(panelName_1, jobIdStr);
        q = q.replace('__panel_s__', 'jobId_s').replace(panelName_1, jobIdStr);
      } else {
        // particular option
        var jobIdList = Object.keys(this.jobIdMappings.panels).filter(function (jobId) {
          return _this.jobIdMappings.panels[jobId] === panelName_1;
        });
        var jobIdStr = '( ' + jobIdList.join(' OR ') + ' )';
        q = queryStr.replace('__panel__', 'jobId').replace(panelName_1, jobIdStr);
        q = q.replace('__panel_s__', 'jobId_s').replace(panelName_1, jobIdStr);
      }

      q = datasourceUtils__WEBPACK_IMPORTED_MODULE_3__["Utils"].queryBuilder(q);
    } else {
      q = datasourceUtils__WEBPACK_IMPORTED_MODULE_3__["Utils"].queryBuilder(queryStr);
    }

    return q;
  };

  return BoltDatasource;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["DataSourceApi"]);


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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");

/*
 *
 *  Copyright (C) 2019 Bolt Analytics Corporation
 *
 *      Licensed under the Apache License, Version 2.0 (the "License");
 *      you may not use this file except in compliance with the License.
 *      You may obtain a copy of the License at
 *
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 *      Unless required by applicable law or agreed to in writing, software
 *      distributed under the License is distributed on an "AS IS" BASIS,
 *      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *      See the License for the specific language governing permissions and
 *      limitations under the License.
 *
 */

var Utils =
/** @class */
function () {
  function Utils() {}

  Utils.processResponse = function (response, timeField, anomalyThreshold, groupMap, grouppingEmabled, topN, query, startTime) {
    var _this = this;

    var indvAnOutField = query.indvAnOutField;
    var correlationMetric = query.baseMetric;
    var format = query.queryType;
    var data = response.data;
    var seriesList;
    var series = {}; // Process line chart facet response

    if (data.facets && data.facets.lineChartFacet) {
      seriesList = [];
      var sortBaselineSeries_1 = [];
      var jobs = data.facets.lineChartFacet.buckets;
      var prefix_1 = false;
      jobs.forEach(function (job) {
        var partFields = job.group.buckets;

        if (partFields.length > 1) {
          prefix_1 = true;
        }

        partFields.forEach(function (partField) {
          var dashboardName = groupMap.dashboards[job.val] ? groupMap.dashboards[job.val] + '_' : '';
          var panelName = groupMap.panels[job.val] ? groupMap.panels[job.val] : '';
          var jobIdWithPartField = dashboardName + panelName;
          var partFieldJson = JSON.parse(partField.val);
          Object.keys(partFieldJson).forEach(function (key) {
            if (key === 'aggr_field') {
              return;
            }

            jobIdWithPartField += '_' + key + '_' + partFieldJson[key];
          });
          jobIdWithPartField += '_' + partFieldJson.aggr_field;

          if (jobIdWithPartField.startsWith('_')) {
            jobIdWithPartField = jobIdWithPartField.slice(1);
          }

          var buckets = partField.timestamp.buckets;
          var actualSeries = [];
          var scoreSeries = [];
          var anomalySeries = [];
          var expectedSeries = [];
          buckets.forEach(function (timeBucket) {
            var d = new Date(timeBucket.val);
            var ts = d.getTime();
            var severity = timeBucket.severity.buckets[0].val;
            var actual = timeBucket.actual.buckets[0].val;
            var score = timeBucket.score.buckets[0].val;
            var anomaly = timeBucket.anomaly.buckets[0].val;
            var expected = timeBucket.expected.buckets[0].val;

            if (['Critical', 'Warning'].includes(severity) && score >= anomalyThreshold && anomaly) {
              anomaly = actual;
            } else {
              anomaly = null;
              score = null;
            }

            actualSeries.push([actual, ts]);
            scoreSeries.push([score, ts]);
            anomalySeries.push([anomaly, ts]);
            expectedSeries.push([expected, ts]);
          });
          seriesList.push({
            target: prefix_1 ? jobIdWithPartField + ' actual' : 'actual',
            datapoints: actualSeries
          });
          seriesList.push({
            target: prefix_1 ? jobIdWithPartField + ' score' : 'score',
            datapoints: scoreSeries
          }); //Sort baseline is score value.

          sortBaselineSeries_1.push({
            target: jobIdWithPartField,
            datapoints: scoreSeries
          });
          seriesList.push({
            target: prefix_1 ? jobIdWithPartField + ' anomaly' : 'anomaly',
            datapoints: anomalySeries
          });
          seriesList.push({
            target: prefix_1 ? jobIdWithPartField + ' expected' : 'expected',
            datapoints: expectedSeries
          });
        });
      });
      sortBaselineSeries_1 = this.sortList(sortBaselineSeries_1, topN);
      seriesList = this.getSortedSeries(seriesList, sortBaselineSeries_1, indvAnOutField, prefix_1);
    } else if (data.facets && data.facets.correlation) {
      seriesList = [];
      var jobs = data.facets.correlation.buckets;
      var baseline_1 = []; // Find baseline series and populate base metric

      jobs.forEach(function (job) {
        if (job.val === correlationMetric) {
          var partFields = job.group.buckets;
          partFields.forEach(function (partField) {
            var partFieldJson = JSON.parse(partField.val);
            var jobIdWithPartField = partFieldJson.aggr_field;
            var buckets = partField.timestamp.buckets;
            var actualSeries = [];
            buckets.forEach(function (timeBucket) {
              var d = new Date(timeBucket.val);
              var ts = d.getTime();
              var actual = timeBucket.actual.buckets[0].val;
              actualSeries.push([actual, ts]);
              baseline_1.push(actual);
            });
            seriesList.push({
              target: jobIdWithPartField,
              datapoints: actualSeries
            });
          });
        }
      });
      baseline_1 = Utils.getStdDev(baseline_1); // Populate other metrics and find deviation from baseline

      jobs.forEach(function (job) {
        if (job.val !== correlationMetric) {
          var partFields = job.group.buckets;
          partFields.forEach(function (partField) {
            var partFieldJson = JSON.parse(partField.val);
            var jobIdWithPartField = partFieldJson.aggr_field;
            var buckets = partField.timestamp.buckets;
            var actualSeries = [];
            var compare = [];
            buckets.forEach(function (timeBucket) {
              var d = new Date(timeBucket.val);
              var ts = d.getTime();
              var actual = timeBucket.actual.buckets[0].val;
              compare.push(actual);
              actualSeries.push([actual, ts]);
            });
            compare = Utils.getStdDev(compare);

            var dev = _this.findCorrelation(baseline_1, compare);

            seriesList.push({
              target: jobIdWithPartField + ': ' + dev.toFixed(3),
              datapoints: actualSeries
            });
          });
        }
      });
    } else if (data.facets && data.facets.heatMapByPartFieldsFacet) {
      // Heatmap
      seriesList = [];
      var jobs = data.facets.heatMapByPartFieldsFacet.buckets;
      var prefix_2 = false;
      var groupNames = jobs.map(function (job) {
        return groupMap.dashboards[job.val];
      });
      prefix_2 = !groupNames.every(function (val, i, arr) {
        return val === arr[0];
      }); // If all groups are same don't prefix

      jobs.forEach(function (job) {
        var partBuckets = job.partField.buckets;
        partBuckets.forEach(function (partField) {
          var score = partField.s;
          var dayBuckets = partField.Day0.buckets;

          var seriesData = _this.getSeriesData(dayBuckets); // Derive series name from part fields


          var partFieldJson = JSON.parse(partField.val);
          var dashboardName = groupMap.dashboards[job.val] ? groupMap.dashboards[job.val] + '_' : '';
          var panelName = groupMap.panels[job.val] ? groupMap.panels[job.val] : '';
          var seriesName = prefix_2 ? dashboardName + panelName : '';
          Object.keys(partFieldJson).forEach(function (key) {
            if (key === 'aggr_field') {
              return;
            }

            seriesName += '_' + key + '_' + partFieldJson[key];
          });
          seriesName += '_' + partFieldJson.aggr_field;

          if (seriesName.startsWith('_')) {
            seriesName = seriesName.slice(1);
          }

          seriesList.push({
            target: seriesName,
            datapoints: seriesData,
            score: score
          });
        });
      });
      seriesList = this.sortList(seriesList, topN).reverse(); // reverse because heatmap starts from bottom
    } else if (data.facets && data.facets.heatMapFacet) {
      // Heatmap
      seriesList = [];
      var jobs = data.facets.heatMapFacet.buckets;
      var prefix_3 = false;
      var groupNames = jobs.map(function (job) {
        return groupMap.dashboards[job.val];
      });
      prefix_3 = !groupNames.every(function (val, i, arr) {
        return val === arr[0];
      }); // If all groups are same don't prefix

      jobs.forEach(function (job) {
        var dayBuckets = job.Day0.buckets;

        var seriesData = _this.getSeriesData(dayBuckets);

        var dashboardName = groupMap.dashboards[job.val] ? groupMap.dashboards[job.val] + '_' : '';
        var panelName = groupMap.panels[job.val] ? groupMap.panels[job.val] : '';
        var targetName = prefix_3 ? dashboardName + panelName : panelName;
        seriesList.push({
          jobId: job.val,
          target: targetName !== '' ? targetName : job.val,
          datapoints: seriesData
        });
      });

      if (grouppingEmabled) {
        seriesList = Utils.getGrouppedResults(seriesList, groupMap);
      }

      seriesList = this.sortList(seriesList).reverse(); // reverse because heatmap starts from bottom
    } else if (format === 'rawlogs' || format === 'slowQueries') {
      // Table
      var columns_1 = [];
      var rows_1 = [];
      seriesList = {};
      var index_1 = 0;

      if (data && data.response && data.response.docs) {
        data.response.docs.forEach(function (item) {
          var row = [];

          for (var property in item) {
            // Set columns
            if (index_1 === 0 && item.hasOwnProperty(property)) {
              if (property === timeField) {
                columns_1.unshift({
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

              row.unshift(ts);
            } else {
              row.push(item[property]);
            }
          }

          index_1++;
          rows_1.push(row);
        });
      }

      seriesList = [{
        type: 'table',
        columns: columns_1,
        rows: rows_1
      }];
    } else if (format === 'count') {
      seriesList = [];
      var numResults = data && data.response && data.response.numFound ? data.response.numFound : 0;
      seriesList.push({
        target: 'Number of docs',
        datapoints: [[numResults, '']]
      });
    } else if (format === 'chart') {
      // Charts
      seriesList = [];
      data.response.docs.forEach(function (item) {
        for (var property in item) {
          if (item.hasOwnProperty(property) && property !== timeField) {
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
          datapoints: series[property].sort(function (a, b) {
            return a[1] - b[1];
          })
        });
      }
    } else if (format === 'metaBar') {
      var field_1 = query.metaBarAggrField || 'mean';
      var statsData_1 = data.stats;
      seriesList = [];
      var pointsMap_1 = {};
      Object.keys(statsData_1.stats_fields).forEach(function (key) {
        var matches = key.match(/hourly_avg_(\d+)_f/);

        if (matches && matches.length > 1) {
          var val = statsData_1.stats_fields[key][field_1];
          pointsMap_1[matches[1]] = [val, new Date(startTime)];
        }
      });
      Object.keys(pointsMap_1).forEach(function (hour) {
        seriesList.push({
          target: hour,
          datapoints: [pointsMap_1[hour]]
        });
      });
    } else if (format === 'metaCp') {
      seriesList = [];
      var columns = [{
        type: 'string',
        text: 'Time Range'
      }, {
        type: 'string',
        text: 'Mean'
      }];
      var rows_2 = [];
      data.response.docs.forEach(function (doc) {
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(Array(1440).keys()).every(function (ind) {
          var row = [];
          var cpStartKey = 'changepoint_start_' + ind + '_dt';
          var cpEndKey = 'changepoint_end_' + ind + '_dt';
          var cpValueKey = 'changepoint_mean_' + ind + '_f';

          if (doc[cpStartKey] && doc[cpEndKey]) {
            row.push(doc[cpStartKey] + ' - ' + doc[cpEndKey]);
          }

          if (doc[cpValueKey] || doc[cpValueKey] === 0) {
            row.push(doc[cpValueKey]);
          }

          if (row.length > 0) {
            rows_2.push(row);
            return true;
          }

          return false;
        });
      });
      rows_2 = rows_2.sort(function (r1, r2) {
        return r1[0] < r2[0] ? -1 : r1[0] > r2[0] ? 1 : 0;
      });
      seriesList = [{
        type: 'table',
        columns: columns,
        rows: rows_2
      }];
    }

    if (!seriesList) {
      seriesList = [];
    }

    return {
      data: seriesList
    };
  };

  Utils.getSeriesData = function (dayBuckets) {
    var seriesData = [];
    dayBuckets.forEach(function (bucket) {
      var d = new Date(bucket.val);

      if (bucket.score && bucket.score.severity && bucket.score.severity) {
        var sevBuckets = bucket.score.severity.buckets;
        var sevBucket = sevBuckets.find(function (sevObj) {
          return sevObj.val === 'Critical';
        });

        if (!sevBucket) {
          sevBucket = sevBuckets.find(function (sevObj) {
            return sevObj.val === 'Warning';
          });
        }

        if (sevBucket) {
          seriesData.push([sevBucket.score, d.getTime()]);
        } else {
          seriesData.push([0, d.getTime()]);
        }
      } else {
        seriesData.push([0, d.getTime()]);
      }
    });
    return seriesData;
  };

  Utils.getAnnotations = function (response, type, color) {
    var events = [];
    response.docs.forEach(function (doc) {
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(Array(1440).keys()).every(function (ind) {
        var cpStartKey = 'changepoint_start_' + ind + '_dt';
        var cpEndKey = 'changepoint_end_' + ind + '_dt';
        var cpValueKey = 'changepoint_mean_' + ind + '_f';

        if (doc[cpStartKey] && doc[cpEndKey] && doc[cpValueKey]) {
          //row.push(doc[cpStartKey] + ' - ' + doc[cpEndKey]);
          var stTime = new Date(doc[cpStartKey]);
          var endTime = new Date(doc[cpEndKey]);
          var event = {
            time: stTime.valueOf(),
            timeEnd: endTime.valueOf(),
            isRegion: true,
            text: doc[cpValueKey],
            title: 'Unique sub-sequence<br>mean value - ' + doc[cpValueKey],
            source: {
              name: 'changePoint',
              iconColor: color
            }
          };
          events.push(event);
          return true;
        }

        return false;
      });
    });
    return events;
  };

  Utils.getGrouppedResults = function (seriesList, groupMap) {
    var groupSeriesList = {};
    var seriesListOutput = [];
    seriesList.forEach(function (series) {
      var jobId = series.jobId;
      var datapoints = series.datapoints;
      var dashboardName = groupMap.dashboards[jobId];

      if (!dashboardName) {
        dashboardName = jobId;
      }

      if (!groupSeriesList[dashboardName]) {
        groupSeriesList[dashboardName] = [];
      }

      datapoints.forEach(function (data, index) {
        if (!groupSeriesList[dashboardName][index] || groupSeriesList[dashboardName][index][0] < data[0]) {
          groupSeriesList[dashboardName][index] = data;
        }
      });
    });
    Object.keys(groupSeriesList).forEach(function (dashboard) {
      seriesListOutput.push({
        target: dashboard,
        datapoints: groupSeriesList[dashboard]
      });
    });
    return seriesListOutput;
  };

  Utils.mapToTextValue = function (result, addQuotes) {
    if (result.data && result.data.collections) {
      return result.data.collections.map(function (collection) {
        return {
          text: collection,
          value: collection
        };
      });
    }

    if (result.data && result.data.facet_counts) {
      var ar = [];

      var _loop_1 = function _loop_1(key) {
        if (!result.data.facet_counts.facet_fields.hasOwnProperty(key)) {
          return "continue";
        }

        var array = result.data.facet_counts.facet_fields[key];

        var _loop_2 = function _loop_2(i) {
          // take every second element
          if (array[i + 1] > 0 && !ar.find(function (ele) {
            return ele.text === array[i];
          })) {
            var text = array[i];
            var detectorPatternMatches = text.match(/\( Function: .* Field: (.*) \)/);

            if (detectorPatternMatches) {
              text = detectorPatternMatches[1];
            }

            if (text) {
              text = text.replace(/\\/g, '\\\\').replace(/\"/g, '\\"').replace(/{/g, '\\{').replace(/}/g, '\\}');
            }

            ar.push({
              text: addQuotes ? '"' + text + '"' : text,
              expandable: false
            });
          }
        };

        for (var i = 0; i < array.length; i += 2) {
          _loop_2(i);
        }
      };

      for (var key in result.data.facet_counts.facet_fields) {
        _loop_1(key);
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

  Utils.getFirstAndLastNResults = function (data, pageSize) {
    var arr = [];

    if (data && data.data && data.data.response) {
      for (var i = 0; i < Math.round(data.data.response.numFound / Number(pageSize.query)); i++) {
        arr.push(i);
      }
    }

    arr = arr.map(function (ele) {
      return {
        text: ele + 1,
        value: ele
      };
    });
    var firstNResults = arr.slice(0, 10);
    var lastNResults = arr.splice(arr.length - 11, arr.length - 1);

    if (firstNResults.length === 0 && lastNResults.length === 0) {
      return [{
        text: 0,
        value: 0
      }];
    }

    return firstNResults.concat(lastNResults);
  };

  Utils.sortList = function (seriesList, top) {
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

      return totalB - totalA; // return b.score - a.score;
    });

    if (top) {
      seriesList = seriesList.slice(0, top);
    }

    return seriesList;
  };

  Utils.getSortedSeries = function (seriesToSort, baselineSeries, indvAnOutField, prefix) {
    var resultSeries = [];
    var seriesSuffixes = indvAnOutField === 'all' ? ['actual', 'expected', 'score', 'anomaly'] : [indvAnOutField];
    baselineSeries.forEach(function (baselineSer) {
      var seriesName = baselineSer.target;
      seriesSuffixes.forEach(function (suffix) {
        resultSeries.push(seriesToSort.find(function (s) {
          return s.target === (prefix ? seriesName + ' ' + suffix : suffix);
        }));
      });
    });
    return resultSeries;
  };

  Utils.getStdDev = function (series) {
    var min = Math.min.apply(Math, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(series));
    var max = Math.max.apply(Math, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(series));
    series = series.map(function (b) {
      return (b - min) / (max - min);
    });
    return series;
  };

  Utils.findCorrelation = function (x, y) {
    var sumX = 0,
        sumY = 0,
        sumXY = 0,
        sumX2 = 0,
        sumY2 = 0;

    var minLength = x.length = y.length = Math.min(x.length, y.length),
        reduce = function reduce(xi, idx) {
      var yi = y[idx];
      sumX += xi;
      sumY += yi;
      sumXY += xi * yi;
      sumX2 += xi * xi;
      sumY2 += yi * yi;
    };

    x.forEach(reduce);
    return (minLength * sumXY - sumX * sumY) / Math.sqrt((minLength * sumX2 - sumX * sumX) * (minLength * sumY2 - sumY * sumY));
  };

  Utils.queryBuilder = function (query) {
    var q = query.replace(/\\{/g, '^^^').replace(/\\}/g, '@@@');
    q = q.replace(/{/g, '(') // (?<!(?:\\)){ Replace { not followed by \ with (. Reverting this part as negative lookbehind
    // //pattern doesn't work in Safari  and Solr treats { and ( same.
    .replace(/}/g, ')') // Replace } not followed by \ with )
    .replace(/\",\"/g, '" OR "');
    q = q.replace(/\^\^\^/g, '\\{').replace(/@@@/g, '\\}');
    return q;
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
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "@grafana/data");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datasource */ "./datasource.ts");
/* harmony import */ var _queryEditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./queryEditor */ "./queryEditor.tsx");
/* harmony import */ var _AnnotationQueryEditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AnnotationQueryEditor */ "./AnnotationQueryEditor.ts");
/*
 *
 *  Copyright (C) 2019 Bolt Analytics Corporation
 *
 *      Licensed under the Apache License, Version 2.0 (the "License");
 *      you may not use this file except in compliance with the License.
 *      You may obtain a copy of the License at
 *
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 *      Unless required by applicable law or agreed to in writing, software
 *      distributed under the License is distributed on an "AS IS" BASIS,
 *      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *      See the License for the specific language governing permissions and
 *      limitations under the License.
 *
 */





var BoltConfigControl =
/** @class */
function () {
  function BoltConfigControl() {}

  BoltConfigControl.templateUrl = 'partials/config.html';
  return BoltConfigControl;
}();


var plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_0__["DataSourcePlugin"](_datasource__WEBPACK_IMPORTED_MODULE_1__["BoltDatasource"]).setConfigCtrl(BoltConfigControl).setQueryEditor(_queryEditor__WEBPACK_IMPORTED_MODULE_2__["BoltQueryEditor"]).setAnnotationQueryCtrl(_AnnotationQueryEditor__WEBPACK_IMPORTED_MODULE_3__["AnnotationQueryEditor"]);

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
/*
 *
 *  Copyright (C) 2019 Bolt Analytics Corporation
 *
 *      Licensed under the Apache License, Version 2.0 (the "License");
 *      you may not use this file except in compliance with the License.
 *      You may obtain a copy of the License at
 *
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 *      Unless required by applicable law or agreed to in writing, software
 *      distributed under the License is distributed on an "AS IS" BASIS,
 *      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *      See the License for the specific language governing permissions and
 *      limitations under the License.
 *
 */

 //import { FormField, QueryEditorProps, FormLabel } from '@grafana/ui';


var FormField = _grafana_ui__WEBPACK_IMPORTED_MODULE_2__["LegacyForms"].FormField;

var BoltQueryEditor =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(BoltQueryEditor, _super);

  function BoltQueryEditor(props) {
    var _this = _super.call(this, props) || this;

    _this.onFieldValueChange = function (event, _name) {
      var _a, _b;

      var name = _name ? _name : event.target.name;
      var value = event.target.value;

      _this.setState(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, _this.state), (_a = {}, _a[name] = value, _a)));

      var onChange = _this.props.onChange;
      onChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, _this.props.query), (_b = {}, _b[name] = value, _b)));
    };

    var query = _this.props.query;
    _this.query = query;
    _this.state = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, _this.state), {
      query: query.query,
      collection: query.collection,
      fl: query.fl,
      queryType: query.queryType || 'chart',
      numRows: query.numRows || 100,
      start: query.start || 0,
      facetQuery: query.facetQuery,
      sortField: query.sortField,
      sortOrder: query.sortOrder,
      rexQuery: query.rexQuery || '\\s*.*\\s*\\[c\\:(.*)\\ss\\:(.*)\\sr\\:(.*)\\sx\\:(.*)\\]\\s*o.a.s.c.S.SlowRequest.*path=(.*)\\s*' + 'params=\\{(.*)\\}\\s*.*hits=(.*)\\s*status.*QTime=(.*)',
      rexOutFields: query.rexOutFields || 'collection,shard,replica,core,handler,params,hits,qtime',
      baseMetric: query.baseMetric,
      groupEnabled: query.groupEnabled || 'false',
      aggInterval: query.aggInterval || '+1HOUR',
      indvAnOutField: query.indvAnOutField || 'all',
      metaBarAggrField: query.metaBarAggrField || 'mean'
    });
    var onChange = _this.props.onChange;
    onChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, _this.props.query), _this.state));
    return _this;
  }

  BoltQueryEditor.prototype.render = function () {
    var _this = this;

    var chartTypes = [{
      value: 'chart',
      displayName: 'Chart'
    }, {
      value: 'rawlogs',
      displayName: 'Raw Logs'
    }, {
      value: 'slowQueries',
      displayName: 'Slow Queries'
    }, {
      value: 'count',
      displayName: 'Count'
    }, {
      displayName: 'Aggregated Anomalies',
      value: 'aggAnomaly'
    }, {
      displayName: 'Anomalies by partition field',
      value: 'aggAnomalyByPartFields'
    }, {
      displayName: 'Individual Anomalies',
      value: 'indvAnomaly'
    }, {
      displayName: 'Correlation',
      value: 'correlation'
    }, {
      displayName: 'Metadata bar chart',
      value: 'metaBar'
    }, {
      displayName: 'Metadata change points',
      value: 'metaCp'
    }];
    var _a = this.state,
        query = _a.query,
        collection = _a.collection,
        fl = _a.fl,
        queryType = _a.queryType,
        numRows = _a.numRows,
        start = _a.start,
        sortField = _a.sortField,
        sortOrder = _a.sortOrder,
        rexQuery = _a.rexQuery,
        rexOutFields = _a.rexOutFields,
        baseMetric = _a.baseMetric,
        groupEnabled = _a.groupEnabled,
        aggInterval = _a.aggInterval,
        indvAnOutField = _a.indvAnOutField,
        metaBarAggrField = _a.metaBarAggrField; //const labelWidth = { width: '40px' };

    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "gf-form-inline"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "gf-form"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFormLabel"], null, "Type"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("select", {
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
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(FormField, {
      label: "Query",
      type: "text",
      value: query,
      width: 4,
      name: "query",
      onChange: this.onFieldValueChange
    })), queryType === 'metaBar' && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "gf-form"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFormLabel"], null, "Aggregation type"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("select", {
      value: metaBarAggrField,
      onChange: function onChange(event) {
        _this.onFieldValueChange(event, 'metaBarAggrField');
      }
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
      value: 'min'
    }, 'min'), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
      value: 'max'
    }, 'max'), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
      value: 'sum'
    }, 'sum'), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
      value: 'mean'
    }, 'mean'))), queryType === 'aggAnomaly' && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "gf-form"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFormLabel"], null, "Group Results"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("select", {
      value: groupEnabled,
      onChange: function onChange(event) {
        _this.onFieldValueChange(event, 'groupEnabled');
      }
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
      value: 'true'
    }, 'true'), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
      value: 'false'
    }, 'false'))), queryType === 'indvAnomaly' && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "gf-form"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFormLabel"], null, "Out Field"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("select", {
      value: indvAnOutField,
      onChange: function onChange(event) {
        _this.onFieldValueChange(event, 'indvAnOutField');
      }
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
      value: 'all'
    }, 'All'), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
      value: 'actual'
    }, 'Actual'), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
      value: 'score'
    }, 'Score'), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
      value: 'expected'
    }, 'Expected'), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
      value: 'anomaly'
    }, 'Anomaly'))), (queryType === 'aggAnomaly' || queryType === 'aggAnomalyByPartFields') && // <div className="gf-form">
    //   <FormLabel width={14}>Aggregation Level</FormLabel>
    //   <select
    //     value={aggInterval}
    //     onChange={(event: any) => {
    //       this.onFieldValueChange(event, 'aggInterval');
    //     }}
    //   >
    //     <option value={'+1HOUR'}>{'Hour'}</option>
    //     <option value={'+1MINUTE'}>{'Minute'}</option>
    //   </select>
    // </div>
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "gf-form"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(FormField, {
      label: "Aggregation Interval",
      type: "text",
      value: aggInterval,
      labelWidth: 12,
      width: 4,
      name: "aggInterval",
      onChange: this.onFieldValueChange
    })), queryType !== 'aggAnomaly' && queryType !== 'indvAnomaly' && queryType !== 'correlation' && queryType !== 'aggAnomalyByPartFields' && queryType !== 'metaBar' && queryType !== 'metaCp' && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "gf-form"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(FormField, {
      label: "Collection",
      type: "text",
      value: collection,
      width: 4,
      name: "collection",
      onChange: this.onFieldValueChange
    })), queryType === 'correlation' && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "gf-form"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(FormField, {
      label: "Base Metric",
      type: "text",
      value: baseMetric,
      width: 4,
      name: "baseMetric",
      onChange: this.onFieldValueChange
    }))), (queryType === 'chart' || queryType === 'rawlogs' || queryType === 'slowQueries') && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "gf-form-inline"
    }, (queryType === 'rawlogs' || queryType === 'slowQueries') && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "gf-form"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(FormField, {
      label: "Sort",
      type: "text",
      value: sortField,
      width: 4,
      name: "sortField",
      onChange: this.onFieldValueChange
    })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "gf-form"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(FormField, {
      label: "Order",
      type: "text",
      value: sortOrder,
      width: 4,
      name: "sortOrder",
      onChange: this.onFieldValueChange
    }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "gf-form"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(FormField, {
      label: "Out Fields",
      type: "text",
      value: fl,
      width: 4,
      name: "fl",
      onChange: this.onFieldValueChange
    })), (queryType === 'rawlogs' || queryType === 'slowQueries') && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "gf-form"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(FormField, {
      label: "Number of rows",
      labelWidth: 10,
      type: "text",
      value: numRows,
      width: 6,
      name: "numRows",
      onChange: this.onFieldValueChange
    })), (queryType === 'rawlogs' || queryType === 'slowQueries') && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "gf-form"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(FormField, {
      label: "Start page",
      type: "text",
      value: start,
      width: 4,
      name: "start",
      onChange: this.onFieldValueChange
    }))), queryType === 'slowQueries' && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "gf-form-inline"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "gf-form"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(FormField, {
      label: "Rex Query",
      type: "text",
      value: rexQuery,
      width: 4,
      name: "rexQuery",
      onChange: this.onFieldValueChange
    })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "gf-form"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(FormField, {
      label: "Output Fields",
      type: "text",
      value: rexOutFields,
      width: 4,
      name: "rexOutFields",
      onChange: this.onFieldValueChange
    }))));
  };

  return BoltQueryEditor;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]);



/***/ }),

/***/ "@grafana/data":
/*!********************************!*\
  !*** external "@grafana/data" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_data__;

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