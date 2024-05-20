function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('restaurant-db', 1);
    request.onerror = (error) => {
      reject(error);
    };
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('restaurants')) {
        const objectStore = db.createObjectStore('restaurants', { keyPath: 'id' });
        objectStore.createIndex('restaurant_name', 'name', { unique: false });
        objectStore.createIndex('restaurant_description', 'description', { unique: false });
        objectStore.createIndex('restaurant_rating', 'rating', { unique: false });
        objectStore.createIndex('restaurant_city', 'city', { unique: false });
      }
    };
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
  });
}

module.exports = { openDatabase };
