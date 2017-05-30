let ajax = {
  _handler: function (resolve, reject) {
    if (this.readyState !== 4) return

    if (this.status >= 200) {
      resolve(JSON.parse(this.responseText))
    } else {
      reject(new Error(this.statusText))
    }
  },

  get: function (url) {
    let promise = new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()

      xhr.open('GET', url)
      xhr.onreadystatechange = this._handler.bind(xhr, resolve, reject)
      xhr.setRequestHeader('Accept', 'application/json')
      xhr.send()
    })

    return promise
  }
}

export {ajax as default}
