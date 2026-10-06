module.exports = {
  default: {
    paths: ['automation/features/**/*.feature'],
    require: ['automation/steps/**/*.js', 'automation/support/**/*.js'],
    format: ['progress-bar', ['html', 'reports/cucumber-report.html']],
    publishQuiet: true,
  },
}
