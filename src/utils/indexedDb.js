const { openDatabase } = require('./openDb');

function executeRequest(db, method, data) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('restaurants', 'readwrite');
    const objectStore = transaction.objectStore('restaurants');
    let request;

    switch (method) {
      case 'get':
        request = objectStore.getAll();
        break;
      case 'getid':
        request = objectStore.get(data.id);
        break;
      case 'post':
        request = objectStore.add(data);
        break;
      case 'delete':
        request = objectStore.delete(data);
        break;
      default:
        throw new Error('Unsupported method');
    }

    request.onsuccess = (e) => {
      resolve(e.target.result);
    };

    request.onerror = (e) => {
      reject(e.target.error);
    };
  });
}

function indexedDb(method, data) {
  return openDatabase().then((db) => executeRequest(db, method, data));
}

module.exports = indexedDb;
