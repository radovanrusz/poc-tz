// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'login page elements and content': (browser) => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('h4.card-title')
      .assert.containsText('h4.card-title', 'Simple Quora Login')
      .assert.elementCount('input.form-control', 2)
      .end();
  },
  'login page behaviour alert case': (browser) => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .clearValue('input#userName')
      .clearValue('input#exampleInputPassword1')
      .click('form button[type="submit"]')
      .waitForElementVisible('div.alert-warning', 2000)
      .assert.elementPresent('div.alert-warning')
      .assert.elementCount('div.alert-warning', 1)
      .end();
  },
  'login page behaviour success case': (browser) => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .setValue('input#userName', 'janko')
      .setValue('input#exampleInputPassword1', 'janko')
      .click('form button[type="submit"]')
      .waitForElementNotPresent('form button[type="submit"]', 2000)
      .waitForElementVisible('button.btn-danger', 2000)
      .assert.urlContains(process.env.VUE_DEV_SERVER_URL)
      .assert.elementPresent('#userInfo .card-title')
      .assert.containsText('#userInfo .card-title', 'User Info')
      .end();
  }
};
