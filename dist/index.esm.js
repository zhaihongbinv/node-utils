import { spawn } from 'node:child_process';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var childProcessSpawn = function (command, args, options) {
    if (options === void 0) { options = { log: false }; }
    return new Promise(function (resolve, reject) {
        var cp = spawn(command, args, __assign(__assign({ cwd: process.cwd() }, options), { stdio: [process.stdin, "pipe", process.stderr], shell: true }));
        cp.on("error", function (err) {
            console.error("child process error", err);
            reject(err);
        });
        cp.on("close", function (code) {
            var result = Buffer.concat(buffers).toString("utf-8").trim();
            resolve(result);
            if (options.log) {
                console.log("-- child process start --");
                console.log("child process exited with code", code);
                console.log("stdout: ", result);
                console.log("-- child process end --");
            }
        });
        var buffers = [];
        cp.stdout.on("data", function (chunk) { return buffers.push(chunk); });
    });
};

export { childProcessSpawn };
