module.exports = {
  filterBodyBlanks: async ({ body: data }, res, next) => {
    const key = Object.keys(data);
    for (let i = 0; i < key.length; i++) {
      if (data[key[i]] === null || data[key[i]] === '' || data[key[i]].length === 0) {
        delete data[key[i]];
      };
    };
    next();
  },
  filterQueryBlanks: async ({ query: data }, res, next) => {
    try {
      const key = Object.keys(data);
      for (let i = 0; i < key.length; i++) {
        if (data[key[i]] === '' || data[key[i]].length === 0) {
          delete data[key[i]];
        };
      };
    } catch (error) {
      data = {};
    };
    next();
  },

  parseFormDataArray: async ({ body: data }, res, next) => {
    // console.log(JSON.stringify(data, null, 2))
    const key = Object.keys(data);

    for (let i = 0; i < key.length; i++) {
      if (data[key[i]] === null || data[key[i]] === '') {
        delete data[key[i]];
      } else {

        try {
          if (key[i] === 'files') {

            if (Array.isArray(data.files)) {
              console.log('array');
              console.log(data.files)

              data.files = data.files.map((_file) => JSON.parse(_file));
              // console.log(data.files)

            } else {
              // console.log('not array');
              data.files = JSON.parse(data.files)
              // console.log(data.files)
            };
          } else {
            data[key[i]] = JSON.parse(data[key[i]]);
          }
        } catch (error) {
          console.log(`warning:${data[key[i]]} no se pudo parsear con parseFormDataArray`)
          //console.log(error);
        };
      };
    };
    // console.log(JSON.stringify(data, null, 2))
    next();
  },
};