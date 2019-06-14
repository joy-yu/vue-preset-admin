const apiProxyTarget = 'http://localhost:3000';

function generateProxyTable(target, pathList) {
  const ret = {};
  pathList.forEach(function(path) {
    ret[path] = {
      target,
      secure: false,
      changeOrigin: true
    };
  });
  return ret;
}

const proxyTable = generateProxyTable(apiProxyTarget, ['/api']);

module.exports = proxyTable;
