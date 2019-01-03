export function persist(type, key, value) {

    if (chrome.storage) {
    const o = {}; o[key] = value;
    chrome.storage[type].set(o, () => {
      chrome.storage[type].get(key, result => console.log('Persisted:', result));
    });
  } else {
    localStorage[key] = JSON.stringify(value);
  }
}

export function restore(type, key) {
  if (chrome.storage) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage[type].get(key, result => {
          console.log('Restored:', result);
          if (result[key]) {
            resolve(result[key]);
          } else {
            reject(`Value ${key} not found in Chrome storage`);
          }
        });
      } catch (error) {
        reject(error);
      }
    })
  } else {
    if (localStorage[key]) {
      return Promise.resolve(JSON.parse(localStorage[key]));
    } else {
      return Promise.reject(`Value ${key} not found in localStorage`);
    }
  }
}