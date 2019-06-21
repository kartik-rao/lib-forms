window["Forms"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdateForms"];
/******/ 	window["webpackHotUpdateForms"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "95bdcf9-" + chunkId + "-wps-hmr.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "95bdcf9-wps-hmr.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "99e7f0f98dcab7345a39";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonpForms"] = window["webpackJsonpForms"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/canvas/Canvas.tsx":
/*!******************************************!*\
  !*** ./src/components/canvas/Canvas.tsx ***!
  \******************************************/
/*! exports provided: Canvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Canvas", function() { return Canvas; });
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx */ "./node_modules/mobx/lib/mobx.module.js");
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/dist/mobx-react.module.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-beautiful-dnd */ "./node_modules/react-beautiful-dnd/dist/react-beautiful-dnd.esm.js");
/* harmony import */ var _editors_field_FieldEditorView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../editors/field/FieldEditorView */ "./src/components/editors/field/FieldEditorView.tsx");
/* harmony import */ var _editors_form_FormEditorView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../editors/form/FormEditorView */ "./src/components/editors/form/FormEditorView.tsx");
/* harmony import */ var _editors_page_PageEditorView__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../editors/page/PageEditorView */ "./src/components/editors/page/PageEditorView.tsx");
/* harmony import */ var _editors_section_SectionEditorView__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../editors/section/SectionEditorView */ "./src/components/editors/section/SectionEditorView.tsx");
/* harmony import */ var _ComponentMenu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ComponentMenu */ "./src/components/canvas/ComponentMenu.tsx");
/* harmony import */ var _ComponentTree__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ComponentTree */ "./src/components/canvas/ComponentTree.tsx");
/* harmony import */ var _kartikrao_lib_forms_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @kartikrao/lib-forms-core */ "./node_modules/@kartikrao/lib-forms-core/lib/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












const { Content } = antd__WEBPACK_IMPORTED_MODULE_0__["Layout"];
const genRandom = () => {
    return `${Math.ceil(Math.random() * 1e6)}`;
};
let Canvas = class Canvas extends react__WEBPACK_IMPORTED_MODULE_3__["Component"] {
    constructor(props) {
        super(props);
        this.handleNewItem = (result) => {
            const { destination, type } = result;
            const { form } = this.props.store.formStore;
            const dIndex = destination.index;
            let id = genRandom();
            if (type == "Page") {
                let nextPageNum = form.content.pages.length;
                let page = this.factory.makePages({
                    id: `${nextPageNum}`,
                    title: `Page ${nextPageNum}`,
                    name: `Page ${nextPageNum}`,
                    sections: []
                })[0];
                form.addPage(page, dIndex);
            }
            else {
                let [dParentId] = destination.droppableId.split('|');
                if (type == "Section") {
                    let page = this.itemMap[dParentId];
                    let section = this.factory.makeSections({
                        id: `${id}`,
                        name: `Section_${id}`,
                        columns: []
                    })[0];
                    page.addSection(section, dIndex);
                }
                if (type == "Column") {
                    let section = this.itemMap[dParentId];
                    let column = this.factory.makeColumns({
                        id: `${id}`,
                        name: `Column_${id}`,
                        fields: []
                    })[0];
                    section.addColumn(column, dIndex);
                }
                if (type == "Field") {
                    let column = this.itemMap[dParentId];
                    let field = this.factory.makeFields({
                        id: `${id}`,
                        name: `Field_${id}`,
                        label: `Untitled ${result.draggableId}`,
                        inputType: result.draggableId,
                        componentProps: {},
                        fieldOptions: {}
                    })[0];
                    column.addField(field, dIndex);
                }
            }
            return;
        };
        this.handleMoveItem = (result) => {
            const { source, destination, type } = result;
            const { form } = this.props.store.formStore;
            const sIndex = source.index;
            const dIndex = destination.index;
            if (type == "Page") {
                form.swapPages(source.index, destination.index);
            }
            else {
                let [sParentId] = source.droppableId.split('|');
                let [dParentId] = destination.droppableId.split('|');
                let sameParent = sParentId == dParentId;
                if (type == "Section") {
                    let prev = this.itemMap[sParentId];
                    if (sameParent) {
                        prev.swapSections(sIndex, dIndex);
                        return;
                    }
                    let next = this.itemMap[dParentId];
                    let section = prev.sections[sIndex];
                    prev.removeSection(sIndex);
                    next.addSection(section, dIndex);
                }
                else if (type == "Column") {
                    let prev = this.itemMap[sParentId];
                    if (sameParent) {
                        prev.swapColumns(sIndex, dIndex);
                        return;
                    }
                    let next = this.itemMap[dParentId];
                    let column = prev.columns[sIndex];
                    prev.removeColumn(sIndex);
                    next.addColumn(column, dIndex);
                }
                else if (type == "Field") {
                    let prev = this.itemMap[sParentId];
                    if (sameParent) {
                        prev.swapFields(sIndex, dIndex);
                        return;
                    }
                    let next = this.itemMap[dParentId];
                    let column = prev.fields[sIndex];
                    prev.removeField(sIndex);
                    next.addField(column, dIndex);
                }
            }
        };
        this.onDragEnd = (result) => {
            const { source, type } = result;
            if (source.droppableId.startsWith('New')) {
                this.handleNewItem(result);
            }
            else {
                this.handleMoveItem(result);
            }
        };
        this.state = {
            siderCollapsed: false
        };
        this.onSiderCollapse = (siderCollapsed) => {
            this.setState({ siderCollapsed });
        };
        this.toggleSider = () => {
            this.setState({ siderCollapsed: !this.state.siderCollapsed });
        };
        this.factory = new _kartikrao_lib_forms_core__WEBPACK_IMPORTED_MODULE_11__["Factory"](this.props.store.formStore);
    }
    get itemMap() {
        let { form } = this.props.store.formStore;
        let { pages } = form.content;
        let itemMap = {};
        pages.forEach((p) => {
            itemMap[p.uuid] = p;
            p.sections.forEach((s, si) => {
                itemMap[s.uuid] = s;
                s.columns.forEach((c, ci) => {
                    itemMap[c.uuid] = c;
                    c.fields.forEach((f, fi) => {
                        itemMap[f.uuid] = f;
                    });
                });
            });
        });
        return itemMap;
    }
    render() {
        let { formStore } = this.props.store;
        return react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Layout"], { className: "fl-full-height-nopad" },
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Menu"], { mode: "horizontal", theme: "light", multiple: true, className: "fl-shadow-sides" },
                react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Menu"].Item, { title: "Form Controls", onClick: this.toggleSider, key: "controls" },
                    react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Icon"], { theme: this.state.siderCollapsed ? 'outlined' : 'filled', type: "control" }))),
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Layout"].Content, null,
                react__WEBPACK_IMPORTED_MODULE_3__["createElement"](react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_4__["DragDropContext"], { onDragEnd: this.onDragEnd },
                    react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Layout"], { className: "fl-full-height-nopad" },
                        react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Layout"].Sider, { trigger: null, collapsed: this.state.siderCollapsed, style: { zIndex: 11 }, collapsible: true, onCollapse: this.onSiderCollapse, theme: "light", collapsedWidth: 0 },
                            react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", { className: "fl-full-height fl-grey-box fl-shadow-sides" },
                                react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_ComponentMenu__WEBPACK_IMPORTED_MODULE_9__["ComponentMenu"], null))),
                        react__WEBPACK_IMPORTED_MODULE_3__["createElement"](Content, { style: { overflow: "hidden", padding: '0' } },
                            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: 8, style: { height: '100%' } },
                                react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", { className: "fl-full-height fl-grey-box fl-shadow-sides" },
                                    react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_ComponentTree__WEBPACK_IMPORTED_MODULE_10__["ComponentTree"], { store: this.props.store }))),
                            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: 16, style: { height: '100%' } },
                                react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", { className: "fl-grey-box fl-shadow-sides fl-full-height" },
                                    react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_kartikrao_lib_forms_core__WEBPACK_IMPORTED_MODULE_11__["FormView"], { store: formStore }))),
                            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_editors_field_FieldEditorView__WEBPACK_IMPORTED_MODULE_5__["FieldEditorView"], { store: this.props.store }),
                            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_editors_form_FormEditorView__WEBPACK_IMPORTED_MODULE_6__["FormEditorView"], { store: this.props.store }),
                            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_editors_page_PageEditorView__WEBPACK_IMPORTED_MODULE_7__["default"], { store: this.props.store }),
                            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_editors_section_SectionEditorView__WEBPACK_IMPORTED_MODULE_8__["SectionEditorView"], { store: this.props.store }))))));
    }
};
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_1__["computed"]
], Canvas.prototype, "itemMap", null);
Canvas = __decorate([
    mobx_react__WEBPACK_IMPORTED_MODULE_2__["observer"]
], Canvas);



/***/ }),

/***/ "./src/components/canvas/ComponentMenu.tsx":
/*!*************************************************!*\
  !*** ./src/components/canvas/ComponentMenu.tsx ***!
  \*************************************************/
/*! exports provided: ComponentMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentMenu", function() { return ComponentMenu; });
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-beautiful-dnd */ "./node_modules/react-beautiful-dnd/dist/react-beautiful-dnd.esm.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");




const Container = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div `
    padding: 4px;
    background-color: white;
`;
const Item = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div `

`;
const getItemStyle = (isDragging, draggableStyle) => (Object.assign({ 
    // some basic styles to make the items look a bit nicer
    userSelect: 'none', 
    // fontSize: '12px',
    // change background colour if dragging
    background: isDragging ? '#ededed' : '#fff' }, draggableStyle));
const basicGroup = {
    dropId: 'NewTextItem',
    dropType: 'Field',
    key: 'Text',
    title: 'Basic',
    icon: '',
    groups: [
        { key: 'text', title: 'Text', dragType: 'Field', dragId: 'input', icon: 'font-size' },
        { key: 'number', title: 'Number', dragType: 'Field', dragId: 'number', icon: 'calculator' },
        { key: 'select', title: 'Select', dragType: 'Field', dragId: 'select', icon: 'menu-unfold' },
        { key: 'checkbox', title: 'Checkbox', dragType: 'Field', dragId: 'checkbox', icon: 'check-square' },
        { key: 'radio', title: 'Radio', dragType: 'Field', dragId: 'radio', icon: 'check-circle' },
        { key: 'textarea', title: 'Text Area', dragType: 'Field', dragId: 'textarea', icon: 'profile' },
        { key: 'textblock', title: 'Text Block', dragType: 'Field', dragId: 'textblock', icon: 'read' }
    ]
};
const dateTimeGroup = {
    dropId: 'NewCalendarItem',
    dropType: 'Field',
    key: 'Calendar',
    title: 'Date and Time',
    icon: '',
    groups: [
        { key: 'datepicker', title: 'Date', dragType: 'Field', dragId: 'datepicker', icon: 'calendar' },
        { key: 'daterange', title: 'Range', dragType: 'Field', dragId: 'daterange', icon: 'calendar' },
        { key: 'monthpicker', title: 'Month', dragType: 'Field', dragId: 'monthpicker', icon: 'calendar' },
        { key: 'timepicker', title: 'Time', dragType: 'Field', dragId: 'timepicker', icon: 'calendar' },
        { key: 'yearpicker', title: 'Year', dragType: 'Field', dragId: 'yearpicker', icon: 'calendar' },
    ]
};
const choiceGroup = {
    dropId: 'NewChoiceGroupItem',
    dropType: 'Field',
    key: 'Choice',
    title: 'Grouped Choice',
    icon: '',
    groups: [
        { key: 'checkboxgroup', title: 'Checkbox Group', dragType: 'Field', dragId: 'checkboxgroup', icon: 'check-square' },
        { key: 'radiogroup', title: 'Radio Group', dragType: 'Field', dragId: 'radiogroup', icon: 'check-circle' },
        { key: 'cascader', title: 'Cascaded Select', dragType: 'Field', dragId: 'cascader', icon: 'menu-unfold' }
    ]
};
const interactiveGroup = {
    dropId: 'NewInteractiveItem',
    dropType: 'Field',
    key: 'Interactive',
    title: 'Interactive',
    icon: '',
    groups: [
        { key: 'slider', title: 'Slider', dragType: 'Field', dragId: 'slider', icon: 'control' },
        { key: 'starrating', title: 'Star Rating', dragType: 'Field', dragId: 'starrating', icon: 'star' },
        { key: 'switch', title: 'Switch', dragType: 'Field', dragId: 'switch', icon: 'poweroff' },
        { key: 'transfer', title: 'Upload', dragType: 'Field', dragId: 'transfer', icon: 'file-zip' }
    ]
};
class ComponentMenu extends react__WEBPACK_IMPORTED_MODULE_1__["Component"] {
    constructor() {
        super(...arguments);
        this.droppableIndex = 0;
        this.asDroppableGroup = ({ dropId, dropType, key, title, icon, groups }) => {
            return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_2__["Droppable"], { droppableId: dropId, type: dropType, isDropDisabled: true }, (provided, snapshot) => {
                return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](Item, Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps),
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Menu"], { inlineCollapsed: this.submenuCollapsed, mode: "inline", theme: this.menuTheme },
                        react__WEBPACK_IMPORTED_MODULE_1__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Menu"].SubMenu, { key: key, title: react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", null, title) }, groups.map((item, key) => {
                            return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Menu"].Item, { key: key, title: item.title },
                                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_2__["Draggable"], { type: item.dragType, draggableId: item.dragId, index: this.droppableIndex++ }, (provided, snapshot) => (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](Item, Object.assign({ ref: provided.innerRef }, provided.draggableProps, provided.dragHandleProps, { style: getItemStyle(snapshot.isDragging, provided.draggableProps.style) }),
                                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", null,
                                        react__WEBPACK_IMPORTED_MODULE_1__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Icon"], { type: item.icon }),
                                        " ",
                                        item.title),
                                    provided.placeholder))));
                        }))));
            });
        };
        this.asDroppable = (dropId, dropType, title, dragType, dragId, icon) => {
            return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_2__["Droppable"], { droppableId: dropId, type: dropType, isDropDisabled: true }, (provided, snapshot) => (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](Item, Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Menu"], { mode: this.menuMode, theme: this.menuTheme },
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Menu"].Item, { title: title },
                        react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_2__["Draggable"], { type: dragType, draggableId: dragId, index: this.droppableIndex++ }, (provided, snapshot) => (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](Container, Object.assign({ ref: provided.innerRef }, provided.draggableProps, provided.dragHandleProps, { style: getItemStyle(snapshot.isDragging, provided.draggableProps.style) }),
                            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", null,
                                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Icon"], { type: icon }),
                                title),
                            provided.placeholder))))))));
        };
        this.asDraggableCard = (dropId, dropType, title, dragType, dragId, icon) => {
            return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_2__["Droppable"], { droppableId: dropId, type: dropType, isDropDisabled: true }, (provided, snapshot) => (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](Item, Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_2__["Draggable"], { type: dragType, draggableId: dragId, index: this.droppableIndex++ }, (provided, snapshot) => (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Card"].Grid, { style: { border: 'none', width: '33%', textAlign: 'center', padding: '2px' } },
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](Container, Object.assign({ ref: provided.innerRef }, provided.draggableProps, provided.dragHandleProps, { style: getItemStyle(snapshot.isDragging, provided.draggableProps.style) }),
                        react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", null,
                            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Icon"], { type: icon }),
                            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("br", null),
                            title),
                        provided.placeholder)))))));
        };
    }
    render() {
        return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Card"], { bordered: false, title: "Controls", bodyStyle: { padding: '1px' } },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Card"], { size: "small", bodyStyle: { fontSize: '12px', padding: '0px', marginBottom: '1px' }, bordered: false, title: react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("small", null, "Containers") },
                this.asDraggableCard("NewPage", "Page", "Page", "Page", "p1", "layout"),
                this.asDraggableCard("NewSection", "Section", "Section", "Section", "s1", "menu"),
                this.asDraggableCard("NewColumn", "Column", "Column", "Column", "c1", "column-width")),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Card"], { size: "small", bodyStyle: { fontSize: '12px', padding: '0px', marginBottom: '1px' }, bordered: false, title: react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("small", null, "Basic") },
                this.asDraggableCard("NewTextField", "Field", "Text", "Field", "input", "font-size"),
                this.asDraggableCard("NewTextField", "Field", "Number", "Field", "number", "calculator"),
                this.asDraggableCard("NewTextField", "Field", "Check", "Field", "checkbox", "check-square"),
                this.asDraggableCard("NewTextField", "Field", "Radio", "Field", "radio", "check-circle"),
                this.asDraggableCard("NewTextField", "Field", "TextArea", "Field", "textarea", "profile"),
                this.asDraggableCard("NewTextField", "Field", "TextBlock", "Field", "textblock", "read"),
                this.asDraggableCard("NewTextField", "Field", "Checks", "Field", "checkboxgroup", "check-square"),
                this.asDraggableCard("NewTextField", "Field", "Radios", "Field", "radiogroup", "check-circle"),
                this.asDraggableCard("NewTextField", "Field", "Select", "Field", "select", "menu"),
                this.asDraggableCard("NewTextField", "Field", "Cascader", "Field", "cascader", "menu-unfold")),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Card"], { size: "small", bodyStyle: { fontSize: '12px', padding: '0px', marginBottom: '1px' }, bordered: false, title: react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("small", null, "Date and Time") },
                this.asDraggableCard("NewTextField", "Field", "Date", "Field", "datepicker", "calendar"),
                this.asDraggableCard("NewTextField", "Field", "Range", "Field", "daterange", "calendar"),
                this.asDraggableCard("NewTextField", "Field", "Month", "Field", "monthpicker", "calendar"),
                this.asDraggableCard("NewTextField", "Field", "Time", "Field", "timepicker", "calendar"),
                this.asDraggableCard("NewTextField", "Field", "Year", "Field", "yearpicker", "calendar")),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Card"], { size: "small", bodyStyle: { fontSize: '12px', padding: '0px', marginBottom: '1px' }, bordered: false, title: react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("small", null, "Interactive") },
                this.asDraggableCard("NewTextField", "Field", "HTML", "Field", "htmlfragment", "code"),
                this.asDraggableCard("NewTextField", "Field", "Slider", "Field", "slider", "control"),
                this.asDraggableCard("NewTextField", "Field", "Rating", "Field", "starrating", "star"),
                this.asDraggableCard("NewTextField", "Field", "Switch", "Field", "switch", "poweroff"),
                this.asDraggableCard("NewTextField", "Field", "Upload", "Field", "transfer", "file-zip")));
    }
}


/***/ }),

/***/ "./src/components/canvas/ComponentTree.tsx":
/*!*************************************************!*\
  !*** ./src/components/canvas/ComponentTree.tsx ***!
  \*************************************************/
/*! exports provided: ComponentTree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentTree", function() { return ComponentTree; });
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/dist/mobx-react.module.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-beautiful-dnd */ "./node_modules/react-beautiful-dnd/dist/react-beautiful-dnd.esm.js");
/* harmony import */ var _partials_dnd_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./partials/dnd.common */ "./src/components/canvas/partials/dnd.common.ts");
/* harmony import */ var _partials_PageItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./partials/PageItem */ "./src/components/canvas/partials/PageItem.tsx");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let ComponentTree = class ComponentTree extends react__WEBPACK_IMPORTED_MODULE_2__["Component"] {
    constructor(props) {
        super(props);
        this.nodeMap = {};
        this.props = props;
    }
    render() {
        let { formStore, editorStore } = this.props.store;
        let { form } = formStore;
        let { pages } = form.content;
        return react__WEBPACK_IMPORTED_MODULE_2__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Card"], { title: "Layout", bordered: false, style: { height: '100%' }, bodyStyle: { height: '100%', padding: '10px', overflow: 'auto', paddingBottom: '48px' } },
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Button"], { type: "dashed", onClick: () => { editorStore.setFormEditorVisible(true); }, shape: "circle", size: "small", icon: "edit", style: { marginRight: '5px', userSelect: 'none' } }),
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Badge"], { status: "default", color: Object(_partials_dnd_common__WEBPACK_IMPORTED_MODULE_4__["getBadgeStyle"])("Form"), text: `Form - ${form.name}` }),
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"](react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_3__["Droppable"], { droppableId: "pages", type: "Page" }, (provided, snapshot) => {
                return react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_partials_dnd_common__WEBPACK_IMPORTED_MODULE_4__["ItemList"], Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps),
                    pages.map((page, index) => {
                        return react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { key: page.uuid },
                            react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_partials_PageItem__WEBPACK_IMPORTED_MODULE_5__["PageItem"], { store: this.props.store, key: page.uuid, page: page, index: index }),
                            react__WEBPACK_IMPORTED_MODULE_2__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Divider"], { style: { margin: '12px 0' } }));
                    }),
                    provided.placeholder);
            }));
    }
};
ComponentTree = __decorate([
    mobx_react__WEBPACK_IMPORTED_MODULE_1__["observer"]
], ComponentTree);



/***/ }),

/***/ "./src/components/canvas/partials/ColumnItem.tsx":
/*!*******************************************************!*\
  !*** ./src/components/canvas/partials/ColumnItem.tsx ***!
  \*******************************************************/
/*! exports provided: ColumnItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColumnItem", function() { return ColumnItem; });
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-beautiful-dnd */ "./node_modules/react-beautiful-dnd/dist/react-beautiful-dnd.esm.js");
/* harmony import */ var _dnd_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dnd.common */ "./src/components/canvas/partials/dnd.common.ts");
/* harmony import */ var _FieldItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FieldItem */ "./src/components/canvas/partials/FieldItem.tsx");
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/dist/mobx-react.module.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let ColumnItem = class ColumnItem extends react__WEBPACK_IMPORTED_MODULE_1__["Component"] {
    render() {
        let col = this.props.col;
        let { editorStore } = this.props.store;
        return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_2__["Draggable"], { type: "Column", draggableId: col.uuid, index: this.props.index }, (provided, snapshot) => (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_dnd_common__WEBPACK_IMPORTED_MODULE_3__["Container"], Object.assign({ ref: provided.innerRef }, provided.draggableProps, { style: Object(_dnd_common__WEBPACK_IMPORTED_MODULE_3__["getItemStyle"])(snapshot.isDragging, provided.draggableProps.style) }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Button"], { type: "dashed", shape: "circle", onClick: () => editorStore.setEditable(col), size: "small", icon: "edit", className: "fl-tree-button" }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Badge"], Object.assign({}, provided.dragHandleProps, { status: snapshot.isDragging ? 'processing' : "default", color: Object(_dnd_common__WEBPACK_IMPORTED_MODULE_3__["getBadgeStyle"])("Column"), text: `Column - ${col.name}` })),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_2__["Droppable"], { droppableId: `${col.uuid}|fields`, type: "Field" }, (provided, snapshot) => {
                return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_dnd_common__WEBPACK_IMPORTED_MODULE_3__["ItemList"], Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps),
                    col.fields.map((f, index) => {
                        return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_FieldItem__WEBPACK_IMPORTED_MODULE_4__["FieldItem"], { store: this.props.store, key: f.uuid, fld: f, index: index });
                    }),
                    provided.placeholder);
            }),
            provided.placeholder)));
    }
};
ColumnItem = __decorate([
    mobx_react__WEBPACK_IMPORTED_MODULE_5__["observer"]
], ColumnItem);



/***/ }),

/***/ "./src/components/canvas/partials/FieldItem.tsx":
/*!******************************************************!*\
  !*** ./src/components/canvas/partials/FieldItem.tsx ***!
  \******************************************************/
/*! exports provided: FieldItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FieldItem", function() { return FieldItem; });
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-beautiful-dnd */ "./node_modules/react-beautiful-dnd/dist/react-beautiful-dnd.esm.js");
/* harmony import */ var _dnd_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dnd.common */ "./src/components/canvas/partials/dnd.common.ts");
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/dist/mobx-react.module.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





let FieldItem = class FieldItem extends react__WEBPACK_IMPORTED_MODULE_1__["Component"] {
    render() {
        let fld = this.props.fld;
        let label = fld.label; // Otherwise Tree wont update
        let { editorStore } = this.props.store;
        return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_2__["Draggable"], { type: "Field", draggableId: fld.uuid, index: this.props.index }, (provided, snapshot) => (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_dnd_common__WEBPACK_IMPORTED_MODULE_3__["Container"], Object.assign({ ref: provided.innerRef }, provided.draggableProps, { style: Object(_dnd_common__WEBPACK_IMPORTED_MODULE_3__["getItemStyle"])(snapshot.isDragging, provided.draggableProps.style) }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Button"], { type: "dashed", shape: "circle", onClick: () => editorStore.setEditable(fld), size: "small", icon: "edit", className: "fl-tree-button" }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Badge"], Object.assign({}, provided.dragHandleProps, { status: snapshot.isDragging ? 'processing' : "default", color: Object(_dnd_common__WEBPACK_IMPORTED_MODULE_3__["getBadgeStyle"])("Field"), text: `Field - ${label}` })),
            provided.placeholder)));
    }
};
FieldItem = __decorate([
    mobx_react__WEBPACK_IMPORTED_MODULE_4__["observer"]
], FieldItem);



/***/ }),

/***/ "./src/components/canvas/partials/PageItem.tsx":
/*!*****************************************************!*\
  !*** ./src/components/canvas/partials/PageItem.tsx ***!
  \*****************************************************/
/*! exports provided: PageItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageItem", function() { return PageItem; });
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-beautiful-dnd */ "./node_modules/react-beautiful-dnd/dist/react-beautiful-dnd.esm.js");
/* harmony import */ var _dnd_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dnd.common */ "./src/components/canvas/partials/dnd.common.ts");
/* harmony import */ var _SectionItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SectionItem */ "./src/components/canvas/partials/SectionItem.tsx");
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/dist/mobx-react.module.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let PageItem = class PageItem extends react__WEBPACK_IMPORTED_MODULE_1__["Component"] {
    constructor(props) {
        super(props);
    }
    render() {
        let page = this.props.page;
        let { editorStore } = this.props.store;
        let { title, subtitle, name } = page;
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { style: { padding: '4px' } },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_2__["Draggable"], { type: "Page", draggableId: page.uuid, index: this.props.index }, (provided, snapshot) => (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_dnd_common__WEBPACK_IMPORTED_MODULE_3__["Container"], Object.assign({ ref: provided.innerRef }, provided.draggableProps, { style: Object(_dnd_common__WEBPACK_IMPORTED_MODULE_3__["getItemStyle"])(snapshot.isDragging, provided.draggableProps.style) }),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Button"], { type: "dashed", onClick: () => { editorStore.setEditable(page); }, shape: "circle", size: "small", icon: "edit", className: "fl-tree-button" }),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Badge"], Object.assign({}, provided.dragHandleProps, { status: snapshot.isDragging ? 'processing' : "default", color: Object(_dnd_common__WEBPACK_IMPORTED_MODULE_3__["getBadgeStyle"])("Page"), text: `Page - ${page.title}` })),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_2__["Droppable"], { droppableId: `${page.uuid}|sections`, type: "Section" }, (provided, snapshot) => {
                    return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_dnd_common__WEBPACK_IMPORTED_MODULE_3__["ItemList"], Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps),
                        page.sections.map((sec, index) => {
                            return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_SectionItem__WEBPACK_IMPORTED_MODULE_4__["SectionItem"], { store: this.props.store, key: sec.uuid, sec: sec, index: index });
                        }),
                        provided.placeholder);
                }),
                provided.placeholder)))));
    }
};
PageItem = __decorate([
    mobx_react__WEBPACK_IMPORTED_MODULE_5__["observer"]
], PageItem);



/***/ }),

/***/ "./src/components/canvas/partials/SectionItem.tsx":
/*!********************************************************!*\
  !*** ./src/components/canvas/partials/SectionItem.tsx ***!
  \********************************************************/
/*! exports provided: SectionItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SectionItem", function() { return SectionItem; });
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-beautiful-dnd */ "./node_modules/react-beautiful-dnd/dist/react-beautiful-dnd.esm.js");
/* harmony import */ var _ColumnItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ColumnItem */ "./src/components/canvas/partials/ColumnItem.tsx");
/* harmony import */ var _dnd_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dnd.common */ "./src/components/canvas/partials/dnd.common.ts");
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/dist/mobx-react.module.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let SectionItem = class SectionItem extends react__WEBPACK_IMPORTED_MODULE_1__["Component"] {
    render() {
        let sec = this.props.sec;
        let { editorStore } = this.props.store;
        return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_2__["Draggable"], { type: "Section", draggableId: sec.uuid, index: this.props.index }, (provided, snapshot) => (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_dnd_common__WEBPACK_IMPORTED_MODULE_4__["Container"], Object.assign({ ref: provided.innerRef }, provided.draggableProps, { style: Object(_dnd_common__WEBPACK_IMPORTED_MODULE_4__["getItemStyle"])(snapshot.isDragging, provided.draggableProps.style) }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Button"], { type: "dashed", shape: "circle", onClick: () => editorStore.setEditable(sec), size: "small", icon: "edit", className: "fl-tree-button" }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Badge"], Object.assign({}, provided.dragHandleProps, { status: snapshot.isDragging ? 'processing' : "default", color: Object(_dnd_common__WEBPACK_IMPORTED_MODULE_4__["getBadgeStyle"])("Section"), text: `Section - ${sec.name}` })),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_2__["Droppable"], { droppableId: `${sec.uuid}|columns`, type: "Column" }, (provided, snapshot) => {
                return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_dnd_common__WEBPACK_IMPORTED_MODULE_4__["ItemList"], Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps),
                    sec.columns.map((col, index) => {
                        return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ColumnItem__WEBPACK_IMPORTED_MODULE_3__["ColumnItem"], { store: this.props.store, key: col.uuid, col: col, index: index });
                    }),
                    provided.placeholder);
            }),
            provided.placeholder)));
    }
};
SectionItem = __decorate([
    mobx_react__WEBPACK_IMPORTED_MODULE_5__["observer"]
], SectionItem);



/***/ }),

/***/ "./src/components/canvas/partials/dnd.common.ts":
/*!******************************************************!*\
  !*** ./src/components/canvas/partials/dnd.common.ts ***!
  \******************************************************/
/*! exports provided: ItemList, Container, getBadgeStyle, getItemStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemList", function() { return ItemList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Container", function() { return Container; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBadgeStyle", function() { return getBadgeStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getItemStyle", function() { return getItemStyle; });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");

const ItemList = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div `
    min-height: 50px;
`;
const Container = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div `
    cursor: 'grab'
`;
const getBadgeStyle = (type) => {
    switch (type) {
        case "Form": return "cyan";
        case "Page": return "magenta";
        case "Section": return "geekblue";
        case "Column": return "gold";
        case "Field": return "green";
    }
};
const getItemStyle = (isDragging, draggableStyle) => (Object.assign({ userSelect: 'none', marginLeft: '12px', marginTop: '8px' }, draggableStyle));


/***/ }),

/***/ "./src/components/editors/common/FormLayoutCommon.ts":
/*!***********************************************************!*\
  !*** ./src/components/editors/common/FormLayoutCommon.ts ***!
  \***********************************************************/
/*! exports provided: tailFormItemLayout, formItemLayout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tailFormItemLayout", function() { return tailFormItemLayout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formItemLayout", function() { return formItemLayout; });
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 18,
        },
        sm: {
            span: 24,
            offset: 18,
        },
    },
};
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
    },
    wrapperCol: {
        xs: { span: 18 },
        sm: { span: 14 },
    },
};


/***/ }),

/***/ "./src/components/editors/field/FieldEditorView.tsx":
/*!**********************************************************!*\
  !*** ./src/components/editors/field/FieldEditorView.tsx ***!
  \**********************************************************/
/*! exports provided: FieldEditorView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FieldEditorView", function() { return FieldEditorView; });
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/dist/mobx-react.module.js");
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mobx */ "./node_modules/mobx/lib/mobx.module.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _partials_ConditionsView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./partials/ConditionsView */ "./src/components/editors/field/partials/ConditionsView.tsx");
/* harmony import */ var _partials_PropertiesView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./partials/PropertiesView */ "./src/components/editors/field/partials/PropertiesView.tsx");
/* harmony import */ var _partials_ValidationView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./partials/ValidationView */ "./src/components/editors/field/partials/ValidationView.tsx");
/* harmony import */ var _partials_ChoiceOptionEditorView__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./partials/ChoiceOptionEditorView */ "./src/components/editors/field/partials/ChoiceOptionEditorView.tsx");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








let FieldEditorView = class FieldEditorView extends react__WEBPACK_IMPORTED_MODULE_3__["Component"] {
    constructor(props) {
        super(props);
    }
    updateOptions(options) {
        this.props.store.editorStore.field.componentProps["options"] = options;
    }
    onOk() {
        this.props.store.editorStore.setEditable(null);
    }
    onCancel() {
    }
    render() {
        let { editorStore } = this.props.store;
        let { field } = editorStore;
        return field && react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Drawer"], { title: `Field ${field.name} (id=${field.id || ''} class=${field.className})`, width: 700, onClose: () => editorStore.setEditable(null), visible: editorStore.showFieldEditor, style: { overflow: 'auto', height: 'calc(80% - 108px)', paddingBottom: '108px' } }, react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Tabs"], { size: "small" },
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Tabs"].TabPane, { tab: "Properties", key: "1" },
                react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Row"], null,
                    react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: 24 },
                        react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_partials_PropertiesView__WEBPACK_IMPORTED_MODULE_5__["default"], { store: this.props.store })))),
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Tabs"].TabPane, { tab: "Validation", key: "2" },
                react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Row"], null,
                    react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: 24 },
                        react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_partials_ValidationView__WEBPACK_IMPORTED_MODULE_6__["ValidationView"], { store: this.props.store })))),
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Tabs"].TabPane, { tab: "Condition", key: "3" },
                react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Row"], null,
                    react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: 24 },
                        react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_partials_ConditionsView__WEBPACK_IMPORTED_MODULE_4__["ConditionsView"], { store: this.props.store })))),
            ['select', 'radiogroup', 'checkboxgroup'].indexOf(field.inputType) && react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Tabs"].TabPane, { tab: "Options", key: "4" },
                react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Row"], null,
                    react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: 24 },
                        react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_partials_ChoiceOptionEditorView__WEBPACK_IMPORTED_MODULE_7__["default"], { type: "select", items: field.componentProps['options'], onChange: this.updateOptions }))))));
    }
};
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"].bound
], FieldEditorView.prototype, "updateOptions", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"]
], FieldEditorView.prototype, "onOk", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"]
], FieldEditorView.prototype, "onCancel", null);
FieldEditorView = __decorate([
    mobx_react__WEBPACK_IMPORTED_MODULE_1__["observer"]
], FieldEditorView);



/***/ }),

/***/ "./src/components/editors/field/partials/ChoiceOptionEditorView.tsx":
/*!**************************************************************************!*\
  !*** ./src/components/editors/field/partials/ChoiceOptionEditorView.tsx ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd/lib/form/Form */ "./node_modules/antd/lib/form/Form.js");
/* harmony import */ var antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mobx */ "./node_modules/mobx/lib/mobx.module.js");
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/dist/mobx-react.module.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_drag_listview__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-drag-listview */ "./node_modules/react-drag-listview/es/index.js");
/* harmony import */ var react_highlight_words__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-highlight-words */ "./node_modules/react-highlight-words/dist/main.js");
/* harmony import */ var react_highlight_words__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_highlight_words__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _common_FormLayoutCommon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../common/FormLayoutCommon */ "./src/components/editors/common/FormLayoutCommon.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








let ChoiceOptionEditorView = class ChoiceOptionEditorView extends react__WEBPACK_IMPORTED_MODULE_4__["Component"] {
    constructor(props) {
        super(props);
        this.showAddChoiceItem = (show) => {
            this.showAdd = show;
        };
        this.addChoiceOption = (e) => {
            console.log("Adding", e);
            // this.items.push({label: this.label, value: this.value});
            // this.props.onChange(this.items);
        };
        this.getColumnSearchProps = (dataIndex) => ({
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, }) => (react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("div", { style: { padding: 8 } },
                react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Input"], { ref: node => { this.setSearchInput(node); }, placeholder: `Search ${dataIndex}`, value: selectedKeys[0], onChange: e => setSelectedKeys(e.target.value ? [e.target.value] : []), onPressEnter: () => this.handleSearch(selectedKeys, confirm), style: { width: 188, marginBottom: 8, display: 'block' } }),
                react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Button"], { type: "primary", onClick: () => this.handleSearch(selectedKeys, confirm), icon: "search", size: "small", style: { width: 90, marginRight: 8 } }, "Search"),
                react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Button"], { onClick: () => this.handleReset(clearFilters), size: "small", style: { width: 90 } }, "Reset"))),
            filterIcon: filtered => react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Icon"], { type: "search", style: { color: filtered ? '#1890ff' : undefined } }),
            onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => this.searchInput.select());
                }
            },
            render: (text) => (react__WEBPACK_IMPORTED_MODULE_4__["createElement"](react_highlight_words__WEBPACK_IMPORTED_MODULE_6___default.a, { highlightStyle: { backgroundColor: '#ffc069', padding: 0 }, searchWords: [this.searchText], autoEscape: true, textToHighlight: text.toString() })),
        });
        this.handleSearch = (selectedKeys, confirm) => {
            confirm();
            this.searchText = selectedKeys[0];
        };
        this.handleReset = (clearFilters) => {
            clearFilters();
            this.searchText = '';
        };
        this.initialize(props);
    }
    initialize(props) {
        this.type = props.type;
        this.items = props.items;
        this.value = null;
        this.label = null;
        this.isEditing = false;
    }
    move(fromIndex, toIndex) {
        this.items.splice(toIndex, 0, this.items.splice(fromIndex, 1)[0]);
        this.props.onChange(this.items);
    }
    edit(record) {
        this.isEditing = true;
        this.label = record.label;
        this.value = record.value;
    }
    remove(index) {
        this.items.splice(index, 1);
        this.props.onChange(this.items);
    }
    setSearchInput(node) {
        this.searchInput = node;
    }
    get uniqueValuePattern() {
        let allValues = this.items.map((item) => {
            return item.value;
        });
        return new RegExp(`^((?!(${allValues.join("|")})).)*$`, "gi");
    }
    render() {
        console.log("COEV - PRERENDER", this.props);
        let columns = [{
                title: '',
                key: "operate",
                render: (text, record, index) => react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("span", { style: { float: 'right', marginRight: '20%' } },
                    react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Icon"], { className: "drag-handle", type: "drag" }))
            }, Object.assign({ title: 'Label', dataIndex: 'label', key: 'label', sorter: true }, this.getColumnSearchProps('label')), Object.assign({ title: 'Value', dataIndex: 'value', key: 'value', sorter: true }, this.getColumnSearchProps('value')), {
                title: 'Actions',
                key: 'action',
                render: (text, record) => (react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("span", null,
                    react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Button"], { shape: "circle", type: "default", onClick: () => { this.edit(record); }, icon: "tool", size: "small", style: { marginLeft: '5px', marginRight: '5px' } }),
                    react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Button"], { shape: "circle", type: "danger", onClick: () => { this.remove(record.index); }, icon: "delete", size: "small", style: { marginLeft: '5px', marginRight: '5px' } }))),
            }];
        let rows = [];
        this.items.forEach((item, index) => {
            rows.push({ index: index, label: item.label, value: item.value, key: index });
        });
        let { getFieldDecorator } = this.props.form;
        return react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Card"], { size: "small", bodyStyle: { padding: 0 }, bordered: false },
            this.items.length == 0 && react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Empty"], { description: react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("span", null, "No options on this field") }),
            this.items.length > 0 && react__WEBPACK_IMPORTED_MODULE_4__["createElement"](react_drag_listview__WEBPACK_IMPORTED_MODULE_5__["default"], { onDragEnd: this.move, handleSelector: "i", nodeSelector: "tr.ant-table-row" },
                react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Table"], { size: "small", pagination: rows.length > 5 ? { position: 'bottom' } : false, dataSource: rows, columns: columns, rowKey: 'key', footer: () => this.showAdd ? react__WEBPACK_IMPORTED_MODULE_4__["createElement"](react__WEBPACK_IMPORTED_MODULE_4__["Fragment"], null) : react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Button"], { onClick: (e) => this.showAddChoiceItem(true) }, "Add") })),
            this.showAdd && react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Card"], { title: "Add option", size: "small", style: { marginTop: '15px' } },
                react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_0___default.a, Object.assign({}, _common_FormLayoutCommon__WEBPACK_IMPORTED_MODULE_7__["formItemLayout"], { layout: "horizontal", onSubmit: (e) => this.addChoiceOption(e) }),
                    react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_0___default.a.Item, { help: "Enter the label shown to the user (must be unique)", label: "Label" }, getFieldDecorator('label', {
                        valuePropName: 'label',
                        rules: [
                            { type: 'string' },
                            { required: true, message: 'A label is required' }
                        ]
                    })(react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Input"], null))),
                    react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_0___default.a.Item, { help: "Enter the value that will be submitted (must be unique)", label: "Value" }, getFieldDecorator('value', {
                        valuePropName: 'value',
                        rules: [{ type: 'string' },
                            { required: true, message: 'A value is required' },
                            { pattern: this.uniqueValuePattern, message: "Invalid value, must be unique" }
                        ]
                    })(react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Input"], null))),
                    react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_0___default.a.Item, Object.assign({}, _common_FormLayoutCommon__WEBPACK_IMPORTED_MODULE_7__["tailFormItemLayout"]),
                        react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Button"], { type: "danger", style: { marginRight: '15px' }, onClick: () => this.showAddChoiceItem(false) }, "Cancel"),
                        react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Button"], { type: "primary", htmlType: "submit" }, "Save")))));
    }
};
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["observable"]
], ChoiceOptionEditorView.prototype, "type", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["observable"]
], ChoiceOptionEditorView.prototype, "items", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["observable"]
], ChoiceOptionEditorView.prototype, "label", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["observable"]
], ChoiceOptionEditorView.prototype, "value", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["observable"]
], ChoiceOptionEditorView.prototype, "isEditing", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["observable"]
], ChoiceOptionEditorView.prototype, "searchInput", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["observable"]
], ChoiceOptionEditorView.prototype, "showAdd", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["observable"]
], ChoiceOptionEditorView.prototype, "searchText", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"]
], ChoiceOptionEditorView.prototype, "showAddChoiceItem", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"]
], ChoiceOptionEditorView.prototype, "initialize", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"].bound
], ChoiceOptionEditorView.prototype, "move", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"]
], ChoiceOptionEditorView.prototype, "edit", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"]
], ChoiceOptionEditorView.prototype, "addChoiceOption", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"]
], ChoiceOptionEditorView.prototype, "remove", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"].bound
], ChoiceOptionEditorView.prototype, "setSearchInput", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["computed"]
], ChoiceOptionEditorView.prototype, "uniqueValuePattern", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"]
], ChoiceOptionEditorView.prototype, "handleSearch", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"]
], ChoiceOptionEditorView.prototype, "handleReset", void 0);
ChoiceOptionEditorView = __decorate([
    mobx_react__WEBPACK_IMPORTED_MODULE_3__["observer"]
], ChoiceOptionEditorView);
const WrappedChoiceOptionEditorView = antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_0___default.a.create({ name: 'ChoiceOptionEditorView' })(ChoiceOptionEditorView);
/* harmony default export */ __webpack_exports__["default"] = (WrappedChoiceOptionEditorView);


/***/ }),

/***/ "./src/components/editors/field/partials/ConditionsView.tsx":
/*!******************************************************************!*\
  !*** ./src/components/editors/field/partials/ConditionsView.tsx ***!
  \******************************************************************/
/*! exports provided: ConditionsView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConditionsView", function() { return ConditionsView; });
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx */ "./node_modules/mobx/lib/mobx.module.js");
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/dist/mobx-react.module.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_FormLayoutCommon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/FormLayoutCommon */ "./src/components/editors/common/FormLayoutCommon.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





let ConditionsView = class ConditionsView extends react__WEBPACK_IMPORTED_MODULE_3__["Component"] {
    constructor(props) {
        super(props);
        this.setField = (e) => {
            this.field = e;
        };
        this.setExpression = (e) => {
            this.expression = e;
        };
        this.setValue = (e) => {
            this.value = e.target.value;
        };
        this.setOperator = (e) => {
            this.operator = e;
        };
        this.handleSubmit = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.addPredicate({
                field: this.field,
                condition: this.expression,
                value: this.value,
                operator: this.operator
            });
            this.cancel();
        };
        this.initialize(props);
    }
    initialize(props) {
        this.field = null;
        this.expression = null;
        this.value = null;
        this.operator = null;
        this.isAdding = false;
    }
    addPredicate(p) {
        let { editorStore } = this.props.store;
        editorStore.addPredicate(p);
        return;
    }
    removePredicate(uuid) {
        let { editorStore } = this.props.store;
        editorStore.removePredicate(uuid);
    }
    cancel() {
        this.isAdding = false;
        this.field = null;
        this.expression = null;
        this.value = null;
        this.operator = null;
    }
    setIsAdding(value) {
        this.isAdding = value;
    }
    render() {
        let { field, availableConditionSources, availableExpressions, availableOperators, numPredicates } = this.props.store.editorStore;
        let columns = [
            { title: 'Field', dataIndex: 'field', key: 'field' },
            { title: 'Condition', dataIndex: 'condition', key: 'condition' },
            { title: 'Value', dataIndex: 'value', key: 'value' },
            { title: 'Operator', dataIndex: 'operator', key: 'operator' },
            { title: 'Action', key: 'action',
                render: (text, record) => (react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("span", null,
                    react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("a", { href: "javascript:;", onClick: (e) => this.removePredicate(record.uuid) }, "Delete"))),
            }
        ];
        return react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", null,
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Card"], { title: "Conditions", size: "small", bodyStyle: { padding: 0 }, actions: [react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Button"], { style: { visibility: numPredicates == 0 ? 'visible' : 'hidden' }, onClick: () => this.setIsAdding(true) }, "Add")] },
                numPredicates > 0 && react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", null,
                    react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Table"], { size: "small", pagination: numPredicates > 5 ? { position: 'bottom' } : false, dataSource: field.condition.predicates || [], columns: columns, rowKey: 'uuid' })),
                numPredicates == 0 && react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Empty"], { description: react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("span", null, "No conditional rendering on this field") })),
            this.isAdding && react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Card"], { size: "small", title: "Add condition", bodyStyle: { padding: '8px' }, style: { marginTop: '15px' } },
                react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Form"], Object.assign({ layout: "horizontal" }, _common_FormLayoutCommon__WEBPACK_IMPORTED_MODULE_4__["formItemLayout"], { onSubmit: (e) => this.handleSubmit(e) }),
                    react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Form"].Item, { label: "Source field", help: "Field the condition will get its source value from", required: true },
                        react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Select"], { showSearch: true, onChange: (e) => this.setField(e), value: this.field }, availableConditionSources.map((f) => {
                            return react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Select"].Option, { key: f.id, value: f.id, disabled: field.id == f.id }, f.name);
                        }))),
                    react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Form"].Item, { label: "Expression", help: "The expression to evaluate", required: true },
                        react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Select"], { onChange: (e) => this.setExpression(e), value: this.expression }, availableExpressions.map((e) => {
                            return react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Select"].Option, { key: e.value, value: e.value }, e.name);
                        }))),
                    react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Form"].Item, { label: "Value", help: "The target value", required: !this.expression || this.expression.indexOf('hasval') > -1 || !this.field },
                        react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Input"], { type: "text", disabled: !this.expression || this.expression.indexOf('hasval') > -1 || !this.field, onChange: (e) => this.setValue(e) })),
                    react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Form"].Item, { label: "Operator", help: "Operator to combine conditions" },
                        react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Select"], { onChange: (e) => this.setOperator(e), value: this.operator, disabled: numPredicates == 0 }, availableOperators.map((e) => {
                            return react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Select"].Option, { key: e.value, value: e.value }, e.name);
                        }))),
                    react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Form"].Item, Object.assign({}, _common_FormLayoutCommon__WEBPACK_IMPORTED_MODULE_4__["tailFormItemLayout"]),
                        react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Button"], { style: { marginRight: '15px' }, icon: "plus", htmlType: "submit", type: "primary", disabled: !this.field || !this.expression }, "Add"),
                        react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Button"], { type: "danger", onClick: () => this.cancel() }, "Cancel")))));
    }
};
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_1__["observable"]
], ConditionsView.prototype, "field", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_1__["observable"]
], ConditionsView.prototype, "expression", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_1__["observable"]
], ConditionsView.prototype, "value", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_1__["observable"]
], ConditionsView.prototype, "operator", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_1__["observable"]
], ConditionsView.prototype, "isAdding", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_1__["action"]
], ConditionsView.prototype, "initialize", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_1__["action"]
], ConditionsView.prototype, "setField", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_1__["action"]
], ConditionsView.prototype, "setExpression", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_1__["action"]
], ConditionsView.prototype, "setValue", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_1__["action"]
], ConditionsView.prototype, "setOperator", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_1__["action"]
], ConditionsView.prototype, "addPredicate", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_1__["action"]
], ConditionsView.prototype, "removePredicate", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_1__["action"]
], ConditionsView.prototype, "cancel", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_1__["action"]
], ConditionsView.prototype, "handleSubmit", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_1__["action"]
], ConditionsView.prototype, "setIsAdding", null);
ConditionsView = __decorate([
    mobx_react__WEBPACK_IMPORTED_MODULE_2__["observer"]
], ConditionsView);



/***/ }),

/***/ "./src/components/editors/field/partials/EditableFieldProperties.tsx":
/*!***************************************************************************!*\
  !*** ./src/components/editors/field/partials/EditableFieldProperties.tsx ***!
  \***************************************************************************/
/*! exports provided: makeProp, FieldPropertiesMap, asDecoratedProperty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeProp", function() { return makeProp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FieldPropertiesMap", function() { return FieldPropertiesMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asDecoratedProperty", function() { return asDecoratedProperty; });
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);



const makeProp = (key, label, type, other = {}) => {
    let { options, rules, formatKey, formatValue, help, defaultValue } = other;
    return { key: key, label: label, type: type, options: options, rules: rules, formatKey: formatKey, formatValue: formatValue, help: help, defaultValue: defaultValue };
};
const basicProps = [
    makeProp("name", "Name", 'string', { rules: [{ type: "string" }, { required: true, message: "A name is required" }] }),
    makeProp("label", "Label", 'string', [{ type: "string" }, { required: true, message: "A label is required" }]),
    makeProp("helpText", "Help Text", 'text')
];
const ValuePropName = makeProp("fo_valuePropName", "Value Property Name", 'string', { rules: [
        { type: 'string' },
        { required: true, message: 'A value property name is required' },
        { pattern: /^[aA-zZ]+[\w\_]{0,}$/, message: 'Invalid Property Name' },
    ], help: "Starts with an alphabet followed by alphabets, underscores or numbers" });
const FieldPropertiesMap = {
    "input": [
        ...basicProps,
        ValuePropName,
        makeProp("c_placeholder", "Placeholder", 'string'),
        makeProp("c_defaultValue", "Default Value", 'string'),
        { key: "c_size", label: "Size", type: 'options', options: [
                { label: "default", value: "default" },
                { label: "small", value: "small" },
                { label: "large", value: "large" }
            ],
            defaultValue: 'default' }
    ],
    "radio": [
        ...basicProps,
        ValuePropName,
        makeProp("c_placeholder", "Placeholder", 'string'),
        makeProp("c_defaultChecked", "boolean", 'string'),
    ],
    "checkbox": [
        ...basicProps,
        ValuePropName,
        makeProp("c_defaultChecked", "Checked", 'boolean'),
    ],
    "number": [
        ...basicProps,
        ValuePropName,
        makeProp("c_placeholder", "Placeholder", 'number'),
        makeProp("c_defaultValue", "Default Value", 'number')
    ],
    "select": [
        ...basicProps,
        ValuePropName,
        makeProp("c_defaultValue", "Default Value", 'string'),
    ],
    "cascader": [
        ...basicProps,
        ValuePropName,
        makeProp("c_defaultValue", "Default Value", 'string')
    ],
    "radiogroup": [
        ...basicProps,
        ValuePropName,
        makeProp("c_defaultValue", "Default Value", 'string')
    ],
    "checkboxgroup": [
        ...basicProps,
        ValuePropName,
        makeProp("c_defaultValue", "Default Value", 'string')
    ],
    "textarea": [
        ...basicProps,
        ValuePropName,
        makeProp("c_defaultValue", "Default Value", 'string')
    ],
    "textblock": [
        ...basicProps,
        makeProp("c_defaultValue", "Content", 'string')
    ],
    "datepicker": [
        ...basicProps,
        ValuePropName,
        { key: "c_dateFormat", label: "Date Format", type: "options", options: [
                { value: "DD-MM-YYYY", label: "DD-MM-YYYY" },
                { value: "MM-DD-YYYY", label: "MM-DD-YYYY" },
                { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
                { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
                { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
                { value: "YYYY/MM/DD", label: "YYYY/MM/DD" }
            ], defaultValue: "YYYY-MM-DD" }
    ],
    "daterange": [
        ...basicProps,
        { key: "c_dateFormat", label: "Date Format", type: "options", options: [
                { value: "DD-MM-YYYY", label: "DD-MM-YYYY" },
                { value: "MM-DD-YYYY", label: "MM-DD-YYYY" },
                { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
                { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
                { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
                { value: "YYYY/MM/DD", label: "YYYY/MM/DD" }
            ], defaultValue: "YYYY-MM-DD" },
        { key: "c_defaultStartValue", label: "Default Start Date", type: "date", formatKey: 'c_dateFormat' },
        { key: "c_defaultEndValue", label: "Default End Date", type: "date", formatKey: 'c_dateFormat' },
        { key: "c_startValuePropsName", label: "Start Date Property Name", type: "string", rules: [{ pattern: /^[aA-zZ][\w|_|0-9]+/, message: "Must be valid property name" }] },
        { key: "c_endValuePropsName", label: "Start Date Property Name", type: "string", rules: [{ pattern: /^[aA-zZ][\w|_|0-9]+/, message: "Must be valid property name" }] },
    ]
};
const asDecoratedProperty = (item, decorator, valueFn, config, index) => {
    let { key, label, type, options, rules, required, formatValue, formatKey, help, defaultValue } = config;
    let isCprop = key.indexOf("c_") > -1;
    let isFoProp = key.indexOf("fo_") > -1;
    let unprefixKey = isCprop ? key.replace("c_", "") : (isFoProp ? key.replace("fo_", "") : key);
    let initialValue = isCprop ? item.componentProps[unprefixKey] : (isFoProp ? item.fieldOptions[unprefixKey] : item[unprefixKey]);
    let format;
    if (type == 'date') {
        if (formatValue || formatKey) {
            // Fetch format from existing property on the field
            format = formatValue ? formatValue : valueFn(formatKey);
        }
        if (initialValue) {
            // ANTD requires this to be a moment object
            initialValue = moment__WEBPACK_IMPORTED_MODULE_2__(initialValue, format);
        }
    }
    let fragment;
    switch (type) {
        case "string":
            fragment = react__WEBPACK_IMPORTED_MODULE_1__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Input"], null);
            break;
        case "text":
            fragment = react__WEBPACK_IMPORTED_MODULE_1__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Input"].TextArea, null);
            break;
        case "boolean":
            fragment = react__WEBPACK_IMPORTED_MODULE_1__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Switch"], null);
            break;
        case "number":
            fragment = react__WEBPACK_IMPORTED_MODULE_1__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["InputNumber"], null);
            break;
        case "options": {
            fragment = react__WEBPACK_IMPORTED_MODULE_1__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Select"], null, options && options.map((opt, oi) => {
                return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Select"].Option, { key: oi, value: opt.value }, opt.label);
            }));
            break;
        }
        case "date":
            fragment = react__WEBPACK_IMPORTED_MODULE_1__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["DatePicker"], { format: format });
            break;
    }
    let value = (typeof initialValue != 'undefined' && initialValue != null) ? initialValue : defaultValue;
    let valuePropName = (item.inputType == 'checkbox' && unprefixKey == 'defaultChecked') ? 'checked' : 'value';
    return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Form"].Item, { label: label, required: required, key: index, help: help }, decorator(key, {
        valuePropName: valuePropName,
        initialValue: value,
        rules: rules
    })(fragment));
};


/***/ }),

/***/ "./src/components/editors/field/partials/PropertiesView.tsx":
/*!******************************************************************!*\
  !*** ./src/components/editors/field/partials/PropertiesView.tsx ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx */ "./node_modules/mobx/lib/mobx.module.js");
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/dist/mobx-react.module.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _EditableFieldProperties__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./EditableFieldProperties */ "./src/components/editors/field/partials/EditableFieldProperties.tsx");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





let PropertiesView = class PropertiesView extends react__WEBPACK_IMPORTED_MODULE_3__["Component"] {
    constructor(props) {
        super(props);
        this.handleSubmit = (e) => {
            e.preventDefault();
            e.stopPropagation();
            let { field } = this.props.store.editorStore;
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    let merge = { componentProps: {}, fieldOptions: {} };
                    Object.keys(values).forEach((p) => {
                        if (p.indexOf("c_") == 0) {
                            // Component Property
                            merge.componentProps[p.replace("c_", "")] = values[p];
                        }
                        else if (p.indexOf("fo_") == 0) {
                            // Field Option Property
                            merge.fieldOptions[p.replace("fo_", "")] = values[p];
                        }
                        else {
                            merge[p] = values[p];
                        }
                    });
                    console.log("Merge object", merge);
                    console.log("Pre Update Field", Object(mobx__WEBPACK_IMPORTED_MODULE_1__["toJS"])(field));
                    field.mergeUpdate(merge);
                    console.log("Updated Field", Object(mobx__WEBPACK_IMPORTED_MODULE_1__["toJS"])(field));
                    antd__WEBPACK_IMPORTED_MODULE_0__["notification"].info({ message: `Field - ${field.label || field.name}`,
                        description: "Field properties applied successfully" });
                }
            });
            return;
        };
    }
    updateOptions(options) {
        this.props.store.editorStore.field.componentProps["options"] = options;
    }
    render() {
        let field = Object(mobx__WEBPACK_IMPORTED_MODULE_1__["toJS"])(this.props.store.editorStore.field);
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
            wrapperCol: {
                xs: { span: 18 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 21,
                },
                sm: {
                    span: 24,
                    offset: 21,
                },
            },
        };
        let { getFieldDecorator, getFieldValue } = this.props.form;
        let formItems = _EditableFieldProperties__WEBPACK_IMPORTED_MODULE_4__["FieldPropertiesMap"][field.inputType];
        return react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Form"], Object.assign({}, formItemLayout, { onSubmit: (e) => this.handleSubmit(e), layout: "horizontal" }),
            formItems && formItems.map((item, index) => {
                {
                    return Object(_EditableFieldProperties__WEBPACK_IMPORTED_MODULE_4__["asDecoratedProperty"])(field, getFieldDecorator, getFieldValue, item, index);
                }
            }),
            !formItems && react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Empty"], { description: react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("span", null, "No editable properties available for this field") }),
            formItems && react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Form"].Item, Object.assign({}, tailFormItemLayout),
                react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Button"], { type: "primary", htmlType: "submit", style: { marginTop: '15px' } }, "Apply")));
    }
};
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_1__["action"].bound
], PropertiesView.prototype, "updateOptions", null);
PropertiesView = __decorate([
    mobx_react__WEBPACK_IMPORTED_MODULE_2__["observer"]
], PropertiesView);
const WrappedPropertiesView = antd__WEBPACK_IMPORTED_MODULE_0__["Form"].create({ name: 'PropertiesView' })(PropertiesView);
/* harmony default export */ __webpack_exports__["default"] = (WrappedPropertiesView);


/***/ }),

/***/ "./src/components/editors/field/partials/ValidationListView.tsx":
/*!**********************************************************************!*\
  !*** ./src/components/editors/field/partials/ValidationListView.tsx ***!
  \**********************************************************************/
/*! exports provided: ValidationListView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidationListView", function() { return ValidationListView; });
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/dist/mobx-react.module.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _kartikrao_lib_forms_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @kartikrao/lib-forms-core */ "./node_modules/@kartikrao/lib-forms-core/lib/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




let ValidationListView = class ValidationListView extends react__WEBPACK_IMPORTED_MODULE_2__["Component"] {
    constructor(props) {
        super(props);
    }
    render() {
        let columns = [{
                title: 'Rule',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Constraints',
                dataIndex: 'constraint',
                key: 'constraint',
                render: (text, record) => {
                    return react__WEBPACK_IMPORTED_MODULE_2__["createElement"](react__WEBPACK_IMPORTED_MODULE_2__["Fragment"], null, Object.keys(record.constraint).map((key) => {
                        let value;
                        if (!Array.isArray(record.constraint[key])) {
                            value = [record.constraint[key]];
                        }
                        else {
                            value = record.constraint[key];
                        }
                        return key == 'message' ? null : react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { key: key },
                            react__WEBPACK_IMPORTED_MODULE_2__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Tag"], { key: `${key}-k` }, key),
                            react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", { key: `${key}-v` }, value.map((v, vi) => {
                                return react__WEBPACK_IMPORTED_MODULE_2__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Tag"], { key: `${key}-v-${vi}`, color: "#87d068" }, v);
                            })));
                    }));
                }
            },
            {
                title: 'Message',
                dataIndex: 'defaultMessage',
                key: 'defaultMessage',
            },
            {
                title: 'Actions',
                key: 'action',
                render: (text, record) => (react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", null,
                    react__WEBPACK_IMPORTED_MODULE_2__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Button"], { shape: "circle", type: "default", onClick: (e) => { this.props.onEdit(record.rule); }, icon: "tool", size: "small", style: { marginRight: '5px' } }),
                    react__WEBPACK_IMPORTED_MODULE_2__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Button"], { shape: "circle", type: "danger", onClick: (e) => { this.props.onRemove(record.rule); }, icon: "delete", size: "small" }))),
            }];
        let numConstraints = 0;
        let rows = [];
        if (this.props.validation && this.props.validation.constraints) {
            let { constraints } = this.props.validation;
            numConstraints = Object.keys(constraints).length;
            Object.keys(constraints).forEach((rule, index) => {
                let row = {};
                let { message } = constraints[rule];
                row.rule = rule;
                row.name = _kartikrao_lib_forms_core__WEBPACK_IMPORTED_MODULE_3__["ValidationRuleMap"][rule];
                row.key = index;
                row.defaultMessage = message;
                row.constraint = constraints[rule];
                rows.push(row);
            });
        }
        return react__WEBPACK_IMPORTED_MODULE_2__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Table"], { title: () => react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", null, "Validation rules"), size: "small", pagination: numConstraints > 5 ? { position: 'bottom' } : false, dataSource: rows, columns: columns, rowKey: 'key' });
    }
};
ValidationListView = __decorate([
    mobx_react__WEBPACK_IMPORTED_MODULE_1__["observer"]
], ValidationListView);



/***/ }),

/***/ "./src/components/editors/field/partials/ValidationView.tsx":
/*!******************************************************************!*\
  !*** ./src/components/editors/field/partials/ValidationView.tsx ***!
  \******************************************************************/
/*! exports provided: ValidationView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidationView", function() { return ValidationView; });
/* harmony import */ var _kartikrao_lib_forms_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @kartikrao/lib-forms-core */ "./node_modules/@kartikrao/lib-forms-core/lib/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mobx */ "./node_modules/mobx/lib/mobx.module.js");
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/dist/mobx-react.module.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ValidationListView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ValidationListView */ "./src/components/editors/field/partials/ValidationListView.tsx");
/* harmony import */ var _common_FormLayoutCommon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../common/FormLayoutCommon */ "./src/components/editors/common/FormLayoutCommon.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








let ValidationView = class ValidationView extends react__WEBPACK_IMPORTED_MODULE_5__["Component"] {
    constructor(props) {
        super(props);
        this.dateFormat = "YYYY-MM-DD";
        this.applyRule = () => {
            let { editorStore } = this.props.store;
            let ruleLabel = _kartikrao_lib_forms_core__WEBPACK_IMPORTED_MODULE_0__["ValidationRuleMap"][this.ruleType];
            if (this.isEditing == true) {
                editorStore.updateValidationRule(this.ruleType, this.properties);
                antd__WEBPACK_IMPORTED_MODULE_1__["notification"].info({ message: `Field - ${editorStore.field.label || editorStore.field.name}`,
                    description: `Rule "${ruleLabel}" saved`, duration: 7 });
            }
            else {
                editorStore.addValidationRule(this.ruleType, this.properties);
                antd__WEBPACK_IMPORTED_MODULE_1__["notification"].info({ message: `Field - ${editorStore.field.label || editorStore.field.name}`,
                    description: `Rule ${ruleLabel} added`, duration: 7 });
            }
            this.cancel();
        };
        this.onEdit = (rule) => {
            let { editorStore } = this.props.store;
            this.isEditing = true;
            this.ruleType = rule;
            this.properties = editorStore.field.validator.rule[rule];
        };
        this.initialize(props);
    }
    initialize(props) {
        this.ruleType = null;
        this.properties = {};
        this.isEditing = false;
        this.isAdding = false;
    }
    setRuleType(type) {
        this.ruleType = type;
    }
    setRuleProperty(name, value) {
        this.properties = Object.assign({}, this.properties, { [name]: value });
    }
    cancel() {
        this.ruleType = null;
        this.properties = {};
        this.isEditing = false;
        this.isAdding = false;
    }
    get isRuleValid() {
        let { ruleType, properties } = this;
        if (!ruleType) {
            return false;
        }
        let isValid = false;
        switch (this.ruleType) {
            case "datetime": {
                isValid = properties['latest'] || properties['latest'];
                break;
            }
            case "date": {
                isValid = properties['latest'] || properties['latest'];
                break;
            }
            case "equality": {
                isValid = !!properties['attribute'];
                break;
            }
            case "exclusion": {
                isValid = !!properties['within'];
                break;
            }
            case "inclusion": {
                isValid = !!properties['within'];
                break;
            }
            case "format": {
                isValid = !!properties['pattern'];
                break;
            }
            case "length": {
                isValid = (!properties['minimum'] && !properties['maximum'] && properties['is']) || ((properties['minimum'] || properties['maximum']) && !properties['is']);
                break;
            }
            case "numericality": {
                if (properties['is']) {
                    isValid = properties['strict'] ? Object.keys(properties).length == 2 : false;
                }
                else {
                    isValid = Object.keys(properties).length > 0;
                }
                break;
            }
            case "presence": {
                isValid = !!properties['message'];
                break;
            }
            case "url": {
                isValid = !!properties['url'];
                break;
            }
            default: {
                isValid = false;
            }
        }
        return isValid;
    }
    setIsAdding(isAdding) {
        this.isAdding = isAdding;
    }
    render() {
        let { editorStore } = this.props.store;
        let { field } = editorStore;
        let fieldList = [];
        let hasValidation = Object.keys(field.validator.rule.constraints).length > 0;
        Object.keys(Object(mobx__WEBPACK_IMPORTED_MODULE_2__["toJS"])(editorStore.formStore.idFieldMap)).map((id) => {
            fieldList.push(editorStore.formStore.idFieldMap[id]);
        });
        let availableRules = _kartikrao_lib_forms_core__WEBPACK_IMPORTED_MODULE_0__["ValidationRuleNames"].filter((rule) => {
            let rules = _kartikrao_lib_forms_core__WEBPACK_IMPORTED_MODULE_0__["ValidationAllowedRules"][field.inputType];
            return rules && rules.length > 0 && rules.indexOf(rule.key) > -1;
        });
        return react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", null,
            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Card"], { size: "small", bodyStyle: { padding: '0' }, actions: [react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("span", { style: { visibility: availableRules.length > 0 ? 'visible' : 'hidden' } },
                        react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Button"], { size: "small", onClick: () => this.setIsAdding(true) }, "Add"))] },
                !hasValidation && react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Empty"], { description: react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("span", null, availableRules.length > 0 ? "No validation set on this field" : "No validation available for this field") }),
                !!hasValidation && react__WEBPACK_IMPORTED_MODULE_5__["createElement"](_ValidationListView__WEBPACK_IMPORTED_MODULE_6__["ValidationListView"], { validation: field.validator.rule, onEdit: this.onEdit, onRemove: editorStore.removeValidationRule })),
            (this.isAdding || this.isEditing) && react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Card"], { size: "small", bodyStyle: { padding: '8px' }, style: { marginTop: '15px' }, title: `${this.isEditing == true ? "Edit" : "Add"} Rule ${this.ruleType ? ' - ' + this.ruleType : ''}` },
                react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"], Object.assign({ layout: "horizontal" }, _common_FormLayoutCommon__WEBPACK_IMPORTED_MODULE_7__["formItemLayout"]),
                    react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Rule" },
                        react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Select"], { onChange: (e) => this.setRuleType(e), style: { width: 200 }, placeholder: "Select a rule to apply", value: this.ruleType }, availableRules.map((rule) => {
                            return react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Select"].Option, { disabled: !!field.validator.rule[rule.value], key: rule.key, value: rule.value }, rule.label);
                        }))),
                    this.ruleType && react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Message", help: `Shown when '${this.ruleType}' validation fails` },
                        react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Input"], { type: "text", value: this.properties.message, onChange: (e) => this.setRuleProperty('message', e.target.value) })),
                    this.ruleType && this.ruleType.indexOf('date') > -1 && react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", null,
                        react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Constraint - Not before", help: "Entered date cannot be before this date", required: !this.properties['latest'] },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["DatePicker"], { value: this.properties.earliest ? moment__WEBPACK_IMPORTED_MODULE_4___default()(this.properties.earliest, this.dateFormat) : null, onChange: (e) => {
                                    e ? this.setRuleProperty('earliest', e.format(this.dateFormat)) : this.setRuleProperty('earliest', undefined);
                                } })),
                        this.properties.earliest && react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Message - Not Before", help: "Shown when 'Not Before' validation fails (optional)" },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Input"], { value: this.properties.tooEarly, type: "text", onChange: (e) => this.setRuleProperty('tooEarly', e.target.value) })),
                        react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Constraint - Not after", help: "Entered date cannot be after this date", required: !this.properties['earliest'] },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["DatePicker"], { value: this.properties.latest ? moment__WEBPACK_IMPORTED_MODULE_4___default()(this.properties.latest, this.dateFormat) : null, onChange: (e) => {
                                    e ? this.setRuleProperty('latest', e.format(this.dateFormat)) : this.setRuleProperty('latest', undefined);
                                } })),
                        this.properties.latest && react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Message - Not After", help: "Shown when 'Not After' validation fails (optional)" },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Input"], { value: this.properties.tooLate, type: "text", onChange: (e) => this.setRuleProperty('tooLate', e.target.value) }))),
                    this.ruleType == 'equality' && react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", null,
                        react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Constraint - Matches", help: "Value should match field", required: true },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Select"], { value: this.properties.attribute, placeholder: "Select a field", onChange: (e) => { this.setRuleProperty('attribute', e); }, style: { width: 200 } }, fieldList.map((f) => {
                                return react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Select"].Option, { key: f.id, value: f.id, disabled: f.id == field.id },
                                    f.name,
                                    " - (",
                                    f.type || f.inputType,
                                    ")");
                            })))),
                    this.ruleType == 'exclusion' && react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", null,
                        react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Constraint - Not Within", help: "Value should not be one of (comma separated list)", required: true },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Input"], { type: "text", value: this.properties.within, onChange: (e) => {
                                    e && e.target.value ? this.setRuleProperty('within', e.target.value.split(',')) : this.setRuleProperty('within', null);
                                } }))),
                    this.ruleType == 'inclusion' && react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", null,
                        react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Constraint - Within", help: "Value must be one of (comma separated list)", required: true },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Input"], { type: "text", value: this.properties.within, onChange: (e) => {
                                    e && e.target.value ? this.setRuleProperty('within', e.target.value.split(',')) : this.setRuleProperty('within', null);
                                } }))),
                    this.ruleType == 'format' && react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", null,
                        react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Constraint - RegEx", help: "Value must match regular expression", required: true },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Input"], { type: "text", value: this.properties.pattern, onChange: (e) => {
                                    e && e.target.value ? this.setRuleProperty('pattern', e.target.value) : this.setRuleProperty('pattern', "/*/");
                                } })),
                        react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Option - Flags", help: "Regular expression flags - i|g|m", required: true },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Input"], { type: "text", value: this.properties.flags, onChange: (e) => {
                                    e && e.target.value ? this.setRuleProperty('flags', e.target.value) : this.setRuleProperty('flags', "i");
                                } }))),
                    this.ruleType == 'length' && react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", null,
                        react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Constraint - Exactly", help: "Value length must be exactly" },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["InputNumber"], { type: "text", value: this.properties.is, onChange: (e) => {
                                    if (e != null) {
                                        this.setRuleProperty('maximum', null);
                                        this.setRuleProperty('minimum', null);
                                        this.setRuleProperty('is', e);
                                    }
                                } })),
                        this.properties['is'] && react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Message - Exactly", help: "Shown when 'Exactly' validation fails (optional)" },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Input"], { type: "text", value: this.properties.wrongLength, onChange: (e) => this.setRuleProperty('wrongLength', e.target.value) })),
                        react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Constraint - Minimum", help: "Value length must be at least" },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["InputNumber"], { type: "text", value: this.properties.minimum, disabled: !!this.properties['is'], onChange: (e) => {
                                    e != null ? this.setRuleProperty('minimum', e) : this.setRuleProperty('minimum', -1);
                                } })),
                        this.properties['minimum'] && react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Message - Minimum", help: "Shown when 'Minimum' validation fails (optional)" },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Input"], { type: "text", value: this.properties.tooShort, onChange: (e) => this.setRuleProperty('tooShort', e.target.value) })),
                        react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Constraint - Maximum", help: "Value length must be at most" },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["InputNumber"], { type: "text", value: this.properties.maximum, disabled: !!this.properties['is'], onChange: (e) => {
                                    e != null ? this.setRuleProperty('maximum', e) : this.setRuleProperty('maximum', null);
                                } })),
                        this.properties['maximum'] && react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Message - Maximum", help: "Shown when 'Maximum' validation fails (optional)" },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Input"], { type: "text", value: this.properties.tooLong, onChange: (e) => this.setRuleProperty('tooLong', e.target.value) }))),
                    this.ruleType == 'numericality' && react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", null,
                        react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Constraint - Integer", help: "Value must be an integer" },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Checkbox"], { checked: this.properties.integerOnly, onChange: (e) => { this.setRuleProperty('integerOnly', e.target.value); } })),
                        react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Constraint - Greater Than", help: "Value must be greater than" },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["InputNumber"], { value: this.properties.greaterThan, onChange: (e) => { this.setRuleProperty("greaterThan", e); } })),
                        this.properties['greaterThan'] && react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Message - Greater than", help: "Shown when 'Greater Than' validation fails (optional)" },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Input"], { type: "text", value: this.properties.notGreaterThan, onChange: (e) => this.setRuleProperty('notGreaterThan', e.target.value) })),
                        react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Constraint - Greater Than Equal To", help: "Value must be greater than or equal to" },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["InputNumber"], { value: this.properties.greaterThanOrEqualTo, onChange: (e) => { this.setRuleProperty("greaterThanOrEqualTo", e); } })),
                        this.properties['greaterThanOrEqualTo'] && react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Message - Greater than or equal to", help: "Shown when 'Exactly' validation fails (optional)" },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Input"], { type: "text", value: this.properties.notGreaterThanOrEqualTo, onChange: (e) => this.setRuleProperty('notGreaterThanOrEqualTo', e.target.value) })),
                        react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Constraint - Equal To", help: "Value must be exactly" },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["InputNumber"], { value: this.properties.equalTo, disabled: this.properties.greaterThanOrEqualTo || this.properties.lesserThanOrEqualTo || this.properties.greaterThan || this.properties.lesserThanThan, onChange: (e) => { this.setRuleProperty("equalTo", e); } })),
                        this.properties['equalTo'] && react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Message - Equal to", help: "Shown when 'Equal to' validation fails (optional)" },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Input"], { type: "text", value: this.properties.notEqualTo, onChange: (e) => this.setRuleProperty('notEqualTo', e.target.value) })),
                        react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Constraint - Less Than", help: "Value must be less than" },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["InputNumber"], { disabled: this.properties.equalTo, value: this.properties.lessThan, onChange: (e) => { this.setRuleProperty("lessThan", e); } })),
                        this.properties['lessThan'] && react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Message - Less than", help: "Shown when 'Less than' validation fails (optional)" },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Input"], { type: "text", value: this.properties.notLessThan, onChange: (e) => this.setRuleProperty('notLessThan', e.target.value) })),
                        react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Constraint - Less Than Equal To", help: "Value must be less than or equal to" },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["InputNumber"], { disabled: this.properties.equalTo, value: this.properties.lessThanOrEqualTo, onChange: (e) => { this.setRuleProperty("lessThanOrEqualTo", e); } })),
                        this.properties['lessThanOrEqualTo'] && react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Message - Less than or equal to", help: "Shown when 'Less than or equal to' validation fails (optional)" },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Input"], { type: "text", value: this.properties.notLessThanOrEqualTo, onChange: (e) => this.setRuleProperty('notLessThanOrEqualTo', e.target.value) })),
                        react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Constraint - Divisible By", help: "Value must be divisible by" },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["InputNumber"], { min: 2, value: this.properties.divisibleBy, disabled: this.properties.equalTo, onChange: (e) => { this.setRuleProperty("divisibleBy", e); } })),
                        this.properties['divisibleBy'] && react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Message - Not Divisible By", help: "Shown when 'Not Divisible By' validation fails (optional)" },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Input"], { type: "text", onChange: (e) => this.setRuleProperty('notDivisibleBy', e.target.value) })),
                        react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Constraint - Odd", help: "Value must be odd" },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Checkbox"], { checked: this.properties.odd, onChange: (e) => { this.setRuleProperty('odd', e.target.value); } })),
                        this.properties['odd'] && react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Message - Not Odd", help: "Shown when 'Not Odd' validation fails (optional)" },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Input"], { type: "text", value: this.properties.notOdd, onChange: (e) => this.setRuleProperty('notOdd', e.target.value) })),
                        react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Constraint - Even", help: "Value must be even" },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Checkbox"], { checked: this.properties.even, onChange: (e) => { this.setRuleProperty('even', e.target.value); } })),
                        this.properties['even'] && react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Message - Not Even", help: "Shown when 'Not Even' validation fails (optional)" },
                            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Input"], { type: "text", value: this.properties.notEven, onChange: (e) => this.setRuleProperty('notEven', e.target.value) }))),
                    react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, Object.assign({}, _common_FormLayoutCommon__WEBPACK_IMPORTED_MODULE_7__["tailFormItemLayout"], { style: { marginTop: '15px' } }),
                        react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Button"], { style: { marginRight: '10px' }, type: "primary", htmlType: "submit", disabled: !this.isRuleValid, onClick: this.applyRule }, this.isEditing == true ? "Apply" : "Add"),
                        react__WEBPACK_IMPORTED_MODULE_5__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Button"], { type: "danger", onClick: () => this.cancel() }, "Cancel")))));
    }
};
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["observable"]
], ValidationView.prototype, "ruleType", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["observable"]
], ValidationView.prototype, "properties", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["observable"]
], ValidationView.prototype, "isEditing", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["observable"]
], ValidationView.prototype, "isAdding", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"]
], ValidationView.prototype, "initialize", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"]
], ValidationView.prototype, "setRuleType", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"]
], ValidationView.prototype, "setRuleProperty", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"]
], ValidationView.prototype, "cancel", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["computed"]
], ValidationView.prototype, "isRuleValid", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"]
], ValidationView.prototype, "applyRule", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"]
], ValidationView.prototype, "onEdit", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"]
], ValidationView.prototype, "setIsAdding", null);
ValidationView = __decorate([
    mobx_react__WEBPACK_IMPORTED_MODULE_3__["observer"]
], ValidationView);



/***/ }),

/***/ "./src/components/editors/form/FormEditorView.tsx":
/*!********************************************************!*\
  !*** ./src/components/editors/form/FormEditorView.tsx ***!
  \********************************************************/
/*! exports provided: FormEditorView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormEditorView", function() { return FormEditorView; });
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx */ "./node_modules/mobx/lib/mobx.module.js");
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/dist/mobx-react.module.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _partials_FormContentSettingsView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./partials/FormContentSettingsView */ "./src/components/editors/form/partials/FormContentSettingsView.tsx");
/* harmony import */ var _partials_FormLayoutView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./partials/FormLayoutView */ "./src/components/editors/form/partials/FormLayoutView.tsx");
/* harmony import */ var _partials_FormPropertiesEditorView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./partials/FormPropertiesEditorView */ "./src/components/editors/form/partials/FormPropertiesEditorView.tsx");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







let FormEditorView = class FormEditorView extends react__WEBPACK_IMPORTED_MODULE_3__["Component"] {
    render() {
        let { editorStore } = this.props.store;
        let form = editorStore.formEditorVisible ? Object(mobx__WEBPACK_IMPORTED_MODULE_1__["toJS"])(editorStore.formStore.form) : null;
        return form && react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Drawer"], { title: `Form "${form.name}" `, onClose: () => editorStore.setFormEditorVisible(false), visible: editorStore.formEditorVisible == true, width: 700, style: { overflow: 'hidden' } }, react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Tabs"], { size: "small" },
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Tabs"].TabPane, { tab: "Settings", key: "1" },
                react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Row"], null,
                    react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: 24 },
                        react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_partials_FormPropertiesEditorView__WEBPACK_IMPORTED_MODULE_6__["default"], { store: this.props.store })))),
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Tabs"].TabPane, { tab: "Content", key: "2" },
                react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Row"], null,
                    react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: 24 },
                        react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_partials_FormContentSettingsView__WEBPACK_IMPORTED_MODULE_4__["default"], { store: this.props.store })))),
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Tabs"].TabPane, { tab: "Layout", key: "3" },
                react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Row"], null,
                    react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: 24 },
                        react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_partials_FormLayoutView__WEBPACK_IMPORTED_MODULE_5__["default"], { store: this.props.store }))))));
    }
};
FormEditorView = __decorate([
    mobx_react__WEBPACK_IMPORTED_MODULE_2__["observer"]
], FormEditorView);



/***/ }),

/***/ "./src/components/editors/form/partials/FormContentSettingsView.tsx":
/*!**************************************************************************!*\
  !*** ./src/components/editors/form/partials/FormContentSettingsView.tsx ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd/lib/form/Form */ "./node_modules/antd/lib/form/Form.js");
/* harmony import */ var antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mobx */ "./node_modules/mobx/lib/mobx.module.js");
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/dist/mobx-react.module.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _common_FormLayoutCommon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common/FormLayoutCommon */ "./src/components/editors/common/FormLayoutCommon.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let FormContentEditorView = class FormContentEditorView extends react__WEBPACK_IMPORTED_MODULE_4__["Component"] {
    constructor(props) {
        super(props);
        this.handleSubmit = (e) => {
            e.preventDefault();
            e.stopPropagation();
            let { form } = this.props.store.editorStore.formStore;
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    antd__WEBPACK_IMPORTED_MODULE_0__["notification"].info({ message: `Form - ${form.name}`,
                        description: "Form properties applied successfully" });
                    form.layout = values.layout;
                    form.formLayoutOptions = values.formLayoutOptions;
                }
            });
            return;
        };
        this.onChange = (key, value) => {
            Object(mobx__WEBPACK_IMPORTED_MODULE_2__["set"])(this, key, value);
        };
    }
    render() {
        let { getFieldDecorator } = this.props.form;
        let { editorStore } = this.props.store;
        if (!editorStore.formStore.form) {
            return react__WEBPACK_IMPORTED_MODULE_4__["createElement"](react__WEBPACK_IMPORTED_MODULE_4__["Fragment"], null);
        }
        let form = Object(mobx__WEBPACK_IMPORTED_MODULE_2__["toJS"])(editorStore.formStore.form);
        let { formLayoutOptions } = form;
        return react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_1___default.a, Object.assign({}, _common_FormLayoutCommon__WEBPACK_IMPORTED_MODULE_5__["formItemLayout"], { onSubmit: (e) => this.handleSubmit(e), layout: "horizontal" }),
            react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_1___default.a.Item, { label: "Validation disables paging", help: "Allow page navigation when validation failures exist on current page" }, getFieldDecorator('formLayoutOptions.validationDisablesPaging', {
                valuePropName: 'defaultChecked',
                initialValue: formLayoutOptions.validationDisablesPaging,
            })(react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Switch"], null))),
            react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_1___default.a.Item, { label: "Show Page Number", help: "Show current/total pages in the form header" }, getFieldDecorator('formLayoutOptions.showSteps', {
                valuePropName: 'defaultChecked',
                initialValue: formLayoutOptions.showSteps,
            })(react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Switch"], null))),
            react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_1___default.a.Item, { label: "Show Page Title", help: "Show the title of each page" }, getFieldDecorator('formLayoutOptions.showPageTitles', {
                valuePropName: 'defaultChecked',
                initialValue: formLayoutOptions.showPageTitles,
            })(react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Switch"], null))),
            react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_1___default.a.Item, { label: "Show Section Title", help: "Show section title above section content" }, getFieldDecorator('formLayoutOptions.showSectionTitles', {
                valuePropName: 'defaultChecked',
                initialValue: formLayoutOptions.showSectionTitles,
            })(react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Switch"], null))),
            react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_1___default.a.Item, { label: "Show Section Border", help: "Show borders around a section block" }, getFieldDecorator('formLayoutOptions.showSectionBorders', {
                valuePropName: 'defaultChecked',
                initialValue: formLayoutOptions.showSectionBorders,
            })(react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Switch"], null))),
            react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_1___default.a.Item, Object.assign({}, _common_FormLayoutCommon__WEBPACK_IMPORTED_MODULE_5__["tailFormItemLayout"]),
                react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Button"], { type: "primary", htmlType: "submit", style: { marginTop: '15px' } }, "Apply")));
    }
};
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["observable"]
], FormContentEditorView.prototype, "selectedFormLayout", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"].bound
], FormContentEditorView.prototype, "handleSubmit", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"].bound
], FormContentEditorView.prototype, "onChange", void 0);
FormContentEditorView = __decorate([
    mobx_react__WEBPACK_IMPORTED_MODULE_3__["observer"]
], FormContentEditorView);
const WrappedFormContentEditorView = antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_1___default.a.create({ name: 'FormContentEditorView' })(FormContentEditorView);
/* harmony default export */ __webpack_exports__["default"] = (WrappedFormContentEditorView);


/***/ }),

/***/ "./src/components/editors/form/partials/FormLayoutView.tsx":
/*!*****************************************************************!*\
  !*** ./src/components/editors/form/partials/FormLayoutView.tsx ***!
  \*****************************************************************/
/*! exports provided: FormLayoutView, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormLayoutView", function() { return FormLayoutView; });
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx */ "./node_modules/mobx/lib/mobx.module.js");
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/dist/mobx-react.module.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ItemLayoutView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ItemLayoutView */ "./src/components/editors/form/partials/ItemLayoutView.tsx");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





const formItemLayout = {
    labelCol: {
        xs: { span: 10 },
        sm: { span: 10 },
    },
    wrapperCol: {
        xs: { span: 14 },
        sm: { span: 14 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 6,
            offset: 18,
        },
        sm: {
            span: 6,
            offset: 18,
        },
    },
};
let FormLayoutView = class FormLayoutView extends react__WEBPACK_IMPORTED_MODULE_3__["Component"] {
    constructor(props) {
        super(props);
        this.handleSubmit = (e) => {
            e.preventDefault();
            e.stopPropagation();
            let { form } = this.props.store.editorStore.formStore;
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    form.layout = values.layout;
                    antd__WEBPACK_IMPORTED_MODULE_0__["notification"].info({ message: `Form - ${form.name}`,
                        description: `Form layout set to "${form.layout}" ` });
                }
            });
            return;
        };
        this.saveLayout = (layout) => {
            let { form } = this.props.store.editorStore.formStore;
            form.itemLayoutOptions = layout;
            antd__WEBPACK_IMPORTED_MODULE_0__["notification"].info({ message: `Form - ${form.name}`,
                description: "Field layout updated successfully" });
        };
        this.initialize(props);
    }
    initialize(props) {
        let { form } = props.store.formStore;
        this.selectedFormLayout = form.layout;
    }
    setProperty(key, e) {
        let value = e && typeof (e) == 'object' && e.target ? e.target.value : e;
        this[key] = value;
    }
    get hasFormLayoutChanged() {
        let { form } = this.props.store.editorStore.formStore;
        return this.selectedFormLayout != form.layout;
    }
    render() {
        let { getFieldDecorator } = this.props.form;
        let { form } = this.props.store.editorStore.formStore;
        return react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", null,
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Form"], Object.assign({}, formItemLayout, { onSubmit: (e) => this.handleSubmit(e), layout: "horizontal" }),
                react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("p", null, "Change form layout to render labels next to or above fields, add field layouts for fine grained control of rendering on a variety of screen sizes."),
                react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Divider"], null),
                react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Form"].Item, { label: "Form Layout", help: react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("ul", null,
                        react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("li", null, "Horizontal\uFF1ALabels placed next to controls."),
                        react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("li", null, "Vertical\uFF1ALabels placed above controls (default)."),
                        react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("li", null, "Inline\uFF1AAll controls render in one line.")) }, getFieldDecorator('selectedFormLayout', {
                    initialValue: this.selectedFormLayout,
                    rules: [
                        { type: 'string' },
                        { required: true, message: 'A Layout is required' }
                    ]
                })(react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Select"], { onChange: (e) => { this.setProperty('selectedFormLayout', e); } },
                    react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Select"].Option, { key: "horizontal" }, "Horizontal"),
                    react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Select"].Option, { key: "vertical" }, "Vertical"),
                    react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Select"].Option, { key: "inline" }, "Inline")))),
                this.hasFormLayoutChanged && react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Form"].Item, Object.assign({}, tailFormItemLayout),
                    react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Button"], { size: "small", type: "primary" }, "Save Form Layout"))),
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Divider"], null),
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_ItemLayoutView__WEBPACK_IMPORTED_MODULE_4__["default"], { onSave: this.saveLayout, formLayout: this.selectedFormLayout, itemLayoutOptions: form.itemLayoutOptions }));
    }
};
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_1__["observable"]
], FormLayoutView.prototype, "selectedFormLayout", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_1__["action"]
], FormLayoutView.prototype, "initialize", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_1__["action"]
], FormLayoutView.prototype, "setProperty", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_1__["action"].bound
], FormLayoutView.prototype, "handleSubmit", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_1__["computed"]
], FormLayoutView.prototype, "hasFormLayoutChanged", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_1__["action"]
], FormLayoutView.prototype, "saveLayout", void 0);
FormLayoutView = __decorate([
    mobx_react__WEBPACK_IMPORTED_MODULE_2__["observer"]
], FormLayoutView);

const WrappedIFormLayoutViewProps = antd__WEBPACK_IMPORTED_MODULE_0__["Form"].create({ name: 'FormLayoutView' })(FormLayoutView);
/* harmony default export */ __webpack_exports__["default"] = (WrappedIFormLayoutViewProps);


/***/ }),

/***/ "./src/components/editors/form/partials/FormPropertiesEditorView.tsx":
/*!***************************************************************************!*\
  !*** ./src/components/editors/form/partials/FormPropertiesEditorView.tsx ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd/lib/form/Form */ "./node_modules/antd/lib/form/Form.js");
/* harmony import */ var antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mobx */ "./node_modules/mobx/lib/mobx.module.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_FormLayoutCommon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/FormLayoutCommon */ "./src/components/editors/common/FormLayoutCommon.ts");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment-timezone */ "moment");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_5__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






const timezones = moment_timezone__WEBPACK_IMPORTED_MODULE_5__["tz"].names().map((name) => {
    return { label: name, value: name };
});
class FormPropertiesEditorView extends react__WEBPACK_IMPORTED_MODULE_3__["Component"] {
    constructor(props) {
        super(props);
        this.handleSubmit = (e) => {
            e.preventDefault();
            e.stopPropagation();
            let { form } = this.props.store.editorStore.formStore;
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    antd__WEBPACK_IMPORTED_MODULE_0__["notification"].info({ message: `Form - ${form.name}`,
                        description: "Form properties applied successfully" });
                    form.desc = values.desc;
                    form.layout = values.layout;
                    form.content.title = values.content.title;
                    form.content.subtitle = values.content.subtitle;
                    form.status = Object.assign({}, form.status, values.status);
                }
            });
            return;
        };
    }
    render() {
        let { getFieldDecorator } = this.props.form;
        let { editorStore } = this.props.store;
        let form = editorStore.formEditorVisible ? Object(mobx__WEBPACK_IMPORTED_MODULE_2__["toJS"])(editorStore.formStore.form) : null;
        return react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_1___default.a, Object.assign({}, _common_FormLayoutCommon__WEBPACK_IMPORTED_MODULE_4__["formItemLayout"], { onSubmit: (e) => this.handleSubmit(e), layout: "horizontal" }),
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_1___default.a.Item, { required: true, label: "Name" }, getFieldDecorator('name', {
                initialValue: form.name,
                rules: [{ type: 'string' }]
            })(react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Input"], null))),
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_1___default.a.Item, { required: true, label: "Description" }, getFieldDecorator('desc', {
                initialValue: form.desc,
                rules: [{ type: 'string' }]
            })(react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Input"], null))),
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_1___default.a.Item, { required: true, label: "Title" }, getFieldDecorator('content.title', {
                initialValue: form.content.title,
                rules: [{ type: 'string' }]
            })(react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Input"], null))),
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_1___default.a.Item, { label: "Subtitle" }, getFieldDecorator('content.subtitle', {
                initialValue: form.content.subtitle,
                rules: [{ type: 'string' }]
            })(react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Input"], null))),
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_1___default.a.Item, { label: "Entry Timezone Offset", help: "UTC by default, used to mark entry times" }, getFieldDecorator('status.timezone', {
                initialValue: form.status.timezone || 'UTC',
                rules: [
                    { type: 'string' },
                    { required: true, message: 'A timezone offset is required' }
                ]
            })(react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Select"], null, timezones.map((options, index) => {
                return react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Select"].Option, { key: index, value: options.value }, options.label);
            })))),
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_1___default.a.Item, { label: "Paused", help: "Pause this form (will stop collection of entries immediately)" }, getFieldDecorator('status.paused', {
                initialValue: form.status.paused
            })(react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Switch"], null))),
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_1___default.a.Item, { label: "Starts", help: "Schedule form activation" }, getFieldDecorator('status.starts', {
                initialValue: form.status.starts,
            })(react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["DatePicker"], { showTime: true }))),
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_1___default.a.Item, { label: "Ends", help: "Schedule form deactivation" }, getFieldDecorator('status.ends', {
                initialValue: form.status.ends,
            })(react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["DatePicker"], { showTime: true }))),
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_1___default.a.Item, Object.assign({}, _common_FormLayoutCommon__WEBPACK_IMPORTED_MODULE_4__["tailFormItemLayout"]),
                react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Button"], { type: "primary", htmlType: "submit", style: { marginTop: '15px' } }, "Apply")));
    }
}
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"].bound
], FormPropertiesEditorView.prototype, "handleSubmit", void 0);
const WrappedFormContentEditorView = antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_1___default.a.create({ name: 'FormContentEditorView' })(FormPropertiesEditorView);
/* harmony default export */ __webpack_exports__["default"] = (WrappedFormContentEditorView);


/***/ }),

/***/ "./src/components/editors/form/partials/ItemLayoutPreview.tsx":
/*!********************************************************************!*\
  !*** ./src/components/editors/form/partials/ItemLayoutPreview.tsx ***!
  \********************************************************************/
/*! exports provided: ItemLayoutPreview */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemLayoutPreview", function() { return ItemLayoutPreview; });
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx */ "./node_modules/mobx/lib/mobx.module.js");
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/dist/mobx-react.module.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




let ItemLayoutPreview = class ItemLayoutPreview extends react__WEBPACK_IMPORTED_MODULE_3__["Component"] {
    constructor(props) {
        super(props);
    }
    get shouldRender() {
        let { formLayout, itemLayoutOptions, dimension } = this.props;
        return formLayout && itemLayoutOptions && dimension && itemLayoutOptions.wrapperCol[dimension];
    }
    render() {
        let { shouldRender } = this;
        let { formLayout, dimension } = this.props;
        let { wrapperCol, labelCol } = this.props.itemLayoutOptions;
        let wrapperSpan = wrapperCol[dimension].span;
        let wrapperOffset = wrapperCol[dimension].offset || 0;
        let labelSpan = labelCol[dimension].span;
        let labelOffset = labelCol[dimension].offset || 0;
        return react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", { style: { background: '#ffff' } },
            shouldRender && formLayout == 'horizontal' && react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Row"], { className: "fl-layout-demo-row" },
                react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: labelOffset }, '\u00A0'),
                react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: labelSpan, style: { background: 'rgba(0,160,233,0.6)', padding: '2px' } },
                    react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("strong", { style: { color: 'white' } },
                        "Label - ",
                        (100 * (labelSpan + labelOffset) / 24).toFixed(2),
                        "%")),
                react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: wrapperOffset }, '\u00A0'),
                react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: wrapperSpan, style: { background: 'rgba(0,120,200,0.8)', padding: '2px' } },
                    react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("strong", { style: { color: 'white' } },
                        "Field - ",
                        (100 * (wrapperSpan + wrapperOffset) / 24).toFixed(2),
                        "%"))),
            shouldRender && formLayout == 'vertical' && react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", null,
                react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Row"], { className: "fl-layout-demo-row" },
                    react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: labelOffset }, '\u00A0'),
                    react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: labelSpan, style: { background: 'rgba(0,160,233,0.6)', padding: '2px' } },
                        react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("strong", { style: { color: 'white' } },
                            "Label - ",
                            (100 * (labelSpan + labelOffset) / 24).toFixed(2),
                            "%"))),
                react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Row"], { className: "fl-layout-demo-row", style: { marginTop: '15px' } },
                    react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: wrapperOffset }, '\u00A0'),
                    react__WEBPACK_IMPORTED_MODULE_3__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: wrapperSpan, style: { background: 'rgba(0,120,200,0.8)', padding: '2px' } },
                        react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("strong", { style: { color: 'white' } },
                            "Field - ",
                            (100 * (wrapperSpan + wrapperOffset) / 24).toFixed(2),
                            "%")))));
    }
};
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_1__["computed"]
], ItemLayoutPreview.prototype, "shouldRender", null);
ItemLayoutPreview = __decorate([
    mobx_react__WEBPACK_IMPORTED_MODULE_2__["observer"]
], ItemLayoutPreview);

//


/***/ }),

/***/ "./src/components/editors/form/partials/ItemLayoutView.tsx":
/*!*****************************************************************!*\
  !*** ./src/components/editors/form/partials/ItemLayoutView.tsx ***!
  \*****************************************************************/
/*! exports provided: ItemLayoutView, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemLayoutView", function() { return ItemLayoutView; });
/* harmony import */ var _kartikrao_lib_forms_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @kartikrao/lib-forms-core */ "./node_modules/@kartikrao/lib-forms-core/lib/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mobx */ "./node_modules/mobx/lib/mobx.module.js");
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/dist/mobx-react.module.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ItemLayoutPreview__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ItemLayoutPreview */ "./src/components/editors/form/partials/ItemLayoutPreview.tsx");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






const dimensionNameMap = {
    xs: 'Extra Small',
    sm: 'Small',
    md: 'Medium',
    lg: 'Large',
    xl: 'Extra Large'
};
const formItemLayout = {
    labelCol: {
        xs: { span: 10 },
        sm: { span: 10 },
    },
    wrapperCol: {
        xs: { span: 14 },
        sm: { span: 14 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 8,
            offset: 16,
        },
        sm: {
            span: 8,
            offset: 16,
        },
    },
};
let ItemLayoutView = class ItemLayoutView extends react__WEBPACK_IMPORTED_MODULE_4__["Component"] {
    constructor(props) {
        super(props);
        this.setDimension = (dimension) => {
            this.selectedDimension = dimension;
        };
        this.setLayoutProperty = (key, value) => {
            let target;
            let { selectedDimension } = this;
            if (key.indexOf('wrapper') > -1) {
                target = this.itemLayout.wrapperCol[selectedDimension];
            }
            else {
                target = this.itemLayout.labelCol[selectedDimension];
            }
            if (key.indexOf('Span') > -1) {
                target.span = value;
            }
            else {
                target.offset = value;
            }
            console.log("After Set o/s", target.offset, target.span);
            return;
        };
        this.setIsAdding = () => {
            let dimension = this.availableDimensions[0];
            // Initialize defaults for this dimension
            this.itemLayout.wrapperCol.add(dimension, { offset: 0, span: 12 });
            this.itemLayout.labelCol.add(dimension, { offset: 0, span: 12 });
            this.selectedDimension = dimension;
            // Now the layout editor form should render
            this.isAdding = true;
        };
        this.reset = () => {
            this.isAdding = false;
            this.isEditing = false;
            // this.itemLayout = this.props.itemLayoutOptions;
            this.selectedDimension = null;
        };
        this.setIsEditing = (record) => {
            this.selectedDimension = record.dimension;
            this.isEditing = true;
        };
        this.confirmRemove = (record) => {
            let self = this;
            antd__WEBPACK_IMPORTED_MODULE_1__["Modal"].confirm({
                title: `Are you sure ?`,
                content: `Clicking OK will remove field layout targeting "${dimensionNameMap[record.dimension]}"`,
                onOk() {
                    self.remove(record);
                },
                onCancel() { },
            });
        };
        this.remove = (record) => {
            let { itemLayoutOptions } = this.props;
            itemLayoutOptions.labelCol[record.dimension] = null;
            itemLayoutOptions.wrapperCol[record.dimension] = null;
            this.props.onSave(itemLayoutOptions);
        };
        this.save = () => {
            this.isAdding = false;
            this.isEditing = false;
            this.props.onSave(this.itemLayout);
            this.reset();
        };
        this.initialize(props);
    }
    initialize({ itemLayoutOptions }) {
        this.itemLayout = new _kartikrao_lib_forms_core__WEBPACK_IMPORTED_MODULE_0__["ItemLayoutOptions"](Object(mobx__WEBPACK_IMPORTED_MODULE_2__["toJS"])(itemLayoutOptions));
    }
    get asRows() {
        let { labelCol, wrapperCol } = this.props.itemLayoutOptions;
        let rows = [];
        let dMap = {};
        wrapperCol.used.forEach((d) => {
            dMap[d] = {
                formLayout: this.props.formLayout,
                dimension: d,
                labelSpan: labelCol[d].span,
                labelOffset: labelCol[d].offset || 0,
                wrapperOffset: wrapperCol[d].offset || 0,
                wrapperSpan: wrapperCol[d].span,
            };
            rows.push(dMap[d]);
        });
        return rows;
    }
    get availableDimensions() {
        let { wrapperCol } = this.itemLayout;
        return wrapperCol.unused;
    }
    render() {
        let columns = [{
                title: 'Dimension',
                dataIndex: 'dimension',
                key: 'dimension'
            },
            { title: 'Label', children: [
                    {
                        title: 'Offset',
                        dataIndex: 'labelOffset',
                        key: 'labelOffset',
                    },
                    {
                        title: 'Span',
                        dataIndex: 'labelSpan',
                        key: 'labelSpan',
                    }
                ] },
            {
                title: 'Field',
                children: [
                    {
                        title: 'Offset',
                        dataIndex: 'wrapperOffset',
                        key: 'wrapperOffset',
                    },
                    {
                        title: 'Span',
                        dataIndex: 'wrapperSpan',
                        key: 'wrapperSpan',
                    }
                ]
            },
            {
                title: 'Actions',
                key: 'action',
                render: (text, record) => (react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("span", null,
                    react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Button"], { shape: "circle", type: "default", onClick: (e) => { this.setIsEditing(record); }, icon: "tool", size: "small", style: { marginRight: '5px' } }),
                    react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Button"], { shape: "circle", type: "danger", onClick: (e) => { this.confirmRemove(record); }, icon: "delete", size: "small" }))),
            }];
        let { getFieldDecorator } = this.props.form;
        let { isAdding, isEditing } = this;
        let { labelCol, wrapperCol } = this.itemLayout;
        return react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Card"], { size: "small", bodyStyle: { padding: 0 } },
            react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Table"], { title: () => react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("span", null,
                    "Field Layouts ",
                    react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("small", null, "click (+) to see preview")), size: "small", bordered: false, pagination: false, dataSource: this.asRows, columns: columns, defaultExpandAllRows: false, rowKey: 'dimension', expandedRowRender: (record) => react__WEBPACK_IMPORTED_MODULE_4__["createElement"](_ItemLayoutPreview__WEBPACK_IMPORTED_MODULE_5__["ItemLayoutPreview"], { formLayout: this.props.formLayout, dimension: record.dimension, itemLayoutOptions: this.props.itemLayoutOptions }), footer: () => { return this.availableDimensions.length > 0 ? react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Button"], { onClick: () => this.setIsAdding() }, "Add") : react__WEBPACK_IMPORTED_MODULE_4__["createElement"](react__WEBPACK_IMPORTED_MODULE_4__["Fragment"], null); } }),
            (isAdding || isEditing) && this.selectedDimension && react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Card"], { size: "small", title: this.isAdding ? "Add Field Layout" : `Edit Field Layout - ${this.selectedDimension}`, style: { marginTop: '15px' } },
                react__WEBPACK_IMPORTED_MODULE_4__["createElement"](_ItemLayoutPreview__WEBPACK_IMPORTED_MODULE_5__["ItemLayoutPreview"], { formLayout: this.props.formLayout, itemLayoutOptions: this.itemLayout, dimension: this.selectedDimension }),
                react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("p", null, "Assign 24 units (aliquots) across the label and field to control how label-field pairs are displayed"),
                react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"], Object.assign({}, formItemLayout, { layout: "horizontal" }),
                    react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Target Screen Width", help: react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("ul", null,
                            react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("li", null, "Extra Small (below 768px)"),
                            react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("li", null, "Small (768px - 992px)"),
                            react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("li", null, "Medium (992px - 1200px)"),
                            react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("li", null, "Large (1200px - 1440px)"),
                            react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("li", null, "Extra Large (1440px and above)")) }, getFieldDecorator('dimension', {
                        initialValue: this.selectedDimension,
                        rules: [
                            { type: 'string' },
                            { required: true, message: 'A dimension' }
                        ]
                    })(react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Select"], { onChange: (e) => { this.setDimension(e); } }, this.availableDimensions.map((d) => {
                        return react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Select"].Option, { key: d }, dimensionNameMap[d]);
                    })))),
                    react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Label Offset", help: "Left offset for label" }, getFieldDecorator('labelOffset', {
                        initialValue: labelCol[this.selectedDimension].offset || 0,
                        rules: [
                            { type: 'number' }
                        ]
                    })(react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Slider"], { step: 1, min: 0, max: 24, onChange: (e) => { this.setLayoutProperty('labelOffset', e); } }))),
                    react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Label Width", help: "Label available width" }, getFieldDecorator('labelSpan', {
                        initialValue: labelCol[this.selectedDimension].span || 0,
                        rules: [
                            { type: 'number' }
                        ]
                    })(react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Slider"], { step: 1, min: 0, max: 24, onChange: (e) => { this.setLayoutProperty('labelSpan', e); } }))),
                    react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Field Offset", help: "Left offset for fields" }, getFieldDecorator('wrapperOffset', {
                        initialValue: wrapperCol[this.selectedDimension].offset || 0,
                        rules: [
                            { type: 'number' }
                        ]
                    })(react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Slider"], { step: 1, min: 0, max: 24, onChange: (e) => { this.setLayoutProperty('wrapperOffset', e); } }))),
                    react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Field width", help: "Field available width" }, getFieldDecorator('wrapperSpan', {
                        initialValue: wrapperCol[this.selectedDimension].span || 0,
                        rules: [
                            { type: 'number' }
                        ]
                    })(react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Slider"], { step: 1, min: 1, max: 24, onChange: (e) => { this.setLayoutProperty('wrapperSpan', e); } }))),
                    react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, Object.assign({}, tailFormItemLayout),
                        react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Button"], { size: "small", type: "primary", style: { marginRight: '15px' }, onClick: this.save }, "Save"),
                        react__WEBPACK_IMPORTED_MODULE_4__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Button"], { size: "small", type: "danger", style: { marginTop: '15px' }, onClick: this.reset }, "Cancel")))));
    }
};
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["observable"]
], ItemLayoutView.prototype, "isAdding", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["observable"]
], ItemLayoutView.prototype, "isEditing", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["observable"]
], ItemLayoutView.prototype, "selectedDimension", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["observable"]
], ItemLayoutView.prototype, "itemLayout", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"]
], ItemLayoutView.prototype, "setDimension", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"].bound
], ItemLayoutView.prototype, "setLayoutProperty", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"]
], ItemLayoutView.prototype, "initialize", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["computed"]
], ItemLayoutView.prototype, "asRows", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["computed"]
], ItemLayoutView.prototype, "availableDimensions", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"]
], ItemLayoutView.prototype, "setIsAdding", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"]
], ItemLayoutView.prototype, "reset", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"]
], ItemLayoutView.prototype, "setIsEditing", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"]
], ItemLayoutView.prototype, "remove", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"]
], ItemLayoutView.prototype, "save", void 0);
ItemLayoutView = __decorate([
    mobx_react__WEBPACK_IMPORTED_MODULE_3__["observer"]
], ItemLayoutView);

const WrappedIItemLayoutViewProps = antd__WEBPACK_IMPORTED_MODULE_1__["Form"].create({ name: 'ItemLayoutView' })(ItemLayoutView);
/* harmony default export */ __webpack_exports__["default"] = (WrappedIItemLayoutViewProps);


/***/ }),

/***/ "./src/components/editors/page/PageEditorView.tsx":
/*!********************************************************!*\
  !*** ./src/components/editors/page/PageEditorView.tsx ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/dist/mobx-react.module.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mobx */ "./node_modules/mobx/lib/mobx.module.js");
/* harmony import */ var _common_FormLayoutCommon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/FormLayoutCommon */ "./src/components/editors/common/FormLayoutCommon.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





let PageEditorView = class PageEditorView extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor() {
        super(...arguments);
        this.handleSubmit = (e) => {
            e.preventDefault();
            e.stopPropagation();
            let { page } = this.props.store.editorStore;
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    antd__WEBPACK_IMPORTED_MODULE_2__["notification"].info({ message: `Page - ${page.name}`,
                        description: "Page properties applied successfully" });
                    Object.keys(values).forEach((p) => {
                        page[p] = values[p];
                    });
                }
            });
            return;
        };
    }
    get hasErrors() {
        let errors = this.props.form.getFieldsError();
        let fieldsWithErrors = Object.keys(errors).filter((field) => {
            return !!errors[field];
        });
        return fieldsWithErrors.length > 0;
    }
    render() {
        let { editorStore } = this.props.store;
        let { page } = editorStore;
        let { getFieldDecorator } = this.props.form;
        return page && react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_2__["Drawer"], { title: `Page "${page.name}" (id=${page.id || ''})`, onClose: () => editorStore.setEditable(null), visible: editorStore.showPageEditor, width: 600, closable: !this.hasErrors, maskClosable: !this.hasErrors, style: { overflow: 'auto', height: 'calc(80% - 108px)', paddingBottom: '108px' } }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_2__["Tabs"], null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_2__["Tabs"].TabPane, { key: "1", tab: "Settings" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_2__["Card"], { size: "small", bordered: false },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_2__["Form"], Object.assign({}, _common_FormLayoutCommon__WEBPACK_IMPORTED_MODULE_4__["formItemLayout"], { onSubmit: (e) => this.handleSubmit(e), layout: "horizontal" }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_2__["Form"].Item, { required: true, label: "Name", help: "Choose a name that distinguishes this page from others" }, getFieldDecorator('name', {
                            initialValue: page.name,
                            rules: [{ type: 'string' }, { required: true, message: 'A name is required' }]
                        })(react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_2__["Input"], null))),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_2__["Form"].Item, { required: true, label: "Title", help: "The title of this page, displayed above the page's content" }, getFieldDecorator('title', {
                            initialValue: page.title,
                            rules: [{ type: 'string' }, { required: true, message: 'A title is required' }]
                        })(react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_2__["Input"], null))),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_2__["Form"].Item, { label: "Subtitle", help: "A subtitle for this page, displayed underneath the title" }, getFieldDecorator('subtitle', {
                            initialValue: page.subtitle,
                            rules: [{ type: 'string' }]
                        })(react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_2__["Input"], null))),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_2__["Form"].Item, Object.assign({}, _common_FormLayoutCommon__WEBPACK_IMPORTED_MODULE_4__["tailFormItemLayout"]),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_2__["Button"], { type: "primary", htmlType: "submit", style: { marginTop: '15px' }, onClick: this.handleSubmit }, "Apply")))))));
    }
};
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_3__["action"].bound
], PageEditorView.prototype, "handleSubmit", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_3__["computed"]
], PageEditorView.prototype, "hasErrors", null);
PageEditorView = __decorate([
    mobx_react__WEBPACK_IMPORTED_MODULE_1__["observer"]
], PageEditorView);
const WrappedPageEditorView = antd__WEBPACK_IMPORTED_MODULE_2__["Form"].create({ name: 'PageEditorView' })(PageEditorView);
/* harmony default export */ __webpack_exports__["default"] = (WrappedPageEditorView);


/***/ }),

/***/ "./src/components/editors/section/SectionEditorView.tsx":
/*!**************************************************************!*\
  !*** ./src/components/editors/section/SectionEditorView.tsx ***!
  \**************************************************************/
/*! exports provided: SectionEditorView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SectionEditorView", function() { return SectionEditorView; });
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/dist/mobx-react.module.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _partials_SectionPropertiesEditorView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./partials/SectionPropertiesEditorView */ "./src/components/editors/section/partials/SectionPropertiesEditorView.tsx");
/* harmony import */ var _partials_SectionLayoutEditor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./partials/SectionLayoutEditor */ "./src/components/editors/section/partials/SectionLayoutEditor.tsx");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





let SectionEditorView = class SectionEditorView extends react__WEBPACK_IMPORTED_MODULE_2__["Component"] {
    constructor(props) {
        super(props);
    }
    render() {
        let { editorStore } = this.props.store;
        let section = editorStore.showSectionEditor ? editorStore.section : null;
        return section && react__WEBPACK_IMPORTED_MODULE_2__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Drawer"], { title: `Section "${section.name}" `, onClose: () => editorStore.setEditable(null), visible: editorStore.showSectionEditor == true, width: 700, style: { overflow: 'hidden' } }, react__WEBPACK_IMPORTED_MODULE_2__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Tabs"], { size: "small" },
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Tabs"].TabPane, { tab: "Settings", key: "1" },
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Row"], null,
                    react__WEBPACK_IMPORTED_MODULE_2__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: 24 },
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_partials_SectionPropertiesEditorView__WEBPACK_IMPORTED_MODULE_3__["default"], { store: this.props.store })))),
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Tabs"].TabPane, { tab: "Layout", key: "2" },
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Row"], null,
                    react__WEBPACK_IMPORTED_MODULE_2__["createElement"](antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: 24 },
                        react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_partials_SectionLayoutEditor__WEBPACK_IMPORTED_MODULE_4__["default"], { store: this.props.store, section: section }))))));
    }
};
SectionEditorView = __decorate([
    mobx_react__WEBPACK_IMPORTED_MODULE_1__["observer"]
], SectionEditorView);



/***/ }),

/***/ "./src/components/editors/section/partials/SectionLayoutEditor.tsx":
/*!*************************************************************************!*\
  !*** ./src/components/editors/section/partials/SectionLayoutEditor.tsx ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mobx */ "./node_modules/mobx/lib/mobx.module.js");
/* harmony import */ var _SectionLayoutPreview__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SectionLayoutPreview */ "./src/components/editors/section/partials/SectionLayoutPreview.tsx");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




const formItemLayout = {
    labelCol: {
        xs: { span: 12, offset: 4 },
        sm: { span: 8, offset: 4 },
    },
    wrapperCol: {
        xs: { span: 16 },
        sm: { span: 12 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 3,
            offset: 21,
        },
        sm: {
            span: 3,
            offset: 21,
        },
    },
};
class SectionLayoutEditorView extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor(props) {
        super(props);
        this.updateSpan = (key, value) => {
            this.columnSpans.set(key, value);
        };
        this.updateGutter = (value) => {
            this.gutter = value;
        };
        this.handleSubmit = (e) => {
            e.preventDefault();
            e.stopPropagation();
            let { section } = this.props.store.editorStore;
            section.columns.map((column, index) => {
                let thisSpan = this.columnSpans.get(`col${index}`);
                if (column.span != thisSpan) {
                    console.log(`Setting column ${index} span to ${thisSpan}`);
                    column.span = thisSpan;
                }
            });
            if (section.gutter != this.gutter) {
                section.gutter = this.gutter;
            }
            antd__WEBPACK_IMPORTED_MODULE_1__["notification"].info({ message: `Section - ${section.name}`,
                description: `Saved section layout successfully` });
            return;
        };
        this.initialize();
    }
    initialize() {
        let { section } = this.props;
        this.gutter = section.gutter;
        this.columnSpans = mobx__WEBPACK_IMPORTED_MODULE_2__["observable"].map({});
        section.columns.map((col, index) => {
            this.columnSpans.set(`col${index}`, col.span);
        });
    }
    get colspans() {
        let spans = [];
        this.columnSpans.forEach((value) => {
            spans.push(value);
        });
        return spans;
    }
    render() {
        let { getFieldDecorator } = this.props.form;
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Card"], { size: "small", title: "Section Layout" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, "Assign 24 units (aliquots) across columns in a section, use gutter to space columns"),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"], Object.assign({}, formItemLayout, { onSubmit: (e) => this.handleSubmit(e), layout: "horizontal" }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: "Gutter" }, getFieldDecorator('gutter', {
                    initialValue: this.gutter || 0,
                    rules: [{ type: 'number' }]
                })(react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Slider"], { step: 8, max: 48, onChange: (e) => this.updateGutter(e) }))),
                this.props.section.columns.map((column, index) => {
                    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, { label: `Column ${index + 1} span`, key: index }, getFieldDecorator(`columnSpans[col${index}]`, {
                        initialValue: column.span || 0,
                        rules: [{ type: 'number' }]
                    })(react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Slider"], { step: 1, max: 24, onChange: (e) => this.updateSpan(`col${index}`, e) })));
                }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_SectionLayoutPreview__WEBPACK_IMPORTED_MODULE_3__["SectionLayoutPreview"], { gutter: this.gutter, colspans: this.colspans }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, Object.assign({}, tailFormItemLayout),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Button"], { type: "primary", htmlType: "submit", style: { marginTop: '15px' }, onClick: this.handleSubmit }, "Apply"))));
    }
}
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["observable"]
], SectionLayoutEditorView.prototype, "gutter", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["observable"]
], SectionLayoutEditorView.prototype, "columnSpans", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"]
], SectionLayoutEditorView.prototype, "initialize", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["computed"]
], SectionLayoutEditorView.prototype, "colspans", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"]
], SectionLayoutEditorView.prototype, "updateSpan", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"]
], SectionLayoutEditorView.prototype, "updateGutter", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"].bound
], SectionLayoutEditorView.prototype, "handleSubmit", void 0);
const WrappedSectionLayoutEditorView = antd__WEBPACK_IMPORTED_MODULE_1__["Form"].create({ name: 'SectionLayoutEditorView' })(SectionLayoutEditorView);
/* harmony default export */ __webpack_exports__["default"] = (WrappedSectionLayoutEditorView);


/***/ }),

/***/ "./src/components/editors/section/partials/SectionLayoutPreview.tsx":
/*!**************************************************************************!*\
  !*** ./src/components/editors/section/partials/SectionLayoutPreview.tsx ***!
  \**************************************************************************/
/*! exports provided: SectionLayoutPreview */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SectionLayoutPreview", function() { return SectionLayoutPreview; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);


class SectionLayoutPreview extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor(props) {
        super(props);
    }
    render() {
        let { gutter, colspans } = this.props;
        let colors = ['rgba(0,160,233,0.6)', 'rgba(0,120,200,0.8)'];
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Card"], { title: "Preview", size: "small", bordered: false },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Row"], { className: "fl-layout-demo-row", gutter: gutter }, colspans.map((span, ci) => {
                return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_1__["Col"], { key: ci, span: span },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { minHeight: '50px', padding: '5px 10px', background: ci % 2 == 0 ? colors[0] : colors[1] } },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("strong", { style: { color: 'white' } },
                            ci + 1,
                            " - ",
                            (100 * (span) / 24).toFixed(2),
                            "%")));
            })));
    }
}


/***/ }),

/***/ "./src/components/editors/section/partials/SectionPropertiesEditorView.tsx":
/*!*********************************************************************************!*\
  !*** ./src/components/editors/section/partials/SectionPropertiesEditorView.tsx ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/dist/mobx-react.module.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mobx */ "./node_modules/mobx/lib/mobx.module.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




const formItemLayout = {
    labelCol: {
        xs: { span: 12, offset: 4 },
        sm: { span: 8, offset: 4 },
    },
    wrapperCol: {
        xs: { span: 16 },
        sm: { span: 12 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 3,
            offset: 21,
        },
        sm: {
            span: 3,
            offset: 21,
        },
    },
};
let SectionPropertiesEditorView = class SectionPropertiesEditorView extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor(props) {
        super(props);
        this.handleSubmit = (e) => {
            e.preventDefault();
            e.stopPropagation();
            let { section } = this.props.store.editorStore;
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    antd__WEBPACK_IMPORTED_MODULE_2__["notification"].info({ message: `Section - ${section.name}`,
                        description: "Section properties applied successfully" });
                    Object.keys(values).forEach((p) => {
                        section[p] = values[p];
                    });
                }
            });
            return;
        };
    }
    render() {
        let { editorStore } = this.props.store;
        let { section } = editorStore;
        let { getFieldDecorator } = this.props.form;
        console.log("SPEV.render", editorStore.section);
        if (!section) {
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null);
        }
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_2__["Card"], { size: "small", bordered: false },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_2__["Form"], Object.assign({}, formItemLayout, { onSubmit: (e) => this.handleSubmit(e), layout: "horizontal" }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_2__["Form"].Item, { required: true, label: "Name" }, getFieldDecorator('name', {
                    initialValue: section.name,
                    rules: [{ type: 'string' }]
                })(react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_2__["Input"], null))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_2__["Form"].Item, { required: true, label: "Title" }, getFieldDecorator('title', {
                    initialValue: section.title,
                    rules: [{ type: 'string' }]
                })(react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_2__["Input"], null))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_2__["Form"].Item, Object.assign({}, tailFormItemLayout),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](antd__WEBPACK_IMPORTED_MODULE_2__["Button"], { type: "primary", htmlType: "submit", style: { marginTop: '15px' }, onClick: this.handleSubmit }, "Apply"))));
    }
};
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_3__["observable"]
], SectionPropertiesEditorView.prototype, "gutter", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_3__["action"].bound
], SectionPropertiesEditorView.prototype, "handleSubmit", void 0);
SectionPropertiesEditorView = __decorate([
    mobx_react__WEBPACK_IMPORTED_MODULE_1__["observer"]
], SectionPropertiesEditorView);
const WrappedSectionPropertiesEditorView = antd__WEBPACK_IMPORTED_MODULE_2__["Form"].create({ name: 'SectionPropertiesEditorView' })(SectionPropertiesEditorView);
/* harmony default export */ __webpack_exports__["default"] = (WrappedSectionPropertiesEditorView);


/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! exports provided: renderForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderForm", function() { return renderForm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_canvas_Canvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/canvas/Canvas */ "./src/components/canvas/Canvas.tsx");
/* harmony import */ var _store_RootStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./store/RootStore */ "./src/store/RootStore.ts");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_4__);





function renderForm(selector, initialState) {
    let store = new _store_RootStore__WEBPACK_IMPORTED_MODULE_3__["RootStore"](initialState);
    Object(react_dom__WEBPACK_IMPORTED_MODULE_1__["render"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_4__["Layout"], { style: { height: '100vh', overflow: 'hidden' } },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_canvas_Canvas__WEBPACK_IMPORTED_MODULE_2__["Canvas"], { store: store })), document.querySelector(selector));
}
;


/***/ }),

/***/ "./src/store/EditorStore.ts":
/*!**********************************!*\
  !*** ./src/store/EditorStore.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mobx */ "./node_modules/mobx/lib/mobx.module.js");
/* harmony import */ var _kartikrao_lib_forms_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @kartikrao/lib-forms-core */ "./node_modules/@kartikrao/lib-forms-core/lib/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


class EditorStore {
    constructor(data) {
        this.addCondition = (c) => {
            this.field.setCondition(this.factory.makeCondition(c));
        };
        this.addPredicate = (p) => {
            if (!this.field.condition) {
                let condition = this.factory.makeCondition({ predicates: [p] });
                this.field.setCondition(condition);
                return;
            }
            this.field.condition.addPredicates(...this.factory.makePredicates(p));
        };
        this.setCondition = (c) => {
            this.field.setCondition(c);
        };
        this.addValidationRule = (key, rule) => {
            this.field.validator.rule.addConstraint(key, rule);
        };
        this.updateValidationRule = (key, rule) => {
            this.field.validator.rule.updateConstraint(key, rule);
        };
        this.removeValidationRule = (key) => {
            this.field.validator.rule.removeConstraint(key);
        };
        this.setFieldProperty = (key, value) => {
            this.field.componentProps[key] = value;
        };
        this.setComponentProperty = (key, value) => {
            this.field.componentProps[key] = value;
        };
        this.setEditable = (item) => {
            this.reset();
            if (item) {
                switch (item._type) {
                    case "Page": {
                        this.page = item;
                        break;
                    }
                    case "Section": {
                        this.section = item;
                        break;
                    }
                    case "Column": {
                        this.column = item;
                        break;
                    }
                    case "Field": {
                        this.field = item;
                        break;
                    }
                }
            }
        };
        this.initialize(data);
    }
    initialize(data) {
        this.formStore = data.formStore;
        this.factory = data.factory;
        this.setEditable(data.item);
        this.formEditorVisible = false;
        return;
    }
    get availableConditionSources() {
        let { formStore } = this;
        let fieldList = [];
        Object.keys(this.formStore.idFieldMap).forEach((id, index) => {
            fieldList.push({
                key: index,
                id: id,
                label: formStore.idFieldMap[id].label,
                name: formStore.idFieldMap[id].name
            });
        });
        return fieldList;
    }
    get availableExpressions() {
        let expressions = [];
        _kartikrao_lib_forms_core__WEBPACK_IMPORTED_MODULE_1__["Predicate"].PredicateConditions.forEach((p) => {
            expressions.push({ value: p, name: p });
        });
        return expressions;
    }
    get availableOperators() {
        let operators = [];
        _kartikrao_lib_forms_core__WEBPACK_IMPORTED_MODULE_1__["Predicate"].PredicateOperators.forEach((o) => {
            operators.push({ value: o, name: o });
        });
        return operators;
    }
    get hasCondition() {
        return !!this.field.condition;
    }
    get numPredicates() {
        return this.field.condition ? this.field.condition.predicates.length : 0;
    }
    removePredicate(uuid) {
        let { condition } = this.field;
        let index = condition.predicates.findIndex((p) => {
            return p.uuid == uuid;
        });
        if (index > -1) {
            condition.predicates.splice(index, 1);
        }
        if (condition.predicates.length == 0) {
            this.field.setCondition(null);
        }
    }
    reset() {
        this.page = null;
        this.column = null;
        this.section = null;
        this.field = null;
    }
    get showFieldEditor() { return !!this.field; }
    get showPageEditor() { return !!this.page; }
    get showColumnEditor() { return !!this.column; }
    get showSectionEditor() { return !!this.section; }
    setFormEditorVisible(visible = false) {
        this.reset();
        this.formEditorVisible = visible;
    }
}
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["action"]
], EditorStore.prototype, "initialize", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["computed"]
], EditorStore.prototype, "availableConditionSources", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["computed"]
], EditorStore.prototype, "availableExpressions", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["computed"]
], EditorStore.prototype, "availableOperators", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["computed"]
], EditorStore.prototype, "hasCondition", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["computed"]
], EditorStore.prototype, "numPredicates", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["action"]
], EditorStore.prototype, "addCondition", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["action"]
], EditorStore.prototype, "removePredicate", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["action"]
], EditorStore.prototype, "addPredicate", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["action"]
], EditorStore.prototype, "setCondition", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["action"]
], EditorStore.prototype, "addValidationRule", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["action"]
], EditorStore.prototype, "updateValidationRule", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["action"]
], EditorStore.prototype, "removeValidationRule", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["action"]
], EditorStore.prototype, "setFieldProperty", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["action"]
], EditorStore.prototype, "setComponentProperty", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["action"]
], EditorStore.prototype, "reset", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["computed"]
], EditorStore.prototype, "showFieldEditor", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["computed"]
], EditorStore.prototype, "showPageEditor", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["computed"]
], EditorStore.prototype, "showColumnEditor", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["computed"]
], EditorStore.prototype, "showSectionEditor", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["action"]
], EditorStore.prototype, "setFormEditorVisible", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["action"]
], EditorStore.prototype, "setEditable", void 0);
Object(mobx__WEBPACK_IMPORTED_MODULE_0__["decorate"])(EditorStore, {
    field: mobx__WEBPACK_IMPORTED_MODULE_0__["observable"],
    page: mobx__WEBPACK_IMPORTED_MODULE_0__["observable"],
    section: mobx__WEBPACK_IMPORTED_MODULE_0__["observable"],
    column: mobx__WEBPACK_IMPORTED_MODULE_0__["observable"],
    formEditorVisible: mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]
});
/* harmony default export */ __webpack_exports__["default"] = (EditorStore);


/***/ }),

/***/ "./src/store/RootStore.ts":
/*!********************************!*\
  !*** ./src/store/RootStore.ts ***!
  \********************************/
/*! exports provided: RootStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RootStore", function() { return RootStore; });
/* harmony import */ var _EditorStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditorStore */ "./src/store/EditorStore.ts");
/* harmony import */ var _kartikrao_lib_forms_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @kartikrao/lib-forms-core */ "./node_modules/@kartikrao/lib-forms-core/lib/index.js");
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mobx */ "./node_modules/mobx/lib/mobx.module.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



Object(mobx__WEBPACK_IMPORTED_MODULE_2__["configure"])({ enforceActions: "always" });
class RootStore {
    constructor(data) {
        this.initialize(data);
    }
    initialize(data) {
        this.formStore = new _kartikrao_lib_forms_core__WEBPACK_IMPORTED_MODULE_1__["FormStore"]();
        let factory = new _kartikrao_lib_forms_core__WEBPACK_IMPORTED_MODULE_1__["Factory"](this.formStore);
        this.editorStore = new _EditorStore__WEBPACK_IMPORTED_MODULE_0__["default"]({ formStore: this.formStore, factory: factory, item: null });
        this.formData = factory.makeForm(data);
    }
}
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["observable"]
], RootStore.prototype, "formData", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_2__["action"]
], RootStore.prototype, "initialize", null);


/***/ }),

/***/ 0:
/*!*********************************************************!*\
  !*** multi ./src/index.tsx webpack-plugin-serve/client ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/kartikrao/Development/Repositories/lib-forms/src/index.tsx */"./src/index.tsx");
module.exports = __webpack_require__(/*! webpack-plugin-serve/client */"./node_modules/webpack-plugin-serve/client.js");


/***/ }),

/***/ "antd":
/*!***********************!*\
  !*** external "antd" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["antd"]; }());

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["moment"]; }());

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["React"]; }());

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["ReactDOM"]; }());

/***/ })

/******/ });
//# sourceMappingURL=main.js.map