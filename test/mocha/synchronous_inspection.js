"use strict";
var assert = require("assert");
var testUtils = require("./helpers/util.js");
/*!
 *
Copyright 2009–2012 Kristopher Michael Kowal. All rights reserved.
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
*/
// In browsers that support strict mode, it'll be `undefined`; otherwise, the global.
var calledAsFunctionThis = (function () { return this; }());
describe("inspect", function () {

    it("for a fulfilled promise", function () {
        var ret = Promise.resolve(10);
        assert.equal(ret.value(), 10);
        assert.equal(ret.isFulfilled(), true);

    });

    it("for a rejected promise", function () {
        var e = new Error("In your face.");
        var ret = Promise.reject(e);
        assert.equal(ret.reason(), e);
        assert.equal(ret.isRejected(), true);
        ret.caught(function(){})
    });

    it("for a pending, unresolved promise", function () {
        var pending = Promise.defer().promise;
        assert.equal(pending.isPending(), true);
    });

    it("for a promise resolved to a rejected promise", function () {
        var deferred = Promise.defer();
        var error = new Error("Rejected!");
        var reject = Promise.reject(error);
        deferred.resolve(reject);

        assert.equal(deferred.promise.isRejected(), true);
        assert.equal(deferred.promise.reason(), error);
        deferred.promise.caught(function(){})
    });

    it("for a promise resolved to a fulfilled promise", function () {
        var deferred = Promise.defer();
        var fulfilled = Promise.resolve(10);
        deferred.resolve(fulfilled);

        assert.equal(deferred.promise.isFulfilled(), true);
        assert.equal(deferred.promise.value(), 10);
    });

    it("for a promise resolved to a pending promise", function () {
        var a = Promise.defer();
        var b = Promise.defer();
        a.resolve(b.promise);

        assert.equal(a.promise.isPending(), true);
    });

});