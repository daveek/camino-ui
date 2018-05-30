const baseUrl = process.env.BASE_URL

const titres = [
  'per-bonneval',
  'conc-cerville-buissoncourt',
  'per-saint-just-en-brie',
  'conc-grand-serre',
  'conc-laconquillie',
  'per-lauterbourg',
  'per-pedral',
  'conc-saint-elie',
  'aex-crique-serpent',
  'aex-georgeon'
]

const mocks = ['geothermie', 'hydrocarbures', 'mineraux', 'stockage']

const api = {
  titresGet() {
    return Promise.all([
      ...titres.map(id =>
        fetch(`${baseUrl}data/titres/${id}.json`).then(r => r.json())
      )
    ]).then(r => r)
  },

  titreGet(id) {
    return fetch(`${baseUrl}data/titres/${id}.json`).then(r => r.json())
  },

  mocksGet() {
    return Promise.all([
      ...mocks.map(id =>
        fetch(`${baseUrl}data/mocks/${id}.json`).then(r => r.json())
      )
    ]).then(r => ({
      type: 'FeatureCollection',
      features: r
    }))
  },

  mockRntmGet(id) {
    return fetch(`${baseUrl}data/mocks/mineraux-rntm.json`).then(r => r.json())
  },

  mockGet(id) {
    return fetch(`${baseUrl}data/mocks/${id}.json`).then(r => r.json())
  }
}

export default api