class Parked {
  /***************************************************************************\
    Static Properties
  \***************************************************************************/

  static #requiredConfigFields = ['parser']

  // The version is injected by the build process
  static version = 'Parked [BUILD_VERSION] - Built on [BUILD_DATE]'





  /***************************************************************************\
    Static Private Methods
  \***************************************************************************/

  static #verifyConfig = config => {
    const errors = []
    const missingConfig = Parked.#requiredConfigFields.filter(configName => !config[configName])

    if (missingConfig.length) {
      errors.push(new Error(`Missing required config: ${missingConfig.join(', ')}`))
    }

    if (errors.length) {
      errors.forEach(error => {
        throw error
      })
    }
  }





  /***************************************************************************\
    Private Properties
  \***************************************************************************/

  #parser = null





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (config = {}) {
    Parked.#verifyConfig(config)
    this.config = config
  }

  parse = string => this.parser.parse(string)





  /***************************************************************************\
    Getters
  \***************************************************************************/

  get parser () {
    if (!this.#parser) {
      /* eslint-disable-next-line babel/new-cap */
      this.#parser = new this.config.parser
    }

    return this.#parser
  }

  /* eslint-disable-next-line class-methods-use-this */
  get version () {
    return Parked.version
  }
}





export default Parked
