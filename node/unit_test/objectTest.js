// Generated by CoffeeScript 1.10.0
(function() {
  var JC, date, e, gpuResult, i, j, k, len, len1, meanError, num, start, testLength, v1h, v2h, vAd, vBd;

  JC = require("../linear");

  date = new Date();

  JC.cudaDeviceInit();

  testLength = 10;

  v1h = new Float32Array((function() {
    var j, ref, results;
    results = [];
    for (num = j = 0, ref = testLength; 0 <= ref ? j < ref : j > ref; num = 0 <= ref ? ++j : --j) {
      results.push(num);
    }
    return results;
  })());

  vAd = new JC.VectorD(v1h.length, v1h);

  v2h = new Float32Array((function() {
    var j, ref, results;
    results = [];
    for (num = j = 0, ref = testLength; 0 <= ref ? j < ref : j > ref; num = 0 <= ref ? ++j : --j) {
      results.push(num);
    }
    return results;
  })());

  gpuResult = new Float32Array(testLength);

  start = date.getTime();

  vBd = new JC.VectorD(testLength);

  vBd.copyFrom(testLength, v2h);

  vAd.add(vBd);

  vAd.copyTo(testLength, gpuResult);

  console.log(" GPU " + testLength + " elements vector add used:" + (date.getTime() - start) + " ms");

  vAd.destroy();

  vBd.destroy();

  v1h = new Float32Array((function() {
    var j, ref, results;
    results = [];
    for (num = j = 0, ref = testLength; 0 <= ref ? j < ref : j > ref; num = 0 <= ref ? ++j : --j) {
      results.push(num);
    }
    return results;
  })());

  v2h = new Float32Array((function() {
    var j, ref, results;
    results = [];
    for (num = j = 0, ref = testLength; 0 <= ref ? j < ref : j > ref; num = 0 <= ref ? ++j : --j) {
      results.push(num);
    }
    return results;
  })());

  start = date.getTime();

  for (i = j = 0, len = v2h.length; j < len; i = ++j) {
    e = v2h[i];
    v1h[i] += e;
  }

  console.log(" CPU " + testLength + " elements vector add used:" + (date.getTime() - start) + " ms");

  meanError = 0;

  for (i = k = 0, len1 = v1h.length; k < len1; i = ++k) {
    e = v1h[i];
    meanError += Math.abs(e - gpuResult[i]);
  }

  meanError /= v1h.length;

  console.log("CPU. vs GPU. Mean absolute error: " + meanError + ", refer to IEEE-754");

  JC.cudaDeviceReset();

}).call(this);

//# sourceMappingURL=objectTest.js.map